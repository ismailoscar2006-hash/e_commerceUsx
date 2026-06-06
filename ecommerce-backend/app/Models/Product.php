<?php

namespace App\Models;

use Database\Factories\ProductFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    /** @use HasFactory<ProductFactory> */
    use HasFactory;

    protected $fillable = ['category_id','name','description','price','stock', 'image',];

    protected function casts(): array{
        return [ 'price' => 'decimal:2',];
    }

    public function category(): BelongsTo{
        return $this->belongsTo(Category::class);
    }

    public function getImageUrlAttribute(): string{
        if (!$this->image) {
            return url('storage/default-product.jpg');
        }
        return url('storage/' . $this->image);
    }

    public function getImagePathAttribute(): string {
        return $this->image ?? 'default-product.jpg';
    }
}
