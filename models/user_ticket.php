<?php
class UserTicketModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    
    /*List all user tickets */
    public function all(){
        try {
            $vSql = "SELECT 
                ut.id,
                ut.user_id,
                ut.ticket_id,
                ut.assigned_on,
                ut.assigned_by,
                u.name as user_name,
                t.title as ticket_title,
                assigned_user.name as assigned_by_name
            FROM user_ticket ut
            LEFT JOIN user u ON ut.user_id = u.id
            LEFT JOIN ticket t ON ut.ticket_id = t.id
            LEFT JOIN user assigned_user ON ut.assigned_by = assigned_user.id
            WHERE ut.is_active = 1;";
            
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado ? $vResultado : [];
        } catch (Exception $e) {
            handleException($e);
            return [];
        }
    }

    /*Get all tickets for a user */
    public function getByUserId($userId) {
        try {
            $vSql = "SELECT 
                ut.id as assignation_id,
                ut.user_id,
                ut.ticket_id as id,
                ut.assigned_on,
                ut.assigned_by,
                assigned_user.name as assigned_by_name,
                t.title as title,
                t.description as description,
                t.status_id,
                s.name as status_name,
                t.category_id,
                c.name as category_name,
                t.priority_id,
                t.created_on,
                p.name as priority_name,
                t.label_id,
                tl.name as label_name,
                sla.response_time,
                sla.resolution_time
            FROM user_ticket ut
            INNER JOIN ticket t ON ut.ticket_id = t.id
            LEFT JOIN status s ON t.status_id = s.id
            LEFT JOIN category c ON t.category_id = c.id
            LEFT JOIN priority p ON t.priority_id = p.id
            LEFT JOIN ticket_label tl ON t.label_id = tl.id
            LEFT JOIN user assigned_user ON ut.assigned_by = assigned_user.id
            LEFT JOIN sla ON t.category_id = sla.category_id AND t.priority_id = sla.priority_id
            WHERE ut.user_id = $userId AND ut.is_active = 1 AND t.is_active = 1  AND t.status_id NOT IN (SELECT id FROM status WHERE name = 'Resolved');";
            
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado ? $vResultado : [];
        } catch (Exception $e) {
            handleException($e);
            return [];
        }
    }
    /*Get all tickets for a user */
    public function getByTicketId($ticketId) {
        try {
            $vSql = "SELECT 
                ut.id,
                ut.user_id,
                ut.assigned_on,
                ut.assigned_by,
                user.name as user_name,
                user_role.name as user_role,
                assigned_by_user.name as assigned_by_name,
                assigned_by_role.name as assigned_by_role
            FROM user_ticket ut
            LEFT JOIN user ON ut.user_id = user.id
            LEFT JOIN role user_role ON user.role_id = user_role.id
            LEFT JOIN user assigned_by_user ON ut.assigned_by = assigned_by_user.id
            LEFT JOIN role assigned_by_role ON assigned_by_user.role_id = assigned_by_role.id
            WHERE ut.ticket_id = $ticketId AND ut.is_active = 1;";
            
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado ? $vResultado : [];
        } catch (Exception $e) {
            handleException($e);
            return [];
        }
    }

    /*Insert a ticket for a user */
    public function insert($object) {
        try {
            $userId = $object->user_id ?? null;
            $ticketId = $object->ticket_id ?? null;
            $assignedBy = $object->assigned_by ?? null;
            
            if ($userId === null || $userId === '' || $ticketId === null || $ticketId === '' || $assignedBy === null || $assignedBy === '') {
                throw new Exception("User ID, Ticket ID, and Assigned By cannot be null or empty");
            }
            
            // Check if already exists and is inactive
            $checkSql = "SELECT id FROM user_ticket 
                        WHERE user_id = $userId AND ticket_id = $ticketId;";
            $existing = $this->enlace->ExecuteSQL($checkSql);
            
            if ($existing && count($existing) > 0) {
                // Reactivate existing record and update assignment info
                $vSql = "UPDATE user_ticket SET is_active = 1, assigned_on = NOW(), assigned_by = $assignedBy 
                        WHERE user_id = $userId AND ticket_id = $ticketId;";
                $this->enlace->executeSQL_DML($vSql);
                return $this->get($existing[0]->id);
            } else {
                // Insert new record
                $vSql = "INSERT INTO user_ticket (user_id, ticket_id, assigned_on, assigned_by, is_active) 
                        VALUES ($userId, $ticketId, NOW(), $assignedBy, 1);";
                $vResultado = $this->enlace->executeSQL_DML_last($vSql);
                return $this->get($vResultado);
            }
        } catch (Exception $e) {
            handleException($e);
            return null;
        }
    }
    
    /*Get a specific user-ticket relationship */
    public function get($id) {
        try {
            $vSql = "SELECT 
                ut.id,
                ut.user_id,
                ut.ticket_id,
                ut.assigned_on,
                ut.assigned_by,
                assigned_user.name as assigned_by_name,
                t.title as ticket_title,
                t.description as ticket_description,
                t.status_id,
                s.name as status_name,
                t.category_id,
                c.name as category_name,
                t.priority_id,
                p.name as priority_name,
                t.label_id,
                tl.name as label_name,
                sla.response_time,
                sla.resolution_time
            FROM user_ticket ut
            INNER JOIN ticket t ON ut.ticket_id = t.id
            LEFT JOIN status s ON t.status_id = s.id
            LEFT JOIN category c ON t.category_id = c.id
            LEFT JOIN priority p ON t.priority_id = p.id
            LEFT JOIN ticket_label tl ON t.label_id = tl.id
            LEFT JOIN user assigned_user ON ut.assigned_by = assigned_user.id
            LEFT JOIN sla ON t.category_id = sla.category_id AND t.priority_id = sla.priority_id
            WHERE ut.id = $id AND ut.is_active = 1 AND t.is_active = 1;";
            
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado && count($vResultado) > 0 ? $vResultado[0] : null;
        } catch (Exception $e) {
            handleException($e);
            return null;
        }
    }
    
    /*Delete all tickets for a user */
    public function deleteByUserId($userId) {
        try {
            $vSql = "UPDATE user_ticket SET is_active = 0 WHERE user_id = $userId;";
            $this->enlace->executeSQL_DML($vSql);
            return true;
        } catch (Exception $e) {
            handleException($e);
            return false;
        }
    }
    
    /*Delete specific ticket for a user */
    public function delete($id) {
        try {
            $vSql = "UPDATE user_ticket SET is_active = 0 WHERE id = $id;";
            $this->enlace->executeSQL_DML($vSql);
            return true;
        } catch (Exception $e) {
            handleException($e);
            return false;
        }
    }
}
