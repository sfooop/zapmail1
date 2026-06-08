import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useArticleStore } from '../store/articleStore';
import { Article } from '../types';
import { LogOut, Plus, Trash2, Edit2, ArrowLeft } from 'lucide-react';

interface AdminPanelProps {
  onBack: () => void;
}

export const AdminPanel = ({ onBack }: AdminPanelProps) => {
  const { isAuthenticated, adminCredentials, login, logout } = useAuth();
  const { articles, addArticle, deleteArticle, updateArticle } = useArticleStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'articles' | 'add'>('articles');
  const [formData, setFormData] = useState<Article>({
    id: '',
    title: '',
    content: '',
    category: '',
    author: '',
    excerpt: '',
    image: '📄',
    createdAt: new Date().toISOString(),
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (login(email, password)) {
      setEmail('');
      setPassword('');
    } else {
      setError('بيانات دخول غير صحيحة');
    }
  };

  const handleAddArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.category) {
      setError('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (editingId) {
      updateArticle(editingId, {
        ...formData,
        createdAt: formData.createdAt,
      });
      setEditingId(null);
    } else {
      addArticle({
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      });
    }

    setFormData({
      id: '',
      title: '',
      content: '',
      category: '',
      author: 'فريق TempMail',
      excerpt: '',
      image: '📄',
      createdAt: new Date().toISOString(),
    });
    setError('');
  };

  const startEdit = (article: Article) => {
    setEditingId(article.id);
    setFormData(article);
    setActiveTab('add');
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
        <div className="card-dark max-w-md w-full">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-accent hover:text-accent-dark transition mb-6"
          >
            <ArrowLeft size={20} />
            عودة
          </button>

          <h1 className="text-3xl font-bold text-white mb-2">لوحة التحكم</h1>
          <p className="text-gray-400 mb-6">ادخل بيانات المسؤول</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@tempmail.com"
                className="w-full bg-dark-bg border border-dark-border rounded px-4 py-2 text-white focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-dark-bg border border-dark-border rounded px-4 py-2 text-white focus:outline-none focus:border-accent"
              />
            </div>
            {error && <p className="text-danger text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full gradient-btn py-2 rounded text-white font-bold"
            >
              دخول
            </button>
          </form>

          <div className="mt-6 p-4 bg-dark-bg rounded border border-dark-border">
            <p className="text-sm text-gray-400 mb-2">بيانات المسؤول الافتراضية:</p>
            <p className="text-xs font-mono text-accent">{adminCredentials.email}</p>
            <p className="text-xs font-mono text-accent">{adminCredentials.password}</p>
          </div>
        </div>
      </div>
    );
  }

  // Admin Panel
  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">لوحة التحكم</h1>
            <p className="text-gray-400">إدارة المقالات والمحتوى</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={onBack}
              className="px-4 py-2 bg-dark-card border border-dark-border rounded hover:border-accent transition"
            >
              <ArrowLeft className="inline mr-2" size={20} />
              عودة
            </button>
            <button
              onClick={() => {
                logout();
                onBack();
              }}
              className="px-4 py-2 bg-danger/20 text-danger border border-danger/50 rounded hover:bg-danger/30 transition flex items-center gap-2"
            >
              <LogOut size={20} />
              تسجيل خروج
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-dark-border">
          <button
            onClick={() => setActiveTab('articles')}
            className={`py-4 px-6 font-bold transition ${
              activeTab === 'articles'
                ? 'text-accent border-b-2 border-accent'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            المقالات ({articles.length})
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`py-4 px-6 font-bold transition flex items-center gap-2 ${
              activeTab === 'add'
                ? 'text-accent border-b-2 border-accent'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Plus size={20} />
            {editingId ? 'تعديل' : 'إضافة'} مقالة
          </button>
        </div>

        {/* Content */}
        {activeTab === 'articles' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div key={article.id} className="card-dark">
                <div className="text-3xl mb-2">{article.image}</div>
                <h3 className="font-bold text-white mb-2">{article.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{article.excerpt}</p>
                <div className="text-xs text-gray-500 mb-4">
                  <p>{article.category}</p>
                  <p>{new Date(article.createdAt).toLocaleDateString('ar-EG')}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(article)}
                    className="flex-1 bg-accent/10 hover:bg-accent/20 text-accent py-2 rounded transition flex items-center justify-center gap-2"
                  >
                    <Edit2 size={16} />
                    تعديل
                  </button>
                  <button
                    onClick={() => deleteArticle(article.id)}
                    className="flex-1 bg-danger/10 hover:bg-danger/20 text-danger py-2 rounded transition flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} />
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card-dark max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId ? 'تعديل المقالة' : 'إضافة مقالة جديدة'}
            </h2>
            <form onSubmit={handleAddArticle} className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">العنوان</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-dark-bg border border-dark-border rounded px-4 py-2 text-white focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">الملخص</label>
                <input
                  type="text"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full bg-dark-bg border border-dark-border rounded px-4 py-2 text-white focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">الفئة</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-dark-bg border border-dark-border rounded px-4 py-2 text-white focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">المحتوى</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  className="w-full bg-dark-bg border border-dark-border rounded px-4 py-2 text-white focus:outline-none focus:border-accent resize-none"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">رمز الصورة</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-dark-bg border border-dark-border rounded px-4 py-2 text-white focus:outline-none focus:border-accent"
                />
              </div>
              {error && <p className="text-danger text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full gradient-btn py-2 rounded text-white font-bold"
              >
                {editingId ? 'تحديث المقالة' : 'إضافة المقالة'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({
                      id: '',
                      title: '',
                      content: '',
                      category: '',
                      author: 'فريق TempMail',
                      excerpt: '',
                      image: '📄',
                      createdAt: new Date().toISOString(),
                    });
                  }}
                  className="w-full bg-dark-card border border-dark-border py-2 rounded text-gray-300 font-bold hover:border-accent transition"
                >
                  إلغاء التعديل
                </button>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
