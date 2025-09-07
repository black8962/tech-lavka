import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">ТМ</span>
              </div>
              <span className="font-bold text-xl text-primary">ТехМагазин</span>
            </div>
            <p className="text-muted-foreground">
              Лучшие технологии по доступным ценам. Смартфоны, телевизоры и игровые приставки.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Быстрые ссылки</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/category/смартфоны" className="text-muted-foreground hover:text-primary transition-colors">
                  Смартфоны
                </Link>
              </li>
              <li>
                <Link to="/category/телевизоры" className="text-muted-foreground hover:text-primary transition-colors">
                  Телевизоры
                </Link>
              </li>
              <li>
                <Link to="/category/приставки" className="text-muted-foreground hover:text-primary transition-colors">
                  Приставки
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Информация</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-muted-foreground">О нас</span>
              </li>
              <li>
                <span className="text-muted-foreground">Контакты</span>
              </li>
              <li>
                <span className="text-muted-foreground">Доставка и оплата</span>
              </li>
              <li>
                <span className="text-muted-foreground">Возврат товара</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-muted-foreground">
            © 2024 ТехМагазин. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;