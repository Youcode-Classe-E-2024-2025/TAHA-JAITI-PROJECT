<?php

class User
{

    private PDO $db;
    private int $id;
    private string $name;
    private string $email;
    private string $password;
    private string $role;

    public function __construct(int $id = 0, string $name = '', string $email = '', string $password = '')
    {
        $this->db = Database::getConnection();
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
        $this->password = $password;
    }

    public function setName(string $name)
    {
        $this->name = $name;
    }
    public function setEmail(string $email)
    {
        $this->email = $email;
    }
    public function setPassword(string $password)
    {
        $this->password = $password;
    }
    public function setRole(string $role)
    {
        $this->role = $role;
    }

    public function register(): int
    {
        $sql = 'SELECT id FROM users WHERE email = :email';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':email' => $this->email]);

        if ($stmt->fetchColumn()) {
            return false;
        }

        $sql = 'INSERT INTO users (name, email, password, role) 
        VALUES (:name, :email, :password, :role);';

        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            ':name' => $this->name,
            ':email' => $this->email,
            ':password' => $this->password,
            ':role' => $this->role,
        ]);

        return (int) $this->db->lastInsertId();
    }

    public function login(object $user, string $password): bool
    {
        if (!password_verify($password, $user->password)) {
            return false;
        }

        return true;
    }

    public function getUserByEmail($email): object | bool
    {
        $stmt = $this->db->prepare('SELECT * FROM users WHERE email = :email');
        $stmt->bindParam(':email', $email);

        if ($stmt->execute()) {
            return $stmt->fetch(PDO::FETCH_OBJ);
        }

        return false;
    }

    public function getProjects(): array
    {
        return [];
    }

    public function getTasks(): array
    {
        return [];
    }
}
