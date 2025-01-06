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

    public function setId(int $id)
    {
        $this->id = $id;
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

    public function create(): bool
    {
        if (!empty($this->getUserByEmail())) {
            return false;
        }

        $sql = 'INSERT INTO users (name, email, password, role) 
        VALUES (:name, :email, :password, :role);';

        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            ':name' => $this->name,
            ':email' => $this->email,
            ':password' => $this->password,
            ':role' => $this->role ?? 3,
        ]);

        return true;
    }

    public function login(object $user): bool
    {
        if (!password_verify($this->password, $user->password)) {
            return false;
        }

        return true;
    }

    public function getUserByEmail(): ?object
    {
        $sql = 'SELECT * FROM users WHERE email = :email';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':email' => $this->email]);

        if ($stmt->rowCount() > 0) {
            return $stmt->fetch(PDO::FETCH_OBJ);
        }

        return null;
    }

    public function getAllUsers(): array
    {
        $stmt = $this->db->prepare('SELECT id, name, email, role, created_at, updated_at FROM users');
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        return [];
    }

    public function getById(): ?object
    {
        $sql = 'SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = :id';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':id' => $this->id]);

        if ($stmt->rowCount() > 0) {
            return $stmt->fetch(PDO::FETCH_OBJ);
        }

        return null;
    }

    public function update()
    {
        $query = "UPDATE users SET name = :name, email = :email, password = :password, role = :role WHERE id = :id";

        $stmt = $this->db->prepare($query);

        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':password', $this->password);
        $stmt->bindParam(':role', $this->role);
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete()
    {
        $query = "DELETE FROM users WHERE id = :id";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
