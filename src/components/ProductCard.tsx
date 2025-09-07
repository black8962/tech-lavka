import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  const categoryColor = {
    'смартфоны': 'bg-blue-100 text-blue-800',
    'телевизоры': 'bg-purple-100 text-purple-800',
    'приставки': 'bg-green-100 text-green-800',
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-2 left-2">
            <Badge className={categoryColor[product.category]}>
              {product.category}
            </Badge>
          </div>
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute top-2 right-2">
              <Badge variant="destructive">
                Осталось {product.stock}
              </Badge>
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg">
                Нет в наличии
              </Badge>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {product.description}
          </p>
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            {product.price.toLocaleString('ru-RU')} ₽
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Link to={`/product/${product.id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            <Eye className="w-4 h-4 mr-2" />
            Просмотреть
          </Button>
        </Link>
        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="flex-1"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Добавить
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;