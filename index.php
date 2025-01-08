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

//auth
$router->addRoute('POST', '/api/auth/login', 'AuthController@login');
$router->addRoute('POST', '/api/auth/register', 'AuthController@register');
$router->addRoute('GET', '/api/auth/me', 'AuthController@getMe');

//users
$router->addRoute('GET', '/api/users', 'UserController@getAll');
$router->addRoute('GET', '/api/users/{id}', 'UserController@getById');
$router->addRoute('POST', '/api/users', 'UserController@create');
$router->addRoute('PUT', '/api/users/{id}', 'UserController@update');
$router->addRoute('DELETE', '/api/users/{id}', 'UserController@delete');

//roles
$router->addRoute('GET', '/api/roles', 'RolesController@getAll');
$router->addRoute('GET', '/api/roles/{id}', 'RolesController@getById');
$router->addRoute('POST', '/api/roles', 'RolesController@create');
$router->addRoute('PUT', '/api/roles/{id}', 'RolesController@update');
$router->addRoute('DELETE', '/api/roles/{id}', 'RolesController@delete');
$router->addRoute('GET', '/api/roles/{id}/permissions', 'RolesController@getRolePerms');
$router->addRoute('POST', '/api/roles/{id}/permissions', 'RolesController@assignPerms');


//permissions
$router->addRoute('GET', '/api/permissions', 'PermsController@getAll');
$router->addRoute('GET', '/api/permissions/{id}', 'PermsController@getById');

//projects
$router->addRoute('GET', '/api/projects', 'ProjectController@getPublic');
$router->addRoute('GET', '/api/projects/my', 'ProjectController@getMe');
$router->addRoute('GET', '/api/projects/{id}', 'ProjectController@getById');
$router->addRoute('POST', '/api/projects', 'ProjectController@create');
$router->addRoute('PUT', '/api/projects/{id}', 'ProjectController@update');
$router->addRoute('DELETE', '/api/projects/{id}', 'ProjectController@delete');
$router->addRoute('GET', '/api/projects/{id}/users', 'ProjectController@getUsers');

//tasks
$router->addRoute('GET', '/api/tasks/project/{id}', 'TaskController@getByProject');
$router->addRoute('GET', '/api/tasks', 'TaskController@getAll');
$router->addRoute('GET', '/api/tasks/{id}', 'TaskController@getById');
$router->addRoute('POST', '/api/tasks', 'TaskController@create');
$router->addRoute('PUT', '/api/tasks/{id}', 'TaskController@update');
$router->addRoute('DELETE', '/api/tasks/{id}', 'TaskController@delete');
$router->addRoute('POST', '/api/tasks/{id}/tags', 'TaskController@assignTag');
$router->addRoute('DELETE', '/api/tasks/{id}/tags', 'TaskController@clearTags');
$router->addRoute('POST', '/api/tasks/{id}/category', 'TaskController@assignCat');
$router->addRoute('POST', '/api/tasks/{id}/assign', 'TaskController@assignUser');
$router->addRoute('DELETE', '/api/tasks/{id}/assign', 'TaskController@clearUser');




// /tasks/:id/tags       POST    Authenticated    Assign tags to a task
// /tasks/:id/category   POST    Authenticated    Assign a category to a task
// /tasks/:id/assign     POST    Authenticated    Assign a user to a task
// /tasks/:id/assign     DELETE  Authenticated    Unassign a user from a task


//categories
$router->addRoute('GET', '/api/categories/{id}', 'CategoryController@getById');
$router->addRoute('GET', '/api/categories', 'CategoryController@getAll');
$router->addRoute('POST', '/api/categories', 'CategoryController@create');
$router->addRoute('PUT', '/api/categories/{id}', 'CategoryController@update');
$router->addRoute('DELETE', '/api/categories/{id}', 'CategoryController@delete');

//tags
$router->addRoute('GET', '/api/tags/{id}', 'TagController@getById');
$router->addRoute('GET', '/api/tags', 'TagController@getAll');
$router->addRoute('POST', '/api/tags', 'TagController@create');
$router->addRoute('PUT', '/api/tags/{id}', 'TagController@update');
$router->addRoute('DELETE', '/api/tags/{id}', 'TagController@delete');




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