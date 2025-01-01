<?php

class Category
{

    private PDO $db;

    private $name;
    private $id;

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
}
