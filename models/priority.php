<?php
class Priority
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
			$vSql = "SELECT * FROM priority where is_active=1;";
			
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
			$vSql = "SELECT * FROM priority where id=$id;";
			
            //query execution
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			//return the object
			return $vResultado[0];
		} catch (Exception $e) {
            handleException($e);
        }
    }
    /*Insert */
    public function insert($objeto) {
        try {
            //sql query
            $vSql = "Insert into priority (name, is_active) Values ('$objeto->name', 1);";
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
			$vSql = "Update priority SET name ='$objeto->name' Where id=$objeto->id;";
			
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
            $vSql = "Update priority SET is_active=0 Where id=$id;";
            //query execution
            $vResultado = $this->enlace->executeSQL_DML( $vSql);
            //return the object
            return $this->get($id);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
