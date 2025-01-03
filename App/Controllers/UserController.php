<?php

class UserController extends GenericController {
    private PDO $db;

    private $userModel;

    public function __construct(){
        $this->db = Database::getConnection();
        $this->userModel = new User();
    }

    public function getUsers() {
        $this->isAdmin();

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

}