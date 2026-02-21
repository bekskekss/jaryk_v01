import type { Messages } from "./en"

export const ru: Messages = {
  // App identity
  appName: "JARYK",
  appTagline: "Поддержка и безопасность",
  appNameDiscreet: "Заметки",

  // Navigation
  nav: {
    home: "Главная",
    hub: "Статьи",
    sos: "SOS",
    chat: "Чат",
    centers: "Центры помощи",
    profile: "Профиль",
    settings: "Настройки",
  },
  navDiscreet: {
    home: "Главная",
    hub: "Библиотека",
    sos: "Действие",
    chat: "Помощник",
    centers: "Места",
    profile: "Аккаунт",
    settings: "Параметры",
  },

  // Welcome page
  welcome: {
    heading: "JARYK",
    tagline: "Поддержка и безопасность",
    feature1Title: "Экстренная помощь",
    feature1Desc: "Один клик SOS для оповещения ваших экстренных контактов",
    feature2Title: "Знания и ресурсы",
    feature2Desc: "Статьи, юридические справки и информация о поддержке",
    feature3Title: "Конфиденциальная поддержка",
    feature3Desc: "Режим маскировки сохраняет вашу активность в тайне",
    getStarted: "Начать",
    learnMore: "Узнать больше",
    privacyNote: "Ваша безопасность -- наш приоритет. Все данные остаются на вашем устройстве.",
  },

  // Auth page
  auth: {
    welcome: "Добро пожаловать",
    subtitle: "Войдите или создайте аккаунт для продолжения.",
    signIn: "Вход",
    signUp: "Регистрация",
    email: "Email",
    emailPlaceholder: "ваш@email.com",
    password: "Пароль",
    passwordPlaceholder: "Введите пароль",
    createPassword: "Придумайте пароль",
    fullName: "Полное имя",
    namePlaceholder: "Ваше имя",
    phone: "Телефон (необязательно)",
    phonePlaceholder: "+996 ...",
    signingIn: "Входим...",
    signInBtn: "Войти",
    creatingAccount: "Создаём аккаунт...",
    createAccount: "Создать аккаунт",
    continueGuest: "Продолжить как гость",
    guestNote: "Гостевой доступ позволяет использовать SOS и просматривать ресурсы. Создайте аккаунт для сохранения настроек.",
    back: "Назад",
    showPassword: "Показать пароль",
    hidePassword: "Скрыть пароль",
  },

  // Home page
  home: {
    greeting: "Вы не одна",
    greetingDiscreet: "С возвращением",
    subtitle: "Помощь всегда рядом.",
    subtitleDiscreet: "Что вы хотите сделать сегодня?",
    emergencySOS: "Экстренный SOS",
    emergencySOSDiscreet: "Быстрое действие",
    sosSubtitle: "Нажмите, чтобы оповестить ваши экстренные контакты",
    sosSubtitleDiscreet: "Отправить быстрое уведомление",
    quickActions: "Быстрые действия",
    quickActionsDiscreet: "Действия",
    emergencyContacts: "Экстренные контакты",
    emergencyContactsDiscreet: "Сохранённые контакты",
    viewAll: "Все",
    call: "Звонок",
    hubDesc: "Статьи и справки",
    centersDesc: "Найти помощь рядом",
    chatDesc: "Получить совет",
  },

  // SOS page
  sos: {
    title: "Экстренный SOS",
    titleDiscreet: "Быстрое действие",
    confirm: "Отправить экстренный сигнал",
    confirmDiscreet: "Отправить уведомление",
    confirmDesc: "Это отправит экстренное оповещение вашим доверенным контактам с вашим текущим местоположением.",
    confirmDescDiscreet: "Это отправит уведомление вашим контактам с вашим текущим местоположением.",
    sending: "Отправка сигнала...",
    sendingDiscreet: "Отправка уведомления...",
    sendingDesc: "Оповещаем ваши экстренные контакты с местоположением.",
    sendingDescDiscreet: "Связываемся с вашими контактами.",
    sent: "Сигнал отправлен",
    sentDiscreet: "Уведомление отправлено",
    sentDesc: "Ваши экстренные контакты оповещены с вашим текущим местоположением. Помощь уже в пути.",
    sentDescDiscreet: "Ваши контакты оповещены с вашим текущим местоположением.",
    backHome: "На главную",
    callEmergency: "Позвонить 112",
    info: "Ваши экстренные контакты получат ваше GPS-местоположение по SMS.",
    infoDiscreet: "Ваши контакты получат ваше местоположение.",
    emergencyWarning: "Если вы в непосредственной опасности, позвоните в службу спасения.",
  },

  // Hub page
  hub: {
    title: "Образовательный центр",
    titleDiscreet: "Библиотека",
    subtitle: "Статьи, справки и ресурсы для вашей помощи.",
    subtitleDiscreet: "Просматривайте доступные материалы.",
    readTime: "мин чтения",
    noArticles: "Статьи не найдены.",
    allCategories: "Все",
    placeholder: "Статьи, справки и ресурсы появятся здесь в фазе 2.",
  },

  // Chat page
  chat: {
    title: "ИИ Чат",
    titleDiscreet: "Помощник",
    placeholder: "ИИ-помощник будет доступен здесь в фазе 2.",
    unavailable: "Чат временно недоступен. Функция в разработке.",
    inputPlaceholder: "Введите сообщение...",
    send: "Отправить",
  },

  // Centers page
  centers: {
    title: "Центры помощи",
    titleDiscreet: "Места",
    subtitle: "Найдите ближайшие службы поддержки.",
    subtitleDiscreet: "Просматривайте доступные места.",
    mapPlaceholder: "Интерактивная карта скоро появится",
    noCenters: "Центры не найдены.",
    allTypes: "Все",
    directions: "Маршрут",
    placeholder: "Карта и список центров появятся здесь в фазе 2.",
  },

  // Profile page
  profile: {
    title: "Профиль",
    titleDiscreet: "Аккаунт",
    subtitle: "Управляйте своей личной информацией",
    personalInfo: "Личная информация",
    name: "Имя",
    email: "Email",
    phone: "Телефон",
    emergencyContact: "Экстренные контакты",
    emergencyContactDiscreet: "Сохранённые контакты",
    contactName: "Имя контакта",
    contactPhone: "Номер контакта",
    language: "Язык",
    edit: "Редактировать профиль",
    member: "Участник аккаунта",
    addContact: "Добавить контакт",
    goToSettings: "Настройки",
    comingSoon: "Управление профилем скоро будет доступно",
    notSet: "Не указан",
    guestUser: "Гость",
    guestEmail: "Не авторизован",
  },

  // Settings page
  settings: {
    title: "Настройки",
    titleDiscreet: "Параметры",
    subtitle: "Управляйте настройками приложения.",
    discreet: "Режим маскировки",
    discreetToggle: "Включить режим маскировки",
    discreetDesc: "Маскирует приложение нейтральными метками и простой цветовой схемой для конфиденциальности.",
    language: "Язык",
    languageDesc: "Выберите ваш язык",
    notifications: "Уведомления",
    notificationsDesc: "Настройки уведомлений будут доступны в будущем обновлении.",
    privacy: "Конфиденциальность",
    privacyDesc: "Настройки конфиденциальности будут доступны в будущем обновлении.",
    pushNotifications: "Push-уведомления",
    pushDesc: "Получайте оповещения о важных обновлениях",
    emailNotifications: "Email-уведомления",
    emailDesc: "Получайте информацию о поддержке по электронной почте",
    support: "Поддержка",
    supportDesc: "Нужна помощь? Свяжитесь с поддержкой или посмотрите FAQ.",
    comingSoon: "Появится в фазе 3",
  },

  // About page
  about: {
    title: "О JARYK",
    description: "JARYK -- приложение для безопасности, созданное для поддержки женщин в Кыргызстане, столкнувшихся с насилием. Оно предоставляет немедленную помощь, образовательные ресурсы и связь со службами поддержки -- всё в дискретном, конфиденциальном формате.",
    getStarted: "Начать",
    noAccountRequired: "Аккаунт не требуется для экстренных функций.",
    features: {
      sos: { title: "Экстренный SOS", desc: "Одно нажатие для оповещения ваших доверенных контактов с местоположением." },
      contacts: { title: "Контакты поддержки", desc: "Горячие линии, юридическая и психологическая помощь в Кыргызстане." },
      education: { title: "Образовательные ресурсы", desc: "Статьи о планировании безопасности, правах, эмоциональном здоровье и доступных услугах." },
      map: { title: "Карта центров помощи", desc: "Найдите ближайшие приюты, кризисные центры и юридические офисы." },
      chat: { title: "ИИ-помощник", desc: "Получите рекомендации и ответы на вопросы в безопасном, конфиденциальном чате." },
      discreet: { title: "Режим маскировки", desc: "Маскирует приложение нейтральными метками и цветами для полной конфиденциальности." },
    },
  },

  // Empty states
  empty: {
    noArticles: "Статей нет",
    articlesDesc: "Статьи появятся скоро",
    chatUnavailable: "Чат недоступен",
    chatUnavailableDesc: "ИИ-помощник в разработке",
    comingSoon: "Скоро",
  },

  // Quick Exit
  quickExit: "Выход",

  // Common
  common: {
    back: "Назад",
    cancel: "Отмена",
    save: "Сохранить",
    on: "Вкл",
    off: "Выкл",
    viewAll: "Все",
    loading: "Загрузка...",
    error: "Что-то пошло не так",
    retry: "Повторить",
    phase3: "Появится в фазе 3",
  },
} as const
