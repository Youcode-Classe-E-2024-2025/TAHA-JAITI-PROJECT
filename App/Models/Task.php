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

    public function getAll(){
        $sql = "SELECT * FROM tasks";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();

        if ($stmt->rowCount() > 0){
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        return [];
    }
}
