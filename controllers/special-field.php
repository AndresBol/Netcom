<?php
class specialField
{
    public function index()
    {
        try {
            $response = new Response();
            //Obtain the Model listing
            $specialField = new SpecialFieldModel();
            $result = $specialField->all();
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
            $specialField = new SpecialFieldModel();
            $result = $specialField->get($id);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
    public function getAllSpecialFieldsByCategory($categoryId) {
        try {
            $response = new Response();
            $specialField = new SpecialFieldModel();
            $result = $specialField->getAllSpecialFieldsByCategory($categoryId);
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

            $specialField = new SpecialFieldModel();
            $result = $specialField->insert($inputJson);
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

            $specialField = new SpecialFieldModel();
            $result = $specialField->update($inputJson);
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
            $specialField = new SpecialFieldModel();
            $result = $specialField->delete($id);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
