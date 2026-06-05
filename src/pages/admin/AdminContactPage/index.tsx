import { AdminContentForm } from '@/components/admin/AdminContentForm';
import { ADMIN_CONTACT_FIELDS } from '@/consts/adminContentFields';
import { useAdmin } from '@/hooks/useAdmin';

export const AdminContactPage = () => {
  const { state, updateContent } = useAdmin();

  return (
    <AdminContentForm
      breadcrumbsKey="admin.contact.breadcrumbs"
      titleKey="admin.contact.title"
      descriptionKey="admin.contact.description"
      fields={ADMIN_CONTACT_FIELDS}
      initialValues={state.contact}
      onSubmit={(values) => updateContent('contact', values)}
    />
  );
};
