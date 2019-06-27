<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::get('list', 'api\ListController@index');
Route::get('list/{category}', 'api\ListController@category');
 */

Route::prefix('v1')->group(function() {
    Route::get('list', 'api\ListController@index');
    Route::get('list/{category}', 'api\ListController@category');
    Route::post('login', 'api\AuthController@login');
    Route::post('register', 'api\AuthController@register');
    Route::group(['middleware' => 'auth:api'], function() {
        Route::post('getUser', 'api\AuthController@getUser');
    });
});

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/
