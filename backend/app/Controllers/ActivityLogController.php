<?php

class ActivityLogController extends GenericController
{
    private $activityLog;

    public function __construct()
    {
        $this->activityLog = new ActivityLog();
    }
    public function getTimeline(int $projectId): void
    {
        try {
            $activities = $this->activityLog->getActivitiesByProjectId($projectId);

            if (empty($activities)) {
                $this->successResponse([], 'No activities found for this project');
                return;
            }

            $this->successResponse($activities, 'Timeline retrieved successfully');
        } catch (Exception $e) {
            $this->errResponse('An unexpected error occurred: ' . $e->getMessage(), 500);
        }
    }
}