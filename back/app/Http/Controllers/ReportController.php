<?php

namespace App\Http\Controllers;

use App\Events\ElementValueUpdated;
use App\Models\ElementValue;
use App\Models\Report;
use App\Responses\Response;
use Illuminate\Http\JsonResponse;
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

    public function update(Request $request) {
        $values = $request->validate([
            'id' => 'required|int',
            'title' => 'required|string'

        ]);

        /** @var Report $report */
        $report = Report::find($request->id);


        if ($report) {
            if ($report->user_id != \Auth::user()->id) {
                return Response::response(null, 401, "Non hai accesso a questo elemento!");
            }
            $report->update(\Arr::except($values, 'id'));
            return Response::response(null);
        }

        return Response::response(null, 404);
    }

    public function showAll()
    {
        return Response::response(
            Report::query()
                ->where('user_id', \Auth::user()->id)
                ->get()
        );
    }

    public function delete(Request $request): JsonResponse
    {

        $request->validate([
            'id' => 'required|int',
        ]);

        /** @var Report $report */
        $report = Report::query()
            ->where('id', $request->id)
            ->with(['elementValues', 'elementValues.element'])
            ->first();

        if ($report) {
            if ($report->user_id != \Auth::user()->id) {
                return Response::response(null, 401, "Non hai accesso a questo elemento!");
            }
            foreach ($report->elementValues as $elementValue) {
                $elementValue->delete();
            }
            $report->delete();
            return Response::response(null);
        }

        return Response::response(null, 404);

    }

}
