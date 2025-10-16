<?php
class priority
{
    public function index()
    {
        try {
            $response = new Response();
            //Obtain the Model listing
            $priority = new PriorityModel();
            $result = $priority->all();
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
    public function get($id)
    {
        try {
            $response = new Response();
            $priority = new PriorityModel();
            $result = $priority->get($id);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
    public function post($object)
    {
        try {
            $response = new Response();
            $priority = new PriorityModel();
            $result = $priority->insert($object);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
    public function put($object)
    {
        try {
            $response = new Response();
            $priority = new PriorityModel();
            $result = $priority->update($object);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
    public function delete($id)
    {
        try {
            $response = new Response();
            $priority = new PriorityModel();
            $result = $priority->delete($id);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
