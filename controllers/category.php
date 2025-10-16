<?php
class category
{
    public function index()
    {
        try {
            $response = new Response();
            //Obtain the Model listing
            $category = new CategoryModel();
            $result = $category->all();
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
            $category = new CategoryModel();
            $result = $category->get($id);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
    public function post($object)
    {
        try {
            $response = new Response();
            $category = new CategoryModel();
            $result = $category->insert($object);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
    public function put($object)
    {
        try {
            $response = new Response();
            $category = new CategoryModel();
            $result = $category->update($object);
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
            $category = new CategoryModel();
            $result = $category->delete($id);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
