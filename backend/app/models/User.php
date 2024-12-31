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
        $sql = 'SELECT id FROM users WHERE email = :email';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':email' => $this->email]);

        if ($stmt->fetchColumn()){
            return false;
        }

        $hashPass = password_hash($this->password, PASSWORD_BCRYPT);

        $sql = 'INSERT INTO users (name, email, password) VALUES (:name, :email, :password);';

        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            ':name' => $this->name,
            ':email' => $this->email,
            ':password' => $hashPass
        ]);
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