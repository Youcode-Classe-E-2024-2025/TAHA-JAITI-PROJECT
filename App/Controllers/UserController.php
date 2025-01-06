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
    
}