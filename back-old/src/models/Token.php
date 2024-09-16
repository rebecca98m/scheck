<?php

namespace scheck\back\models;

use DateInterval;
use DateTime;
use NilPortugues\Sql\QueryBuilder\Builder\MySqlBuilder;

class Token extends ModelBase {

    public ?int $id;
    public ?string $token;
    public ?int $user;
    public ?string $expiration_time;
    public ?bool $expired = false;

    protected function map(): array {
        return [
            "token_id" => "id",
            "token" => "token",
            "user" => "user",
            "expiration_time" => "expiration_time",
            "expired" => "expired"
        ];
    }

    public function jsonSerialize(): array {
        return [
            'token_id' => $this->id,
            'token' => $this->token,
            'user' => $this->user,
            'expiration_time' => $this->expiration_time,
            'expired' => $this->expired
        ];
    }

    public function add(string $token, int $user_id) {
        $time = (new DateTime())->add(new DateInterval('PT6H'));
        $time = $time->format('Y-m-d H:i:s');
        $this->token = $token;
        $this->user = $user_id;
        $this->expiration_time =$time;

        //$this->expireOthers($user_id);

        $this->insert();
    }

    public function expireOthers(int $user_id) {
        $builder = new MySqlBuilder();

        $query = $builder->select("token")
            ->where()
            ->equals("user", $user_id)
            ->equals("expired", false)
            ->end();

        $data = $this->Db->fetchAll($builder->writeFormatted($query), $builder->getValues());

        foreach ($data as $row) {
            $token = Token::loadById($row['token_id']);
            $token->expired = true;
            $token->update();
        }
    }
}