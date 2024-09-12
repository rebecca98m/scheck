<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Report;
use App\Responses\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255'
        ]);

        $project = Project::create([
            'user_id' => \Auth::user()->id,
            'title' => $request->title
        ]);

        return Response::response($project);
    }

    public function update(Request $request) {
        $values = $request->validate([
            'id' => 'required|int',
            'title' => 'required|string'

        ]);

        /** @var Project $project */
        $project = Project::find($request->id);


        if ($project) {
            if ($project->user_id != \Auth::user()->id) {
                return Response::response(null, 401, "Non hai accesso a questo elemento!");
            }
            $project->update(\Arr::except($values, 'id'));
            return Response::response(null);
        }

        return Response::response(null, 404);
    }

    public function showAll()
    {
        return Response::response(
            Project::query()
                ->where('user_id', \Auth::user()->id)
                ->with(['reports'])
                ->get()
        );
    }

    public function showAllConnectableReports(int $page=0, int $count=6)
    {
        return Response::response(
            Report::query()
                ->where('user_id', \Auth::user()->id)
                ->where('project_id', NULL)
                ->with(['project'])
                ->paginate(
                    perPage: $count,
                    page: $page)
        );
    }

    public function delete(Request $request): JsonResponse
    {

        $request->validate([
            'id' => 'required|int',
        ]);

        /** @var Project $project */
        $project = Project::query()
            ->where('id', $request->id)
            ->with(['reports'])
            ->first();

        if ($project) {
            if ($project->user_id != \Auth::user()->id) {
                return Response::response(null, 401, "Non hai accesso a questo elemento!");
            }
            /** @var Report $report */
            foreach ($project->reports as $report) {
                $report->project_id = null;
            }
            $project->delete();
            return Response::response(null);
        }

        return Response::response(null, 404);

    }

    public function deleteWithReports(Request $request): JsonResponse
    {

        $request->validate([
            'id' => 'required|int',
        ]);

        /** @var Project $project */
        $project = Project::query()
            ->where('id', $request->id)
            ->with(['reports'])
            ->first();

        if ($project) {
            if ($project->user_id != \Auth::user()->id) {
                return Response::response(null, 401, "Non hai accesso a questo elemento!");
            }
            /** @var Report $report */
            foreach ($project->reports as $report) {
                $report->delete();
            }
            $project->delete();
            return Response::response(null);
        }

        return Response::response(null, 404);

    }

}
