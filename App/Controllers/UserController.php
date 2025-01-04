<?php

class UserController extends GenericController {
    private $userModel;

    public function __construct(){
        $this->userModel = new User();
    }

    public function getUsers() {
        try {

            $users = $this->userModel->getUsers();

            if ($users){
                $this->successResponse($users);
            } else {
                $this->errResponse('No users found');
            }

        } catch (Exception $e){
            $this->errResponse('An unexpected error occured' . $e);
        }
    }

    public function getProjectUsers() {
        try {

            $id = $_GET['id'];

            $users = $this->userModel->getProjectUsers(intval($id));

            if ($users){
                $this->successResponse($users);
            }
        } catch (Exception $e){
            $this->errResponse('An unexpected error occured' . $e);
        }
    }

}