<?php

class RolesController extends GenericController
{
    private $roles;

    public function __construct()
    {
        $this->checkToken();
        $this->roles = new Roles();
    }

    public function create()
    {
        $this->checkPermission('create_role');
        try {
            $data = $this->getRequestData();

            if (!isset($data->name) || empty($data->name) || strlen($data->name) < 3) {
                $this->errResponse('Name is missing or too short');
            }

            $this->roles->setName($data->name);

            $result = $this->roles->create();

            if ($result) {
                $this->successResponse('Role created successfully');
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e);
        }
    }

    public function update($id)
    {
        $this->checkPermission('update_role');
        try {
            $data = $this->getRequestData();

            if (!isset($data->name) || empty($data->name) || strlen($data->name) < 3) {
                $this->errResponse('Name is missing or too short');
            }

            if (!isset($id) || empty($id) || !is_numeric($id)) {
                $this->errResponse('Role id is missing');
            }

            $this->roles->setId($id);
            $this->roles->setName($data->name);

            $result = $this->roles->update();

            if ($result) {
                $this->successResponse('Role updated successfully');
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e);
        }
    }

    public function delete($id)
    {
        $this->checkPermission('delete_role');
        try {
            if (!isset($id) || empty($id) || !is_numeric($id)) {
                $this->errResponse('Role id is missing');
            }

            $this->roles->setId($id);

            $result = $this->roles->delete();

            if ($result) {
                $this->successResponse('Role deleted successfully');
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e);
        }
    }

    public function getAll()
    {
        $this->checkPermission('view_all_roles');
        try {

            $roles = $this->roles->getAll();

            if ($roles) {
                $this->successResponse($roles);
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e);
        }
    }

    public function getById($id)
    {
        $this->checkPermission('view_role');
        try {

            $this->roles->setId($id);
            $roles = $this->roles->getById();

            if ($roles) {
                $this->successResponse($roles);
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e);
        }
    }

    public function getRolePerms($id)
    {
        try {

            $this->roles->setId($id);
            $roles = $this->roles->getPerms();

            if ($roles) {
                $this->successResponse($roles);
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e);
        }
    }

    public function assignPerms($id)
    {
        $this->checkPermission('assign_role_permissions');
        try {
            $data = $this->getRequestData();


            if (!is_array($data->perm_id) || empty($data->perm_id)) {
                $this->errResponse('Invalid / Empty permissions');
            }

            $this->roles->setId((int) $id);


            foreach ($data->perm_id as $permId) {
                if (!is_numeric($permId)) {
                    $errors[] = $permId;
                    continue;
                }

                if ($this->roles->assignPerm((int) $permId)) {
                    $good[] = $permId;
                } else {
                    $errors[] = $permId;
                }
            }

            if (!empty($errors)) {
                $this->successResponse('Some permissions failed to assign', [
                    'success' => $good,
                    'failed' => $errors,
                ], 202);
            } else {
                $this->successResponse('All permissions assigned successfully', ['success' => $good]);
            }
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occured' . $e);
        }
    }
}
