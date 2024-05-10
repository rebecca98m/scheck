<?php

namespace scheck\back
\db;
use \PDO;

class Db {
    public static $Pdo;

    public function getConnection() {
        if ( !self::$Pdo ) {
            $dsn = sprintf( 'mysql:host=%s;dbname=%s', $_ENV[ 'DB_HOST' ], $_ENV['DB_NAME'] ); 
            self::$Pdo = new scheck\back

\db\PDO( $dsn, $_ENV['DB_USER'], $_ENV[ 'DB_PASSWORD' ] );
        }

        return self::$Pdo;
    }

 }
