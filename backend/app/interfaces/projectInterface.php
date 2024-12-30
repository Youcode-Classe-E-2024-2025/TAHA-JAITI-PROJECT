<?php

interface ProjectInterface {
    public function create(): bool;
    public function update(): bool;
    public function delete(): bool;

    public function assignTask(object $task): bool;
    public function getTasks(): array;
    public function getUsers(): array;
}

