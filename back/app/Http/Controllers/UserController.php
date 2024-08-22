<?php

namespace App\Http\Controllers;

use App\Responses\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getUserInfo(Request $request): JsonResponse
    {
        $data = auth('sanctum')->user();
        $data1 = Auth::user();
        return Response::response($data1);
        //return Response::response(NULL, 400, "Credenziali non valide");
    }
}
