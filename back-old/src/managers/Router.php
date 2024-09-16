<?php

namespace scheck\back\managers;

use Closure;
use scheck\back\controllers\UserController;


class Router {

    public array $pathTree = [];
    private array $params = [];

    private function registerRoutes() {
        $this->insertRoute("user/signup", function () {
            (new UserController())->userSignup();
        });
        $this->insertRoute("user/login", function () {
            (new UserController())->userLogin();
        });

    }

    public function init() {
        $this->params = [];
        $this->registerRoutes();

        $path = $this->getPathAsArray($_SERVER['REQUEST_URI']);
        $route = $this->searchPath($path, $this->pathTree);

        $route(... $this->params);
    }

    private function searchPath(array $path, array $tree): Closure {

        if(!count($path)) {
            return function () {
                echo "404";
            };
        }

        $index = $path[0] ?? $path;
        $newTree = $tree[$index] ?? false;

        if ($newTree) {
            if (is_callable($newTree)) {
                return $newTree;
            }
            if (count($path) > 1) {
                array_splice($path, 0, 1);
                return $this->searchPath($path, $newTree);
            }
            return $newTree['index'] ?? function () {
                echo "404";
            };
        }

        foreach ($tree as $key=>$value) {

            if (str_starts_with($key, '{')) {
                $this->params[] = $path[0];
                $newTree = $value;
                if (count($path) > 1) {
                    if (is_array($newTree)) {
                        array_splice($path, 0, 1);
                        return $this->searchPath($path, $newTree);
                    }
                    return function () {
                        echo "404";
                    };

                }
                if (isset($value) && is_callable($value)) {
                    return $value;
                }
            }
        }

        return $newTree['index'] ?? function () {
            echo "404";
        };
    }

    private function insertRoute(string $path, Closure $closure) {
        $path = explode("/", $path);
        $newRoute = $this->getRouteAsArray($path, $closure);
        $this->pathTree = array_merge_recursive($this->pathTree, $newRoute);
    }

    private function getRouteAsArray(array $path, Closure $closure): array {
        $value = $closure;
        while ($key = array_pop($path)) {
            $value = [$key => $value];
        }
        return $value;
    }
    public function getPathAsArray(string $uri): array {
        $array = explode("/", $uri);
        array_splice($array, 0, 2);
        return $array;
    }



}