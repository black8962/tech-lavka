import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Smartphone, Tv, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';

const Home = () => {
  const { products, loading } = useProducts();

  const categories = [
    {
      name: 'Смартфоны',
      icon: Smartphone,
      path: '/category/смартфоны',
      description: 'Современные мобильные устройства',
      color: 'text-blue-600',
    },
    {
      name: 'Телевизоры',
      icon: Tv,
      path: '/category/телевизоры',
      description: 'Большие экраны для дома',
      color: 'text-purple-600',
    },
    {
      name: 'Приставки',
      icon: Gamepad2,
      path: '/category/приставки',
      description: 'Игровые консоли нового поколения',
      color: 'text-green-600',
    },
  ];

  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
            Откройте для себя новейшие технологии
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in">
            Смартфоны, телевизоры и игровые приставки по лучшим ценам
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="text-lg px-8 py-3 animate-scale-in"
          >
            Купить сейчас
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Категории товаров</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link key={category.name} to={category.path}>
                <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
                  <CardContent className="p-8 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent mb-4 ${category.color} transition-transform duration-300 group-hover:scale-110`}>
                      <category.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Рекомендуемые товары</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card rounded-lg p-4 animate-pulse">
                  <div className="bg-muted h-48 rounded mb-4"></div>
                  <div className="bg-muted h-4 rounded mb-2"></div>
                  <div className="bg-muted h-4 rounded w-2/3 mb-4"></div>
                  <div className="bg-muted h-8 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/category/смартфоны">
              <Button variant="outline" size="lg">
                Посмотреть все товары
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;