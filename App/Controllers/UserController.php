<?php

class UserController extends GenericController {
    private $userModel;

    public function __construct(){
        $this->userModel = new User();
    }

    public function getAll() {
        $this->checkToken();
        try {

            $users = $this->userModel->getAllUsers();

            if ($users){
                $this->successResponse($users);
            } else {
                $this->errResponse('No users found', 401);
            }

        } catch (Exception $e){
            $this->errResponse('An unexpected error occured' . $e);
        }
    }

    public function getById($id){
        $this->checkToken();
        try {

            $this->userModel->setId($id);
            $user = $this->userModel->getById();

            if ($user){
                $this->successResponse($user);
            } else {
                $this->errResponse('No users found', 401);
            }

        } catch (Exception $e){
            $this->errResponse('An unexpected error occured' . $e);
        }
    }
    
    public function create(){
        $this->checkToken();
        try {
            $data = $this->getRequestData();
            
            $errors = Validator::validateUser($data);
            if (!empty($errors)) {
                $this->errResponse(implode(', ', $errors));
            }
    
            $hashPass = password_hash($data->password, PASSWORD_BCRYPT);
    
            $this->userModel->setEmail($data->email);
            $this->userModel->setPassword($hashPass);
            $this->userModel->setName($data->name);
            
            $result = $this->userModel->create();
    
            if ($result) {
                $this->successResponse(null, 'User registered successfully');
            } else {
                $this->errResponse('A user with this email already exists', 409);
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage(), 500);
        }
    }
}