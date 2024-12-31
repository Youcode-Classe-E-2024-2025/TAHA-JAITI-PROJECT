<?php

class Router {
    private array $routes = [];


    public function addRoute (string $path, string $method): void {
        $this->routes[$path] = $method;
    }

    public function run(string $requestURI): void {
        $path = parse_url($requestURI, PHP_URL_PATH);

        echo $path;
    }

}