<?php

class UserValidator {
    public static function validate($data): array {
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
}