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
            //sql query with JOINs to get related names
			$vSql = "SELECT 
                t.*,
                s.name as status_name,
                c.name as category_name,
                p.name as priority_name,
                tl.name as label_name,
                sla.response_time,
                sla.resolution_time
            FROM ticket t
            LEFT JOIN status s ON t.status_id = s.id
            LEFT JOIN category c ON t.category_id = c.id
            LEFT JOIN priority p ON t.priority_id = p.id
            LEFT JOIN ticket_label tl ON t.label_id = tl.id
            LEFT JOIN sla ON t.category_id = sla.category_id AND t.priority_id = sla.priority_id
            WHERE t.is_active = 1;";
			
            //query execution
			$vResultado = $this->enlace->ExecuteSQL ($vSql);
				
			//return the object
			return $vResultado ?? [];
		} catch (Exception $e) {
            handleException($e);
        }
    }
    /*Obtain */
    public function get($id)
    {
        try {
            //sql query with JOINs to get related names
			$vSql = "SELECT 
                t.*,
                s.name as status_name,
                c.name as category_name,
                p.name as priority_name,
                tl.name as label_name,
                sla.response_time,
                sla.resolution_time
            FROM ticket t
            LEFT JOIN status s ON t.status_id = s.id
            LEFT JOIN category c ON t.category_id = c.id
            LEFT JOIN priority p ON t.priority_id = p.id
            LEFT JOIN ticket_label tl ON t.label_id = tl.id
            LEFT JOIN sla ON t.category_id = sla.category_id AND t.priority_id = sla.priority_id
            WHERE t.id = $id;";
			
            //query execution
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			//return the object
			return $vResultado ? $vResultado[0] : null;
		} catch (Exception $e) {
            handleException($e);
        }
    }
    /*Get all tickets by category */
    public function getAllTicketsByCategory($categoryId) {
        try {
            //sql query with JOINs to get related names
            $vSql = "SELECT 
                t.*,
                s.name as status_name,
                c.name as category_name,
                p.name as priority_name,
                tl.name as label_name,
                sla.response_time,
                sla.resolution_time
            FROM ticket t
            LEFT JOIN status s ON t.status_id = s.id
            LEFT JOIN category c ON t.category_id = c.id
            LEFT JOIN priority p ON t.priority_id = p.id
            LEFT JOIN ticket_label tl ON t.label_id = tl.id
            LEFT JOIN sla ON t.category_id = sla.category_id AND t.priority_id = sla.priority_id
            WHERE t.category_id = $categoryId AND t.is_active = 1;";
            //query execution
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            //return the object
            return $vResultado ?? [];
        } catch (Exception $e) {
            handleException($e);
        }
    }
    /*Get all tickets by priority */
    public function getAllTicketsByPriority($priorityId) {
        try {
            //sql query with JOINs to get related names
            $vSql = "SELECT 
                t.*,
                s.name as status_name,
                c.name as category_name,
                p.name as priority_name,
                tl.name as label_name,
                sla.response_time,
                sla.resolution_time
            FROM ticket t
            LEFT JOIN status s ON t.status_id = s.id
            LEFT JOIN category c ON t.category_id = c.id
            LEFT JOIN priority p ON t.priority_id = p.id
            LEFT JOIN ticket_label tl ON t.label_id = tl.id
            LEFT JOIN sla ON t.category_id = sla.category_id AND t.priority_id = sla.priority_id
            WHERE t.priority_id = $priorityId AND t.is_active = 1;";
            //query execution
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            //return the object
            return $vResultado ?? [];
        } catch (Exception $e) {
            handleException($e);
        }
    }
    /*Get all tickets by status */
    public function getAllTicketsByStatus($statusId) {
        try {
            //sql query with JOINs to get related names
            $vSql = "SELECT 
                t.*,
                s.name as status_name,
                c.name as category_name,
                p.name as priority_name,
                tl.name as label_name,
                sla.response_time,
                sla.resolution_time
            FROM ticket t
            LEFT JOIN status s ON t.status_id = s.id
            LEFT JOIN category c ON t.category_id = c.id
            LEFT JOIN priority p ON t.priority_id = p.id
            LEFT JOIN ticket_label tl ON t.label_id = tl.id
            LEFT JOIN sla ON t.category_id = sla.category_id AND t.priority_id = sla.priority_id
            WHERE t.status_id = $statusId AND t.is_active = 1;";
            //query execution
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            //return the object
            return $vResultado ?? [];
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /*Get all tickets by status name */
    public function getAllTicketsByStatusName($statusName) {
        try {
            //sql query with JOINs to get related names
            $vSql = "SELECT 
                t.*,
                s.name as status_name,
                c.name as category_name,
                p.name as priority_name,
                tl.name as label_name,
                sla.response_time,
                sla.resolution_time
            FROM ticket t
            LEFT JOIN status s ON t.status_id = s.id
            LEFT JOIN category c ON t.category_id = c.id
            LEFT JOIN priority p ON t.priority_id = p.id
            LEFT JOIN ticket_label tl ON t.label_id = tl.id
            LEFT JOIN sla ON t.category_id = sla.category_id AND t.priority_id = sla.priority_id
            WHERE s.name = '$statusName' AND t.is_active = 1;";
            //query execution
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            //return the object
            return $vResultado ?? [];
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
            NULL, 
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
            
            // Build dynamic SET clause based on provided fields
            $setFields = [];
            
            // necessary fields
            if (isset($object->status_id)) {
                $setFields[] = "status_id ='$object->status_id'";
            }
            if (isset($object->category_id)) {
                $setFields[] = "category_id ='$object->category_id'";
            }
            if (isset($object->priority_id)) {
                $setFields[] = "priority_id ='$object->priority_id'";
            }
            if (isset($object->label_id)) {
                $setFields[] = "label_id ='$object->label_id'";
            }
            if (isset($object->title)) {
                $setFields[] = "title ='$object->title'";
            }
            if (isset($object->description)) {
                $setFields[] = "description ='$object->description'";
            }
            
            // Optional fields
            if (isset($object->notification_status)) {
                $setFields[] = "notification_status ='$object->notification_status'";
                $setFields[] = "notified_on = NOW()";
            }
            if (isset($object->rating)) {
                $setFields[] = "rating ='$object->rating'";
            }
            if (isset($object->comment)) {
                $setFields[] = "comment ='$object->comment'";
            }
            
            // Check if we have fields to update
            if (empty($setFields)) {
                throw new Exception("No fields to update");
            }
            
            //sql query
            $vSql = "Update ticket SET " . implode(", ", $setFields) . " Where id=$object->id;";
			
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
