<?php

namespace App\Http\Controllers;

use App\Handlers\AHPHandler;
use App\Models\Element;
use App\Models\ElementValue;
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

    public function getProjectResult(int $id) {

        /** @var Project $project */
        $project = Project::query()
            ->where('id', $id)
            ->with(['reports'])
            ->first();

        $malformedReport = [];
        $existingElements = [];

        if ($project) {
            if ($project->user_id != \Auth::user()->id) {
                return Response::response(null, 401, "Non hai accesso a questo elemento!");
            }
            /** @var Report $report */
            foreach ($project->reports as $report) {
                foreach ($report->elementValues as $elementValue) {
                    $existingElements[$elementValue->element_id] = $elementValue->element;
                }
            }

            /** @var Report $report */
            foreach ($project->reports as $report) {
                $reportElementIds = $report->elementValues->pluck( 'element_id' );

                $missing = collect( $existingElements )
                    ->filter( fn( Element $value ) => !in_array( $value->id, $reportElementIds->toArray() ) )
                    ->map(fn(Element $element) => $element->toArray());

                if(count($missing)) {
                    $malformedReport[] = [...$report->toArray(), "missing" => $missing->values()];
                }
            }

            if($malformedReport) {
                return Response::response(["malformedReport" => $malformedReport], 200, "Malformed projects");
            }

            $correlationLevels = [];
            $magnitudes = [];

            foreach ($project->reports as $report) {
                $reportCorrelationLevels = [];
                $reportMagnitudes = [];
                foreach ($report->elementValues as $elementValue) {
                    $reportCorrelationLevels[$elementValue->element->name] = $elementValue->correlation_level;
                    $reportMagnitudes[$elementValue->element->name] = $elementValue->magnitude;
                }
                ksort($reportCorrelationLevels);
                ksort($reportMagnitudes);
                $correlationLevels[] = $reportCorrelationLevels;
                $magnitudes[] = $reportMagnitudes;
            }
            $diff = [];

            foreach ($correlationLevels as $key => $correlationLevel) {
                if(isset($correlationLevels[$key+1])) {
                    $diff = [...$diff, ...array_diff_assoc($correlationLevel, $correlationLevels[$key+1])];
                }
            }

            if(count($diff)) {
                return Response::response(["malformedCorrelation" => array_keys($diff)], 200, "Malformed correlation");
            }

            $matrice_comparazione = AHPHandler::crea_matrice_comparazione(array_values($correlationLevels[0]));
            $pesi_criteri = AHPHandler::calcola_pesi($matrice_comparazione);

            $dati_normalizzati = AHPHandler::normalizza_dati($magnitudes);

            $punteggio_finale = AHPHandler::calcola_punteggi_finali($dati_normalizzati, $pesi_criteri);

            foreach ($project->reports as $i => $report) {
                $project->reports[$i]['Impatto'] = $punteggio_finale[$i];
            }


            return Response::response($project);





        }

        return Response::response(null, 404);
    }

}
