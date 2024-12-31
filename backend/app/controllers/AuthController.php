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
            $this->errResponse('Error registering user');
        }
    }

    public function login(): void {
        

    }
}
