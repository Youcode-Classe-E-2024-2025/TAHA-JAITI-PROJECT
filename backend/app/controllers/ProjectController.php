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
        $this->isAdmin();

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
            $this->projectModel->setCreator($_SESSION['user_id']);

            $result = $this->projectModel->createProject();

            if ($result) {
                $this->successResponse($data, 'Project created successfully');
            } else {
                $this->errResponse('Failed to create the project');
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage());
        }
    }
}