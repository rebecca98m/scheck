<?php


use scheck\back\bootstrap\DotEnv;
use scheck\back\managers\Router;

require_once __DIR__ . '/vendor/autoload.php';

(new DotEnv())->init();
(new Router())->init();
