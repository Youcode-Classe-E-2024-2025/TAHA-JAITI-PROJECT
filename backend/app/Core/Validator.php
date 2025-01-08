<?php

class Validator {
    public static function validateUser($data): array {
        $errors = [];

        if (empty($data->name)){
            $errors[] = 'Name is required';
        }

        if (empty($data->email)) {
            $errors[] = 'Email is required.';
        } elseif (!filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
            $errors[] = 'Invalid email format.';
        }

        if (empty($data->password)) {
            $errors[] = 'Password is required.';
        } elseif (strlen($data->password) < 8){
            $errors[] = 'Password must be 8 characters long';
        }

        return $errors;
    }

    public static function validateProject($data): array {
        $errors = [];

        if (empty($data->name)){
            $errors[] = 'Name is required';
        }

        if (empty($data->visibility)){
            $errors[] = 'Project privacy is required';
        }

        if (empty($data->deadline)){
            $errors[] = 'Deadline is required';
        }

        return $errors;
    }

    public static function validateTask($data): array {
        $errors = [];

        if (empty($data->title)){
            $errors[] = 'Task title is required';
        }

        if (empty($data->status)){
            $errors[] = 'Status is required';
        }

        if (empty($data->deadline)){
            $errors[] = 'Deadline is required';
        }


        return $errors;
    }

    public static function validateName($data):array{
        $errors = [];

        if (empty($data->name)){
            $errors[] = 'Name is required';
        }

        return $errors;
    }
}