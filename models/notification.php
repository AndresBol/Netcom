<?php
class NotificationModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }


    public function all()
    {
        try {
            $vSql = "SELECT 
                n.id,
                n.user_id,
                n.subject,
                n.body,
                n.created_at,
                n.is_read,
                n.is_active
            FROM notification n
            WHERE n.is_active = 1;";

            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
            return [];
        }
    }   

 

    public function insert($object)
    {

        try {

            if ($object === null) {
                throw new Exception("Object cannot be null");
            }

            if (!isset($object->user_id) || !isset($object->subject) || !isset($object->body)) {
                throw new Exception("Missing required fields: user_id, subject, body");
            }
            $vSql = "INSERT INTO notification (user_id, subject, body, is_active) 
                     VALUES (
                         '" . $object->user_id . "',
                         '" . $object->subject . "',
                         '" . $object->body . "',
                         1
                     );";

            $vResultado = $this->enlace->executeSQL_DML($vSql);

            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function getByUserId($userId)
    {
        try {
            $vSql = "SELECT 
                n.id,
                n.user_id,
                n.subject,
                n.body,
                n.created_at,
                n.is_read,
                n.is_active
            FROM notification n
            WHERE n.user_id = $userId AND n.is_active = 1;";

            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado ? $vResultado : [];
        } catch (Exception $e) {
            handleException($e);
            return [];
        }
    }

    public function markAsRead($notificationId)
    {
        try {
            $vSql = "UPDATE notification 
                     SET is_read = 1 
                     WHERE id = $notificationId;";

            $vResultado = $this->enlace->executeSQL_DML($vSql);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
            return false;
        }
    }

    public function markAllAsReadByUserId($userId)
    {
        try {
            $vSql = "UPDATE notification 
                     SET is_read = 1 
                     WHERE user_id = $userId AND is_active = 1;";

            $vResultado = $this->enlace->executeSQL_DML($vSql);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
            return false;
        }
    }


 
}
