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
        }

        return $errors;
    }

    public static function validateProject($data): array {
        $errors = [];

        if (empty($data->name)){
            $errors[] = 'Name is required';
        }

        if (empty($data->is_public)){
            $errors[] = 'Project privacy is required';
        }

        if (empty($data->deadline)){
            $errors[] = 'Deadline is required';
        }

        return $errors;

    }
}