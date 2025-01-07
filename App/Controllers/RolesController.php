<?php

class RolesController extends GenericController {
    private $roles;

    public function __construct(){
        $this->checkToken();
        $this->roles = new Roles();
    }

    public function create(){
        try {
            $data = $this->getRequestData();

            if (!isset($data->name) || empty($data->name) || strlen($data->name) < 3){
                $this->errResponse('Name is missing or too short');
            }

            $this->roles->setName($data->name);

            $result = $this->roles->create();

            if ($result) {
                $this->successResponse('Role created successfully');
            } else {
                $this->errResponse('There has been an error while creating the role');
            }

        } catch (Exception $e){
            $this->errResponse('An unexpected error occured' . $e);
        }
    }

    public function getAll() {
        try {

            $roles = $this->roles->getAll();

            if ($roles){
                $this->successResponse($roles);
            } else {
                $this->errResponse('No roles found', 401);
            }
        } catch (Exception $e){
            $this->errResponse('An unexpected error occured' . $e);
        }
    }

    public function getById($id) {
        try {

            $this->roles->setId($id);
            $roles = $this->roles->getById();

            if ($roles){
                $this->successResponse($roles);
            } else {
                $this->errResponse('No role found', 401);
            }
        } catch (Exception $e){
            $this->errResponse('An unexpected error occured' . $e);
        }
    }
}