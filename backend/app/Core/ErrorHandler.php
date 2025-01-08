<?php

class ErrorHandler {
    public static function handleException(Throwable $ex) {
        http_response_code(500);
        echo json_encode([
            'code' => $ex->getCode(),
            'message' => $ex->getMessage(),
            'line' => $ex->getLine(),
            'file' => $ex->getFile()
        ]);
    }

    public static function handleError (
        int $errNo,
        string $errStr,
        string $errFile,
        int $errLine
    ): bool{
        throw new ErrorException($errStr, 0, $errNo, $errFile, $errLine);
    }
}