<?php
require_once __DIR__ . '/../app/bootstrap.php';

set_error_handler('ErrorHandler::handleError');
set_exception_handler('ErrorHandler::handleException');
// header('Content-Type: application/json');

$router = new Router();

$router->addRoute('POST', '/users', 'UserController@create');

$router->run($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);

Database::initializeDatabase();