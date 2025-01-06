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

    public function register(): bool
    {
        if (!empty($this->getUserByEmail($this->email))){
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

        return true;
    }

    public function login(object $user, string $password): bool
    {
        if (!password_verify($password, $user->password)) {
            return false;
        }

        return true;
    }

    public function getUserByEmail($email): array
    {
        $sql = 'SELECT * FROM users WHERE email = :email';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':email' => $email]);

        if ($stmt->rowCount() > 0) {
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }

        return [];
    }

    public function getUsers():array {
        $stmt = $this->db->prepare('SELECT * FROM users WHERE role = :role');
        $stmt->execute([':role' => 'member']);

        if ($stmt->rowCount() > 0) {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        return [];
    }   
    public function getProjectUsers($id): array
    {
        $stmt = $this->db->prepare('SELECT u.id, u.name FROM users U LEFT JOIN project_members pm ON u.id = pm.user_id WHERE pm.project_id = :pid');
        $stmt->execute([':pid' => $id]);

        if ($stmt->rowCount() > 0) {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        return [];
    }

    public function getProjectStats (): array {
        $sql = "
            SELECT t.status, COUNT(*) AS task_count 
            FROM tasks t
            JOIN projects p ON t.project_id = p.id
            WHERE p.creator_id = :creator_id
            GROUP BY t.status
        ";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':creator_id', $_SESSION['user_id'], PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getMyProjects(): array {
        $sql = "SELECT * FROM my_projects WHERE member_id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $_SESSION['user_id'], PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?? [];
    }
}
