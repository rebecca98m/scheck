<?php

namespace App\Http\Controllers;

use App\Responses\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PHPUnit\Exception;

class LoginController extends Controller
{
    public function authenticate(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            return Response::response(Auth::user());
        }

        return Response::response(NULL, 400, "Credenziali non valide");
    }

    public function logout(Request $request): JsonResponse
    {
        try {
            $request->session()->invalidate();
        }
        catch (Exception $e) {
            return Response::response(NULL, 400, $e->getMessage());
        }

        return Response::response(NULL);
    }
}
