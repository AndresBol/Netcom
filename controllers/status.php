<?php
class status
{
    public function index()
    {
        try {
            $response = new Response();
            //Obtain the Model listing
            $status = new StatusModel();
            $result = $status->all();
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
            $status = new StatusModel();
            $result = $status->get($id);
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
            $status = new StatusModel();
            $result = $status->insert($object);
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
            $status = new StatusModel();
            $result = $status->update($object);
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
            $status = new StatusModel();
            $result = $status->delete($id);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
