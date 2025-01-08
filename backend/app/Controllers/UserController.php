<?php

class UserController extends GenericController
{
    private $userModel;

    public function __construct()
    {
        $this->checkToken();
        $this->userModel = new User();
    }

    public function getAll()
    {
        $this->checkPermission('view_all_users');
        try {

            $users = $this->userModel->getAllUsers();

            if ($users) {
                $this->successResponse($users);
            } else {
                $this->errResponse('No users found', 401);
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e);
        }
    }

    public function getById($id)
    {
        $this->checkPermission('view_user');
        try {

            $this->userModel->setId($id);
            $user = $this->userModel->getById();

            if ($user) {
                $this->successResponse($user);
            } else {
                $this->errResponse('No users found', 401);
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e);
        }
    }

    public function create()
    {
        $this->checkPermission('create_user');
        try {
            $data = $this->getRequestData();

            $errors = Validator::validateUser($data);
            if (!empty($errors)) {
                $this->errResponse(implode(', ', $errors));
            }

            $hashPass = password_hash($data->password, PASSWORD_BCRYPT);

            $this->userModel->setEmail($data->email);
            $this->userModel->setPassword($hashPass);
            $this->userModel->setName($data->name);

            $result = $this->userModel->create();

            if ($result) {
                $this->successResponse(null, 'User registered successfully');
            } else {
                $this->errResponse('A user with this email already exists', 409);
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage(), 500);
        }
    }

    public function update($id)
    {
        $this->checkPermission('update_user');
        try {
            $data = $this->getRequestData();

            $errors = Validator::validateUser($data);
            if (!empty($errors)) {
                $this->errResponse(implode(', ', $errors));
            }

            $this->userModel->setId($id);
            $user = $this->userModel->getById();

            if (!$user) {
                $this->errResponse('User not found', 404);
            }

            if (isset($data->name)) {
                $this->userModel->setName($data->name);
            }

            if (isset($data->email)) {
                $this->userModel->setEmail($data->email);
            }

            if (isset($data->password)) {
                $hashedPassword = password_hash($data->password, PASSWORD_BCRYPT);
                $this->userModel->setPassword($hashedPassword);
            }

            if (isset($data->role)) {
                $this->userModel->setRole($data->role);
            }

            $result = $this->userModel->update();

            if ($result) {
                $this->successResponse(null, 'User updated successfully');
            } else {
                $this->errResponse('Failed to update user', 400);
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage(), 500);
        }
    }

    public function delete($id)
    {
        $this->checkPermission('delete_user');
        try {
            $this->userModel->setId($id);
            $user = $this->userModel->getById();

            if (!$user) {
                $this->errResponse('User not found', 404);
            }

            $result = $this->userModel->delete();

            if ($result) {
                $this->successResponse(null, 'User deleted successfully');
            } else {
                $this->errResponse('Failed to delete user', 400);
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage(), 500);
        }
    }
}
