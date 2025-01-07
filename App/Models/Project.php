<?php

class Project {

    private PDO $db;
    private $id;
    private $name;
    private $description;
    private $is_public;
    private $deadline;
    private $creator;


    public function __construct(){
        $this->db = Database::getConnection();
    }
    
    public function setId($id) {$this->id = $id;}
    public function setName($name) {$this->name = $name;}
    public function setDesc($description) {$this->description = $description;}
    public function setIsPublic($is_public) {$this->is_public = $is_public;}
    public function setDeadline($deadline){$this->deadline = $deadline;}
    public function setCreator(int $id) {$this->creator = $id;}

    public function createProject(): string | null{
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
        } else {
            return null;
        }
    }

    public function deleteProject($id){
        $sql = "DELETE FROM projects WHERE id = :id";
        
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $id);

        if ($stmt->execute()){
            return true;
        }

        return false;
    }
    
    public function getAllProjects($sqlCondition, $params): array {
        $sql = "SELECT * FROM project_data WHERE $sqlCondition";
        $stmt = $this->db->prepare($sql);
        
        $stmt->execute($params);
    
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?? [];
    }

    //--------
    public function getPublic(){
        $sql = "SELECT * FROM projects WHERE visibility = 'public'";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();

        if ($stmt->rowCount() > 0){
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        return [];
    }

    public function getById(){
        $sql = "SELECT * FROM projects WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    

    //------
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