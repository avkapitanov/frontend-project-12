const ru = {
  translation: {
    chat: {
      messageCount_zero: '{{count}} сообщений',
      messageCount_one: '{{count}} сообщение',
      messageCount_few: '{{count}} сообщения',
      messageCount_many: '{{count}} сообщений',
      enterMessage: 'Введите сообщение',
      message: 'Сообщение',
      submit: 'Отправить',
      required: 'Сообщение обязательно'
    },
    login: {
      title: 'Войти',
      authError: 'Неверные имя пользователя или пароль',
      networkError: 'Ошибка сети',
      username: 'Ваш ник',
      password: 'Пароль',
      submit: 'Войти',
      haveNotAccount: 'Нет аккаунта?',
      signup: 'Регистрация',
    },
    signup: {
      title: 'Регистрация',
      requiredField: 'Обязательное поле',
      passMinLength: 'Не менее 6 символов',
      passNotMatch: 'Пароли не совпадают',
      usernameLength: 'От 3 до 20 символов',
      username: 'Имя пользователя',
      password: 'Пароль',
      passwordConfirmation: 'Подтвердите пароль',
      userAlreadyExists: 'Такой пользователь уже существует',
      submit: 'Зарегистрироваться',
    },
    notFound: {
      title: 'Страница не найдена',
      text: 'Но вы можете перейти ',
      linkText: 'на главную страницу',
    },
    channels: {
      menu: 'Управление каналом',
      rename: 'Переименовать',
      remove: 'Удалить',
      channels: 'Каналы',
    },
    common: {
      logout: 'Выйти',
      hexletChat: 'Hexlet Chat',
    },
    modals: {
      add: {
        min: 'Минимум 3 символа',
        max: 'Максимум 20 символов',
        alreadyExists: 'Такой канал уже существует',
        requiredField: 'Обязательное поле',
        title: 'Добавить канал',
        channelName: 'Имя канала',
        enterChannelName: 'Введите имя канала',
        cancel: 'Отменить',
        submit: 'Отправить',
        channelAdded: 'Канал создан',
      },
      remove: {
        title: 'Удалить канал',
        cancel: 'Отменить',
        submit: 'Удалить',
        channelRemoved: 'Канал удалён',
      },
      rename: {
        title: 'Переименовать канал',
        submit: 'Переименовать',
        channelRenamed: 'Канал переименован',
      }
    },
    error: {
      networkError: 'Ошибка соединения',
      authError: 'Ошибка авторизации',
      requiredField: 'Обязательное поле',
    }
  },
};

export default ru;