<?php

class UserController extends GenericController {
    private PDO $db;

    public function __construct(){
        $this->db = Database::getConnection();
    }

    public function register(): void {
        $data = $this->getRequestData();

        $errors = UserValidator::validate($data);

        if (!empty($errors)){
            $this->errResponse(implode(', ', $errors));
        }

        $user = new User($this->db);
        $user->setEmail(str_secure($data->email));
        $user->setName(str_secure($data->name));
        $user->setPassword(str_secure($data->name));

        if ($user->register()){
            $this->successResponse($data, 'User registered succesfully');
        } else {
            $this->errResponse('Error registering user');
        }
    }
}