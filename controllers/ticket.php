<?php
class ticket
{
    public function index()
    {
        try {
            $response = new Response();
            //Obtain the Model listing
            $ticket = new TicketModel();
            $result = $ticket->all();
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
            $ticket = new TicketModel();
            $result = $ticket->get($id);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
    public function getAllTicketsByCategory($categoryId) {
        try {
            $response = new Response();
            $ticket = new TicketModel();
            $result = $ticket->getAllTicketsByCategory($categoryId);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
    public function getAllTicketsByPriority($priorityId) {
        try {
            $response = new Response();
            $ticket = new TicketModel();
            $result = $ticket->getAllTicketsByPriority($priorityId);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
    public function getAllTicketsByStatus($statusId) {
        try {
            $response = new Response();
            $ticket = new TicketModel();
            $result = $ticket->getAllTicketsByStatus($statusId);
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

            $ticket = new TicketModel();
            $result = $ticket->insert($inputJson);
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

            $ticket = new TicketModel();
            $result = $ticket->update($inputJson);
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
            $ticket = new TicketModel();
            $result = $ticket->delete($id);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
