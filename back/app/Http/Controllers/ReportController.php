<?php

namespace App\Http\Controllers;

use App\Events\ElementValueUpdated;
use App\Models\ElementValue;
use App\Models\Project;
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
            'project_id' => 'int|exists:projects,id'
        ]);

        if($request->project_id) {
            /** @var Project $project */
            $project = Project::find($request->project_id);
            if($project->user_id != \Auth::user()->id) {
                return Response::response(null, 401, "Non hai accesso a questo elemento!");
            }
        }

        $report = Report::create([
            'user_id' => \Auth::user()->id,
            'title' => $request->title,
            'type' => $request->type,
            'project_id' =>$request->project_id
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

    public function showAll(int $page=0, int $count=6)
    {
        return Response::response(
            Report::query()
                ->where('user_id', \Auth::user()->id)
                ->with(['project'])
                ->paginate(
                    perPage: $count,
                    page: $page)
        );
    }

    public function showAllFromProject(int $projectId)
    {
        /** @var Project $project */
        $project = Project::query()
            ->where('id', $projectId)
            ->with(['reports'])
            ->first();


        if($project) {
            if ($project->user_id != \Auth::user()->id) {
                return Response::response(null, 401, "Non hai accesso a questo elemento!");
            }
            return Response::response($project);
        }

        return Response::response(null, 404);
    }

    public function connectToProject(Request $request) {
        $values = $request->validate([
            'report_id' => 'required|int|exists:reports,id',
            'project_id' => 'required|int|exists:projects,id',
        ]);
        /** @var Report $report */
        $report = Report::find($request->report_id);

        if ($report) {
            if ($report->user_id != \Auth::user()->id) {
                return Response::response(null, 401, "Non hai accesso a questo elemento!");
            }
            if($report->project_id != null) {
                return Response::response(null, 400, "Il report ha già un progetto associato!");
            }
            $report->update(\Arr::except($values, 'report_id'));
            return Response::response(null);
        }

        return Response::response(null, 404);
    }

    public function disconnectFromProject(Request $request) {
        $request->validate([
            'report_id' => 'required|int|exists:reports,id',
            'project_id' => 'required|int|exists:projects,id',
        ]);
        /** @var Report $report */
        $report = Report::find($request->report_id);

        if ($report) {
            if ($report->user_id != \Auth::user()->id) {
                return Response::response(null, 401, "Non hai accesso a questo elemento!");
            }
            if($report->project_id != $request->project_id) {
                return Response::response(null, 400);
            }
            $report->update(['project_id'=> NULL]);
            return Response::response(null);
        }

        return Response::response(null, 404);
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
