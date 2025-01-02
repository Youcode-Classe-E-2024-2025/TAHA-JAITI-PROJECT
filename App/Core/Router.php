<?php

class Router {
    private array $routes = [];


    public function addRoute (string $method ,string $path, string $action): void {
        $method = strtoupper($method);
        $this->routes[$method][$path] = $action;
    }

    public function run(string $requestUri, string $requestMethod): void {
        $path = parse_url($requestUri, PHP_URL_PATH);
        $method = strtoupper($requestMethod);

        if (isset($this->routes[$method][$path])) {
            [$controllerName, $methodName] = explode('@', $this->routes[$method][$path]);

                if (class_exists($controllerName)) {
                    $controller = new $controllerName();

                    if (method_exists($controller, $methodName)) {
                        $controller->$methodName();
                        return;
                    }
                }
            }
        }

}