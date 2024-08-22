<?php

namespace scheck\back\utils;

use NilPortugues\Sql\QueryBuilder\Builder\MySqlBuilder;
use scheck\back\db\Db;


class validation {

    public function require($data): bool{
        return $data !== null;
    }

    public static function isDate($date): bool {
        return is_string($date) &&
            preg_match("/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/", $date);
    }

    public static function isDateTime($date): bool {
        return is_string($date) &&
            preg_match("/^([0-2][0-9]{3})\-(0[1-9]|1[0-2])\-([0-2][0-9]|3[0-1]) ([0-1][0-9]|2[0-3]):([0-5][0-9])\:([0-5][0-9])( ([\-\+]([0-1][0-9])\:00))?$/", $date);
    }

    public static function unique($tableName, $name, $value): bool {
        $db = (new Db())->getConnection();
        $builder = new MySqlBuilder();
        $query = $builder->select($tableName)
            ->where()
            ->equals($name, ($value))
            ->end();

        $data = $db->fetchOne($builder->writeFormatted($query), $builder->getValues());
        if($data) {
            return false;
        }
        return true;

    }



}