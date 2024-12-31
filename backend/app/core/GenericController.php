<?php

class GenericController {

    protected function successResponse ($data, $msg = 'Success', $code = 200) {
        http_response_code($code);
        echo json_encode([
            'status' => true,
            'message' => $msg,
            'data' => $data
        ]);
        exit;
    }

    protected function errResponse ($msg, $code = '400') {
        http_response_code($code);
        echo json_encode([
            'status' => false,
            'message' => $msg
        ]);
        exit;
    }

    protected function getRequestData () {
        $data = json_decode(file_get_contents('php://input'));
        return $data ?? null;
    }

    protected function startSession(object $user): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $_SESSION['user_id'] = $user->id;
        $_SESSION['role'] = $user->role;
        setcookie('SESSION_ID', session_id(), time() + 3600, '/',true, true);
    }

    protected function isLoggedIn(): bool {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    
        return isset($_SESSION['user_id']) && isset($_SESSION['role']);
    }

    public function isAdmin(): void {
        if (!$this->isLoggedIn()) {
            $this->errResponse('Unauthorized access', 401);
        }
        
        if ($_SESSION['role'] !== 'chief'){
            $this->errResponse('Unauthorized user', 401);
        }
    }
}