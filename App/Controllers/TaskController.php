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

            if (!empty($data->assignUsers) && is_array(($data->assignUsers))){
                foreach($data->assignUsers as $userId){
                    $this->taskModel->assignTask( intval($result),$userId);
                }
            }

            if ($result){
                $this->successResponse((int) $result ,'Task created succesfuly');
            }

            $this->errResponse('Failed to create task');
        } catch (Exception $e){
            $this->errResponse('An unexpected error occured' . $e);
        }
    }

    public function assignTask(){
        $this->isAdmin();
        try {
            $data = $this->getRequestData();

            if (!isset($data->task_id) || !isset($data->user_id)) {
                $this->errResponse('Task ID and User ID are required');
                return;
            }

            $result = $this->taskModel->assignTask((int) $data->task_id, (int) $data->user_id);

            if ($result){
                $this->successResponse($data, 'User assigned to task');
            } else {
                $this->errResponse('Failed to assign user');
            }

        } catch (Exception $e){
            $this->errResponse('An unexcpected error occurred:' . $e->getMessage());
        }
    }

    public function getAllTasks(){
        $this->isLoggedIn();
        try {
            if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
                $this->errResponse('Invalid or missing project ID');
                return;
            }
    
            $projectId = intval($_GET['id']);
    
            //project id for the query
            $tasks = $this->taskModel->getAllTasks($projectId);

            if ($tasks) {
                foreach ($tasks as &$task) {
                    $task['assignee_names'] = parseStringToArray($task['assignee_names']);
                    $task['tag_names'] = parseStringToArray($task['tag_names']);
                }
                $this->successResponse($tasks);
            } else {
                $this->successResponse(null,'No tasks found');
            }
        } catch (Exception $e){
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage());
        }
    }

    public function deleteTask(){
        $this->isAdmin();
        try {
            $data = $this->getRequestData();
            
            if (empty($data) || empty($data->task_id)){
                $this->errResponse('Empty data');
            }

            $result = $this->taskModel->deleteTask($data->task_id);

            if ($result){
                $this->successResponse($data, 'Task deleted successfully');
            } else {
                $this->errResponse('No task found');
            }

        } catch (Exception $e){
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage());
        }
    }
}