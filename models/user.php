<?php
class UserModel
{
    public $enlace;
    private $userSpecialFieldModel;
    
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
        $this->userSpecialFieldModel = new UserSpecialFieldModel();
    }
    /*List */
    public function all(){
        try {
            //sql query with JOIN to get role name
			$vSql = "SELECT 
                u.*,
                r.name as role
            FROM user u
            LEFT JOIN role r ON u.role_id = r.id
            WHERE u.is_active = 1;";
			
            //query execution
			$vResultado = $this->enlace->ExecuteSQL ($vSql);
            
            // Get special fields for each user
            if ($vResultado && is_array($vResultado)) {
                foreach ($vResultado as &$user) {
                    $user->special_fields = $this->userSpecialFieldModel->getByUserId($user->id);
                }
            }
				
			//return the object
			return $vResultado;
		} catch (Exception $e) {
            handleException($e);
        }
    }

    /*Validate login */
    public function validateLogin($email, $password)
    {
        try {
            $user = $this->getUserByEmail($email);

            if ($user && isset($user->password)) {
                if (password_verify($password, $user->password)) {
                    unset($user->password);
                    return $user;
                }
            }
            return false;
        } catch (Exception $e) {
            handleException($e);
        }
    }
    /*Obtain */
    public function get($id)
    {
        try {
            //sql query with JOIN to get role name
			$vSql = "SELECT 
                u.*,
                r.name as role
            FROM user u
            LEFT JOIN role r ON u.role_id = r.id
            WHERE u.id = $id;";
			
            //query execution
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			
            // Get special fields for the user
            if ($vResultado && is_array($vResultado) && count($vResultado) > 0) {
                $vResultado[0]->special_fields = $this->userSpecialFieldModel->getByUserId($id);
                return $vResultado[0];
            }
            
			//return the object
			return null;
		} catch (Exception $e) {
            handleException($e);
        }
    }
    /*Get user by email */
    public function getUserByEmail($email) {
        try {
            //sql query with JOIN to get role name
            $vSql = "SELECT 
                u.*,
                r.name as role
            FROM user u
            LEFT JOIN role r ON u.role_id = r.id
            WHERE u.email = '$email' AND u.is_active = 1;";
            
            //query execution
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            
            // Get special fields for the user
            if ($vResultado && is_array($vResultado) && count($vResultado) > 0) {
                $vResultado[0]->special_fields = $this->userSpecialFieldModel->getByUserId($vResultado[0]->id);
                return $vResultado[0];
            }
            
            //return the object
            return null;
        } catch (Exception $e) {
            handleException($e);
        }
    }
    /*Get users by role name */
    public function getByRoleName($roleName) {
        try {
            //sql query with JOIN to get role name
            $vSql = "SELECT 
                u.*,
                r.name as role
            FROM user u
            LEFT JOIN role r ON u.role_id = r.id
            WHERE r.name = '$roleName' AND u.is_active = 1;";
            
            //query execution
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            
            // Get special fields for each user
            if ($vResultado && is_array($vResultado)) {
                foreach ($vResultado as &$user) {
                    $user->special_fields = $this->userSpecialFieldModel->getByUserId($user->id);
                }
            }
            
            //return the object
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }
    /*Insert */
    public function insert($object) {
        try {
            // Validate the object
            if ($object === null) {
                throw new Exception("Object cannot be null");
            }

            // Validate required fields
            if (!isset($object->role_id) || !isset($object->name) || 
                !isset($object->email) || !isset($object->password)) {
                throw new Exception("Missing required fields");
            }
            
            // Hash the password
            $hashedPassword = password_hash($object->password, PASSWORD_DEFAULT);

            //sql query
            $vSql = "Insert into user (role_id, name, email, password, is_active) 
                     Values ('$object->role_id', '$object->name', '$object->email', '$hashedPassword', 1);";
            //query execution
            $vResultado = $this->enlace->executeSQL_DML_last( $vSql);
            
            // Insert special fields if provided
            if (isset($object->special_field_ids) && is_array($object->special_field_ids)) {
                $this->userSpecialFieldModel->insertForUser($vResultado, $object->special_field_ids);
            }
            
            //return the object
            return $this->get($vResultado);
        } catch (Exception $e) {
            handleException($e);
        }
    }
    /*Update */
    public function update($object) {
        try {
            // Validate the object
            if ($object === null) {
                throw new Exception("Object cannot be null");
            }
            
            // Build the SQL query
            $vSql = "Update user SET 
                role_id ='$object->role_id', 
                name ='$object->name',
                email ='$object->email'";
            
            // Only update password if provided
            if (isset($object->password) && !empty($object->password)) {
                $hashedPassword = password_hash($object->password, PASSWORD_DEFAULT);
                $vSql .= ", password ='$hashedPassword'";
            }
            
            $vSql .= " Where id=$object->id;";
			
            //query execution
			$vResultado = $this->enlace->executeSQL_DML( $vSql);
            
            // Update special fields if provided
            if (isset($object->special_field_ids)) {
                $this->userSpecialFieldModel->updateForUser($object->id, $object->special_field_ids);
            }
            
			//return the object
            return $this->get($object->id);
		} catch (Exception $e) {
            handleException($e);
        }
    }
    /*Update last login */
    public function updateLastLogin($id) {
        try {
            //sql query
            $vSql = "Update user SET last_login_on = NOW() Where id=$id;";
            //query execution
            $vResultado = $this->enlace->executeSQL_DML($vSql);
            //return the object
            return $this->get($id);
        } catch (Exception $e) {
            handleException($e);
        }
    }
    /*Delete*/
    public function delete($id) {
        try {
            //sql query
            $vSql = "Update user SET is_active=0 Where id=$id;";
            //query execution
            $vResultado = $this->enlace->executeSQL_DML( $vSql);
            
            // Also deactivate user_special_field entries
            $this->userSpecialFieldModel->deleteByUserId($id);
            
            //return the object
            return $this->get($id);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /*Get technicians with workload*/
    public function getTechniciansWorkload() {
        try {
            // Count user's assigned tickets excluding those with status 'Resolved' or 'Closed'.
            // Use a JOIN on status to avoid building dynamic IN(...) lists which can be empty.
            $vSql = "SELECT 
                u.*,
                r.name as role,
                SUM(CASE WHEN (s.name IS NULL OR s.name NOT IN ('Resolved','Closed')) THEN 1 ELSE 0 END) as workload
            FROM user u
            LEFT JOIN role r ON u.role_id = r.id
            LEFT JOIN user_ticket ut ON u.id = ut.user_id
            LEFT JOIN ticket t ON ut.ticket_id = t.id
            LEFT JOIN status s ON t.status_id = s.id
            WHERE r.name = 'Technician' AND u.is_active = 1
            GROUP BY u.id;";

            $vResultado = $this->enlace->ExecuteSQL($vSql);

            // Get special fields for each user
            if ($vResultado && is_array($vResultado)) {
                foreach ($vResultado as &$user) {
                    $user->special_fields = $this->userSpecialFieldModel->getByUserId($user->id);
                }
            }

            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
