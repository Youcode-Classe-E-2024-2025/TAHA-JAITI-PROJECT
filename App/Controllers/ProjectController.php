<?php

class ProjectController extends GenericController
{
    private $projectModel;

    public function __construct()
    {
        $this->projectModel = new Project();
    }

    public function create()
    {
        $user = $this->checkToken();
        try {
            $data = $this->getRequestData();

            $errors = Validator::validateProject($data);
            if (!empty($errors)) {
                $this->errResponse(implode(', ', $errors));
            }

            $this->projectModel->setName($data->name);
            $this->projectModel->setDesc($data->description);
            $this->projectModel->setDeadline($data->deadline);
            $this->projectModel->setIsPublic($data->visibility);
            $this->projectModel->setCreator($user->sub);

            $result = $this->projectModel->create();
            if ($result) {
                $this->successResponse(null, 'Project created');
            } else {
                $this->errResponse('Failed to create project');
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }

    public function update($id)
    {
        $this->checkToken();
        try {
            $data = $this->getRequestData();

            $errors = Validator::validateProject($data);
            if (!empty($errors)) {
                $this->errResponse(implode(', ', $errors));
            }

            $this->projectModel->setName($data->name);
            $this->projectModel->setDesc($data->description);
            $this->projectModel->setDeadline($data->deadline);
            $this->projectModel->setIsPublic($data->visibility);
            $this->projectModel->setId($id);

            $result = $this->projectModel->update();
            if ($result) {
                $this->successResponse(null, 'Project updated');
            } else {
                $this->errResponse('Failed to update project');
            }

        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }

    public function getPublic()
    {
        try {

            $projects = $this->projectModel->getPublic();

            if ($projects) {
                $this->successResponse($projects);
            } else {
                $this->errResponse('No public projects were found', 404);
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e);
        }
    }

    public function getById($id)
    {
        $this->checkToken();
        try {

            $this->projectModel->setId($id);
            $result = $this->projectModel->getById();

            if ($result) {
                $this->successResponse($result);
            } else {
                $this->errResponse('No project was found', 404);
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error has occured' . $e);
        }
    }

    public function getMe()
    {
        $user = $this->checkToken();
        try {
            $userId = $user->sub;

            $result = $this->projectModel->getMe($userId);

            if ($result) {
                $this->successResponse($result);
            } else {
                $this->errResponse('No assigned projects were found', 404);
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured:' . $e->getMessage());
        }
    }
}
