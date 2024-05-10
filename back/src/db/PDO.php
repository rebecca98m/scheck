<?php

namespace scheck\back

\db;

class PDO extends \PDO {

    public function executeQuery(string $query, array $params = []) {
        $statement = $this->prepare($query);

        foreach ($params as $key => $value) {
            $statement->bindValue($key, $value);
        }

        $statement->execute();

        return $statement;

    }

    public function fetchOne(string $query, array $params = []) {
        $statement = $this->executeQuery($query, $params);
        return $statement->fetch(\PDO::FETCH_ASSOC);
    }
    public function fetchAll(string $query, array $params = []) {
        $statement = $this->executeQuery($query, $params);
        return $statement->fetchAll(\PDO::FETCH_ASSOC);
    }

}