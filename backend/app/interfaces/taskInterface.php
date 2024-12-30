<?php

interface TaskInterface {
    public function create(): bool;
    public function update(): bool;
    public function delete(): bool;
    public function changeStatus(string $status): bool;
    public function assignUser(object $user): bool;
    public function setCategory(int $categoryId): bool;
    public function addTag(int $tagId): bool;
}