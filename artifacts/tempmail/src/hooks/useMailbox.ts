import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';

const MAIL_API = 'https://api.mail.gw';

interface MailAccount {
  address: string;
  password: string;
  accountId: string;
  token: string;
}

interface EmailMessage {
  id: string;
  from: { address: string; name: string };
  subject: string;
  text: string;
  html: string;
  createdAt: string;
  updatedAt: string;
}

export const useMailbox = () => {
  const [account, setAccount] = useState<MailAccount | null>(() => {
    const stored = localStorage.getItem('tempmail_account');
    return stored ? JSON.parse(stored) : null;
  });

  const queryClient = useQueryClient();

  // إنشاء حساب جديد
  const createAccount = async () => {
    try {
      // الحصول على قائمة النطاقات
      const domainsRes = await axios.get(`${MAIL_API}/domains`);
      const domains = domainsRes.data['hydra:member'];
      const randomDomain = domains[Math.floor(Math.random() * domains.length)];

      // إنشاء حساب جديد
      const email = `${Math.random().toString(36).substring(7)}@${randomDomain.domain}`;
      const password = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

      const accountRes = await axios.post(`${MAIL_API}/accounts`, {
        address: email,
        password: password,
      });

      // تسجيل الدخول
      const loginRes = await axios.post(`${MAIL_API}/token`, {
        address: email,
        password: password,
      });

      const newAccount: MailAccount = {
        address: email,
        password: password,
        accountId: accountRes.data.id,
        token: loginRes.data.token,
      };

      localStorage.setItem('tempmail_account', JSON.stringify(newAccount));
      setAccount(newAccount);
      return newAccount;
    } catch (error) {
      console.error('Failed to create account:', error);
      throw error;
    }
  };

  // جلب الرسائل
  const { data: messages = [], isLoading, refetch } = useQuery({
    queryKey: ['messages', account?.token],
    queryFn: async () => {
      if (!account?.token) return [];
      try {
        const res = await axios.get(`${MAIL_API}/messages`, {
          headers: { Authorization: `Bearer ${account.token}` },
        });
        return res.data['hydra:member'] || [];
      } catch (error) {
        console.error('Failed to fetch messages:', error);
        return [];
      }
    },
    refetchInterval: 15000, // تحديث كل 15 ثانية
    enabled: !!account?.token,
  });

  // حذف الحساب
  const deleteAccount = () => {
    localStorage.removeItem('tempmail_account');
    setAccount(null);
    queryClient.removeQueries({ queryKey: ['messages'] });
  };

  // نسخ البريد
  const copyEmail = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address);
      return true;
    }
    return false;
  };

  return {
    account,
    messages,
    isLoading,
    createAccount,
    deleteAccount,
    copyEmail,
    refetch,
  };
};
