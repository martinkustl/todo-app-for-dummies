<?php

namespace App\Http\Controllers;

use App\Models\State;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        return response()->json(State::all());
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
            'name' => 'required|string|max:45'
        ]);


        $newState = new State();
        $newState->name = $validated['name'];
        $newState->save();
        return response()->json($newState);
    }

    /**
     * Display the specified resource.
     *
     * @param State $state
     * @return JsonResponse
     */
    public function show(State $state)
    {
        return response()->json($state);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param State $state
     * @return JsonResponse
     */
    public function update(Request $request, State $state)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:45'
        ]);

        $state->name = $validated['name'];
        $state->save();
        return response()->json($state);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param State $state
     * @return JsonResponse
     */
    public function destroy(State $state)
    {
        $state->delete();
        return response()->json($state);
    }
}
