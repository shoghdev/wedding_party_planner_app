import { App } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { isLocalAdminAuthConfigured } from '@/config/adminAuth';
import { useAdminAuth } from '@/store/AdminAuthProvider';
import type { AdminLoginFormValues } from '@/types/adminAuth';

export const useHeaderAdminLogin = () => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { signIn } = useAdminAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isLoginAvailable = isLocalAdminAuthConfigured();

  const openLogin = () => {
    setErrorMessage(null);
    setIsOpen(true);
  };

  const closeLogin = () => {
    if (!isSubmitting) {
      setIsOpen(false);
      setErrorMessage(null);
    }
  };

  const submitLogin = async (values: AdminLoginFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await signIn(values.email, values.password);
      setIsOpen(false);
      message.success(t('header.login.success'));
      navigate('/admin');
    } catch {
      setErrorMessage(t('admin.login.invalidCredentials'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isLoginAvailable,
    isOpen,
    isSubmitting,
    errorMessage,
    openLogin,
    closeLogin,
    submitLogin,
  };
};
