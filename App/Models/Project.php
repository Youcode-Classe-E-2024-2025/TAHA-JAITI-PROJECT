<?php

class Project
{

    private PDO $db;
    private $id;
    private $name;
    private $description;
    private $visibility;
    private $deadline;
    private $creator;


    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    public function setId($id)
    {
        $this->id = $id;
    }
    public function setName($name)
    {
        $this->name = $name;
    }
    public function setDesc($description)
    {
        $this->description = $description;
    }
    public function setIsPublic($visibility)
    {
        $this->visibility = $visibility;
    }
    public function setDeadline($deadline)
    {
        $this->deadline = $deadline;
    }
    public function setCreator(int $id)
    {
        $this->creator = $id;
    }



    //--------
    public function create()
    {
        $sql = "INSERT INTO projects (name, description, visibility, deadline, creator_id)
            VALUES (:name, :desc, :vis, :dead, :cid)";
        $stmt = $this->db->prepare($sql);

        $stmt->bindParam(':name', $this->name, PDO::PARAM_STR);
        $stmt->bindParam(':desc', $this->description, PDO::PARAM_STR);
        $stmt->bindParam(':vis', $this->visibility, PDO::PARAM_STR);
        $stmt->bindParam(':dead', $this->deadline, PDO::PARAM_STR);
        $stmt->bindParam(':cid', $this->creator, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function update(){
        $sql = "UPDATE projects SET name = :name, description = :desc, visibility = :vis,
         deadline = :dead, updated_at = CURRENT_TIMESTAMP WHERE id = :id";

        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':desc', $this->description);
        $stmt->bindParam(':vis', $this->visibility);
        $stmt->bindParam(':dead', $this->deadline);
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()){
            return true;
        }

        return false;
    }

    public function getPublic()
    {
        $sql = "SELECT * FROM projects WHERE visibility = 'public'";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        return [];
    }

    public function getById()
    {
        $sql = "SELECT * FROM projects WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getMe($userId)
    {
        $sql = "SELECT p.*
                FROM projects p
                JOIN project_members pm ON pm.project_id = p.id
                WHERE pm.user_id = :user_id";

        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':user_id', $userId);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    //------

}
