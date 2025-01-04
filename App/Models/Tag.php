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

    public function createTag(): bool | int{
        $sql = "INSERT INTO tags(name, color) VALUES (:name, :color)";
        
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':color', $this->color);

        if ($stmt->execute()){
            $this->setId((int) $this->db->lastInsertId());
            return $this->id;
        } else {
            return false;
        }
    }

    public function getTags(): array | null {
        $sql = "SELECT * FROM tags";

        $stmt = $this->db->prepare($sql);
        
        if ($stmt->execute()){
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        
        return null;
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