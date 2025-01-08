<?php


class ActivityLog{
    private $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function logAction($projectId, $userId, $action, $details = null)
    {
        $stmt = $this->db->prepare("INSERT INTO activity_logs (project_id, user_id, action, details, created_at) 
                                    VALUES (:project_id, :user_id, :action, :details, CURRENT_TIMESTAMP)");
        
        $stmt->bindParam(':project_id', $projectId, PDO::PARAM_INT);
        $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
        $stmt->bindParam(':action', $action, PDO::PARAM_STR);
        $stmt->bindParam(':details', $details, PDO::PARAM_STR);

        $stmt->execute();
    }
}