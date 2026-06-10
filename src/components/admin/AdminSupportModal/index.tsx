import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Grid, Modal, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '@/hooks/useAdmin';
import { styles } from './styles';

const { useBreakpoint } = Grid;

type AdminSupportModalProps = Readonly<{
  open: boolean;
  onClose: () => void;
}>;

export const AdminSupportModal = ({ open, onClose }: AdminSupportModalProps) => {
  const { t } = useTranslation();
  const screens = useBreakpoint();
  const isCompact = screens.sm === false;
  const { state } = useAdmin();
  const { contact, settings } = state;

  const handleEmailSupport = () => {
    const subject = encodeURIComponent(t('admin.support.emailSubject'));
    window.location.href = `mailto:${settings.supportEmail}?subject=${subject}`;
  };

  return (
    <Modal
      open={open}
      title={t('admin.support.title')}
      onCancel={onClose}
      width="min(100%, 28rem)"
      centered
      className={styles.modal}
      footer={[
        <Button key="close" onClick={onClose} size={isCompact ? 'small' : 'middle'}>
          {t('admin.actions.cancel')}
        </Button>,
        <Button
          key="email"
          type="primary"
          icon={<MailOutlined />}
          onClick={handleEmailSupport}
          size={isCompact ? 'small' : 'middle'}
        >
          {t('admin.support.emailSupport')}
        </Button>,
      ]}
      destroyOnHidden
    >
      <p className={styles.description}>{t('admin.support.description')}</p>

      <dl className={styles.details}>
        <div className={styles.detailRow}>
          <dt>{t('admin.support.email')}</dt>
          <dd>
            <a href={`mailto:${settings.supportEmail}`} className={styles.link}>
              {settings.supportEmail}
            </a>
          </dd>
        </div>
        <div className={styles.detailRow}>
          <dt>{t('admin.support.phone')}</dt>
          <dd>
            <Space size="small">
              <PhoneOutlined aria-hidden />
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className={styles.link}>
                {contact.phone}
              </a>
            </Space>
          </dd>
        </div>
        <div className={styles.detailRow}>
          <dt>{t('admin.support.hours')}</dt>
          <dd>{contact.hours}</dd>
        </div>
      </dl>
    </Modal>
  );
};
