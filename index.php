<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PATCH ,PUT');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/App/bootstrap.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

set_error_handler('ErrorHandler::handleError');
set_exception_handler('ErrorHandler::handleException');


Database::initializeDatabase();
$router = new Router();

$router->addRoute('POST', '/api/auth/login', 'AuthController@login');
$router->addRoute('POST', '/api/auth/register', 'AuthController@register');

$router->run($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);






// //auth routes
// $router->addRoute('POST', '/api/register', 'AuthController@register');
// $router->addRoute('POST', '/api/login', 'AuthController@login');
// $router->addRoute('GET', '/api/logout', 'AuthController@logout');

// //project routes
// $router->addRoute('POST', '/api/project', 'ProjectController@createProject');
// $router->addRoute('POST', '/api/project/assign', 'ProjectController@assignMember');
// $router->addRoute('GET', '/api/project', 'ProjectController@getAllProjects');
// $router->addRoute('DELETE', '/api/project', 'ProjectController@deleteProject');

// //task routes
// $router->addRoute('POST', '/api/task', 'TaskController@createTask');
// $router->addRoute('POST', '/api/task/assign', 'TaskController@assignTask');
// $router->addRoute('GET', '/api/task', 'TaskController@getAllTasks'); //get project tasks based on project id
// $router->addRoute('DELETE', '/api/task', 'TaskController@deleteTask');
// $router->addRoute('PUT', '/api/task/status', 'TaskController@updateStatus');
// $router->addRoute('PUT', '/api/task', 'TaskController@updateTask');

// //category routes
// $router->addRoute('POST', '/api/categories', 'CategoryController@createCat');
// $router->addRoute('GET', '/api/categories', 'CategoryController@getAllCategories');
// $router->addRoute('POST', '/api/categories/assign', 'CategoryController@assignCat');

// //tag routes
// $router->addRoute('POST', '/api/tags', 'TagController@createTag');
// $router->addRoute('GET', '/api/tags', 'TagController@getTags');
// $router->addRoute('POST', '/api/tags/assign', 'TagController@assignTag');

// //user routes
// $router->addRoute('GET', '/api/users', 'UserController@getUsers');
// $router->addRoute('GET', '/api/users/projects/', 'UserController@getProjectUsers');
// $router->addRoute('GET', '/api/users/stats', 'UserController@getProjectStats');
// $router->addRoute('GET', '/api/users/myprojects', 'UserController@getMyProjects');