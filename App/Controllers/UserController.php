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
                $this->errResponse('No users found');
            }

        } catch (Exception $e){
            $this->errResponse('An unexpected error occured' . $e);
        }
    }

    
}