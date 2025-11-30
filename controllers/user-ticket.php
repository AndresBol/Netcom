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
            if (!isset($inputJson->user_id) || !isset($inputJson->ticket_id) || !isset($inputJson->assigned_by)) {
                throw new Exception("Missing required fields: user_id, ticket_id, assigned_by");
            }

            $userTicket = new UserTicketModel();
            $result = $userTicket->insert($inputJson);

            // Insert timeline entry if assigned_by is provided
            if (isset($inputJson->assigned_by) && $inputJson->assigned_by) {
                $userModel = new UserModel();
                $assignedUser = $userModel->get($inputJson->user_id);
                if (!$assignedUser) {
                    throw new Exception("Assigned user not found");
                }

                $timelineModel = new TimelineModel();
                $timelineData = (object) [
                    'ticket_id' => $inputJson->ticket_id,
                    'user_id' => $inputJson->assigned_by,
                    'subject' => 'Ticket assignation',
                    'description' => 'Ticket assignated to ' . $assignedUser->name
                ];
                $timelineModel->insert($timelineData);
            }

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
