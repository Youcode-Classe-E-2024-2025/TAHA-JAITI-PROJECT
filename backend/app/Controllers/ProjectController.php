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
        $this->checkPermission('create_project');
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
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }

    public function update($id)
    {
        $this->checkPermission('update_project');
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
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }

    public function delete($id)
    {
        $this->checkPermission('delete_project');
        try {
            if (!isset($id) || empty($id) || !is_numeric($id)) {
                $this->errResponse('Project id is missing');
            }

            $this->projectModel->setId($id);

            $result = $this->projectModel->delete();

            if ($result) {
                $this->successResponse(null, 'Project deleted successfully');
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }

    public function getPublic()
    {
        try {

            $projects = $this->projectModel->getPublic();

            $this->successResponse($result ?? []);
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e);
        }
    }

    public function getById($id)
    {
        $this->checkPermission('view_project');
        try {

            $this->projectModel->setId($id);
            $result = $this->projectModel->getById();

            if ($result) {
                $this->successResponse($result);
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error has occured' . $e);
        }
    }

    public function getMe()
    {
        $user = $this->checkPermission('view_project');
        try {
            $userId = $user->sub;

            $result = $this->projectModel->getMe($userId);

            $this->successResponse($result ?? []);
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured:' . $e->getMessage());
        }
    }

    public function getUsers($id)
    {
        $this->checkPermission('view_project');
        try {
            if (!isset($id) || empty($id) || !is_numeric($id)) {
                $this->errResponse('Project id is missing');
            }

            $this->projectModel->setId($id);

            $result = $this->projectModel->getUsers();

            $this->successResponse($result ?? []);
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }

    public function assignUser()
    {
        $user = $this->checkPermission('create_project');
        try {
            $data = $this->getRequestData();

            if (empty($data->user_ids) || !is_array($data->user_ids)) {
                $this->errResponse('User id is missing/invalid');
            }

            $id = $this->projectModel->getLastId();

            if (!$id){
                $this->errResponse("Failed to get project id");
            }

            $this->projectModel->setId($id);

            $this->projectModel->setUserId($user->sub);
            $this->projectModel->assignUser($user->role === 1 ? 'chief' : 'manager');

            foreach ($data->user_ids as $userId) {
                $this->projectModel->setUserId($userId);
                if (!$this->projectModel->assignUser()) {
                    $this->errResponse("Failed to assign User Id {$userId}");
                }
            }


            $this->successResponse(null, 'users assigned');
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }
}
