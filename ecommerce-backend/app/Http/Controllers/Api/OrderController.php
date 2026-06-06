<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PlaceOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function myOrders(Request $request): JsonResponse
    {
        $orders = $request->user()->orders()->with('items.product')->paginate(15);

        return response()->json([
            'message' => 'Orders retrieved successfully',
            'data' => OrderResource::collection($orders),
            'meta' => [
                'current_page' => $orders->currentPage(),
                'total' => $orders->total(),
                'per_page' => $orders->perPage(),
                'last_page' => $orders->lastPage(),
            ],
        ]);
    }

    public function show(Order $order, Request $request): JsonResponse
    {
        $this->authorize('view', $order);

        return response()->json([
            'message' => 'Order retrieved successfully',
            'data' => new OrderResource($order->load('items.product')),
        ]);
    }

    public function place(PlaceOrderRequest $request): JsonResponse
    {
        return DB::transaction(function () use ($request) {
            $user = $request->user();
            $cart = $user->cart()->with('items.product')->firstOrFail();

            if ($cart->items->isEmpty()) {
                return response()->json(['message' => 'Cart is empty'], 400);
            }

            $total = $cart->items->sum(fn($item) => $item->product->price * $item->quantity);

            $order = Order::create([
                'user_id' => $user->id,
                'total' => $total,
                'delivery_address' => $request->delivery_address,
                'status' => 'en_attente',
            ]);

            foreach ($cart->items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price,
                ]);

                $item->product->decrement('stock', $item->quantity);
            }

            $cart->items()->delete();

            return response()->json([
                'message' => 'Order placed successfully',
                'data' => new OrderResource($order->load('items.product')),
            ], 201);
        });
    }
}
