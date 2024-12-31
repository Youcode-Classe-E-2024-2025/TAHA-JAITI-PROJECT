<?php

interface UserInterface {
    public function register(): int;
    public function login(object $user, string $password): bool;
    public function getUserByEmail(string $email): object | null;
    public function getProjects(): array;
    public function getTasks(): array;
}