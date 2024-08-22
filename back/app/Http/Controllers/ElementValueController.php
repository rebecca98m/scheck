<?php

namespace App\Http\Controllers;

use App\Models\ElementValue;
use App\Models\Report;
use App\Responses\Response;
use Illuminate\Http\Request;

class ElementValueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    public function showAllFromReport(int $reportId)
    {
        return Response::response(
            Report::query()
                ->where('id', $reportId)
                ->with(['elementValues', 'elementValues.element'])
            ->first()

        );
    }

    /**
     * Display the specified resource.
     */
    public function show(ElementValue $elementValue)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ElementValue $elementValue)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ElementValue $elementValue)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ElementValue $elementValue)
    {
        //
    }
}
