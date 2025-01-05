<?php

class UserController extends GenericController {
    private $userModel;

    public function __construct(){
        $this->userModel = new User();
    }

    public function getUsers() {
        try {

            $users = $this->userModel->getUsers();

            if ($users){
                $this->successResponse($users);
            } else {
                $this->errResponse('No users found');
            }

        } catch (Exception $e){
            $this->errResponse('An unexpected error occured' . $e);
        }
    }

    public function getProjectUsers() {
        try {

            $id = $_GET['id'];

            $users = $this->userModel->getProjectUsers(intval($id));

            if ($users){
                $this->successResponse($users);
            }
        } catch (Exception $e){
            $this->errResponse('An unexpected error occured' . $e);
        }
    }

    public function getProjectStats() {
        $this->isAdmin();
        try {

            $tasks = $this->userModel->getProjectStats();

            $taskStats = [
                'completed' => 0,
                'in_progress' => 0,
                'pending' => 0
            ];

            foreach ($tasks as $task) {
                if ($task['status'] == 'completed') {
                    $taskStats['completed'] = $task['task_count'];
                } elseif ($task['status'] == 'in_progress') {
                    $taskStats['in_progress'] = $task['task_count'];
                } else {
                    $taskStats['pending'] = $task['task_count'];
                }
            }

            $this->successResponse($taskStats);
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage());
        }
    }

}