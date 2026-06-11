import fs from 'fs';
import path from 'path';

const localesDir = path.join(process.cwd(), 'public/locales');

function parseJson(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.charCodeAt(0) === 0xfeff) content = content.slice(1);
  return JSON.parse(content);
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function fillMissing(target, source) {
  const output = { ...target };
  for (const [key, value] of Object.entries(source)) {
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      output[key] &&
      typeof output[key] === 'object' &&
      !Array.isArray(output[key])
    ) {
      output[key] = fillMissing(output[key], value);
    } else if (!(key in output)) {
      output[key] = value;
    }
  }
  return output;
}

function deepMerge(target, source) {
  const output = { ...target };
  for (const [key, value] of Object.entries(source)) {
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      output[key] &&
      typeof output[key] === 'object' &&
      !Array.isArray(output[key])
    ) {
      output[key] = deepMerge(output[key], value);
    } else {
      output[key] = value;
    }
  }
  return output;
}

const enPatch = {
  header: {
    mainNav: 'Main navigation',
    mobileNav: 'Mobile navigation',
  },
  common: {
    social: {
      instagram: 'Instagram',
      facebook: 'Facebook',
      pinterest: 'Pinterest',
    },
  },
  booking: {
    title: 'Book Your Event Planner',
    success_message: 'Request submitted successfully!',
    submit_button: 'Submit Request',
    labels: {
      full_name: 'Full Name',
      email: 'Email',
      date: 'Event Date',
      event_type: 'Event Type',
      guests: 'Estimated Guest Count',
      notes: 'Notes',
    },
    placeholders: {
      full_name: 'Enter your name',
      email: 'example@mail.com',
      event_type: 'Select event type',
      notes: 'Tell us about your dream vision...',
    },
    validation: {
      required_name: 'Please enter your name.',
      required_email: 'Please enter your email.',
      invalid_email: 'Please enter a valid email address.',
      required_date: 'Please select a date.',
      required_type: 'Please select an event type.',
      required_guests: 'Please specify the guest count.',
    },
    types: {
      wedding: 'Wedding',
      corporate: 'Corporate',
      birthday: 'Birthday',
      anniversary: 'Anniversary',
    },
  },
};

const ruPatch = {
  header: {
    mainNav: 'Основная навигация',
    mobileNav: 'Мобильная навигация',
  },
  common: {
    social: {
      instagram: 'Instagram',
      facebook: 'Facebook',
      pinterest: 'Pinterest',
    },
  },
  booking: {
    title: 'Забронировать организатора',
    success_message: 'Заявка успешно отправлена!',
    submit_button: 'Отправить заявку',
    labels: {
      full_name: 'Полное имя',
      email: 'Email',
      date: 'Дата мероприятия',
      event_type: 'Тип мероприятия',
      guests: 'Примерное количество гостей',
      notes: 'Примечания',
    },
    placeholders: {
      full_name: 'Введите ваше имя',
      email: 'example@mail.com',
      event_type: 'Выберите тип мероприятия',
      notes: 'Расскажите о вашем видении...',
    },
    validation: {
      required_name: 'Пожалуйста, введите ваше имя.',
      required_email: 'Пожалуйста, введите email.',
      invalid_email: 'Пожалуйста, введите корректный email.',
      required_date: 'Пожалуйста, выберите дату.',
      required_type: 'Пожалуйста, выберите тип мероприятия.',
      required_guests: 'Пожалуйста, укажите количество гостей.',
    },
    types: {
      wedding: 'Свадьба',
      corporate: 'Корпоратив',
      birthday: 'День рождения',
      anniversary: 'Юбилей',
    },
  },
  about: {
    stats: {
      events: { value: '150+', label: 'Организованных событий' },
      years: { value: '8+', label: 'Лет опыта' },
      couples: { value: '50+', label: 'Счастливых пар' },
      dedication: { value: '100%', label: 'Преданность делу' },
    },
    different: {
      title: 'Чем мы отличаемся',
      items: {
        personalized: {
          title: 'Персональный подход',
          description: 'Каждое событие отражает вашу уникальную историю, стиль и видение.',
        },
        creative: {
          title: 'Креативный и стильный дизайн',
          description: 'Свежие, элегантные концепции, которые делают праздник по-настоящему особенным.',
        },
        stressFree: {
          title: 'Без стресса',
          description: 'Мы управляем каждой деталью, чтобы вы могли наслаждаться моментом.',
        },
        trusted: {
          title: 'Надёжные партнёрства',
          description: 'Долгосрочные отношения с парами, подрядчиками и площадками.',
        },
      },
    },
  },
  contact: {
    follow: { title: 'Мы в соцсетях' },
    form: {
      namePlaceholder: 'Ваше имя',
      nameRequired: 'Пожалуйста, введите ваше имя.',
      emailPlaceholder: 'Ваш email',
      emailRequired: 'Пожалуйста, введите email.',
      emailInvalid: 'Пожалуйста, введите корректный email.',
      phonePlaceholder: 'Ваш номер телефона',
      phoneRequired: 'Пожалуйста, введите номер телефона.',
      messagePlaceholder: 'Расскажите о вашем мероприятии...',
      messageRequired: 'Пожалуйста, введите сообщение.',
      emailSubject: 'Сообщение от {{name}} - {{phone}}',
      success: 'Спасибо! Ваше сообщение отправлено.',
      error: 'Что-то пошло не так. Пожалуйста, попробуйте снова.',
      errorWithReason: 'Не удалось отправить: {{reason}}',
      configError:
        'Email ещё не настроен. Добавьте ключи EmailJS в .env и перезапустите сервер.',
    },
  },
  footer: {
    newsletter: {
      title: 'ВДОХНОВЕНИЕ',
      description: 'Получайте советы по планированию, идеи и эксклюзивные предложения.',
      placeholder: 'Ваш email',
      submit: 'ПОДПИСАТЬСЯ',
      emailRequired: 'Пожалуйста, введите ваш email.',
      emailInvalid: 'Пожалуйста, введите корректный email.',
    },
  },
  home: {
    stories: {
      slides: {
        five: 'Крупный план букета невесты',
        six: 'Танцевальный пол на приёме',
        seven: 'Проход церемонии на открытом воздухе',
        eight: 'Стол с тортом и десертами',
      },
    },
  },
};

const en = deepMerge(parseJson(path.join(localesDir, 'en.json')), enPatch);
const ru = fillMissing(fillMissing(parseJson(path.join(localesDir, 'ru.json')), en), ruPatch);
let am = fillMissing(parseJson(path.join(localesDir, 'am.json')), en);

am = deepMerge(am, JSON.parse(fs.readFileSync(path.join(process.cwd(), 'scripts/am.i18n-overlay.json'), 'utf8')));

writeJson(path.join(localesDir, 'en.json'), en);
writeJson(path.join(localesDir, 'ru.json'), ru);
writeJson(path.join(localesDir, 'am.json'), am);

console.log('Locale files updated.');
