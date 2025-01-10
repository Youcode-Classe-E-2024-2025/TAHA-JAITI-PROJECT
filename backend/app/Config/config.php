<?php

const DB_HOST = 'localhost';
const DB_PORT = '5432';
const DB_USER = 'postgres';
const DB_PASS = 'root';
const DB_NAME = 'test';

const SQL_DATABASE = "
-- ENUM Types
CREATE TYPE vis AS ENUM ('private', 'public');
CREATE TYPE task_status AS ENUM ('todo', 'in_progress', 'completed');

-- Roles Table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL
);

-- Permissions Table
CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

-- Role-Permissions Table
CREATE TABLE role_perms (
    role_id INTEGER NOT NULL,
    perm_id INTEGER NOT NULL,
    PRIMARY KEY (role_id, perm_id),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (perm_id) REFERENCES permissions(id) ON DELETE CASCADE
);

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role INTEGER NOT NULL DEFAULT 3 REFERENCES roles(id) ON DELETE SET DEFAULT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Projects Table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    visibility vis NOT NULL DEFAULT 'private',
    deadline TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    creator_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT
);

-- Categories Table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tags Table
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(7) DEFAULT '#000000'
);

-- Tasks Table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    status task_status DEFAULT 'todo',
    deadline TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL
);

-- Project Members Table
CREATE TABLE project_members (
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL DEFAULT 'member',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (project_id, user_id)
);

-- Task-Tags Table
CREATE TABLE task_tags (
    task_id INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (task_id, tag_id)
);

-- User Assignments Table
CREATE TABLE user_assignments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    task_id INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Activity Logs Table
CREATE TABLE activity_logs (
    id SERIAL PRIMARY KEY,
    project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert Fake Data
INSERT INTO roles (name) VALUES 
('Admin'), 
('Chief'),  
('Member'),  
('Guest');

-- Insert Permission Data
INSERT INTO permissions (name) VALUES
('view_all_users'),
('view_user'),
('create_user'),
('update_user'),
('delete_user'),
('view_all_roles'),
('view_role'),
('create_role'),
('update_role'),
('delete_role'),
('view_role_permissions'),
('assign_role_permissions'),
('view_all_permissions'),
('view_permission'),
('view_all_projects'),
('view_project'),
('create_project'),
('update_project'),
('delete_project'),
('view_project_users'),
('view_all_tasks'),
('view_task'),
('create_task'),
('update_task'),
('delete_task'),
('assign_task_tag'),
('clear_task_tags'),
('assign_task_category'),
('assign_task_user'),
('clear_task_user'),
('view_category'),
('view_all_categories'),
('create_category'),
('update_category'),
('delete_category'),
('view_tag'),
('view_all_tags'),
('create_tag'),
('update_tag'),
('delete_tag');

INSERT INTO role_perms (role_id, perm_id)
SELECT 1, id FROM permissions;

INSERT INTO role_perms (role_id, perm_id)
SELECT 2, id FROM permissions
WHERE name IN (
    'view_all_projects', 'view_project', 'create_project', 'update_project', 'delete_project',
    'view_project_users', 'view_all_tasks', 'view_task', 'create_task', 'update_task', 'delete_task',
    'assign_task_tag', 'clear_task_tags', 'assign_task_category', 'assign_task_user', 'clear_task_user',
    'view_category', 'view_all_categories', 'create_category', 'update_category', 'delete_category',
    'view_tag', 'view_all_tags', 'create_tag', 'update_tag', 'delete_tag'
);

INSERT INTO role_perms (role_id, perm_id)
SELECT 3, id FROM permissions
WHERE name IN (
    'view_all_projects', 'view_project', 'view_all_tasks', 'view_task', 'update_task'
);

";