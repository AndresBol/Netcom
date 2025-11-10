<?php
class user
{
    public function index()
    {
        try {
            $response = new Response();
            //Obtain the Model listing
            $user = new UserModel();
            $result = $user->all();
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
            $user = new UserModel();
            $result = $user->get($id);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
    public function getUserByEmail($email) {
        try {
            $response = new Response();
            $user = new UserModel();
            $result = $user->getUserByEmail($email);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function login()
    {
        try {
            session_start();
            $request = new Request();
            $response = new Response();

            $inputJson = $request->getJSON();
            $email = $inputJson->email ?? null;
            $password = $inputJson->password ?? null;

            $userModel = new UserModel();
            $user = $userModel->validateLogin($email, $password);

            if ($user) {
                $_SESSION['user_id'] = $user->id;
                $_SESSION['user_name'] = $user->name;
                $_SESSION['role'] = $user->role_name;

                $response->toJSON([
                    "success" => true,
                    "message" => "Login successful",
                    "user" => [
                        "id" => $user->id,
                        "name" => $user->name,
                        "role" => $user->role_name
                    ]
                ]);
            } else {
                $response->toJSON([
                    "success" => false,
                    "message" => "Invalid email or password"
                ]);
            }
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function logout()
    {
        try {
            session_start();
            $response = new Response();

            session_unset();
            session_destroy();

            $response->toJSON([
                "sucess" => true,
                "message" => "Logout sucessful"
            ]);
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

            $user = new UserModel();
            $result = $user->insert($inputJson);
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

            $user = new UserModel();
            $result = $user->update($inputJson);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
    public function updateLastLogin($id)
    {
        try {
            $response = new Response();
            $user = new UserModel();
            $result = $user->updateLastLogin($id);
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
            $user = new UserModel();
            $result = $user->delete($id);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
