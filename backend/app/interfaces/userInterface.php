<?php

interface UserInterface {
    public function register(): bool;
    public function login(): bool;
    public function getProjects(): array;
    public function getTasks(): array;
}