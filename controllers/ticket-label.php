<?php
class ticket_label
{
    public function index()
    {
        try {
            $response = new Response();
            //Obtain the Model listing
            $ticketLabel = new TicketLabelModel();
            $result = $ticketLabel->all();
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
            $ticketLabel = new TicketLabelModel();
            $result = $ticketLabel->get($id);
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

            $ticketLabel = new TicketLabelModel();
            $result = $ticketLabel->insert($inputJson);
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

            $ticketLabel = new TicketLabelModel();
            $result = $ticketLabel->update($inputJson);
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
            $ticketLabel = new TicketLabelModel();
            $result = $ticketLabel->delete($id);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
