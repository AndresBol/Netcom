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

            if (
                !isset($object->name) ||
                !isset($object->category_id) || !isset($object->priority_id) ||
                !isset($object->response_time) || !isset($object->resolution_time)
            ) {
                throw new Exception("Missing required fields");
            }
            $vSql = "INSERT INTO notification (user_id, subject, body, is_actice)) 
                     VALUES (
                         '" . $object->user_id . "',
                         '" . $object->subject . "',
                         " . $object->body . ",
                         1
                     );";

            $vResultado = $this->enlace->ExecuteSQL($vSql);

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


 
}
