<?php

namespace App\Http\Controllers;

use App\Models\ElementValue;
use App\Models\Report;
use App\Responses\Response;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string',
        ]);

        $report = Report::create([
            'user_id' => \Auth::user()->id,
            'title' => $request->title,
            'type' => $request->type
        ]);

        return Response::response($report);
    }

    public function showAll()
    {
        return Response::response(
            Report::query()
                ->where('user_id', \Auth::user()->id)
                ->get()
        );
    }
}
