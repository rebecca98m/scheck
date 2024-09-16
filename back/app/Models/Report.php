<?php

namespace App\Models;

use App\Enums\ReportType;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 *
 *
 * @property int $id
 * @property int $user_id
 * @property string $title
 * @property ReportType $type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $project_id
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ElementValue> $elementValues
 * @property-read int|null $element_values_count
 * @property-read \App\Models\Project|null $project
 * @method static \Illuminate\Database\Eloquent\Builder|Report newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Report newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Report query()
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereUserId($value)
 * @mixin \Eloquent
 */
class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'type',
        'project_id'
    ];

    protected $casts = [
        'type' => ReportType::class
    ];

    protected $appends = [
        'impact',
        'min_impact',
        'max_impact'
    ];

    /**
     * @return HasMany<ElementValue>
     */
    public function elementValues(): HasMany
    {
        return  $this->hasMany( ElementValue::class );
    }

    public function project(): BelongsTo {
        return $this->belongsTo(Project::class);
    }

    public function impact(): Attribute {
        return Attribute::get(function () {
            return ($this->elementValues()->sum('impact'));
        });
    }

    public function minImpact(): Attribute {
        return Attribute::get(function () {
            return round($this->elementValues()->sum('influence'));
        });
    }

    public function maxImpact(): Attribute {
        return Attribute::get(function () {
            return round($this->elementValues()->sum('influence')*10);
        });
    }


}
