<?php

use App\Http\Controllers\ElementValueController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SignupController;
use App\Http\Controllers\UserController;
use App\Models\ElementValue;
use Illuminate\Support\Facades\Route;

Route::post('/login', [LoginController::class, 'authenticate']);
Route::post('/register', [SignupController::class, 'register']);
Route::get('/me', [UserController::class, 'getUserInfo']);

Route::get( 'report/get/{reportId}', [ElementValueController::class, 'showAllFromReport'])->middleware('auth:sanctum');
Route::post( 'report/new', [ReportController::class, 'create'])->middleware('auth:sanctum');
Route::get( 'report/get', [ReportController::class, 'showAll'])->middleware('auth:sanctum');

