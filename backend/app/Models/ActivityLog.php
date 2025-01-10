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
        
        $stmt->bindParam(':project_id', $projectId, PDO::PARAM_INT);
        $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
        $stmt->bindParam(':action', $action, PDO::PARAM_STR);
        $stmt->bindParam(':details', $details, PDO::PARAM_STR);

        $stmt->execute();
    }

    public function getActivitiesByProjectId(int $projectId): array
    {
        $query = "SELECT * FROM activity_logs WHERE project_id = :project_id ORDER BY created_at DESC";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':project_id', $projectId);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}