<?php

class TaskController extends GenericController{

    private $taskModel;

    public function __construct()
    {
        $this->taskModel = new Task();
    }

    public function getAll(){
        try {

            $result = $this->taskModel->getAll();

            if ($result){
                $this->successResponse($result);
            } else {
                $this->errResponse('No tasks were found', 404);
            }

        } catch (Exception $e){
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }

    public function getByProject($id){
        try {

            $this->taskModel->setProject($id);
            $result = $this->taskModel->getByProject();

            if ($result){
                $this->successResponse($result);
            } else {
                $this->errResponse('No tasks were found', 404);
            }

        } catch (Exception $e){
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }

    public function getById($id){
        try {

            $this->taskModel->setId($id);
            $result = $this->taskModel->getById();

            if ($result){
                $this->successResponse($result);
            } else {
                $this->errResponse('No task was found', 404);
            }

        } catch (Exception $e){
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }
}