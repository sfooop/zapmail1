import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useArticleStore } from '../store/articleStore';
import { Article } from '../types';
import { ChevronRight, Plus, Trash2, Edit2 } from 'lucide-react';

export const Articles = () => {
  const { articles } = useArticleStore();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);

  const categories = ['جميع المقالات', ...new Set(articles.map((a) => a.category))];
  const [selectedCategory, setSelectedCategory] = useState('جميع المقالات');

  const filteredArticles =
    selectedCategory === 'جمي�� المقالات'
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <Header onAdminClick={() => setShowAdmin(true)} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12 animate-slide-in">
          <h1 className="text-5xl font-black mb-4">
            <span className="glow-text">مقالات مفيدة</span>
          </h1>
          <p className="text-xl text-gray-400">
            تعلم المزيد عن الخصوصية الرقمية والأمان على الإنترنت
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full transition ${
                selectedCategory === cat
                  ? 'bg-accent text-dark-bg font-bold'
                  : 'bg-dark-card border border-dark-border text-gray-300 hover:border-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="card-dark hover:border-accent/50 cursor-pointer transition group"
            >
              <div className="text-4xl mb-4">{article.image || '📄'}</div>
              <h3 className="font-bold text-white mb-2 group-hover:text-accent transition">
                {article.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4">{article.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{article.author}</span>
                <span className="flex items-center gap-1 text-accent">
                  اقرأ المزيد
                  <ChevronRight size={14} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur flex items-center justify-center p-4">
          <div className="bg-dark-card border border-dark-border rounded-xl max-w-2xl w-full max-h-96 overflow-auto">
            <div className="p-8">
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-right w-full mb-4 text-gray-400 hover:text-accent transition"
              >
                ✕
              </button>
              <h2 className="text-3xl font-black text-white mb-4">{selectedArticle.title}</h2>
              <p className="text-gray-400 text-sm mb-6">
                بقلم {selectedArticle.author} • {new Date(selectedArticle.createdAt).toLocaleDateString('ar-EG')}
              </p>
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {selectedArticle.content}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
