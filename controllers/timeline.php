<?php
class timeline
{
    public function index()
    {
        try {
            $response = new Response();
            //Obtain the Model listing
            $timeline = new TimelineModel();
            $result = $timeline->all();
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
            $timeline = new TimelineModel();
            $result = $timeline->get($id);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
    public function getAllByTicketId($ticketId) {
        try {
            $response = new Response();
            $timeline = new TimelineModel();
            $result = $timeline->getAllByTicketId($ticketId);
            //Give an response
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

            $timeline = new TimelineModel();
            $result = $timeline->insert($inputJson);
            //Give an response
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

            $timeline = new TimelineModel();
            $result = $timeline->update($inputJson);
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
            $timeline = new TimelineModel();
            $result = $timeline->delete($id);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
