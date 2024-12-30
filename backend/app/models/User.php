<?php

class User implements UserInterface{
    private int $id;
    private string $name;
    private string $email;
    private string $password;
    private string $role;

    public function __construct($id, $name, $email, $password) {
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
        $this->password = $password;
    }

    public function getName(): string {
        return $this->name;
    }

    public function getEmail(): string {
        return $this->email;
    }

    public function register (): bool {
        return true;
    }

    public function login(): bool {
        return true;
    }

    public function getProjects(): array {
        return [];
    }

    public function getTasks(): array {
        return [];
    }
}