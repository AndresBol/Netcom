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

    public function markAsRead($notificationId = null)
    {
        try {
            $response = new Response();
            $notification = new NotificationModel();
            if ($notificationId === null) {
                $request = new Request();
                $inputJson = $request->getJSON();
                $notificationId = $inputJson->notificationId ?? $inputJson->id ?? null;
            }

            if (!$notificationId) {
                throw new Exception('Notification ID is required');
            }

            $result = $notification->markAsRead($notificationId);
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function markAllAsRead($userId = null)
    {
        try {
            $response = new Response();
            $notification = new NotificationModel();
            if ($userId === null) {
                $request = new Request();
                $inputJson = $request->getJSON();
                $userId = $inputJson->userId ?? $inputJson->id ?? null;
            }

            if (!$userId) {
                throw new Exception('User ID is required');
            }

            $result = $notification->markAllAsReadByUserId($userId);
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}