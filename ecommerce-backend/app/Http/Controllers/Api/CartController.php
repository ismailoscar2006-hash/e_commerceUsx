<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddToCartRequest;
use App\Http\Requests\UpdateCartItemRequest;
use App\Http\Resources\CartResource;
use App\Models\CartItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        $cart = $request->user()->cart()->with('items.product')->first();

        return response()->json([
            'message' => 'Cart retrieved successfully',
            'data' => new CartResource($cart),
        ]);
    }

    public function addItem(AddToCartRequest $request): JsonResponse
    {
        $cart = $request->user()->cart()->first();

        if (!$cart) {
            return response()->json([
                'message' => 'Cart not found',
                'data' => null,
            ], 404);
        }

        $cartItem = $cart->items()->firstOrNew(
            ['product_id' => $request->product_id]
        );

        if ($cartItem->exists) {
            $cartItem->quantity += $request->quantity;
        } else {
            $cartItem->quantity = $request->quantity;
        }

        $cartItem->save();

        return response()->json([
            'message' => 'Item added to cart',
            'data' => new CartResource($cart->load('items.product')),
        ]);
    }

    public function updateItem(UpdateCartItemRequest $request, CartItem $cartItem): JsonResponse
    {
        $this->authorize('update', $cartItem);

        $cartItem->update(['quantity' => $request->quantity]);

        return response()->json([
            'message' => 'Cart item updated',
            'data' => new CartResource($cartItem->cart->load('items.product')),
        ]);
    }

    public function removeItem(CartItem $cartItem, Request $request): JsonResponse
    {
        $this->authorize('delete', $cartItem);

        $cart = $cartItem->cart;
        $cartItem->delete();

        return response()->json([
            'message' => 'Item removed from cart',
            'data' => new CartResource($cart->load('items.product')),
        ]);
    }

    public function clear(Request $request): JsonResponse
    {
        $cart = $request->user()->cart()->first();

        if (!$cart) {
            return response()->json([
                'message' => 'Cart not found',
                'data' => null,
            ], 404);
        }

        $cart->items()->delete();

        return response()->json([
            'message' => 'Cart cleared',
            'data' => new CartResource($cart->load('items.product')),
        ]);
    }
}
