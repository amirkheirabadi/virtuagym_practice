<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::resource('/users', 'UserController', ['except' => [
    'show', 'create'
]]);


Route::resource('/plans', 'PlanController', ['except' => [
    'show'
]]);

Route::get('/plans/assign_list/{id}', 'PlanController@assign');
Route::post('/plans/assign/{id}', 'PlanController@setassign');
Route::post('/plans/unassign/{id}', 'PlanController@unassign');