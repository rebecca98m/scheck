<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 *
 *
 * @property int $id
 * @property int $element_id
 * @property int|null $report_id
 * @property int $correlation_level
 * @property int $magnitude
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property float $influence
 * @property float $impact
 * @property-read \App\Models\Element $element
 * @property-read \App\Models\Report|null $report
 * @method static \Illuminate\Database\Eloquent\Builder|ElementValue newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ElementValue newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ElementValue query()
 * @method static \Illuminate\Database\Eloquent\Builder|ElementValue whereCorrelationLevel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ElementValue whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ElementValue whereElementId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ElementValue whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ElementValue whereImpact($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ElementValue whereInfluence($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ElementValue whereMagnitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ElementValue whereReportId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ElementValue whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ElementValue extends Model
{
    use HasFactory;

    protected $fillable = [
        'element_id',
        'report_id',
        'correlation_level',
        'magnitude',
        'influence',
        'impact'
    ];

    /**
     * @return BelongsTo<Element, ElementValue>
     */
    public function element(): BelongsTo
    {
        return $this->belongsTo( Element::class );
    }

    /**
     * @return BelongsTo<Report, ElementValue>
     */
    public function report(): BelongsTo
    {
        return $this->belongsTo( Report::class );
    }
}
