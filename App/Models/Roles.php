<?php

class Roles {

    private PDO $db;
    private int $id;
    private string $name;

    public function __construct(){
        $this->db = Database::getConnection();
    }

    public function setId($id){
        $this->id = $id;
    }

    public function setName($name){
        $this->name = $name;
    }

    public function getAll(){
        $sql = "SELECT * FROM roles";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();

        if ($stmt->rowCount() > 0){
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        return [];
    }

    public function getById(){
        $sql = "SELECT * FROM roles WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        if ($stmt->rowCount() > 0){
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }

        return [];
    }

}