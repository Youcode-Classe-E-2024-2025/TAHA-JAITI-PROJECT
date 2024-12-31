<?php
require_once __DIR__ . '/../app/bootstrap.php';

set_error_handler('ErrorHandler::handleError');
set_exception_handler('ErrorHandler::handleException');
// header('Content-Type: application/json');

$router = new Router();

$router->addRoute('/login', 'POST');
$router->run($_SERVER['REQUEST_URI']);

Database::initializeDatabase();