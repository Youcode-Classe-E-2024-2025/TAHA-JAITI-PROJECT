<?php

class Category
{

    private PDO $db;

    private $name;
    private $id;
    private $taskId;

    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function setTask($id)
    {
        $this->taskId = $id;
    }

    public function createCategory(): bool | int {
        $sql = "INSERT INTO categories(name) VALUES (:name)";
        
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':name', $this->name);

        if ($stmt->execute()){
            $this->setId((int) $this->db->lastInsertId());
            return $this->id;
        } else {
            return false;
        }
    }

    public function getAll(): array{
        $sql = "SELECT * FROM categories";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();

        if ($stmt->rowCount() > 0){
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        
        return [];
    }

    public function getById(): array{
        $sql = "SELECT * FROM categories WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()){
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }
        return [];
    }

    public function assignCat(): bool{
        $sql = 'UPDATE tasks SET category_id = :c_id WHERE id = :t_id';

        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':c_id', $this->id);
        $stmt->bindParam(':t_id', $this->taskId);

        if ($stmt->execute()){
            return true;
        } else {
            return false;
        }
    }
}
