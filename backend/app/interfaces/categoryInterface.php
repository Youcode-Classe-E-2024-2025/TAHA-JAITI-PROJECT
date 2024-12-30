<?php

interface CategoryInterface {
    public function create(): bool;
    public function update(): bool;
    public function delete(): bool;
    public function getTasks(): array;
}