import React from 'react';
import { Form, Input, InputNumber, DatePicker, Select, Button, Card, Space, message } from 'antd';
import { useTranslation } from 'react-i18next';
import type { BookingRequest } from '../../types/booking';

const { Option } = Select;
const { TextArea } = Input;

const BookingPage: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onFinish = (values: Record<string, any>) => {
    const formattedData: BookingRequest = {
      fullName: values.fullName,
      email: values.email,
      eventDate: values.eventDate && typeof values.eventDate.toISOString === 'function' 
        ? values.eventDate.toISOString() 
        : '',
      eventType: values.eventType,
      guestCount: values.guestCount,
      notes: values.notes,
    };
    
    console.log('Submitting booking data:', formattedData);
    message.success(t('booking.success_message', 'Request submitted successfully!'));
    form.resetFields();
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 16px' }}>
      <Card title={t('booking.title', 'Book Your Event Planner')} variant="borderless">
        <Form form={form} layout="vertical" onFinish={onFinish} requiredMark="optional">
          <Form.Item
            name="fullName"
            label={t('booking.labels.full_name', 'Full Name')}
            rules={[{ required: true, message: t('booking.validation.required_name', 'Please enter your name') }]}
          >
            <Input placeholder={t('booking.placeholders.full_name', 'Enter your name')} />
          </Form.Item>

          <Form.Item
            name="email"
            label={t('booking.labels.email', 'Email')}
            rules={[
              { required: true, message: t('booking.validation.required_email', 'Please enter your email') },
              { type: 'email', message: t('booking.validation.invalid_email', 'Please enter a valid email') }
            ]}
          >
            <Input placeholder="example@mail.com" />
          </Form.Item>

          <Space size="large" style={{ display: 'flex', width: '100%' }} align="start">
            <Form.Item
              name="eventDate"
              label={t('booking.labels.date', 'Event Date')}
              rules={[{ required: true, message: t('booking.validation.required_date', 'Select a date') }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="eventType"
              label={t('booking.labels.event_type', 'Event Type')}
              rules={[{ required: true, message: t('booking.validation.required_type', 'Pick a type') }]}
              style={{ minWidth: 200 }}
            >
              <Select placeholder={t('booking.placeholders.event_type', 'Select style')}>
                <Option value="wedding">{t('booking.types.wedding', 'Wedding')}</Option>
                <Option value="corporate">{t('booking.types.corporate', 'Corporate')}</Option>
                <Option value="birthday">{t('booking.types.birthday', 'Birthday')}</Option>
                <Option value="anniversary">{t('booking.types.anniversary', 'Anniversary')}</Option>
              </Select>
            </Form.Item>
          </Space>

          <Form.Item
            name="guestCount"
            label={t('booking.labels.guests', 'Estimated Guest Count')}
            rules={[{ required: true, message: t('booking.validation.required_guests', 'Specify guests') }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="notes" label={t('booking.labels.notes', 'Notes')}>
            <TextArea rows={4} placeholder={t('booking.placeholders.notes', 'Tell us about your dream vision...')} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {t('booking.submit_button', 'Submit Request')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default BookingPage;
