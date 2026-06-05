import { AdminContentForm } from '@/components/admin/AdminContentForm';
import { ADMIN_EXPERIENCE_FIELDS } from '@/consts/adminContentFields';
import { useAdmin } from '@/hooks/useAdmin';

export const AdminExperiencePage = () => {
  const { state, updateContent } = useAdmin();

  return (
    <AdminContentForm
      breadcrumbsKey="admin.experience.breadcrumbs"
      titleKey="admin.experience.title"
      descriptionKey="admin.experience.description"
      fields={ADMIN_EXPERIENCE_FIELDS}
      initialValues={state.experience}
      onSubmit={(values) => updateContent('experience', values)}
    />
  );
};
