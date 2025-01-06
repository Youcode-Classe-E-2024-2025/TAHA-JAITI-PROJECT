<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JWToken {
    private static $jwtsecret = $_ENV['JWT_SECRET'];
    private static $jwtExp = 3600; //expire time in secconds(1h)

    public static function genJWT(object $user): string {
        $payload = [
            'iss' => 'taskflow',
            'aud' => 'taskflow.client',
            'iat' => time(),
            'exp' => time() + self::$jwtsecret,
            'sub' => $user->id,
            'role' => $user->role,
            'perms' => $user->permissions
        ];

        return JWT::encode($payload, self::$jwtExp, 'H256');
    }

    public static function validateJWT(string $token): ?object{
        try {
            return JWT::decode($token, new Key(self::$jwtsecret, 'H256'));
        } catch (Exception $e) {
            return null;
        }
    }
}