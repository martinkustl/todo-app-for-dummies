<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Todo;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json(Category::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:45'
        ]);

        $newCategory = new Category;
        $newCategory->name = $validated['name'];
        $newCategory->save();
        return response()->json($newCategory);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Category $category
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Category $category)
    {
        return response()->json($category);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Category $category
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Category $category)
    {

        $validated = $request->validate([
            'name' => 'required|string|max:45'
        ]);


        $category->name = $validated['name'];
        $category->save();

        return response()->json($category);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Category $category
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Category $category)
    {
        $categoryTodo = Todo::where('category_id', $category->id)->first();

        if ($categoryTodo) {
            abort(422, 'Category contains todos, so it can\'t be deleted!');
        }


        $category->delete();

        return response()->json($category);
    }
}
