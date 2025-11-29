<?php
class user_ticket
{
    public function index()
    {
        try {
            $response = new Response();
            $userTicket = new UserTicketModel();
            $result = $userTicket->all();
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
            $userTicket = new UserTicketModel();
            $result = $userTicket->get($id);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
    public function getByUserId($userId)
    {
        try {
            $response = new Response();
            $userTicket = new UserTicketModel();
            $result = $userTicket->getByUserId($userId);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
    public function getByTicketId($ticketId)
    {
        try {
            $response = new Response();
            $userTicket = new UserTicketModel();
            $result = $userTicket->getByTicketId($ticketId);
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

            // Validate required fields
            if (!isset($inputJson->user_id) || !isset($inputJson->ticket_id)) {
                throw new Exception("Missing required fields: user_id, ticket_id");
            }

            $userTicket = new UserTicketModel();
            $result = $userTicket->insert($inputJson);
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
            $userTicket = new UserTicketModel();
            $result = $userTicket->delete($id);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
    public function deleteByUserId($userId)
    {
        try {
            $response = new Response();
            $userTicket = new UserTicketModel();
            $result = $userTicket->deleteByUserId($userId);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
