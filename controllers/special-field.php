<?php
class special_field
{
    public function index()
    {
        try {
            $response = new Response();
            //Obtain the Model listing
            $special_field = new SpecialFieldModel();
            $result = $special_field->all();
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
            $special_field = new SpecialFieldModel();
            $result = $special_field->get($id);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
    public function getAllSpecialFieldsByCategory($categoryId) {
        try {
            $response = new Response();
            $special_field = new SpecialFieldModel();
            $result = $special_field->getAllSpecialFieldsByCategory($categoryId);
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

            $special_field = new SpecialFieldModel();
            $result = $special_field->insert($inputJson);
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

            $special_field = new SpecialFieldModel();
            $result = $special_field->update($inputJson);
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
            $special_field = new SpecialFieldModel();
            $result = $special_field->delete($id);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
