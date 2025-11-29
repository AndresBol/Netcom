<?php

class notification
{
    public function index()
    {
        try {
            $response = new Response();
            $notification = new NotificationModel();
            $result = $notification->all();
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }   

    public function getByUserId($userId)
    {
        try {
            $response = new Response();
            $notification = new NotificationModel();
            $result = $notification->getByUserId($userId);
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

            $notification = new NotificationModel();
            $result = $notification->insert($inputJson);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}