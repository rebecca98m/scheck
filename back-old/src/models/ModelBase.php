<?php

namespace scheck\back

\models;

use NilPortugues\Sql\QueryBuilder\Builder\GenericBuilder;
use NilPortugues\Sql\QueryBuilder\Builder\MySqlBuilder;
use scheck\back

\db\Db;
use scheck\back

\db\PDO;
use Stringy\Stringy;

abstract class ModelBase {
    protected PDO $Db;
    public ?int $id;

    private string $TableName;

    /**
     * @param Db $Db
     */
    public function __construct() {
        $this->Db = (new Db())->getConnection();


        $this->TableName = $this->getTableName();
    }

    private function getTableName() {
        $fqn = get_class( $this );
        $exploded = explode( '\\', $fqn );
        $name = end( $exploded );
        return Stringy::create($name)->underscored()->toLowerCase();
    }

    abstract protected function map(): array;
    abstract public function jsonSerialize();

    private function getDataAsArray(): array{
        $values = [];
        foreach ($this->map() as $dbName => $propertyName) {
            if (!property_exists($this, $propertyName)) {
                throw new \Exception('Property: ' . $propertyName . ' doesn\'t exists');
            }

            $value = $this->{$propertyName} ?? null;

            if (!$value) {
                continue;
            }

            $values[$dbName] = $value;
        }

        return $values;
    }


    public function insert(): self {
        $values = $this->getDataAsArray();

        $builder = new MySqlBuilder();
        $query = $builder->insert($this->TableName, $values);

        $this->Db->executeQuery($builder->writeFormatted($query), $builder->getValues());
        $id = $this->Db->lastInsertId();
        return self::loadById($id);

    }

    public function associate(array $values): void {
        $fields = $this->map();

        foreach ($values as $key => $value) {
            if(!isset($fields[$key])) {
                throw  new \Exception('Property: ' . $key . ' doesn\'t exists');
            }
            $field = $fields[$key];

            $this->{$field} = $value;
        }
    }

    public static function loadById($id): self {
        $model = new static();
        $model->id = $id;
        try {
            $model->refreshData();
            return $model;
        }
        catch (\Exception $e) {
            throw new \Exception('Id ' . $id . ' not found');
        }
    }

    private function refreshData() {
        $builder = new MySqlBuilder();

        $idField = array_key_first($this->map());
        $query = $builder->select($this->TableName)
            ->where()
            ->equals($idField, $this->id)
            ->end();

        $array = $this->Db->fetchOne($builder->writeFormatted($query), $builder->getValues());
        if(is_array($array)) {
            $this->associate($array);
        }
        else {
            throw new \Exception('Element not found');
        }
    }

    public function update() {

        $idField = array_key_first($this->map());
        $values = $this->getDataAsArray();
        $builder = new MySqlBuilder();
        $query = $builder->update($this->TableName)
            ->setValues($values)
            ->where()
            ->equals($idField, $this->id)
            ->end();

        $this->Db->fetchOne($builder->writeFormatted($query), $builder->getValues());
    }
}
