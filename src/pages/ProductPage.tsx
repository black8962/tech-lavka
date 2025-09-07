import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import { useProduct, useProducts } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(id!);
  const { products } = useProducts(product?.category);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const relatedProducts = products
    .filter(p => p.id !== product?.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
            <div className="bg-muted h-96 rounded-lg"></div>
            <div className="space-y-4">
              <div className="bg-muted h-8 rounded w-3/4"></div>
              <div className="bg-muted h-4 rounded w-1/2"></div>
              <div className="bg-muted h-20 rounded"></div>
              <div className="bg-muted h-12 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Товар не найден</h2>
          <p className="text-muted-foreground mb-4">
            {error || 'Товар с указанным ID не существует'}
          </p>
          <Link to="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              На главную
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const categoryColor = {
    'смартфоны': 'bg-blue-100 text-blue-800',
    'телевизоры': 'bg-purple-100 text-purple-800',
    'приставки': 'bg-green-100 text-green-800',
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to={`/category/${product.category}`}>
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад к {product.category}
          </Button>
        </Link>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute top-4 left-4">
              <Badge className={categoryColor[product.category]}>
                {product.category}
              </Badge>
            </div>
            {product.stock <= 5 && product.stock > 0 && (
              <div className="absolute top-4 right-4">
                <Badge variant="destructive">
                  Осталось {product.stock}
                </Badge>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="text-4xl font-bold text-primary">
              {product.price.toLocaleString('ru-RU')} ₽
            </div>

            {product.stock > 0 ? (
              <div className="space-y-4">
                {/* Quantity Selector */}
                <div className="flex items-center space-x-4">
                  <span className="font-medium">Количество:</span>
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="h-10 w-10 p-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stock}
                      className="h-10 w-10 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <span className="text-muted-foreground">
                    (в наличии: {product.stock})
                  </span>
                </div>

                {/* Add to Cart Button */}
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="w-full md:w-auto px-8"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Добавить в корзину
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Badge variant="destructive" className="text-lg p-3">
                  Нет в наличии
                </Badge>
                <p className="text-muted-foreground">
                  Товар временно отсутствует на складе
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Похожие товары</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductPage;