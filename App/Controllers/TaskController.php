<?php

class TaskController extends GenericController
{

    private $taskModel;

    public function __construct()
    {
        $this->taskModel = new Task();
    }

    public function create()
    {
        $this->checkToken();
        try {
            $data = $this->getRequestData();

            $errors = Validator::validateTask($data);
            if (!empty($errors)) {
                $this->errResponse(implode(', ', $errors));
            }

            $this->taskModel->setTitle($data->title);
            $this->taskModel->setDesc($data->description);
            $this->taskModel->setDeadline($data->deadline);
            $this->taskModel->setStatus($data->status);
            $this->taskModel->setCategory($data->category_id);
            $this->taskModel->setProject($data->project_id);

            $result = $this->taskModel->create();
            if ($result) {
                $this->successResponse(null, 'Task created');
            } else {
                $this->errResponse('Failed to create task');
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }

    public function getAll()
    {
        try {

            $result = $this->taskModel->getAll();

            if ($result) {
                $this->successResponse($result);
            } else {
                $this->errResponse('No tasks were found', 404);
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }

    public function getByProject($id)
    {
        try {

            $this->taskModel->setProject($id);
            $result = $this->taskModel->getByProject();

            if ($result) {
                $this->successResponse($result);
            } else {
                $this->errResponse('No tasks were found', 404);
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }

    public function getById($id)
    {
        try {

            $this->taskModel->setId($id);
            $result = $this->taskModel->getById();

            if ($result) {
                $this->successResponse($result);
            } else {
                $this->errResponse('No task was found', 404);
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }
}
