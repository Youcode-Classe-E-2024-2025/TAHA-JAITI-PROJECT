<?php

class Task
{

    private PDO $db;
    private $id;
    private $title;
    private $description;
    private $status;
    private $deadline;
    private $project_id;
    private $category_id;

    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function setTitle($title)
    {
        $this->title = $title;
    }
    public function setDesc($description)
    {
        $this->description = $description;
    }
    public function setStatus($status)
    {
        $this->status = $status;
    }
    public function setDeadline($deadline)
    {
        $this->deadline = $deadline;
    }
    public function setProject($id)
    {
        $this->project_id = $id;
    }
    public function setCategory($id)
    {
        $this->category_id = $id;
    }

    public function create(){
        $sql = "INSERT INTO tasks(title, description, status, deadline, project_id ,category_id)
                VALUES (:title, :desc, :status, :dead, :pid, :cid)";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':desc', $this->description);
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':dead', $this->deadline);
        $stmt->bindParam(':pid', $this->project_id);
        $stmt->bindParam(':cid', $this->category_id);

        if ($stmt->execute()){
            return true;
        }
        return false;
    }

    public function getAll(){
        $sql = "SELECT * FROM tasks";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();

        if ($stmt->rowCount() > 0){
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        return [];
    }
    
    public function getByProject(){
        $sql = "SELECT * FROM tasks WHERE project_id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $this->project_id);
        $stmt->execute();

        if ($stmt->rowCount() > 0){
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        return [];
    }

    public function getById(){
        $sql = "SELECT * FROM tasks WHERE project_id = :id LIMIT 1";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $this->id);
        

        if ($stmt->execute()){
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        return [];
    }
}
