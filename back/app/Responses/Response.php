<?php

namespace App\Responses;

class Response
{
    public static function response($data, int $statusCode = 200, string $error = "")
    {
        $hasError = true;
        if ($statusCode == 200) {
            $hasError = false;
        }
        $response = [
            "statusCode" => $statusCode,
            "statusMessage" => "0",
            "result" => $data,
            "error" => $error,
            "hasError" => $hasError
        ];

        return  \Illuminate\Support\Facades\Response::json(
            data: $response,
            status: $statusCode
        );
    }
}
