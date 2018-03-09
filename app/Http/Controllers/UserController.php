<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Validator;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::all();

        return response()->json(compact('users'));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => 'required|email|unique:user',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'messages' => $validator->errors(),
            ], 400);
        }

        $user = new User;
        $user->firstname = $request->get('firstname');
        $user->lastname = $request->get('lastname');
        $user->email = $request->get('email');
        $user->save();

        return response()->json();
    }

    public function edit(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([], 404);
        }

        return response()->json($user);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([], 404);
        }

        $validator = Validator::make($request->all(), [
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'messages' => $validator->errors(),
            ], 400);
        }

        $user->firstname = $request->get('firstname');
        $user->lastname = $request->get('lastname');
        $user->email = $request->get('email');
        $user->save();

        return response()->json();
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([], 404);
        }

        $user->delete();

        return response()->json();
    }
}
