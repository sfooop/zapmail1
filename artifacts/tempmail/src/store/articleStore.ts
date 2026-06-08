import { create } from 'zustand';
import { Article } from '../types';

interface ArticleStore {
  articles: Article[];
  addArticle: (article: Article) => void;
  deleteArticle: (id: string) => void;
  updateArticle: (id: string, article: Article) => void;
  getArticle: (id: string) => Article | undefined;
}

const defaultArticles: Article[] = [
  {
    id: '1',
    title: 'ما هي رسائل البريد الإلكتروني المؤقتة؟',
    excerpt: 'تعرف على فوائد استخدام البريد الإلكتروني المؤقت وكيف يحمي خصوصيتك',
    content: 'البريد الإلكتروني المؤقت هو خدمة توفر عناوين بريد إلكترونية تقليدية لفترة زمنية محدودة. تُستخدم هذه الخدم��ت بشكل أساسي لتجنب الرسائل الإعلانية والبريد العشوائي، وحماية خصوصيتك عند التسجيل على مواقع جديدة.',
    category: 'دليل عام',
    author: 'فريق TempMail',
    createdAt: new Date().toISOString(),
    image: '📧',
  },
  {
    id: '2',
    title: 'كيفية الحفاظ على خصوصيتك على الإنترنت',
    excerpt: 'نصائح عملية لحماية بيانات شخصية من المتطفلين والإعلانات',
    content: 'في عالم رقمي يتسارع، أصبحت حماية خصوصيتك أكثر أهمية من أي وقت مضى. استخدام البريد المؤقت هو إحدى أفضل الطرق لتجنب تتبع البيانات والبريد العشوائي. كما يمكنك استخدامه عند اختبار التطبيقات الجديدة.',
    category: 'نصائح الأمان',
    author: 'فريق TempMail',
    createdAt: new Date().toISOString(),
    image: '🔒',
  },
  {
    id: '3',
    title: 'لماذا يختار الملايين TempMail؟',
    excerpt: 'اكتشف المزايا التي تجعل TempMail الخيار الأول للملايين حول العالم',
    content: 'تتمتع خدمتنا بسمعة عالمية نظراً للموثوقية والسرعة وسهولة الاستخدام. مع أكثر من مليون مستخدم نشط، TempMail توفر حلاً موثوقاً وفعالاً لجميع احتياجات البريد المؤقت. جميع الرسائل محمية وآمنة تماماً.',
    category: 'حول الخدمة',
    author: 'فريق TempMail',
    createdAt: new Date().toISOString(),
    image: '⭐',
  },
];

export const useArticleStore = create<ArticleStore>((set, get) => {
  // تحميل المقالات من localStorage أو استخدام الافتراضية
  const stored = typeof window !== 'undefined' ? localStorage.getItem('articles') : null;
  const initialArticles = stored ? JSON.parse(stored) : defaultArticles;

  return {
    articles: initialArticles,
    addArticle: (article) => {
      set((state) => {
        const newArticles = [...state.articles, article];
        localStorage.setItem('articles', JSON.stringify(newArticles));
        return { articles: newArticles };
      });
    },
    deleteArticle: (id) => {
      set((state) => {
        const newArticles = state.articles.filter((a) => a.id !== id);
        localStorage.setItem('articles', JSON.stringify(newArticles));
        return { articles: newArticles };
      });
    },
    updateArticle: (id, article) => {
      set((state) => {
        const newArticles = state.articles.map((a) => (a.id === id ? article : a));
        localStorage.setItem('articles', JSON.stringify(newArticles));
        return { articles: newArticles };
      });
    },
    getArticle: (id) => {
      return get().articles.find((a) => a.id === id);
    },
  };
});
