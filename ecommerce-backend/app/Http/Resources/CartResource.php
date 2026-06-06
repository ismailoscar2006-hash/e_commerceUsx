<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $items = $this->whenLoaded('items');
        $total = $items ? $items->sum(fn($item) => $item->product->price * $item->quantity) : 0;

        return [
            'id' => $this->id,
            'items' => CartItemResource::collection($items),
            'total' => (float) $total,
            'items_count' => $items ? $items->count() : 0,
        ];
    }
}
