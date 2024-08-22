<?php

namespace scheck\back\managers;

use Exception;
use scheck\back\controllers\UserController;
use scheck\back\models\Response;
use scheck\back\models\User;

class Session {

    public static $token;
    public static User $user;

    public function getToken() {
        if ( !self::$token ) {
            throw new Exception("Token is not set. You must be logged in for this function.");
        }

        return self::$token;
    }

    public function setToken(string $token) {
        self::$token=$token;
    }


    public function getUserId(){
        if(!self::$user) {
            throw new Exception("You must be logged in for this function.");
        }

        return self::$user->id;
    }
    public function authentication() {

        $data = apache_request_headers();

        if(!isset($data["token"])) {
            $this->authenticationError("param token missing");
        }

        $userController = new UserController();
        $user = $userController->tokenLogin($data["token"]);
        if($user) {
            self::$user = $user;
        }
        else {
            $this->authenticationError("param token wrong");
        }

    }

    public function authenticationError(string $error = "Authentication error") {
        (new Response())->response([], 401, $error);
        exit();
    }

}