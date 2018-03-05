<?php

namespace App\Http\Controllers;

use App\Plan;
use App\User;
use App\Exercise;

use Illuminate\Http\Request;
use Validator;

class PlanController extends Controller
{
    public function index(Request $request)
    {
        $plans = Plan::all();

        return response()->json(compact('plans'));
    }

    public function create(Request $request)
    {
        $exercises = Exercise::all();

        return response()->json(compact('exercises'));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|unique:posts|max:255',
            'body' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'messages' => $validator->errors(),
            ], 400);
        }

        $user = new User;
        $user->name = $request->get('name');
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
            'title' => 'required|unique:posts|max:255',
            'body' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'messages' => $validator->errors(),
            ], 400);
        }

        $user->name = 'amir';
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
