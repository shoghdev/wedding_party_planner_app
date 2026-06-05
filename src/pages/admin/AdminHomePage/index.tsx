import { AdminContentForm } from '@/components/admin/AdminContentForm';
import { ADMIN_HOME_FIELDS } from '@/consts/adminContentFields';
import { useAdmin } from '@/hooks/useAdmin';

export const AdminHomePage = () => {
  const { state, updateContent } = useAdmin();

  return (
    <AdminContentForm
      breadcrumbsKey="admin.home.breadcrumbs"
      titleKey="admin.home.title"
      descriptionKey="admin.home.description"
      fields={ADMIN_HOME_FIELDS}
      initialValues={state.home}
      onSubmit={(values) => updateContent('home', values)}
    />
  );
};
