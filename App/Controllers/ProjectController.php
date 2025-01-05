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

            $ispublic = $data->is_public === 'true' ? true : false;

            $this->projectModel->setName(str_secure($data->name));
            $this->projectModel->setDesc(str_secure($data->description));
            $this->projectModel->setIsPublic($ispublic);
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
        $this->isAdmin();
        try {
            $param = str_secure($_GET['p']);
            $sqlCondition = '';
            $params = [];
    
            if ($param === 'public') {
                $sqlCondition = 'is_public = true';
            } else {
                if (!isset($_SESSION['user_id'])) {
                    $sqlCondition = 'is_public = true';
                } else {
                    $creatorId = $_SESSION['user_id'];
                    $sqlCondition = 'creator_id = :creator_id';
                    $params['creator_id'] = $creatorId;
                }
            }
    
            $projects = $this->projectModel->getAllProjects($sqlCondition, $params);
    
            if ($projects) {
                $this->successResponse($projects);
            } else {
                $this->errResponse('No projects found.');
            }
        } catch (Exception $e) {
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