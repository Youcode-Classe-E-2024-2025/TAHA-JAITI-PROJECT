<?php

class TaskController extends GenericController
{
    private $taskModel;
    private $activityLog;

    public function __construct()
    {
        $this->taskModel = new Task();
        $this->activityLog = new ActivityLog();
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
                $this->activityLog->logActivity(
                    $data->project_id,
                    $this->checkToken()->sub,
                    'Task Created',
                    "Task ID: $result, Title: {$data->title}"
                );

                $this->successResponse(null, 'Task created');
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage());
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
                $this->activityLog->logActivity(
                    $this->taskModel->getByProject(),
                    $this->checkToken()->sub,
                    'Task Updated',
                    "Task ID: $id, Title: {$data->title}, Status: {$data->status}"
                );

                $this->successResponse(null, 'Task updated');
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage());
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

            $task = $this->taskModel->getById();
            if (!$task) {
                $this->errResponse('Task not found');
                return;
            }

            $result = $this->taskModel->delete();
            if ($result) {
                $this->activityLog->logActivity(
                    $task->project_id,
                    $this->checkToken()->sub,
                    'Task Deleted',
                    "Task ID: $id, Title: {$task->title}"
                );

                $this->successResponse(null, 'Task deleted successfully');
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage());
        }
    }

    public function getByProject($id)
    {
        $this->checkPermission('view_all_tasks');
        try {

            $this->taskModel->setProject($id);
            $result = $this->taskModel->getByProject();

            if ($result) {
                $this->successResponse($result ?? []);
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
                $this->taskModel->assignTag($tagId);
            }

            $this->activityLog->logActivity(
                $this->taskModel->getByProject(),
                $this->checkToken()->sub,
                'Task Tags Assigned',
                "Task ID: $id, Tags: " . implode(', ', $data->tag_id)
            );

            $this->successResponse(null, "All tags assigned successfully");
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage());
        }
    }

    public function clearTags($id)
    {
        $this->checkPermission('clear_task_tag');
        try {
            $this->taskModel->setId($id);
            $result = $this->taskModel->clearTag();

            if ($result) {
                $this->activityLog->logActivity(
                    $this->taskModel->getByProject(),
                    $this->checkToken()->sub,
                    'Task Tags Cleared',
                    "Task ID: $id"
                );

                $this->successResponse(null, "Tags cleared");
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage());
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
                $this->activityLog->logActivity(
                    $this->taskModel->getByProject(),
                    $this->checkToken()->sub,
                    'Task Category Assigned',
                    "Task ID: $id, Category ID: {$data->cat_id}"
                );

                $this->successResponse(null, "Category assigned");
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage());
        }
    }

    public function assignUser($id)
    {
        $this->checkPermission('assign_task_user');
        try {
            $data = $this->getRequestData();

            if (empty($data) || !is_numeric($data)) {
                $this->errResponse('User id is missing or invalid');
            }


            $this->taskModel->setId($id);


            if (!$this->taskModel->assignUser($data)) {
                $this->errResponse("Failed to assign User ID: {$data}");
            }

            $this->activityLog->logActivity(
                $id,
                $this->checkToken()->sub,
                'Task User Assigned',
                "Task ID: $id, User: {($data)}"
            );

            $this->successResponse(null, "User assigned successfully");
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage());
        }
    }

    public function clearUser($id)
    {
        $this->checkPermission('clear_task_user');
        try {
            $this->taskModel->setId($id);
            $result = $this->taskModel->clearUser();

            if ($result) {
                $this->activityLog->logActivity(
                    $this->taskModel->getByProject(),
                    $this->checkToken()->sub,
                    'Task Users Cleared',
                    "Task ID: $id"
                );

                $this->successResponse(null, "Users cleared");
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage());
        }
    }

    public function getUsers($id)
    {
        $this->checkPermission('view_task');
        try {

            $this->taskModel->setId($id);
            $result = $this->taskModel->getUsers();

            if ($result) {
                $this->successResponse($result, 'success');
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }

    public function updateStatus($id)
    {
        try {
            $data = $this->getRequestData();

            if (empty($data->status)) {
                $this->errResponse('Status is invalid');
            }

            $this->taskModel->setId($id);
            $this->taskModel->setStatus($data->status);


            $task = $this->taskModel->getById();
            if (!$task) {
                $this->errResponse('Task not found');
                return;
            }

            if ($this->taskModel->updateSatus()) {
                $this->activityLog->logActivity(
                    $task->project_id,
                    $this->checkToken()->sub,
                    'Task Status Updated',
                    "Task ID: $id, New Status: {$data->status}"
                );

                $this->successResponse(null, 'Status updated');
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage());
        }
    }
}
