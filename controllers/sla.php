<?php
class sla
{

    public function index()
    {
        try {
            $response = new Response();
            $sla = new SlaModel();
            $result = $sla->all();

            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function get($id)
    {
        try {
            $response = new Response();
            $sla = new SlaModel();
            $result = $sla->get($id);

            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function getByCategory($categoryId)
    {
        try {
            $response = new Response();
            $sla = new SlaModel();
            $result = $sla->getByCategory($categoryId);

            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function getByPriority($priorityId)
    {
        try {
            $response = new Response();
            $sla = new SlaModel();
            $result = $sla->getByPriority($priorityId);

            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }



    public function post()
    {
        try {
            $request = new Request();
            $response = new Response();

            $inputJson = $request->getJSON();

            $sla = new SlaModel();
            $result = $sla->insert($inputJson);

            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function put()
    {
        try {
            $request = new Request();
            $response = new Response();

            $inputJson = $request->getJSON();

            $sla = new SlaModel();
            $result = $sla->update($inputJson);

            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function delete($id)
    {
        try {
            $response = new Response();
            $sla = new SlaModel();
            $result = $sla->delete($id);

            // Give a response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
