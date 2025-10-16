<?php
class Ticket
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
    public function insert($objeto) {
        try {
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
            '$objeto->status_id', 
            '$objeto->category_id', 
            '$objeto->priority_id', 
            '$objeto->label_id', 
            '$objeto->title', 
            '$objeto->description', 
            '$objeto->notification_status', 
            '$objeto->notified_on', 
            '$objeto->rating', 
            '$objeto->comment', 
            '$objeto->created_on', 
            1);";
            //query execution
            $vResultado = $this->enlace->executeSQL_DML( $vSql);
            //return the object
            return $this->get($this->enlace->getLastInsertId());
        } catch (Exception $e) {
            handleException($e);
        }
    }
    /*Update */
    public function update($objeto) {
        try {
            //sql query
			$vSql = "Update ticket SET 
            status_id ='$objeto->status_id', 
            category_id ='$objeto->category_id',
            priority_id ='$objeto->priority_id', 
            label_id ='$objeto->label_id', 
            title ='$objeto->title', 
            description ='$objeto->description', 
            notification_status ='$objeto->notification_status', 
            notified_on ='$objeto->notified_on', 
            rating ='$objeto->rating', 
            comment ='$objeto->comment', 
            created_on ='$objeto->created_on' 
            Where 
            id=$objeto->id;";
			
            //query execution
			$vResultado = $this->enlace->executeSQL_DML( $vSql);
			//return the object
            return $this->get($objeto->id);
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
