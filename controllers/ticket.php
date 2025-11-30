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
    public function getAllTicketsByStatusName($statusName) {
        try {
            $response = new Response();
            $ticket = new TicketModel();
            $result = $ticket->getAllTicketsByStatusName($statusName);
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
            $oldTicket = $ticket->get($inputJson->id);
            $result = $ticket->update($inputJson);

            // Log changes to timeline
            $changes = [];
            $fields = ['status_id', 'category_id', 'priority_id', 'label_id', 'title', 'description', 'notification_status', 'rating', 'comment'];
            foreach ($fields as $field) {
                if (isset($inputJson->$field) && (!isset($oldTicket->$field) || $oldTicket->$field != $inputJson->$field)) {
                    $oldValue = isset($oldTicket->$field) ? $oldTicket->$field : 'null';
                    $newValue = $inputJson->$field;
                    $changes[] = "$field: $oldValue -> $newValue";
                }
            }

            if (!empty($changes) && isset($inputJson->user_id)) {
                $timelineModel = new TimelineModel();
                $timelineData = (object) [
                    'ticket_id' => $inputJson->id,
                    'user_id' => $inputJson->user_id,
                    'subject' => 'Change made',
                    'description' => implode(", ", $changes)
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
            $ticket = new TicketModel();
            $result = $ticket->delete($id);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
