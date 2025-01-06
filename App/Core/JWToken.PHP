<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JWToken {
    private static $jwtSecret;
    private static $jwtExp = 3600; //expire time in secconds(1h)

    public static function setJWT (): void{
        self::$jwtSecret = $_ENV['JWT_SECRET'];
    }
    public static function genJWT(object $user): string {
        if (empty(self::$jwtSecret)) {
            self::setJWT();
        }
        $payload = [
            'iss' => 'taskflow',
            'aud' => 'taskflow.client',
            'iat' => time(),
            'exp' => time() + self::$jwtExp,
            'sub' => $user->id,
            'role' => $user->role,
            // 'perms' => $user->permissions
        ];

        return JWT::encode($payload, self::$jwtSecret, 'HS256');
    }

    public static function validateJWT(string $token): ?object{
        try {
            return JWT::decode($token, new Key(self::$jwtSecret, 'HS256'));
        } catch (Exception $e) {
            return null;
        }
    }
}