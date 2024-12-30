<?php
class Database {
    private $host = DB_HOST;
    private $port = DB_PORT;
    private $dbname = DB_NAME;
    private $user = DB_USER;
    private $password = DB_PASS;
    private $pdo;

    public function __construct() {
        $this->initializeDatabase();
    }

    private function initializeDatabase(): void {
        $dsn = "pgsql:host={$this->host};port={$this->port}";
        try {
            $tempPdo = new PDO($dsn, $this->user, $this->password);
            $tempPdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $stmt = $tempPdo->query("SELECT 1 FROM pg_database WHERE datname = '{$this->dbname}'");
            $exists = $stmt->fetchColumn();

            if (!$exists) {
                $tempPdo->exec("CREATE DATABASE {$this->dbname}");
            }

            $tempPdo = null;

            $this->connect();

            $this->initializeTables();

        } catch (PDOException $e) {
            throw new Exception($e);
        }
    }

    private function initializeTables(): void {
        try {
            $stmt = $this->pdo->query("SELECT to_regclass('public.users')");
            $usersExist = $stmt->fetchColumn();

            if (!$usersExist) {
                $sql = SQL_DATABASE;
                $this->pdo->exec($sql);
            }
        } catch (PDOException $e) {
            throw new Error($e);
        }
    }

    public function connect(): void {
        $dsn = "pgsql:host={$this->host};port={$this->port};dbname={$this->dbname}";
        try {
            $this->pdo = new PDO($dsn, $this->user, $this->password);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo 'Connection failed: ' . $e->getMessage();
            die();
        }
    }

    public function getConnection(): PDO {
        return $this->pdo;
    }

    public function closeConnection(): void {
        $this->pdo = null;
        echo 'Connection closed';
    }
}