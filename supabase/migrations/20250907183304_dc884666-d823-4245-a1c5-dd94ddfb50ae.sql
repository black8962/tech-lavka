-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('смартфоны', 'телевизоры', 'приставки')),
  image_url TEXT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  products JSONB NOT NULL,
  total_price NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for products (public read access)
CREATE POLICY "Anyone can view products" 
ON public.products 
FOR SELECT 
USING (true);

-- RLS Policies for orders (authenticated users can insert their own orders)
CREATE POLICY "Users can create orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can view their own orders" 
ON public.orders 
FOR SELECT 
USING (true);

-- Seed sample data
INSERT INTO public.products (name, description, price, category, image_url, stock) VALUES
-- Смартфоны
('iPhone 15', 'Современный смартфон с мощным процессором и улучшенной камерой', 999, 'смартфоны', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop', 5),
('Samsung Galaxy S24', 'Флагманский Android-смартфон с отличной камерой и долгим временем работы', 899, 'смартфоны', 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=300&fit=crop', 10),

-- Телевизоры  
('Samsung QLED 65"', 'Большой QLED-телевизор с яркой картинкой и Smart TV функциями', 1499, 'телевизоры', 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop', 3),
('LG OLED 55"', 'OLED-телевизор с глубоким черным цветом и превосходным качеством изображения', 1299, 'телевизоры', 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop', 7),

-- Приставки
('PlayStation 5', 'Игровая консоль нового поколения с невероятной графикой', 499, 'приставки', 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300&h=300&fit=crop', 8),
('Xbox Series X', 'Мощная консоль для геймеров с поддержкой 4K и быстрой загрузкой', 499, 'приставки', 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=300&h=300&fit=crop', 6);