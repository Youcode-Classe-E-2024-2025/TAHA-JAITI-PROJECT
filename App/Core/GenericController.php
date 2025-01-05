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

    protected function startSession($user): void
    {
        session_start([
            'cookie_lifetime' => 3600,
            'cookie_secure' => false,
            'cookie_httponly' => true,
            'cookie_samesite' => 'none',
        ]);

        $_SESSION['user_id'] = $user->id;
        $_SESSION['role'] = $user->role;
    }

    protected function isLoggedIn(): bool
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        return isset($_SESSION['user_id']) && isset($_SESSION['role']);
    }

    protected function getCurrentRole(): ?string 
    {
        if (!$this->isLoggedIn()) {
            return null;
        }
        return $_SESSION['role'];
    }

    public function isAdmin(): bool
    {
        if (!$this->isLoggedIn()) {
            $this->errResponse('Unauthorized access', 401);
        }

        $role = $this->getCurrentRole();
        if ($role !== 'chief') {
            $this->errResponse('Unauthorized user', 401);
        }

        return true;
    }
}
