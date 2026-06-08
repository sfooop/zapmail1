import { useState } from 'react';
import { useMailbox } from '../hooks/useMailbox';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { EmailDisplay } from '../components/EmailDisplay';
import { InboxList } from '../components/InboxList';
import { MessageViewer } from '../components/MessageViewer';
import { AdminPanel } from './AdminPanel';
import { EmailMessage } from '../hooks/useMailbox';
import { Zap, Shield, Zeta } from 'lucide-react';

export const Home = () => {
  const { account, messages, isLoading, createAccount, deleteAccount, copyEmail, refetch } = useMailbox();
  const [selectedMessage, setSelectedMessage] = useState<EmailMessage | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);

  const handleCreateAccount = async () => {
    try {
      await createAccount();
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  if (showAdmin) {
    return <AdminPanel onBack={() => setShowAdmin(false)} />;
  }

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <Header onAdminClick={() => setShowAdmin(true)} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-slide-in">
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="glow-text">بريد إلكتروني</span>
            <br />
            <span className="text-white">مؤقت وآمن</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            احم خصوصيتك من الرسائل الإعلانية والبريد العشوائي. احصل على بريد مؤقت فوراً وبدون تسجيل.
          </p>

          {!account ? (
            <button
              onClick={handleCreateAccount}
              className="gradient-btn px-8 py-4 rounded-lg text-white text-lg font-bold inline-flex items-center gap-2"
            >
              <Zap size={24} />
              احصل على بريد الآن
            </button>
          ) : null}
        </div>

        {account ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Email Display */}
            <div className="lg:col-span-1">
              <EmailDisplay
                email={account.address}
                password={account.password}
                onRefresh={() => refetch()}
                onDelete={deleteAccount}
                isLoading={isLoading}
              />
            </div>

            {/* Inbox */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-white mb-4">الرسائل الواردة</h2>
              </div>
              <InboxList
                messages={messages}
                onSelectMessage={setSelectedMessage}
                selectedId={selectedMessage?.id}
                isLoading={isLoading}
              />
            </div>
          </div>
        ) : null}

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
          <div className="card-dark text-center hover:border-accent/50 transition">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="font-bold text-white mb-2">فوري</h3>
            <p className="text-gray-400 text-sm">احصل على بريد إلكتروني جديد في ثوانٍ بدون تسجيل</p>
          </div>
          <div className="card-dark text-center hover:border-accent/50 transition">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="font-bold text-white mb-2">آمن</h3>
            <p className="text-gray-400 text-sm">بياناتك محمية بشكل كامل ولا نحتفظ بأي معلومات شخصية</p>
          </div>
          <div className="card-dark text-center hover:border-accent/50 transition">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="font-bold text-white mb-2">عالمي</h3>
            <p className="text-gray-400 text-sm">استقبل رسائل من أي موقع في العالم بدون قيود</p>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-dark-card rounded-xl p-8 mb-16 border border-dark-border">
          <h2 className="text-2xl font-bold text-white mb-4">عن TempMail</h2>
          <p className="text-gray-300 mb-4 leading-relaxed">
            TempMail هي خدمة بريد إلكتروني مؤقتة توفر عناوين بريد تلقائية لفترة زمنية محدودة.
            مثالية للتسجيل على المواقع التجريبية، حماية خصوصيتك من الرسائل الإعلانية، واختبار التطبيقات الجديدة.
          </p>
          <h3 className="font-bold text-accent mb-3 mt-6">لمن يمكنه استخدام TempMail؟</h3>
          <ul className="space-y-2 text-gray-300">
            <li>✓ الباحثون والمطورون الذين يريدون اختبار التطبيقات</li>
            <li>✓ أي شخص يريد حماية خصوصيته من البريد العشوائي</li>
            <li>✓ المستخدمون الذين لا يريدون الكشف عن بريدهم الحقيقي</li>
            <li>✓ الأشخاص الذين يريدون بريداً مؤقتاً لعملية تسجيل واحدة</li>
          </ul>
        </div>
      </main>

      {/* Message Viewer Modal */}
      {selectedMessage && (
        <MessageViewer message={selectedMessage} onClose={() => setSelectedMessage(null)} />
      )}

      <Footer />
    </div>
  );
};
