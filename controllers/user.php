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
    public function getUserByEmail($email)
    {
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

    public function getByRoleName($roleName)
    {
        try {
            $response = new Response();
            $user = new UserModel();
            $result = $user->getByRoleName($roleName);
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function login()
    {
        try {
            $request = new Request();
            $response = new Response();
            $inputJson = $request->getJSON();

            $email = $inputJson->email ?? null;
            $password = $inputJson->password ?? null;

            $userModel = new UserModel();
            $user = $userModel->validateLogin($email, $password);

            if ($user) {

                $payload = [
                    'id' => $user->id,
                    'name' => $user->name,
                    'role' => $user->role,
                    'iat' => time(),
                    'exp' => time() + 3600
                ];

                $jwt = \Firebase\JWT\JWT::encode($payload, Config::get('SECRET_KEY'), 'HS256');

                $response->toJSON([
                    "success" => true,
                    "token" => $jwt,
                    "user" => [
                        "id" => $user->id,
                        "name" => $user->name,
                        "role" => $user->role
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
        $response = new Response();
        $response->toJSON([
            "success" => true,
            "message" => "Logout successful"
        ]);
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

    public function getTechniciansWorkload()
    {
        try {
            $response = new Response();
            $user = new UserModel();
            $result = $user->getTechniciansWorkload();
            //Give an response
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
