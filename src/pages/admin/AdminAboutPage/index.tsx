import { AdminContentForm } from '@/components/admin/AdminContentForm';
import { ADMIN_ABOUT_FIELDS } from '@/consts/adminContentFields';
import { useAdmin } from '@/hooks/useAdmin';

export const AdminAboutPage = () => {
  const { state, updateContent } = useAdmin();

  return (
    <AdminContentForm
      breadcrumbsKey="admin.about.breadcrumbs"
      titleKey="admin.about.title"
      descriptionKey="admin.about.description"
      fields={ADMIN_ABOUT_FIELDS}
      initialValues={state.about}
      onSubmit={(values) => updateContent('about', values)}
    />
  );
};
