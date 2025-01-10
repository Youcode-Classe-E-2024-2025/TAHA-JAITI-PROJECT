<?php


class ActivityLog{
    private $db;

    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    public function logActivity($projectId, $userId, $action, $details = null)
    {
        $stmt = $this->db->prepare("INSERT INTO activity_logs (project_id, user_id, action, details, created_at) 
                                    VALUES (:project_id, :user_id, :action, :details, CURRENT_TIMESTAMP)");
        
        $stmt->bindParam(':project_id', $projectId);
        $stmt->bindParam(':user_id', $userId);
        $stmt->bindParam(':action', $action);
        $stmt->bindParam(':details', $details);

        $stmt->execute();
    }

    public function getActivitiesByProjectId(int $projectId): array
    {
        $query = "SELECT 
                    activity_logs.*, 
                    users.name AS name 
                FROM 
                    activity_logs 
                JOIN 
                    users 
                ON 
                    activity_logs.user_id = users.id 
                WHERE 
                    activity_logs.project_id = :project_id
                ORDER BY 
                    activity_logs.created_at DESC";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':project_id', $projectId);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}