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

    public function getProjectTasks($id){
        try {

            $this->taskModel->setProject($id);
            $result = $this->taskModel->getProjectTasks();

            if ($result){
                $this->successResponse($result);
            } else {
                $this->errResponse('No tasks were found', 404);
            }

        } catch (Exception $e){
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }
}