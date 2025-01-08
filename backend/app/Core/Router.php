<?php

// i dont even understand how this router works yet, but ill have to suck it up
// because i need to finish this project, ill understand it later O_o

class Router
{
    private array $routes = [];
    private array $middlewares = [];

    public function addRoute(string $method, string $path, string $action, array $middlewares = []): void
    {
        $method = strtoupper($method);
        $this->routes[$method][$path] = [
            'action' => $action,
            'middlewares' => $middlewares
        ];
    }

    public function addMiddleware(callable $middleware): void
    {
        $this->middlewares[] = $middleware;
    }

    public function run(string $requestUri, string $requestMethod): void
    {
        $path = parse_url($requestUri, PHP_URL_PATH);
        $method = strtoupper($requestMethod);

        foreach ($this->routes[$method] ?? [] as $route => $data) {
            $params = $this->matchRoute($route, $path);

            if ($params !== false) {
                $this->executeMiddlewares($data['middlewares'], $requestUri, $requestMethod);

                [$controllerName, $methodName] = explode('@', $data['action']);
                if (class_exists($controllerName)) {
                    $controller = new $controllerName();
                    if (method_exists($controller, $methodName)) {
                        call_user_func_array([$controller, $methodName], $params);
                        return;
                    }
                }

                http_response_code(500);
                echo "Controller or method not found.";
                return;
            }
        }

        http_response_code(404);
        echo "Route not found.";
    }

    private function matchRoute(string $route, string $path): array|false
    {
        $routeRegex = preg_replace('/\{([a-zA-Z0-9_]+)\}/', '(?P<$1>[^/]+)', $route);
        $routeRegex = "@^" . $routeRegex . "$@";

        if (preg_match($routeRegex, $path, $matches)) {
            return array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);
        }

        return false;
    }

    private function executeMiddlewares(array $middlewares, string $uri, string $method): void
    {
        foreach ($this->middlewares as $globalMiddleware) {
            $globalMiddleware($uri, $method);
        }

        foreach ($middlewares as $middleware) {
            $middleware($uri, $method);
        }
    }
}
