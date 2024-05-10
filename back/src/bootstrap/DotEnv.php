<?php

namespace scheck\back\bootstrap;

class DotEnv{
    function init() {
        $dotenv = \Dotenv\Dotenv::createImmutable(__DIR__ . "\..\..");
        $dotenv->load();
    }
}