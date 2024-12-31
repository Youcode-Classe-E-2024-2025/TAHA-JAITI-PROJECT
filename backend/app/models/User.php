<?php

class User implements UserInterface{

    protected PDO $db;
    protected int $id;
    protected string $name;
    protected string $email;
    protected string $password;

    public function __construct(PDO $db, int $id = 0, string $name = '', string $email = '', string $password = '') {
        $this->db = $db;
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
        $this->password = $password;
    }

    public function setName (string $name) {$this->name = $name;}
    public function setEmail (string $email) {$this->email = $email;}
    public function setPassword (string $password) {$this->password = $password;}

    public function register (): bool {
        echo json_encode('hello');
        return true;
    }

    public function login(): bool {
        return true;
    }

    public function getProjects(): array {
        return [];
    }

    public function getTasks(): array {
        return [];
    }
}