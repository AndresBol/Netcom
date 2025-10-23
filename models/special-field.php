<?php
class SpecialFieldModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    /*List */
    public function all(){
        try {
            //sql query
			$vSql = "SELECT * FROM special_field where is_active=1;";
			
            //query execution
			$vResultado = $this->enlace->ExecuteSQL ($vSql);
				
			//return the object
			return $vResultado;
		} catch (Exception $e) {
            handleException($e);
        }
    }
    /*Obtain */
    public function get($id)
    {
        try {
            //sql query
			$vSql = "SELECT * FROM special_field where id=$id;";
			
            //query execution
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			//return the object
			return $vResultado[0];
		} catch (Exception $e) {
            handleException($e);
        }
    }
    /*Get all special fields by category */
    public function getAllSpecialFieldsByCategory($categoryId) {
        try {
            //sql query
            $vSql = "SELECT * FROM special_field WHERE category_id = $categoryId AND is_active = 1;";
            //query execution
            $vResultado = $this->enlace->ExecuteSQL($vSql);
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
            if (!isset($object->category_id) || !isset($object->name)) {
                throw new Exception("Missing required fields");
            }

            //sql query
            $vSql = "Insert into special_field (category_id, name, is_active) Values ('$object->category_id', '$object->name', 1);";
            //query execution
            $vResultado = $this->enlace->executeSQL_DML_last( $vSql);
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

            //sql query
			$vSql = "Update special_field SET category_id ='$object->category_id', name ='$object->name' Where id=$object->id;";
			
            //query execution
			$vResultado = $this->enlace->executeSQL_DML( $vSql);
			//return the object
            return $this->get($object->id);
		} catch (Exception $e) {
            handleException($e);
        }
    }
    /*Delete*/
    public function delete($id) {
        try {
            //sql query
            $vSql = "Update special_field SET is_active=0 Where id=$id;";
            //query execution
            $vResultado = $this->enlace->executeSQL_DML( $vSql);
            //return the object
            return $this->get($id);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
