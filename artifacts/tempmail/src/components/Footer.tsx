import { Mail, Github, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-dark-card border-t border-dark-border mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold glow-text mb-4">TempMail</div>
            <p className="text-gray-400 text-sm">
              خدمة بريد إلكتروني مؤقتة آمنة وموثوقة. حماية خصوصيتك هو أولويتنا الأولى.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-accent transition">عن الخدمة</a></li>
              <li><a href="#" className="hover:text-accent transition">الشروط والأحكام</a></li>
              <li><a href="#" className="hover:text-accent transition">سياسة الخصوصية</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4">الدعم</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-accent transition">مركز المساعدة</a></li>
              <li><a href="#" className="hover:text-accent transition">الأسئلة الشائعة</a></li>
              <li><a href="#" className="hover:text-accent transition">التواصل معنا</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4">تابعنا</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-accent transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent transition">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent transition">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-border pt-8">
          <p className="text-center text-gray-400 text-sm">
            © 2024 TempMail. جميع الحقوق محفوظة. | صُنع بـ ❤️ من العالم العربي
          </p>
        </div>
      </div>
    </footer>
  );
};
