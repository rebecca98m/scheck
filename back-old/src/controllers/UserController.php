<?php

namespace scheck\back\controllers;
use Exception;
use NilPortugues\Sql\QueryBuilder\Builder\MySqlBuilder;
use scheck\back\db\Db;
use scheck\back\managers\Session;
use scheck\back\models\Response;
use scheck\back\models\Token;
use scheck\back\models\User;
use scheck\back\utils\validation;

class UserController {

    public User $user;

    public function __construct() {
        $this->user = new User();
    }

    public function userSignup() {

        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // get posted data
            $data = json_decode(file_get_contents("php://input", true));

            $data = (array) $data;

            $error = $this->checkData($data, true);

            if($error) {
                (new Response())->response([], 400, $error);
                exit();
            }

            try {
                $this->user->associate($data);
                $this->user->insert();
            }
            catch (Exception $ex) {
                (new Response())->response([], 400, $ex->getMessage());
                exit();
            }

            $this->login($data);
        }

    }

    public function userLogin() {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // get posted data
            $data = json_decode(file_get_contents("php://input", true));

            $data = (array) $data;

            $error = $this->checkData($data);

            if($error) {
                (new Response())->response([], 400, $error);
                exit();
            }

            $this->login($data);
        }
    }

    public function tokenLogin(string $token) {
        $builder = new MySqlBuilder();
        $db = (new Db())->getConnection();

        $query = $builder->select("token")
            ->where()
            ->equals("token", $token)
            ->equals("expired", 0)
            ->end();

        $data = $db->fetchOne($builder->writeFormatted($query), $builder->getValues());

        if(isset($data['user'])) {
            $this->user = User::loadById($data['user']);
            return $this->user;
        }
        return false;

    }

    private function login($data) {
        $user = $this->user->login($data);


        if(!$user) {
            (new Response())->response([], 401, "wrong username or password");
            exit();
        }
        $this->user->associate($user);


        $token = bin2hex(random_bytes(16));
        (new Session())->setToken($token);

        $token_object = new Token();
        $token_object->add($token, $this->user->id);

        $u = [
            "user_id" => $this->user->id,
            "email" => $this->user->mail,
            "passport" => $token,
            "username" => $this->user->name,
        ];

        (new Response())->response($u);
    }

    public static function userExist(int $user): bool {
        $db = (new Db())->getConnection();
        $user = (new Session())->getUserId();
        $builder = new MySqlBuilder();
        $query = $builder->select("user")
            ->where()
            ->equals("user_id", ($user))
            ->end();

        $data = $db->fetchOne($builder->writeFormatted($query), $builder->getValues());
        if($data) {
            return true;
        }
        return false;
    }

    private function checkData(array $data, bool $signup = false) {
        if ($signup) {
            if (!isset($data['mail']) || $data['mail'] == null || !is_string($data['mail']) ||
                !preg_match("/^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/", $data['mail'])) {
                return "param mail missing or malformed";
            }
            if (!validation::unique('user', 'mail', $data['mail'])) {
                return "mail already used";
            }
            if (!validation::unique('user', 'name', $data['name'])) {
                return "name already taken";
            }
        }

        if (!isset($data['name']) || $data['name'] == null || !is_string($data['name'])) {
            return "param name missing or malformed";
        }

        if (!isset($data['password']) || $data['password'] == null || !is_string($data['password'])) {
            return "param password missing or malformed";
        }


        return false;
    }
}