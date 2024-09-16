<?php

namespace App\Http\Controllers;

use App\Models\Element;
use App\Models\Report;
use App\Responses\Response;
use Illuminate\Http\Request;

class ElementController extends Controller
{

    public function showAll()
    {
        return Response::response(
            Element::query()
                ->get()
        );
    }

    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $element = Element::create([
            'name' => $request->name
        ]);

        return Response::response($element);
    }

}
