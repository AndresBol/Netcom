<?php
class SlaModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }



    public function all()
    {
        try {
            //sql query
            $vSql = "SELECT 
                        s.*, 
                        c.name AS category_name, 
                        p.name AS priority_name
                    FROM sla s
                    LEFT JOIN category c ON s.category_id = c.id
                    LEFT JOIN priority p ON s.priority_id = p.id
                    WHERE s.is_active = 1;";


            $vResultado = $this->enlace->ExecuteSQL($vSql);


            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

   

    public function get($id)
    {
        try {
            //sql query
            $vSql = "SELECT 
                        s.*, 
                        c.name AS category_name, 
                        p.name AS priority_name
                    FROM sla s
                    LEFT JOIN category c ON s.category_id = c.id
                    LEFT JOIN priority p ON s.priority_id = p.id
                    WHERE s.id = $id;";


            $vResultado = $this->enlace->ExecuteSQL($vSql);

            return $vResultado[0];
        } catch (Exception $e) {
            handleException($e);
        }
    }

   

    public function insert($object)
    {
        try {
            if ($object === null) {
                throw new Exception("Object cannot be null");
            }

            if (
                !isset($object['name']) ||
                !isset($object['category_id']) || !isset($object['priority_id']) ||
                !isset($object['response_time']) || !isset($object['resolution_time'])
            ) {
                throw new Exception("Missing required fields");
            }

            $vSql = "INSERT INTO sla (name, category_id, priority_id, response_time, resolution_time, is_active) 
                     VALUES (
                        '" . $object['name'] . "',
                        " . $object['category_id'] . ",
                        " . $object['priority_id'] . ",
                        " . $object['response_time'] . ",
                        " . $object['resolution_time'] . ",
                        1
                     );";

            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $this->get($vResultado);
        } catch (Exception $e) {
            handleException($e);
        }
    }


    public function update($object)
    {
        try {
            //sql query
            $vSql = "UPDATE sla SET 
                        name = '" . $object['name'] . "',
                        category_id = " . $object['category_id'] . ",
                        priority_id = " . $object['priority_id'] . ",
                        response_time = " . $object['response_time'] . ",
                        resolution_time = " . $object['resolution_time'] . "
                    WHERE id = " . $object['id'] . ";";

            //query execution
            $this->enlace->ExecuteSQL($vSql);

            return true;
        } catch (Exception $e) {
            handleException($e);
        }
    }
  
    public function delete($id)
    {
        try {
            //sql query
            $vSql = "UPDATE sla SET is_active = 0 WHERE id = $id;";

            //query execution
            $this->enlace->ExecuteSQL($vSql);

            return true;
        } catch (Exception $e) {
            handleException($e);
        }
    }
 
    public function getByCategory($category_id)
    {
        try {
       
        $vSql = "SELECT 
                    s.*, 
                    c.name AS category_name, 
                    p.name AS priority_name
                 FROM sla s
                 LEFT JOIN category c ON s.category_id = c.id
                 LEFT JOIN priority p ON s.priority_id = p.id
                 WHERE s.category_id = $category_id
                 AND s.is_active = 1;";

        $vResultado = $this->enlace->ExecuteSQL($vSql);

        return $vResultado;
    } catch (Exception $e) {
        handleException($e);
    }
}


public function getByPriority($priority_id)
{
     try {
      
        $vSql = "SELECT 
                    s.*, 
                    c.name AS category_name, 
                    p.name AS priority_name
                 FROM sla s
                 LEFT JOIN category c ON s.category_id = c.id
                 LEFT JOIN priority p ON s.priority_id = p.id
                 WHERE s.priority_id = $priority_id
                 AND s.is_active = 1;";

        $vResultado = $this->enlace->ExecuteSQL($vSql);

        return $vResultado;
    } catch (Exception $e) {
        handleException($e);
    }
}





}
