<?php
class TicketAttachmentModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    public function getAll() {
    try {
        $vSql = "SELECT id, timeline_id, file, extension, is_active FROM ticket_attachment WHERE is_active = 1;";
        $vResultado = $this->enlace->ExecuteSQL($vSql);
        return $vResultado ? $vResultado : [];
    } catch (Exception $e) {
        handleException($e);
        return [];
    }
}
    
    /*Get all ticket attachments for a timeline entry */
    public function getByTimelineId($timelineId) {
        try {
            $vSql = "SELECT 
                ta.id,
                ta.timeline_id,
                ta.file,
                ta.extension,
                ta.is_active
            FROM ticket_attachment ta
            WHERE ta.timeline_id = $timelineId AND ta.is_active = 1;";
            
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado ? $vResultado : [];
        } catch (Exception $e) {
            handleException($e);
            return [];
        }
    }
    
    /*Get a specific ticket attachment */
    public function get($id) {
        try {
            $vSql = "SELECT 
                ta.id,
                ta.timeline_id,
                ta.file,
                ta.extension,
                ta.is_active
            FROM ticket_attachment ta
            WHERE ta.id = $id;";
            
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado && count($vResultado) > 0 ? $vResultado[0] : null;
        } catch (Exception $e) {
            handleException($e);
            return null;
        }
    }
    
    /*Insert a new ticket attachment */
    public function insert($object) {
        try {
            if ($object === null) {
                throw new Exception("Object cannot be null");
            }
            
            // Validate required fields
            if (!isset($object->timeline_id) || !isset($object->file) || !isset($object->extension)) {
                throw new Exception("Missing required fields: timeline_id, file, extension");
            }
            
            $vSql = "INSERT INTO ticket_attachment (timeline_id, file, extension, is_active) 
                    VALUES ('$object->timeline_id', '$object->file', '$object->extension', 1);";
            
            $vResultado = $this->enlace->executeSQL_DML_last($vSql);
            return $this->get($vResultado);
        } catch (Exception $e) {
            handleException($e);
            return null;
        }
    }
    
    /*Update a ticket attachment */
    public function update($object) {
        try {
            if ($object === null) {
                throw new Exception("Object cannot be null");
            }
            
            if (!isset($object->id)) {
                throw new Exception("Missing required field: id");
            }
            
            $updateFields = [];
            
            if (isset($object->timeline_id)) {
                $updateFields[] = "timeline_id = '$object->timeline_id'";
            }
            
            if (isset($object->file)) {
                $updateFields[] = "file = '$object->file'";
            }
            
            if (isset($object->extension)) {
                $updateFields[] = "extension = '$object->extension'";
            }
            
            if (empty($updateFields)) {
                throw new Exception("No fields to update");
            }
            
            $vSql = "UPDATE ticket_attachment SET " . implode(", ", $updateFields) . " WHERE id = $object->id;";
            $this->enlace->executeSQL_DML($vSql);
            
            return $this->get($object->id);
        } catch (Exception $e) {
            handleException($e);
            return null;
        }
    }
    
    /*Delete a specific ticket attachment (soft delete) */
    public function delete($id) {
        try {
            if ($id === null || $id === '') {
                throw new Exception("ID cannot be null or empty");
            }
            
            $vSql = "UPDATE ticket_attachment SET is_active = 0 WHERE id = $id;";
            $this->enlace->executeSQL_DML($vSql);
            return true;
        } catch (Exception $e) {
            handleException($e);
            return false;
        }
    }
    
    /*Delete all attachments for a timeline entry (soft delete) */
    public function deleteByTimelineId($timelineId) {
        try {
            if ($timelineId === null || $timelineId === '') {
                throw new Exception("Timeline ID cannot be null or empty");
            }
            
            $vSql = "UPDATE ticket_attachment SET is_active = 0 WHERE timeline_id = $timelineId;";
            $this->enlace->executeSQL_DML($vSql);
            return true;
        } catch (Exception $e) {
            handleException($e);
            return false;
        }
    }
}
