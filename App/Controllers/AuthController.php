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
            $user->setName(str_secure($data->name));
            $user->setEmail(str_secure($data->email));
            $user->setPassword($hashPass);
            $user->setRole(intval($data->role));

            $result = $user->register();

            if ($result) {
                $this->successResponse(null, 'User registered succesfully');
            } else {
                $this->errResponse('A user with this email already exists');
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e);
        }
    }

    // public function login(): void {
    //     try {

    //         $data = $this->getRequestData();

    //         if (empty($data) || !isset($data->email, $data->password)) {
    //             $this->errResponse('Missing email or password');
    //             return;
    //         }
            

    //         $email = $data->email;
    //         $password = $data->password;

    //         $user = new User();
    //         $userObject = $user->getUserByEmail($email);

    //         if (!$userObject || !$user->login($userObject, $password)){
    //             $this->errResponse('Invalid password or email');
    //         }

    //         unset($userObject->password);
    //         $this->startSession($userObject);

    //         $this->successResponse($userObject, 'User logged in successfuly');
    //     } catch (Exception $e) {
    //         $this->errResponse('An unexpected error occured' . $e);
    //     }
    // }

    // public function logout(): void {
    //     try {
    //         if (session_status() === PHP_SESSION_NONE) {
    //             session_start();
    //         }
    
    //         $_SESSION = [];
    
    //         if (ini_get("session.use_cookies")) {
    //             $params = session_get_cookie_params();
    //             setcookie(
    //                 session_name(), 
    //                 '', 
    //                 time() - 42000, 
    //                 $params["path"], 
    //                 $params["domain"], 
    //                 $params["secure"], 
    //                 $params["httponly"]
    //             );
    //         }
    
    //         session_destroy();
    
    //         $this->successResponse(null, 'User logged out successfully');
    //     } catch (Exception $e) {
    //         $this->errResponse('An error occurred while logging out. Please try again.');
    //     }
    // }
}