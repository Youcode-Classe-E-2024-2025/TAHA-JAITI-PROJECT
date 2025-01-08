<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JWToken {
    private static $jwtsecret;
    private static $jwtExp = 3600; // Expiry time in seconds (1 hour)

    public static function setJWT(): void {
        self::$jwtsecret = $_ENV['JWT_SECRET'];
    }

    public static function genJWT(object $user): string {
        if (empty(self::$jwtsecret)) {
            self::setJWT();
        }
        
        $payload = [
            'iss' => 'taskflow',
            'aud' => 'taskflow.client',
            'iat' => time(),
            'exp' => time() + self::$jwtExp,
            'sub' => $user->id,
            'role' => $user->role,
        ];

        return JWT::encode($payload, self::$jwtsecret, 'HS256');
    }

    public static function validateJWT(string $token): ?object {
        try {
            if (empty(self::$jwtsecret)) {
                self::setJWT();
            }
            return JWT::decode($token, new Key(self::$jwtsecret, 'HS256'));
        } catch (Exception $e) {
            return null;
        }
    }
}
