<?php

class Project {

    private PDO $db;
    private $name;
    private $description;
    private $is_public;
    private $deadline;
    private $creator;


    public function __construct(){
        $this->db = Database::getConnection();
    }

    public function setName($name) {$this->name = $name;}
    public function setDesc($description) {$this->description = $description;}
    public function setIsPublic($is_public) {$this->is_public = $is_public;}
    public function setDeadline($deadline){$this->deadline = $deadline;}
    public function setCreator(int $id) {$this->creator = $id;}

    public function createProject(){
        $sql = "INSERT INTO 
                projects(name, description, is_public, deadline, creator_id) 
                VALUES (:name, :desc, :is_public, :deadline, :creator)";
            
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':desc', $this->description);
        $stmt->bindParam(':is_public', $this->is_public, PDO::PARAM_BOOL);
        $stmt->bindParam(':deadline', $this->deadline);
        $stmt->bindParam(':creator', $this->creator, PDO::PARAM_INT);
        
        if ($stmt->execute()){

            return $this->db->lastInsertId();
        }

        return null;
    }
    public function getAllProjects(): array{
        $sql = "SELECT * FROM project_data_view";

        $stmt = $this->db->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_OBJ) ?? null;
    }

    public function assignMember($projectId, $memberId){
        $sql = "INSERT INTO project_members (project_id, user_id) VALUES (:pId, :mId);";

        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':pId', $projectId);
        $stmt->bindParam(':mId', $memberId);

        if ($stmt->execute()){
            return true;
        }

        return false;
    }
}