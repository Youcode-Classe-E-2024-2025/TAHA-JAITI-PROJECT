<?php

class CategoryController extends GenericController{

    private $catModel;

    public function __construct()
    {
        $this->catModel = new Category();
    }

    public function create(){
        try {
            $data = $this->getRequestData();

            if (empty($data->name)){
                $this->errResponse('Empty project name');
            }

            $this->catModel->setName($data->name);

            $result = $this->catModel->create();

            if ($result) {
                $this->successResponse($data, 'Category created successfully');
            } else {
                $this->errResponse('Failed to create category');
            }

        } catch (Exception $e){
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage());
        }
    }

    public function update($id){
        try {
            $data = $this->getRequestData();

            if (empty($data->name)){
                $this->errResponse('Empty project name');
            }

            $this->catModel->setId($id);
            $this->catModel->setName($data->name);

            $result = $this->catModel->update();

            if ($result) {
                $this->successResponse($data, 'Category updated successfully');
            } else {
                $this->errResponse('Failed to update category');
            }

        } catch (Exception $e){
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage());
        }
    }

    public function delete($id){
        try {
            $this->catModel->setId($id);

            $result = $this->catModel->delete();

            if ($result) {
                $this->successResponse(null, 'Category deleted successfully');
            } else {
                $this->errResponse('Failed to delete category');
            }

        } catch (Exception $e){
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage());
        }
    }

    public function getAll(){

        try {
            $categories = $this->catModel->getAll();

            if ($categories){
                $this->successResponse($categories);
            } else {
                $this->errResponse('No categories were found', 404);
            }

        } catch (Exception $e){
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage());
        }
    }

    public function getById($id){
        try {

            $this->catModel->setId($id);
            $result = $this->catModel->getById();

            if ($result) {
                $this->successResponse($result);
            } else {
                $this->errResponse('No category found', 404);
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e->getMessage());
        }
    }

    public function assignCat(){
        try {
            $data = $this->getRequestData();

            if (!isset($data->id) || !isset($data->cat_id)) {
                $this->errResponse('Task ID and Category ID are required');
                return;
            }

            $this->catModel->setId((int) $data->cat_id);
            $this->catModel->setTask( intval($data->id));

            $result = $this->catModel->assignCat();

            if ($result){
                $this->successResponse($data, 'Category assigned to task');
            } else {
                $this->errResponse('Failed to assign category');
            }

        } catch (Exception $e){
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage());
        }
    }
}