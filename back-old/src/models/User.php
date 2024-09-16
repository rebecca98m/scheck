<?php

namespace scheck\back\models;
use NilPortugues\Sql\QueryBuilder\Builder\MySqlBuilder;

class User extends ModelBase {

    public ?int $id;
    public ?string $name;
    public ?string $mail;
    public ?string $password;
    protected function map(): array {
        return [
            "user_id" => "id",
            "name" => "name",
            "mail" => "mail",
            "password" => "password"
        ];
    }

    public function jsonSerialize() {
        return [
            'user_id' => $this->id,
            'name' => $this->name,
            'mail' => $this->mail,
            'password' => $this->password
        ];
    }

    public function login($data) {
        $builder = new MySqlBuilder();

        $query = $builder->select("user")
            ->where()
            ->equals("name", $data["name"])
            ->equals("password", $data["password"])
            ->end();

        return $this->Db->fetchOne($builder->writeFormatted($query), $builder->getValues());
    }

    public function checkToken(string $token): bool {
        $builder = new MySqlBuilder();

        $query = $builder->select("token")
            ->where()
            ->equals("user", $this->id)
            ->equals("expired", 0)
            ->end();

        $data = $this->Db->fetchOne($builder->writeFormatted($query), $builder->getValues());

        if(isset($data['token']) && $data['token'] == $token ) {
            return true;
        }
        return false;
    }
}