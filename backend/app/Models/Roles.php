<?php

class Roles
{

    private PDO $db;
    private int $id;
    private string $name;

    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function create()
    {
        $sql = "INSERT INTO roles(name) VALUES (:name)";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':name', $this->name);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function update()
    {
        $sql = "UPDATE roles SET name = :name WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':id', $this->id);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete()
    {
        $sql = "DELETE FROM roles WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $this->id);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function getAll()
    {
        $sql = "SELECT * FROM roles";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        return [];
    }

    public function getById()
    {
        $sql = "SELECT * FROM roles WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }

        return [];
    }

    public function getPerms()
    {
        $sql = "SELECT p.name
                FROM permissions p
                JOIN role_perms rp ON rp.perm_id = p.id
                WHERE rp.role_id = :id";
                
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        return [];
    }

    public function assignPerm(int $permId)
    {
        $sql = "INSERT INTO role_perms(role_id, perm_id) VALUES (:id, :perm_id)";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':perm_id', $permId);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}
