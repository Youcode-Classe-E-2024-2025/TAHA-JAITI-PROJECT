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
        header('Content-Type: application/json');
        echo json_encode([
            'status' => false,
            'message' => $msg
        ]);
        exit;
    }

    protected function getRequestData () {
        $data = json_decode(file_get_contents('php://input'));
        return $data;
    }


}