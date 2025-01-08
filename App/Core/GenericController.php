<?php


class GenericController
{
    protected function successResponse($data, $msg = 'Success', $code = 200)
    {
        http_response_code($code);
        echo json_encode([
            'status' => true,
            'message' => $msg,
            'data' => $data
        ], JSON_UNESCAPED_SLASHES);
        exit;
    }

    protected function errResponse($msg, $code = '400')
    {
        http_response_code($code);
        echo json_encode([
            'status' => false,
            'message' => $msg
        ], JSON_UNESCAPED_SLASHES);
        exit;
    }

    protected function getRequestData()
    {
        $data = json_decode(file_get_contents('php://input'));

        if (!empty($data)) {
            $secureData = new stdClass();

            foreach ($data as $key => $value) {
                $secureData->$key = is_string($value) ? str_secure($value) : $value;
            }

            return $secureData;
        }

        return null;
    }

    protected function getHeader()
    {
        $authHeader = null;
        if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
        }
        
        if ($authHeader) {
            $token = trim(str_replace('Bearer', '', $authHeader));
            return $token;
        } else {
            return null;
        }
    }

    protected function checkToken() {
        $token = $this->getHeader();
        if (!$token) {
            $this->errResponse('Unauthorized: No token provided', 401);
        }

        $user = JWToken::validateJWT($token);

        if (!$user) {
            $this->errResponse('Unauthorized: Invalid token', 401);
        }
        return $user;
    }

    protected function checkPermission($permission)
    {
        $user = $this->checkToken();

        $auth = new Auth();
        $permissions = $auth->getUserPerms($user);

        if (!in_array($permission, $permissions)) {
            $this->errResponse('Forbidden: You do not have permission', 403);
        }

        return $user;
    }
}
