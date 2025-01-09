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

    public function update(){
        $sql = "UPDATE tasks SET title = :title, description = :desc, status = :status,
        deadline = :dead, category_id = :cid, updated_at = CURRENT_TIMESTAMP WHERE id = :id";

       $stmt = $this->db->prepare($sql);
       $stmt->bindParam(':title', $this->title);
       $stmt->bindParam(':desc', $this->description);
       $stmt->bindParam(':status', $this->status);
       $stmt->bindParam(':dead', $this->deadline);
       $stmt->bindParam(':cid', $this->category_id);
       $stmt->bindParam(':id', $this->id);

       if ($stmt->execute()){
           return true;
       }

       return false;
    }

    public function delete(){
        $sql = "DELETE FROM tasks WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $this->id);

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

    public function assignTag($tagId){
        $sql = "INSERT INTO task_tags(task_id, tag_id) VALUES (:tid, :tagid)";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':tid', $this->id);
        $stmt->bindParam(':tagid', $tagId);

        if ($stmt->execute()){
            return true;
        }

        return false;
    }

    public function clearTag(){
        $sql = "DELETE FROM task_tags WHERE task_id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()){
            return true;
        }

        return false;
    }

    public function assignCat($catId){
        $sql = "UPDATE tasks SET category_id = :cid WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':cid', $catId);
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()){
            return true;
        }

        return false;
    }

    public function assignUser($userId){
        $sql = "INSERT INTO user_assignments(user_id, task_id) VALUES (:uid, :tid)";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':uid', $userId);
        $stmt->bindParam(':tid', $this->id);

        if ($stmt->execute()){
            return true;
        }

        return false;
    }

    public function clearUser(){
        $sql = "DELETE FROM user_assignments WHERE task_id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()){
            return true;
        }

        return false;
    }
    
    public function getUsers(){
        $sql = "SELECT u.id, u.name, u.email
                FROM users u
                JOIN user_assignments ua ON ua.user_id = u.id
                WHERE ua.task_id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $this->project_id);
        $stmt->execute();

        if ($stmt->rowCount() > 0){
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        return [];
    }
}
