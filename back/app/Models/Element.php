<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ElementValue> $elementValues
 * @property-read int|null $element_values_count
 * @method static \Illuminate\Database\Eloquent\Builder|Element newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Element newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Element query()
 * @method static \Illuminate\Database\Eloquent\Builder|Element whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Element whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Element whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Element whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Element extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    /**
     * @return HasMany<ElementValue>
     */
    public function elementValues(): HasMany {
        return $this->hasMany( ElementValue::class );
    }
}
