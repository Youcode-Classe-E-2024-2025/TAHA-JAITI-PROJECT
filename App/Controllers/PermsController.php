<?php

class PermsController extends GenericController{
    private $perms;

    public function __construct(){
        $this->checkToken();
        $this->perms = new Permissions();
    }

    public function getAll(){
        try {
            $perms = $this->perms->getAll();

            if ($perms){
                $this->successResponse($perms);
            } else {
                $this->successResponse(null, 'No permissions were found');
            }

        } catch (Exception $e){
            $this->errResponse('An unexpected error occured');
        }
    }
}