<?php

class CategoryController extends GenericController{

    private $catModel;

    public function __construct()
    {
        $this->catModel = new Category();
    }

    public function createCat(){
        try {
            $data = $this->getRequestData();

            if (empty($data->name)){
                $this->errResponse('Empty project name');
            }

            $this->catModel->setName($data->name);

            $result = $this->catModel->createCategory();

            if ($result) {
                $this->successResponse($data, 'Category created successfully');
            } else {
                $this->errResponse('Failed to create category');
            }

        } catch (Exception $e){
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage());
        }
    }

    public function getAllCategories(){

        try {
            
            $categories = $this->catModel->getCategories();

            if ($categories){
                $this->successResponse($categories);
            } else {
                $this->errResponse('Failed getting projects from the database');
            }

        } catch (Exception $e){
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage());
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