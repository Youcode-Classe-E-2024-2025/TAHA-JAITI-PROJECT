<?php

interface TaskInterface {
    public function createTask(): bool;
    public function updateTask(): bool;
    public function deleteTask(): bool;
    public function changeStatus(string $status): bool;
    public function assignUserToTask(object $user): bool;
    public function setTaskCategory(int $categoryId): bool;
    public function addTaskTag(int $tagId): bool;
}