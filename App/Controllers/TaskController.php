<?php

class TaskController extends GenericController{

    private $taskModel;

    public function __construct()
    {
        $this->taskModel = new Task();
    }

    public function createTask(){
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

            if (!empty($data->assignees) && is_array($data->assignees)){
                foreach($data->assignees as $userId){
                    $this->taskModel->assignTask( intval($result),intval($userId));
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
        try {
            
            $id = $_GET['id'];

            $result = $this->taskModel->deleteTask(intval($id));

            if ($result){
                $this->successResponse(null, 'Task deleted successfully');
            } else {
                $this->errResponse('No task found');
            }

        } catch (Exception $e){
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage());
        }
    }

    public function updateStatus(){
        try {
            $data = $this->getRequestData();

            $id = $_GET['id'];

            if (!isset($data->status)){
                $this->errResponse('status is required');
            }

            $result = $this->taskModel->updateStatus($id, $data->status);

            if ($result){
                $this->successResponse($data, 'Task status updated');
            } else {
                $this->errResponse('Failed to update task status');
            }

        } catch (Exception $e){
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage());
        }
    }

    public function updateTask() {
        try {
            $data = $this->getRequestData();
            $erros = Validator::validateTask($data);

            if (!empty($erros)){
                $this->errResponse(implode(', ', $erros));
            }

            $this->taskModel->setId(intval($data->id));
            $this->taskModel->setTitle($data->title);
            $this->taskModel->setDesc($data->description);
            $this->taskModel->setStatus($data->status);
            $this->taskModel->setDeadline($data->deadline);

            if (!empty($data->category_id)){
                $this->taskModel->setCategory($data->category_id);
            }

            $result = $this->taskModel->updateTask();

            if (!empty($data->assignees) && is_array($data->assignees)){
                $this->taskModel->unassignUsers(intval($data->id));
                foreach($data->assignees as $userId){
                    $this->taskModel->assignTask( intval($data->id),intval($userId));
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
}