<?php
class TimelineModel
{
    public $enlace;
    private $ticketAttachmentModel;
    
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
        $this->ticketAttachmentModel = new TicketAttachmentModel();
    }
    /*List */
    public function all(){
        try {
            //sql query with JOIN to get user name
			$vSql = "SELECT 
                t.*,
                u.name as user_name
            FROM timeline t
            LEFT JOIN user u ON t.user_id = u.id
            WHERE t.is_active = 1;";
			
            //query execution
			$vResultado = $this->enlace->ExecuteSQL ($vSql);
            
            // Get ticket attachments for each timeline
            if ($vResultado && is_array($vResultado)) {
                foreach ($vResultado as &$timeline) {
                    $timeline->ticket_attachments = $this->ticketAttachmentModel->getByTimelineId($timeline->id);
                }
            }
				
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
            //sql query with JOIN to get user name
			$vSql = "SELECT 
                t.*,
                u.name as user_name
            FROM timeline t
            LEFT JOIN user u ON t.user_id = u.id
            WHERE t.id = $id;";
			
            //query execution
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			
            // Get ticket attachments for the timeline
            if ($vResultado && is_array($vResultado) && count($vResultado) > 0) {
                $vResultado[0]->ticket_attachments = $this->ticketAttachmentModel->getByTimelineId($id);
                return $vResultado[0];
            }
            
			//return the object
			return null;
		} catch (Exception $e) {
            handleException($e);
        }
    }
    /*Get timeline entrys by ticket id */
    public function getAllByTicketId($ticketId) {
        try {
            //sql query with JOIN to get user name
            $vSql = "SELECT 
                t.*,
                u.name as user_name
            FROM timeline t
            LEFT JOIN user u ON t.user_id = u.id
            WHERE t.ticket_id = $ticketId AND t.is_active = 1
            ORDER BY t.date ASC;";
            
            //query execution
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            
            // Get ticket attachments for each timeline
            if ($vResultado && is_array($vResultado)) {
                foreach ($vResultado as &$timeline) {
                    $timeline->ticket_attachments = $this->ticketAttachmentModel->getByTimelineId($timeline->id);
                }
            }
            
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
            if (!isset($object->ticket_id) || !isset($object->user_id) || 
                !isset($object->subject)) {
                throw new Exception("Missing required fields: ticket_id, user_id, subject");
            }
            
            // Set description to empty string if not provided
            $description = isset($object->description) ? $object->description : '';

            //sql query
            $vSql = "Insert into timeline (ticket_id, user_id, subject, description, date, is_active) 
                     Values ('$object->ticket_id', '$object->user_id', '$object->subject', '$description', NOW(), 1);";
            //query execution
            $vResultado = $this->enlace->executeSQL_DML_last($vSql);
            
            // Send notifications to all users related to the ticket
            $ticketModel = new TicketModel();
            $ticket = $ticketModel->get($object->ticket_id);
            $userTicketModel = new UserTicketModel();
            $assignedUsers = $userTicketModel->getByTicketId($object->ticket_id);
            
            if ($assignedUsers && is_array($assignedUsers)) {
                $notificationModel = new NotificationModel();
                foreach ($assignedUsers as $userTicket) {
                    $notificationModel->insert((object) [
                        'user_id' => $userTicket->user_id,
                        'subject' => "Ticket# {$object->ticket_id} | {$ticket->title}",
                        'body' => "{$object->subject}\n{$description}"
                    ]);
                }
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
            
            // Validate required fields
            if (!isset($object->id)) {
                throw new Exception("Missing required field: id");
            }
            
            // Build the SQL query - only update fields that are provided
            $updateFields = [];
            
            if (isset($object->ticket_id)) {
                $updateFields[] = "ticket_id = '$object->ticket_id'";
            }
            
            if (isset($object->user_id)) {
                $updateFields[] = "user_id = '$object->user_id'";
            }
            
            if (isset($object->subject)) {
                $updateFields[] = "subject = '$object->subject'";
            }
            
            if (isset($object->description)) {
                $updateFields[] = "description = '$object->description'";
            }
            
            if (empty($updateFields)) {
                throw new Exception("No fields to update");
            }
            
            $vSql = "Update timeline SET " . implode(", ", $updateFields) . " Where id = $object->id;";
			
            //query execution
			$vResultado = $this->enlace->executeSQL_DML($vSql);
            
			//return the object
            return $this->get($object->id);
		} catch (Exception $e) {
            handleException($e);
        }
    }
    /*Delete*/
    public function delete($id) {
        try {
            // Validate the id
            if ($id === null || $id === '') {
                throw new Exception("ID cannot be null or empty");
            }
            
            //sql query - soft delete by setting is_active to 0
            $vSql = "Update timeline SET is_active = 0 Where id = $id;";
            //query execution
            $vResultado = $this->enlace->executeSQL_DML($vSql);
            
            // Deactivate all ticket-attachment entries for this timeline
            $this->ticketAttachmentModel->deleteByTimelineId($id);
            
            //return the object
            return $this->get($id);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
