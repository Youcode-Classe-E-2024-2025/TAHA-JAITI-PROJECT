<?php

class AuthController extends GenericController
{

    

    public function register(): void
    {
        try {
            $data = $this->getRequestData();

            $errors = Validator::validateUser($data);
            if (!empty($errors)) {
                $this->errResponse(implode(', ', $errors));
            }

            $hashPass = password_hash($data->password, PASSWORD_BCRYPT);

            $user = new User();
            $user->setEmail(str_secure($data->email));
            $user->setName(str_secure($data->name));
            $user->setPassword($hashPass);
            $user->setRole((string) $data->role);

            $userData = $user->register();

            if ($userData) {
                $this->successResponse($data, 'User registered succesfully');
            } else {
                $this->errResponse('A user with this email already exists');
            }
        } catch (Exception $e) {
            throw new Exception($e);
        }
    }

    public function login(): void {
        try {

            $data = $this->getRequestData();

            if (empty($data) || !isset($data->email, $data->password)) {
                $this->errResponse('Missing email or password');
                return;
            }
            

            $email = $data->email;
            $password = $data->password;

            $user = new User();
            $userObject = $user->getUserByEmail($email);

            if (!$userObject || !$user->login($userObject, $password)){
                $this->errResponse('Invalid password or email');
            }

            $this->startSession($userObject);

            unset($userObject->password);
            $this->successResponse($userObject, 'User logged in successfuly');

        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e);
        }
    }

    public function logout(): void {
        try {
            if (session_status() === PHP_SESSION_NONE) {
                session_start();
            }

            session_unset();
            if (ini_get("session.use_cookies")) {
                $params = session_get_cookie_params();
                setcookie(session_name(), '', time() - 42000, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
            }

            session_destroy();

            // Respond with success
            $this->successResponse(null, 'User logged out successfully');
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occurred while logging out: ' . $e->getMessage());
        }
    }
}