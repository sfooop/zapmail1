import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Check } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  stripePriceId: string;
  popular?: boolean;
}

const PLANS: Plan[] = [
  {
    id: '1',
    name: 'أساسي',
    price: 9.99,
    duration: 'شهري',
    features: [
      'بريد مؤقت غير محدود',
      'استقبال رسائل فوري',
      'حفظ الرسائل لمدة 7 أيام',
      'دعم البحث الأساسي',
    ],
    stripePriceId: 'price_basic_monthly',
  },
  {
    id: '2',
    name: 'احترافي',
    price: 19.99,
    duration: 'شهري',
    features: [
      'كل ميزات الأساسي',
      'حفظ الرسائل لمدة 30 يوم',
      'معرفات بريد مخصصة',
      'دعم الأولوية 24/7',
      'تنزيل الرسائل كـ PDF',
    ],
    stripePriceId: 'price_pro_monthly',
    popular: true,
  },
  {
    id: '3',
    name: 'متقدم',
    price: 49.99,
    duration: 'شهري',
    features: [
      'كل ميزات الاحترافي',
      'حفظ الرسائل مدى الحياة',
      'حسابات بريد متعددة',
      'تصدير البيانات الكاملة',
      'واجهة برمجية (API)',
      'دعم مخصص من الفريق',
    ],
    stripePriceId: 'price_enterprise_monthly',
  },
];

export const Premium = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const handleSubscribe = (plan: Plan) => {
    console.log('Subscribe to:', plan.name);
    // التكامل مع Stripe سيتم هنا
    alert(`سيتم نقلك إلى صفحة الدفع للخطة: ${plan.name}`);
  };

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <Header onAdminClick={() => {}} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-16 animate-slide-in">
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="glow-text">Premium</span>
            <br />
            <span className="text-white">ميزات متقدمة</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            احصل على وصول كامل إلى جميع الميزات والخيارات المتقدمة
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-lg transition ${
                billingCycle === 'monthly'
                  ? 'bg-accent text-dark-bg font-bold'
                  : 'bg-dark-card text-gray-400 border border-dark-border'
              }`}
            >
              شهري
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-lg transition relative ${
                billingCycle === 'yearly'
                  ? 'bg-accent text-dark-bg font-bold'
                  : 'bg-dark-card text-gray-400 border border-dark-border'
              }`}
            >
              سنوي
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-danger px-2 py-1 rounded text-xs font-bold text-white whitespace-nowrap">
                توفير 30%
              </span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`card-dark relative transition ${
                plan.popular ? 'ring-2 ring-accent scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-dark-bg px-4 py-1 rounded-full text-sm font-bold">
                  الأشهر
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-black text-accent">
                  ${billingCycle === 'yearly' ? Math.round(plan.price * 12 * 0.7) : plan.price}
                </span>
                <span className="text-gray-400 text-sm">/{billingCycle === 'yearly' ? 'سنة' : 'شهر'}</span>
              </div>

              <button
                onClick={() => handleSubscribe(plan)}
                className={`w-full py-3 rounded-lg font-bold transition mb-6 ${
                  plan.popular
                    ? 'gradient-btn text-white'
                    : 'bg-dark-bg border border-dark-border text-accent hover:border-accent'
                }`}
              >
                ابدأ الآن
              </button>

              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                    <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">الأسئلة الشائعة</h2>
          <div className="space-y-4">
            <details className="card-dark group">
              <summary className="font-bold text-white cursor-pointer flex items-center justify-between">
                هل يمكنني الحصول على استرجاع أموال؟
                <span className="group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-gray-400 text-sm mt-4">
                نعم، نقدم ضمان استرجاع أموال كامل لمدة 30 يوماً إذا لم تكن راضياً عن الخدمة.
              </p>
            </details>

            <details className="card-dark group">
              <summary className="font-bold text-white cursor-pointer flex items-center justify-between">
                كم عدد الحسابات التي يمكنني إنشاؤها؟
                <span className="group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-gray-400 text-sm mt-4">
                الخطة الأساسية: حساب واحد. الاحترافية: 5 حسابات. المتقدمة: حسابات غير محدودة.
              </p>
            </details>

            <details className="card-dark group">
              <summary className="font-bold text-white cursor-pointer flex items-center justify-between">
                هل البيانات محمية بشكل آمن؟
                <span className="group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-gray-400 text-sm mt-4">
                نعم، جميع البيانات محمية بتشفير من الدرجة العسكرية وننتقل جميع المعايير الأمنية العالمية.
              </p>
            </details>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
