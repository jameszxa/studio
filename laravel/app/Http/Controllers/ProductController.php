<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        try {
            $products = Product::where('location', 'Cagayan de Oro')->get();
            return response()->json($products);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error fetching products', 'error' => $e->getMessage()], 500);
        }
    }

    public function show(string $id)
    {
        try {
            $product = Product::findOrFail($id);
            return response()->json($product);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error fetching product', 'error' => $e->getMessage()], 500);
        }
    }
}
