<?php

class ProjectController extends GenericController
{
    private $projectModel;

    public function __construct()
    {
        $this->projectModel = new Project();
    }

    public function createProject()
    {
        try {
            $data = $this->getRequestData();
            $errors = Validator::validateProject($data);

            if (!empty($errors)) {
                $this->errResponse(implode(', ', $errors));
            }

            $this->projectModel->setName(str_secure($data->name));
            $this->projectModel->setDesc(str_secure($data->description));
            $this->projectModel->setIsPublic((bool) $data->is_public);
            $this->projectModel->setDeadline(str_secure($data->deadline));
            $this->projectModel->setCreator($data->creator);

            $result = $this->projectModel->createProject();

            if (!empty($data->users)){
                foreach($data->users as $userId){
                    $this->projectModel->assignMember( intval($result),intval($userId));
                }
            }

            if ($result) {
                $this->successResponse($data, 'Project created successfully');
            } else {
                $this->errResponse('Failed to create the project');
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage());
        }
    }

    public function deleteProject(){
        try {
            $data = $this->getRequestData();
            
            if (empty($data) || empty($data->project_id)){
                $this->errResponse('Empty data');
            }

            $result = $this->projectModel->deleteProject($data->project_id);

            if ($result){
                $this->successResponse($data, 'Project deleted successfully');
            } else {
                $this->errResponse('Failed to delete the project');
            }

        } catch (Exception $e){
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage());
        }
    }

    public function getAllProjects(){
        try {

            $projects = $this->projectModel->getAllProjects();

            if ($projects){
                $this->successResponse($projects);
            } else {
                $this->errResponse('No projects found');
            }


        } catch (Exception $e){
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage());
        }
    }

    public function assignMember(){
        try {
            $data = $this->getRequestData();

            if (!isset($data->project_id) || !isset($data->user_id)) {
                $this->errResponse('Project ID and User ID are required');
                return;
            }

            $result = $this->projectModel->assignMember((int) $data->project_id, (int) $data->user_id);

            if ($result){
                $this->successResponse($data, "User assigned to project");
            } else {
                $this->errResponse('Failed to assign the user');
            }
        } catch (Exception $e){
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage());
        }
    }
}