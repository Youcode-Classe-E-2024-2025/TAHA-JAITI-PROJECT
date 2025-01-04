<?php

class Task
{

    private PDO $db;
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

    public function createTask()
    {
        $sql = 'INSERT INTO 
            tasks(title, description, status, deadline, project_id, category_id)
            VALUES (:title, :desc, :status, :deadline, :p_id, :c_id)';

        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':desc', $this->description);
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':deadline', $this->deadline);
        $stmt->bindParam(':p_id', $this->project_id);
        $stmt->bindParam(':c_id', $this->category_id);

        if ($stmt->execute()) {
            return $this->db->lastInsertId();
        }

        return null;
    }

    public function assignTask($taskId, $userId): bool
    {
        $sql = "INSERT INTO user_assignments (user_id, task_id) VALUES (:uId, :tId);";

        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':uId', $userId);
        $stmt->bindParam(':tId', $taskId);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function getAllTasks($id): ?array
    {
        $sql = "SELECT * FROM task_data WHERE project_id = :id";

        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: null;
    }

    public function deleteTask($id) :bool{
        $sql = "DELETE FROM tasks WHERE id = :id";
        
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $id);

        if ($stmt->execute()){
            return true;
        }

        return false;
    }

    public function updateStatus($id, $status): bool {
        $sql = "UPDATE tasks SET status = :status WHERE id = :id";

        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':id', $id);

        if ($stmt->execute()){
            return true;
        }

        return false;
    }
}
