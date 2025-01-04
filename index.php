<?php
require_once __DIR__ . '/App/bootstrap.php';

set_error_handler('ErrorHandler::handleError');
set_exception_handler('ErrorHandler::handleException');

header('Content-Type: application/json');

Database::initializeDatabase();
$router = new Router();

//auth routes
$router->addRoute('POST', '/api/register', 'AuthController@register');
$router->addRoute('POST', '/api/login', 'AuthController@login');
$router->addRoute('GET', '/api/logout', 'AuthController@logout');

//project routes
$router->addRoute('POST', '/api/project', 'ProjectController@createProject');
$router->addRoute('POST', '/api/project/assign', 'ProjectController@assignMember');
$router->addRoute('GET', '/api/project', 'ProjectController@getAllProjects');
$router->addRoute('DELETE', '/api/project', 'ProjectController@deleteProject');

//task routes
$router->addRoute('POST', '/api/task', 'TaskController@createTask');
$router->addRoute('POST', '/api/task/assign', 'TaskController@assignTask');
$router->addRoute('GET', '/api/task', 'TaskController@getAllTasks'); //get project tasks based on project id
$router->addRoute('DELETE', '/api/task', 'TaskController@deleteTask');
$router->addRoute('PUT', '/api/task/status', 'TaskController@updateStatus');

//category routes
$router->addRoute('POST', '/api/categories', 'CategoryController@createCat');
$router->addRoute('GET', '/api/categories', 'CategoryController@getAllCategories');
$router->addRoute('POST', '/api/categories/assign', 'CategoryController@assignCat');

//tag routes
$router->addRoute('POST', '/api/tags', 'TagController@createTag');
$router->addRoute('GET', '/api/tags', 'TagController@getTags');
$router->addRoute('POST', '/api/tags/assign', 'TagController@assignTag');

//user routes
$router->addRoute('GET', '/api/users', 'UserController@getUsers');
$router->addRoute('GET', '/api/users/projects/', 'UserController@getProjectUsers');

$router->run($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);
