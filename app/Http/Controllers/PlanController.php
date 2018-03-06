<?php

namespace App\Http\Controllers;

use App\Plan;
use App\User;
use App\Exercise;
use App\PlanDay;

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
            'plan_name' => 'required',
            'plan_description' => 'required',
            'plan_difficulty' => 'required',
            'days' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'messages' => $validator->errors(),
            ], 400);
        }

        $plan = new Plan;
        $plan->plan_name = $request->get('plan_name');
        $plan->plan_description = $request->get('plan_description');
        $plan->plan_difficulty = $request->get('plan_difficulty');
        $plan->save();

        $dayOrder = 1;
        foreach ($request->get('days') as $day) {
            $planDay = new PlanDay;
            $planDay->plan_id = $plan->id;
            $planDay->day_name = $day['name'];
            $planDay->order = $dayOrder;
            $planDay->save();

            $dayOrder++;

            $exercisOrder = 0;
            foreach ($day['exercises'] as $exe) {
                Exercise::find($exe['exercis'])->days()->save($planDay, ['exercise_duration' => $exe['duration'], 'order' => $exercisOrder]);
                $exercisOrder++;
            }
        }

        return response()->json();
    }

    public function edit(Request $request, $id)
    {
        $plan = Plan::where('id', $id)->with(['days', 'days.exercises'])->first();

        if (!$plan) {
            return response()->json([], 404);
        }

        return response()->json($plan);
    }

    public function update(Request $request, $id)
    {
        $plan = Plan::where('id', $id)->with(['days', 'days.exercises'])->first();

        if (!$plan) {
            return response()->json([], 404);
        }

        $validator = Validator::make($request->all(), [
            'plan_name' => 'required',
            'plan_description' => 'required',
            'plan_difficulty' => 'required',
            'days' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'messages' => $validator->errors(),
            ], 400);
        }

        $plan->plan_name = $request->get('plan_name');
        $plan->plan_description = $request->get('plan_description');
        $plan->plan_difficulty = $request->get('plan_difficulty');
        $plan->save();

        $existsDays = PlanDay::where('plan_id', $plan->id)->get();
        foreach ($existsDays as $exPlanDay) {
            $exPlanDay->exercises()->sync([]);
            $exPlanDay->delete();
        }
        
        $dayOrder = 1;
        foreach ($request->get('days') as $day) {
            $planDay = new PlanDay;
            $planDay->plan_id = $plan->id;
            $planDay->day_name = $day['name'];
            $planDay->order = $dayOrder;
            $planDay->save();

            $dayOrder++;

            $exercisOrder = 0;
            foreach ($day['exercises'] as $exe) {
                Exercise::find($exe['exercis'])->days()->save($planDay, ['exercise_duration' => $exe['duration'], 'order' => $exercisOrder]);
                $exercisOrder++;
            }
        }

        return response()->json();
    }

    public function destroy($id)
    {
        $plan = Plan::find($id);

        if (!$plan) {
            return response()->json([], 404);
        }

        $existsDays = PlanDay::where('plan_id', $plan->id)->get();
        foreach ($existsDays as $exPlanDay) {
            $exPlanDay->exercises()->sync([]);
            $exPlanDay->delete();
        }

        $plan->delete();

        return response()->json();
    }

    public function assign(Request $request, $id)
    {
        $plan = Plan::where('id', $id)->with('users')->first();

        if (!$plan) {
            return response()->json([], 404);
        }
        $users = User::all();

        return response()->json([
            'users' => $users,
            'assigns' => $plan->users
        ]);
    }

    public function setassign(Request $request, $id)
    {
        $plan = Plan::where('id', $id)->with('users')->first();

        if (!$plan) {
            return response()->json([], 404);
        }

        $validator = Validator::make($request->all(), [
            'user' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'messages' => $validator->errors(),
            ], 400);
        }

        $user = User::find($id);
        if (!$user) {
            return response()->json([], 404);
        }

        if (! $plan->users->contains($user->id)) {
            $plan->users()->attach($user->id);
        }

        return response()->json();
    }

    public function unassign(Request $request, $id)
    {
        $plan = Plan::where('id', $id)->first();

        if (!$plan) {
            return response()->json([], 404);
        }

        $validator = Validator::make($request->all(), [
            'user' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'messages' => $validator->errors(),
            ], 400);
        }

        $user = User::find($id);
        if (!$user) {
            return response()->json([], 404);
        }

        $plan->users()->detach($user->id);

        return response()->json();
    }
}
