<?php

class Auth
{
    private $cache;
    private PDO $db;
    private $role;

    public function __construct()
    {
        $this->cache = new RedisCache();
        $this->db = Database::getConnection();
        $this->role = new Roles();
    }


    public function getUserPerms($user)
    {
        $cacheKey = "user_perms_{$user->sub}";

        $perms = $this->cache->get($cacheKey);

        if (!$perms) {
            $perms = $this->fetchPermsDB($user->role);

            $this->cache->set($cacheKey, $perms, 3600);
        }

        return $perms;
    }

    public function fetchPermsDB($roleId)
    {
        $stmt = $this->db->prepare("
        SELECT p.name
        FROM permissions p
        JOIN role_perms rp ON rp.perm_id = p.id
        WHERE rp.role_id = :role_id
    ");
        $stmt->bindParam(':role_id', $roleId);
        $stmt->execute();

        // Fetch the permissions as an array
        $permissions = $stmt->fetchAll(PDO::FETCH_COLUMN);

        return $permissions;
    }
}
