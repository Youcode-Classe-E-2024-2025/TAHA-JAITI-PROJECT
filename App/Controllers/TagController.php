<?php

class TagController extends GenericController
{

    private $tagModel;

    public function __construct()
    {
        $this->tagModel = new Tag();
    }

    public function create()
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

            $result = $this->tagModel->create();

            if ($result) {
                $this->successResponse($data, 'Tag created successfully');
            } else {
                $this->errResponse('Failed to create tag');
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }

    public function update($id){
        try {
            $data = $this->getRequestData();
            $errors = Validator::validateName($data);

            if (!empty($errors)) {
                $this->errResponse(implode(', ', $errors));
            }

           

            $this->tagModel->setId($id);
            $this->tagModel->setName($data->name);

            $result = $this->tagModel->update();

            if ($result) {
                $this->successResponse($data, 'Tag updated successfully');
            } else {
                $this->errResponse('Failed to update tag');
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }

    public function delete($id){
        try {

            $this->tagModel->setId($id);

            $result = $this->tagModel->delete();

            if ($result) {
                $this->successResponse(null, 'Tag deleted successfully');
            } else {
                $this->errResponse('Failed to deleted tag');
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }

    public function getAll()
    {
        try {
            $tags = $this->tagModel->getAll();

            if ($tags) {
                $this->successResponse($tags);
            } else {
                $this->errResponse('No tags found');
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured');
        }
    }

    public function getById($id) {
        try {

            $this->tagModel->setId($id);
            $tags = $this->tagModel->getById();

            if ($tags) {
                $this->successResponse($tags);
            } else {
                $this->errResponse('No tag found');
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
            $this->tagModel->clearTags();

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
