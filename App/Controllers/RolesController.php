<?php

class RolesController extends GenericController {
    private $roles;

    public function __construct(){
        $this->checkToken();
        $this->roles = new Roles();
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
}