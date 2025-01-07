<?php

class Roles {

    private PDO $db;
    private int $id;
    private string $name;

    public function __construct(){
        $this->db = Database::getConnection();
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

}