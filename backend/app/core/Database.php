<?php
class Database {
    private static $host = DB_HOST;
    private static $port = DB_PORT;
    private static $dbname = DB_NAME;
    private static $user = DB_USER;
    private static $password = DB_PASS;
    private static $pdo;

    public static function initializeDatabase(): void {
        $dsn = "pgsql:host=" . self::$host . ";port=" . self::$port;
        try {
            $tempPdo = new PDO($dsn, self::$user, self::$password);
            $tempPdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $stmt = $tempPdo->query("SELECT 1 FROM pg_database WHERE datname = '" . self::$dbname . "'");
            $exists = $stmt->fetchColumn();

            if (!$exists) {
                $tempPdo->exec("CREATE DATABASE " . self::$dbname);
            }

            $tempPdo = null;

            self::connect();
            self::initializeTables();

        } catch (PDOException $e) {
            throw new Exception($e->getMessage());
        }
    }

    private static function initializeTables(): void {
        try {
            $stmt = self::$pdo->query("SELECT to_regclass('public.users')");
            $usersExist = $stmt->fetchColumn();

            if (!$usersExist) {
                $sql = SQL_DATABASE;
                self::$pdo->exec($sql);
            }
        } catch (PDOException $e) {
            throw new Error($e->getMessage());
        }
    }

    public static function connect(): void {
        $dsn = "pgsql:host=" . self::$host . ";port=" . self::$port . ";dbname=" . self::$dbname;
        try {
            self::$pdo = new PDO($dsn, self::$user, self::$password);
            self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo 'connected';
        } catch (PDOException $e) {
            echo 'Connection failed: ' . $e->getMessage();
            die();
        }
    }

    public static function getConnection(): PDO {
        if (self::$pdo === null) {
            self::initializeDatabase();
        }
        return self::$pdo;
    }

    public static function closeConnection(): void {
        self::$pdo = null;
        echo 'Connection closed';
    }
}
