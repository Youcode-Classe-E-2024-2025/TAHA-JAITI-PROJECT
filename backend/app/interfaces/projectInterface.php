<?php

interface ProjectInterface {
    public function createProject(): bool;
    public function updateProject(int $id): bool;
    public function deleteProject(int $id): bool;
}

