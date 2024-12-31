<?php
require_once __DIR__ . '/../app/bootstrap.php';

set_error_handler('ErrorHandler::handleError');
set_exception_handler('ErrorHandler::handleException');

header('Content-Type: application/json');

Database::initializeDatabase();

$router = new Router();

$router->addRoute('POST', '/register', 'AuthController@register');
$router->addRoute('POST', '/login', 'AuthController@login');

$router->run($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);