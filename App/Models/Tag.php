<?php

class Tag{

    private PDO $db;
    private $id;
    private $taskId;
    private $name;
    private $color;

    public function __construct()
    {   
        $this->color = '#000000';
        $this->db = Database::getConnection();
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function setColor($color){
        $this->color = $color;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function setTask($id)
    {
        $this->taskId = $id;
    }

    public function getAll(){
        $sql = "SELECT * FROM tags";

        $stmt = $this->db->prepare($sql);
        
        if ($stmt->execute()){
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        
        return [];
    }

    public function getById(): array{
        $sql = "SELECT * FROM tags WHERE id =:id ";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        if ($stmt->rowCount() > 0){
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }

        return [];
    }

    public function create(): bool{
        $sql = "INSERT INTO tags(name, color) VALUES (:name, :color)";
        
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':color', $this->color);

        if ($stmt->execute()){
            return true;
        } else {
            return false;
        }
    }

    public function update (): bool {
        $sql = "UPDATE tags SET name = :name WHERE id = :id";
        
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()){
            return true;
        } else {
            return false;
        }
    }

    public function delete (): bool {
        $sql = "DELETE FROM tags WHERE id = :id";
        
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()){
            return true;
        } else {
            return false;
        }
    }

    public function assignTag(): bool {
        $sql = "INSERT INTO task_tags (task_id, tag_id)
                VALUES (:task_id, :tag_id)";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':task_id', $this->taskId);        
        $stmt->bindParam(':tag_id', $this->id);
        
        if ($stmt->execute()){
            return true;
        } else {
            return false;
        }
    }

    public function clearTags(){
        $sql = "DELETE FROM task_tags WHERE task_id = :task_id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':task_id', $this->taskId);
        $stmt->execute();
    }

}