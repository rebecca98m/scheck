<?php

namespace App\Http\Controllers;

use App\Events\ElementValueUpdated;
use App\Models\Element;
use App\Models\ElementValue;
use App\Models\Report;
use App\Responses\Response;
use Illuminate\Http\JsonResponse;
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
    public function create(Request $request)
    {
        $request->validate([
            'element_id' => 'required|int|exists:elements,id',
            'report_id' => 'required|int|exists:reports,id',
            'correlation_level' => 'required|int',
            'magnitude' => 'required|int',

        ]);

        /** @var Report $report */
        $report = Report::find($request->report_id);

        if($report->user_id != \Auth::user()->id) {
            return Response::response(null, 401, "Non hai accesso a questo report!");
        }

        $elementValue = ElementValue::create([
            'element_id' => $request->element_id,
            'report_id' => $request->report_id,
            'correlation_level' => $request->correlation_level,
            'magnitude' => $request->magnitude
        ]);

        event(new ElementValueUpdated($report));

        return Response::response($elementValue);
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
        /** @var Report $report */
        $report = Report::query()
            ->where('id', $reportId)
            ->with(['elementValues', 'elementValues.element'])
            ->first();


        if($report) {
            if ($report->user_id != \Auth::user()->id) {
                return Response::response(null, 401, "Non hai accesso a questo elemento!");
            }
            $minImpact = round($report->elementValues()->sum('influence'));
            $maxImpact = round($report->elementValues()->sum('influence')*10);
            $reportImpact = ($report->elementValues()->sum('impact'));
            return Response::response(
                [...$report->toArray(), "minimpact"=> $minImpact, "maximpact" => $maxImpact, "impact"=> $reportImpact]
            );
        }

        return Response::response(null, 404);
        


    }

    /**
     * Display the specified resource.
     */
    public function show(ElementValue $elementValue)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $values = $request->validate([
            'id' => 'required|int',
            'element_id' => 'required|int|exists:elements,id',
            'report_id' => 'required|int|exists:reports,id',
            'correlation_level' => 'required|int',
            'magnitude' => 'required|int',

        ]);

        /** @var ElementValue $elementValue */
        $elementValue = ElementValue::find($request->id);
        /** @var Report $report */
        $report = Report::find($elementValue->report_id);


        if ($elementValue) {
            if ($report->user_id != \Auth::user()->id) {
                return Response::response(null, 401, "Non hai accesso a questo elemento!");
            }
            $elementValue->update(\Arr::except($values, 'id'));
            event(new ElementValueUpdated($report));
            return Response::response(null);
        }

        return Response::response(null, 404);


    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(Request $request): JsonResponse
    {

        $request->validate([
            'id' => 'required|int',
        ]);

        $elementValue = ElementValue::find($request->id);
        /** @var Report $report */
        $report = Report::find($elementValue->report_id);

        if ($elementValue) {
            if ($report->user_id != \Auth::user()->id) {
                return Response::response(null, 401, "Non hai accesso a questo elemento!");
            }
            $elementValue->delete();
            event(new ElementValueUpdated($report));
            return Response::response(null);
        }

        return Response::response(null, 404);

    }
}
