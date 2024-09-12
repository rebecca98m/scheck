<?php

use App\Http\Controllers\ElementController;
use App\Http\Controllers\ElementValueController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SignupController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [LoginController::class, 'authenticate']);

Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');

Route::post('/register', [SignupController::class, 'register']);
Route::get('/me', [UserController::class, 'getUserInfo']);

Route::get( 'report/get/{reportId}', [ElementValueController::class, 'showAllFromReport'])->middleware('auth:sanctum');
Route::post( 'report/new', [ReportController::class, 'create'])->middleware('auth:sanctum');
Route::get( 'report/get', [ReportController::class, 'showAll'])->middleware('auth:sanctum');
Route::post( 'report/connect', [ReportController::class, 'connectToProject'])->middleware('auth:sanctum');
Route::post( 'report/disconnect', [ReportController::class, 'disconnectFromProject'])->middleware('auth:sanctum');
Route::post( 'report/edit', [ReportController::class, 'update'])->middleware('auth:sanctum');
Route::post( 'report/delete', [ReportController::class, 'delete'])->middleware('auth:sanctum');

Route::get( 'project/get/{reportId}', [ReportController::class, 'showAllFromProject'])->middleware('auth:sanctum');
Route::post( 'project/new', [ProjectController::class, 'create'])->middleware('auth:sanctum');
Route::get( 'project/get', [ProjectController::class, 'showAll'])->middleware('auth:sanctum');
Route::get( 'project/getConnectable', [ProjectController::class, 'showAllConnectableReports'])->middleware('auth:sanctum');
Route::post( 'project/edit', [ProjectController::class, 'update'])->middleware('auth:sanctum');
Route::post( 'project/delete', [ProjectController::class, 'delete'])->middleware('auth:sanctum');

Route::get( 'element/get', [ElementController::class, 'showAll'])->middleware('auth:sanctum');
Route::post( 'element/new', [ElementController::class, 'create'])->middleware('auth:sanctum');

Route::post( 'elementvalue/new', [ElementValueController::class, 'create'])->middleware('auth:sanctum');
Route::post( 'elementvalue/delete', [ElementValueController::class, 'delete'])->middleware('auth:sanctum');
Route::post( 'elementvalue/edit', [ElementValueController::class, 'update'])->middleware('auth:sanctum');

