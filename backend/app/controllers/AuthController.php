<?php

class AuthController extends GenericController
{

    public function startSession(string $id): void
    {
        session_start();
        $_SESSION['user_id'] = $id;
        setcookie('SESSION_ID', session_id(), time() + 3600, '/');
    }

    public function register(): void
    {
        try {
            $data = $this->getRequestData();

            $errors = UserValidator::validate($data);
            if (!empty($errors)) {
                $this->errResponse(implode(', ', $errors));
            }

            $hashPass = password_hash($data->password, PASSWORD_BCRYPT);

            $user = new User();
            $user->setEmail(str_secure($data->email));
            $user->setName(str_secure($data->name));
            $user->setPassword($hashPass);

            $userId = $user->register();

            if ($userId) {
                $this->startSession($userId);

                $this->successResponse($data, 'User registered succesfully');
            } else {
                $this->errResponse('A user with this email already exists');
            }
        } catch (Exception $e) {
            $this->errResponse('An unexcpeted error occured');
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

            if (!$user->login($userObject, $password)){
                $this->errResponse('Invalid password or email');
            }

            $this->startSession($userObject->id);

            $this->successResponse($userObject, 'User logged in successfuly');

        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e);
        }
    }
}