<?php
require_once __DIR__ . '/../app/bootstrap.php';
$loader = new Loader();


set_error_handler('ErrorHandler::handleError');
set_exception_handler('ErrorHandler::handleException');

header('Content-Type: application/json');

Database::initializeDatabase();

$router = new Router();

$router->addRoute('POST', '/register', 'UserController@register');

$router->run($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);
