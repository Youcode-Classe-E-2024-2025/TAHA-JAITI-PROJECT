<?php

class UserController extends GenericController {
    private PDO $db;

    public function __construct(){
        $this->db = Database::getConnection();
    }

}