import { Form, Modal, Select, message } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminItemEditModal } from '@/components/admin/AdminItemEditModal';
import {
  DASHBOARD_CONTENT_CONFIG,
  DASHBOARD_CONTENT_TYPES,
  type DashboardContentType,
} from '@/consts/adminDashboardContent';
import { useAdmin } from '@/hooks/useAdmin';
import type { AdminListRecord } from '@/types/admin';

type AdminCreateContentModalProps = Readonly<{
  open: boolean;
  initialType?: DashboardContentType | null;
  onClose: () => void;
}>;

export const AdminCreateContentModal = ({
  open,
  initialType = null,
  onClose,
}: AdminCreateContentModalProps) => {
  const { t } = useTranslation();
  const { addItem, createItemId } = useAdmin();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedType, setSelectedType] = useState<DashboardContentType | null>(initialType);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      setSelectedType(null);
      setIsFormOpen(false);
      return;
    }

    if (initialType) {
      setSelectedType(initialType);
      setIsFormOpen(true);
    }
  }, [initialType, open]);

  const activeEntry = selectedType ? DASHBOARD_CONTENT_CONFIG[selectedType] : null;

  const handleClose = () => {
    setSelectedType(null);
    setIsFormOpen(false);
    onClose();
  };

  const handleTypeContinue = () => {
    if (selectedType) {
      setIsFormOpen(true);
    }
  };

  const handleSave = (payload: Record<string, string | number>) => {
    if (!activeEntry) {
      return;
    }

    const id = createItemId(activeEntry.sectionKey.slice(0, 4));

    addItem(activeEntry.sectionKey, {
      ...payload,
      id,
    } as AdminListRecord);

    messageApi.success(t('admin.actions.createSuccess'));
    handleClose();
  };

  return (
    <>
      {contextHolder}
      <Modal
        open={open && !isFormOpen}
        title={t('admin.createContent.title')}
        onCancel={handleClose}
        onOk={handleTypeContinue}
        okText={t('admin.createContent.continue')}
        cancelText={t('admin.actions.cancel')}
        okButtonProps={{ disabled: !selectedType }}
        destroyOnHidden
        width="min(100%, 28rem)"
        centered
      >
        <p>{t('admin.createContent.description')}</p>
        <Form layout="vertical">
          <Form.Item label={t('admin.dashboard.filters.contentType')}>
            <Select
              value={selectedType}
              onChange={setSelectedType}
              placeholder={t('admin.createContent.typePlaceholder')}
              options={DASHBOARD_CONTENT_TYPES.map((type) => ({
                value: type,
                label: t(`admin.dashboard.contentTypes.${type}`),
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>

      {activeEntry ? (
        <AdminItemEditModal
          open={open && isFormOpen}
          config={activeEntry.config}
          item={null}
          onClose={handleClose}
          onSave={handleSave}
        />
      ) : null}
    </>
  );
};
