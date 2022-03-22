<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        return response()->json(Todo::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'activity' => 'required|string|max:45',
            'deadline' => 'required|date',
            'categoryId' => 'required|numeric',
            'stateId' => 'required|numeric'
        ]);


        $newTodo = new Todo();
        $newTodo->activity = $validated['activity'];
        $newTodo->deadline = $validated['deadline'];
        $newTodo->category_id = $validated['categoryId'];
        $newTodo->state_id = $validated['stateId'];
        $newTodo->save();

        return response()->json($newTodo);
    }

    /**
     * Display the specified resource.
     *
     * @param Todo $todo
     * @return JsonResponse
     */
    public function show(Todo $todo)
    {
        return response()->json($todo);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Todo $todo
     * @return JsonResponse
     */
    public function update(Request $request, Todo $todo)
    {
        $validated = $request->validate([
            'activity' => 'required|string|max:45',
            'deadline' => 'required|date_format:Y-m-d\TH:i:sP',
            'categoryId' => 'required|numeric',
            'stateId' => 'required|numeric'
        ]);

        $todo->activity = $validated['activity'];
        $todo->deadline = Carbon::createFromFormat("Y-m-d\TH:i:sP", $validated['deadline']);
        $todo->category_id = $validated['categoryId'];
        $todo->state_id = $validated['stateId'];
        $todo->save();

        return response()->json($todo);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Todo $todo
     * @return JsonResponse
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();
        return response()->json($todo);
    }
}
