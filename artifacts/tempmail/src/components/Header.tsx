import { useState } from 'react';
import { Link, useRoute } from 'wouter';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onAdminClick: () => void;
}

export const Header = ({ onAdminClick }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [, params] = useRoute('/:page?');
  const currentPage = params?.page || 'home';

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 bg-dark-bg/95 backdrop-blur border-b border-dark-border">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 group cursor-pointer">
            <div className="text-3xl font-bold glow-text">TempMail</div>
            <span className="text-xs bg-accent text-dark-bg px-2 py-1 rounded font-bold">Pro</span>
          </a>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/">
            <a className={`transition-colors ${
              currentPage === 'home' ? 'text-accent font-bold' : 'text-gray-300 hover:text-accent'
            }`}>
              الرئيسية
            </a>
          </Link>
          <Link href="/articles">
            <a className={`transition-colors ${
              currentPage === 'articles' ? 'text-accent font-bold' : 'text-gray-300 hover:text-accent'
            }`}>
              المقالات
            </a>
          </Link>
          <Link href="/premium">
            <a className={`transition-colors ${
              currentPage === 'premium' ? 'text-accent font-bold' : 'text-gray-300 hover:text-accent'
            }`}>
              Premium ✨
            </a>
          </Link>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onAdminClick}
            className="gradient-btn px-6 py-2 rounded-lg text-sm text-white"
          >
            لوحة التحكم
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 hover:bg-dark-card rounded"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-dark-card border-t border-dark-border py-4 animate-slide-in">
          <Link href="/">
            <a className="block px-4 py-2 text-accent hover:bg-dark-border rounded">
              الرئيسية
            </a>
          </Link>
          <Link href="/articles">
            <a className="block px-4 py-2 text-gray-300 hover:text-accent hover:bg-dark-border rounded">
              المقالات
            </a>
          </Link>
          <Link href="/premium">
            <a className="block px-4 py-2 text-gray-300 hover:text-accent hover:bg-dark-border rounded">
              Premium ✨
            </a>
          </Link>
          <button
            onClick={onAdminClick}
            className="w-full m-2 gradient-btn px-4 py-2 rounded text-white"
          >
            لوحة التحكم
          </button>
        </div>
      )}
    </header>
  );
};
