import React from 'react';
import { Form, Input, InputNumber, DatePicker, Select, Button, Card, Space, message } from 'antd';
import { useTranslation } from 'react-i18next';
import type { BookingRequest } from '../../types/booking';

const { Option } = Select;
const { TextArea } = Input;

const BookingPage: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onFinish = (values: Record<string, unknown>) => {
    const eventDate = values.eventDate as { toISOString?: () => string } | undefined;
    const formattedData: BookingRequest = {
      fullName: values.fullName as string,
      email: values.email as string,
      eventDate: eventDate && typeof eventDate.toISOString === 'function' ? eventDate.toISOString() : '',
      eventType: values.eventType as string,
      guestCount: values.guestCount as number,
      notes: values.notes as string | undefined,
    };

    console.log('Submitting booking data:', formattedData);
    message.success(t('booking.success_message'));
    form.resetFields();
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 16px' }}>
      <Card title={t('booking.title')} variant="borderless">
        <Form form={form} layout="vertical" onFinish={onFinish} requiredMark="optional">
          <Form.Item
            name="fullName"
            label={t('booking.labels.full_name')}
            rules={[{ required: true, message: t('booking.validation.required_name') }]}
          >
            <Input placeholder={t('booking.placeholders.full_name')} />
          </Form.Item>

          <Form.Item
            name="email"
            label={t('booking.labels.email')}
            rules={[
              { required: true, message: t('booking.validation.required_email') },
              { type: 'email', message: t('booking.validation.invalid_email') },
            ]}
          >
            <Input placeholder={t('booking.placeholders.email')} />
          </Form.Item>

          <Space size="large" style={{ display: 'flex', width: '100%' }} align="start">
            <Form.Item
              name="eventDate"
              label={t('booking.labels.date')}
              rules={[{ required: true, message: t('booking.validation.required_date') }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="eventType"
              label={t('booking.labels.event_type')}
              rules={[{ required: true, message: t('booking.validation.required_type') }]}
              style={{ minWidth: 200 }}
            >
              <Select placeholder={t('booking.placeholders.event_type')}>
                <Option value="wedding">{t('booking.types.wedding')}</Option>
                <Option value="corporate">{t('booking.types.corporate')}</Option>
                <Option value="birthday">{t('booking.types.birthday')}</Option>
                <Option value="anniversary">{t('booking.types.anniversary')}</Option>
              </Select>
            </Form.Item>
          </Space>

          <Form.Item
            name="guestCount"
            label={t('booking.labels.guests')}
            rules={[{ required: true, message: t('booking.validation.required_guests') }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="notes" label={t('booking.labels.notes')}>
            <TextArea rows={4} placeholder={t('booking.placeholders.notes')} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {t('booking.submit_button')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default BookingPage;
