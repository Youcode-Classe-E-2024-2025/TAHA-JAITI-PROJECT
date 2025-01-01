<?php

class CategoryController extends GenericController{

    private $catModel;

    public function __construct()
    {
        $this->catModel = new Category();
    }

    public function createCat(){
        $this->isAdmin();

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
        $this->isAdmin();

        try {
            
        } catch (Exception $e){
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage());
        }
    }
}