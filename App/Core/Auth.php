<?php

class Auth {
    private $cache;
    private PDO $db;

    public function __construct(){
        $this->cache = new RedisCache();
        $this->db = Database::getConnection();
    }

    
}