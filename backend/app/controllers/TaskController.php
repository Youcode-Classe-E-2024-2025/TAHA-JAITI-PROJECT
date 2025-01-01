<?php

class TaskController extends GenericController{

    private $taskModel;

    public function __construct()
    {
        $this->taskModel = new Task();
    }

    public function createTask(){
        $this->isAdmin();

        try {
            $data = $this->getRequestData();
            $erros = Validator::validateTask($data);

            if (!empty($erros)){
                $this->errResponse(implode(', ', $erros));
            }

            $this->taskModel->setTitle($data->title);
            $this->taskModel->setDesc($data->description);
            $this->taskModel->setStatus($data->status);
            $this->taskModel->setDeadline($data->deadline);
            $this->taskModel->setProject($data->project_id);

            if (!empty($data->category_id)){
                $this->taskModel->setCategory($data->category_id);
            }

            $result = $this->taskModel->createTask();

            if ($result){
                $this->successResponse((int) $result ,'Task created succesfuly');
            }

            $this->errResponse('Failed to create task');
        } catch (Exception $e){
            $this->errResponse('An unexpected error occured' . $e);
        }
    }

}