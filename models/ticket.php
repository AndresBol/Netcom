<?php
class TicketModel
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
			$vSql = "SELECT * FROM ticket where is_active=1;";
			
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
			$vSql = "SELECT * FROM ticket where id=$id;";
			
            //query execution
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			//return the object
			return $vResultado[0];
		} catch (Exception $e) {
            handleException($e);
        }
    }
    /*Get all tickets by category */
    public function getAllTicketsByCategory($categoryId) {
        try {
            //sql query
            $vSql = "SELECT * FROM ticket WHERE category_id = $categoryId AND is_active = 1;";
            //query execution
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            //return the object
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }
    /*Get all tickets by priority */
    public function getAllTicketsByPriority($priorityId) {
        try {
            //sql query
            $vSql = "SELECT * FROM ticket WHERE priority_id = $priorityId AND is_active = 1;";
            //query execution
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            //return the object
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }
    /*Get all tickets by status */
    public function getAllTicketsByStatus($statusId) {
        try {
            //sql query
            $vSql = "SELECT * FROM ticket WHERE status_id = $statusId AND is_active = 1;";
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
            if (!isset($object->status_id) || !isset($object->category_id) || 
                !isset($object->priority_id) || !isset($object->label_id) || 
                !isset($object->title) || !isset($object->description)) {
                throw new Exception("Missing required fields");
            }
            
            //sql query
            $vSql = "Insert into ticket (
            status_id, 
            category_id, 
            priority_id, 
            label_id, 
            title, 
            description, 
            notification_status, 
            notified_on, 
            rating, 
            comment, 
            created_on, 
            is_active
            ) Values (
            '$object->status_id', 
            '$object->category_id', 
            '$object->priority_id', 
            '$object->label_id', 
            '$object->title', 
            '$object->description', 
            '$object->notification_status', 
            NOW(), 
            '$object->rating', 
            '$object->comment', 
            NOW(), 
            1);";
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
            $vSql = "Update ticket SET 
            status_id ='$object->status_id', 
            category_id ='$object->category_id',
            priority_id ='$object->priority_id', 
            label_id ='$object->label_id', 
            title ='$object->title', 
            description ='$object->description', 
            notification_status ='$object->notification_status', 
            notified_on = NOW(), 
            rating ='$object->rating', 
            comment ='$object->comment' 
            Where 
            id=$object->id;";
			
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
            $vSql = "Update ticket SET is_active=0 Where id=$id;";
            //query execution
            $vResultado = $this->enlace->executeSQL_DML( $vSql);
            //return the object
            return $this->get($id);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
