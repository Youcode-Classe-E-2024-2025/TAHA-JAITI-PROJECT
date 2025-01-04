<?php

class TagController extends GenericController
{

    private $tagModel;

    public function __construct()
    {
        $this->tagModel = new Tag();
    }

    public function createTag()
    {
        try {
            $data = $this->getRequestData();
            $errors = Validator::validateName($data);

            if (!empty($errors)) {
                $this->errResponse(implode(', ', $errors));
            }

            if (!empty($data->color)) {
                $this->tagModel->setColor($data->color);
            }

            $this->tagModel->setName($data->name);

            $result = $this->tagModel->createTag();

            if (!empty($data->assign_tasks) && is_array(($data->assign_tasks))) {
                foreach ($data->assign_tasks as $taskId) {
                    $this->tagModel->setId((int) $result);
                    $this->tagModel->setTask((int) $taskId);

                    $this->tagModel->assignTag();
                }
            }

            if ($result) {
                $this->successResponse($data, 'Tag created successfully');
            } else {
                $this->errResponse('Failed to create tag');
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }

    public function getTags()
    {

        try {

            $tags = $this->tagModel->getTags();

            if ($tags) {
                $this->successResponse($tags);
            } else {
                $this->errResponse('No tags found');
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured');
        }
    }

    public function assignTag()
    {
        try {
            $data = $this->getRequestData();

            // Validate input
            if (!isset($data->id) || !isset($data->tag) || !is_array($data->tag)) {
                $this->errResponse('Task ID and Tag list are required');
                return;
            }

            $this->tagModel->setTask((int)$data->id);

            $errors = [];
            foreach ($data->tag as $tagId) {
                $this->tagModel->setId((int)$tagId);
                $result = $this->tagModel->assignTag();

                if (!$result) {
                    $errors[] = $tagId;
                }
            }

            if (empty($errors)) {
                $this->successResponse($data, "Tags successfully assigned to the task");
            } else {
                $failedTags = implode(', ', $errors);
                $this->errResponse("Failed to assign tags with IDs: $failedTags");
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage());
        }
    }
}
