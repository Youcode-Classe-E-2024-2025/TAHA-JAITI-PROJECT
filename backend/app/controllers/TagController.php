<?php

class TagController extends GenericController {

    private $tagModel;

    public function __construct()
    {
        $this->tagModel = new Tag();
    }

    public function createTag(){
        $this->isAdmin();
        try {
            $data = $this->getRequestData();
            $errors = Validator::validateName($data);

            if (!empty($errors)) {
                $this->errResponse(implode(', ', $errors));
            }

            if (!empty($data->color)){
                $this->tagModel->setColor($data->color);
            }

            $this->tagModel->setName($data->name);

            $result = $this->tagModel->createTag();

            if ($result) {
                $this->successResponse($data, 'Tag created successfully');
            } else {
                $this->errResponse('Failed to create tag');
            }
        } catch (Exception $e){
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }

    public function getTags(){
        try {

            $tags = $this->tagModel->getTags();

            if ($tags){
                $this->successResponse($tags);
            } else {
                $this->errResponse('No tags found');
            }
        } catch (Exception $e){
            $this->errResponse('An unexpected error occured');
        }
    }

    public function assignTag(){
        $this->isAdmin();

        try {
            $data = $this->getRequestData();


        } catch (Exception $e){
            $this->errResponse('An unexpected error occured'. $e->getMessage());
        }
    }
}