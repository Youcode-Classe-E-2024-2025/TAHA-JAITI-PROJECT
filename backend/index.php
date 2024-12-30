<?php

require_once __DIR__ . '/app/bootstrap.php';

Loader::load();

$db = new Database();
$conn = $db->getConnection();