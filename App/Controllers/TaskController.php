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
        $this->checkPermission('create_task');
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

    public function update($id)
    {
        $this->checkPermission('update_task');
        try {
            $data = $this->getRequestData();

            $errors = Validator::validateTask($data);
            if (!empty($errors)) {
                $this->errResponse(implode(', ', $errors));
            }

            $this->taskModel->setId($id);
            $this->taskModel->setTitle($data->title);
            $this->taskModel->setDesc($data->description);
            $this->taskModel->setDeadline($data->deadline);
            $this->taskModel->setStatus($data->status);
            $this->taskModel->setCategory($data->category_id);

            $result = $this->taskModel->update();
            if ($result) {
                $this->successResponse(null, 'Task updated');
            } else {
                $this->errResponse('Failed to update task');
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }

    public function delete($id)
    {
        $this->checkPermission('delete_task');
        try {
            if (!isset($id) || empty($id) || !is_numeric($id)) {
                $this->errResponse('Task id is missing');
            }

            $this->taskModel->setId($id);

            $result = $this->taskModel->delete();

            if ($result) {
                $this->successResponse(null, 'Task deleted successfully');
            } else {
                $this->errResponse('There has been an error while deleting the task');
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }

    public function getAll()
    {
        $this->checkPermission('view_all_tasks');
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
        $this->checkPermission('view_all_tasks');
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
        $this->checkPermission('view_task');
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

    public function assignTag($id)
    {
        $this->checkPermission('assign_task_tag');
        try {
            $data = $this->getRequestData();

            if (empty($data->tag_id) || !is_array($data->tag_id)) {
                $this->errResponse('Tag id is missing/invalid');
            }

            $this->taskModel->setId($id);

            foreach ($data->tag_id as $tagId) {
                if (!$this->taskModel->assignTag($tagId)) {
                    $this->errResponse("Failed to assign tag ID: {$tagId}");
                }
            }

            $this->successResponse(null, "All tags assigned successfully");
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }

    public function clearTags($id)
    {
        $this->checkPermission('clear_task_tag');
        try {
            $this->taskModel->setId($id);
            $result = $this->taskModel->clearTag();

            if ($result) {
                $this->successResponse(null, "Tags cleared");
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }

    public function assignCat($id)
    {
        $this->checkPermission('assign_task_category');
        try {
            $data = $this->getRequestData();

            if (empty($data->cat_id) || !is_numeric($data->cat_id)) {
                $this->errResponse('Category id is missing');
            }

            $this->taskModel->setId($id);
            $result = $this->taskModel->assignTag($data->cat_id);

            if ($result) {
                $this->successResponse(null, "Category assigned");
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }

    public function assginUser($id)
    {
        $this->checkPermission('assign_task_user');
        try {
            $data = $this->getRequestData();

            if (empty($data->user_id) || !is_array($data->user_id)) {
                $this->errResponse('User id is missing/invalid');
            }

            $this->taskModel->setId($id);

            foreach ($data->user_id as $userId) {
                if (!$this->taskModel->assignUser($userId)) {
                    $this->errResponse("Failed to assign User ID: {$userId}");
                }
            }

            $this->successResponse(null, "All users assigned successfully");
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }

    public function clearUser($id)
    {
        $this->checkPermission('clear_task_user');
        try {
            $this->taskModel->setId($id);
            $result = $this->taskModel->clearUser();

            if ($result) {
                $this->successResponse(null, "Users cleared");
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }
}
