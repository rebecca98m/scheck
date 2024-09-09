<?php

namespace App\Listeners;

use App\Events\ElementValueUpdated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class UpdateElementValueInfluenceAndImpact
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ElementValueUpdated $event): void
    {

        $correlationsum = $event->report->elementValues()->sum('correlation_level');
        foreach ($event->report->elementValues as $elementValue) {
            $elementValue->update([
                'influence' => $elementValue->correlation_level*10/$correlationsum,
                'impact'=> $elementValue->magnitude * $elementValue->correlation_level*10/$correlationsum
            ]);
        }
    }
}
