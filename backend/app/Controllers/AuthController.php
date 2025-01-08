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

            $result = $user->create();

            if ($result) {
                $this->successResponse(null, 'User registered succesfully');
            } else {
                $this->errResponse('A user with this email already exists');
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e);
        }
    }

    public function login(): void
    {
        try {
            $data = $this->getRequestData();

            if (empty($data) || !isset($data->email, $data->password)) {
                $this->errResponse('Missing email or password');
                return;
            }

            $email = $data->email;
            $password = $data->password;

            $user = new User();
            $user->setEmail($email);
            $user->setPassword($password);
            $result = $user->getUserByEmail();

            if (!$result || !$user->login($result)) {
                $this->errResponse('Invalid email or password');
            }

            $token = JWToken::genJWT($result);

            $auth = new Auth();
            $auth->getUserPerms($result);

            $this->successResponse(['token' => $token], 'User logged in successfully');
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e);
        }
    }

    public function getMe()
    {
        try {
            $data = $this->checkToken();

            $user = new User();
            $user->setId(intval($data->sub));
            $user = $user->getById();

            if ($user) {
                unset($user->password);
                $this->successResponse($user);
            } else {
                $this->errResponse('User not found', 404);
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage(), 500);
        }
    }
}
