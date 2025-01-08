<?php

class PermsController extends GenericController{
    private $perms;

    public function __construct(){
        $this->checkToken();
        $this->perms = new Permissions();
    }

    public function getAll(){
        $this->checkPermission('view_all_permissions'); 
        try {
            $perms = $this->perms->getAll();

            if ($perms){
                $this->successResponse($perms);
            } else {
                $this->errResponse( 'No permissions were found', 404);
            }

        } catch (Exception $e){
            $this->errResponse('An unexpected error occured');
        }
    }

    public function getById($id) {
        $this->checkPermission('view_permission');
        try {

            $this->perms->setId($id);
            $perms = $this->perms->getById();

            if ($perms){
                $this->successResponse($perms);
            } else {
                $this->errResponse('No role found', 404);
            }
        } catch (Exception $e){
            $this->errResponse('An unexpected error occured' . $e);
        }
    }
}