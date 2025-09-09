# User Service API

Сервис управления пользователями с регистрацией, авторизацией, ролями и блокировкой.

## 🛠️ Функционал

- Регистрация пользователя
- Авторизация (JWT)
- Получение пользователя по ID (сам или админ)
- Получение списка пользователей (только админ)
- Блокировка пользователя (админ или сам пользователь)
- Валидация входных данных
- Документация через Swagger

## 🧰 Технологии

- **Node.js + Express** — сервер
- **TypeScript** — типизация
- **PostgreSQL** — база данных
- **TypeORM** — ORM
- **JWT** — аутентификация
- **Joi** — валидация
- **Swagger (OpenAPI)** — документация API
- **Docker** — контейнеризация

### 1. 🚀 Запуск

1.1 Клонируй репозиторий

```bash
git clone https://github.com/ваш-профиль/user-service.git
cd user-service
```

1.2. Установи зависимости

```bash
npm install
```

1.3. Запусти сервисы

```bash
docker-compose up --build
```

### 2. Структура проекта

```bash
src/
├── entities/ # Модели БД (например, User)
├── routes/ # Роуты API
├── controllers/ # Обработчики запросов
├── services/ # Бизнес-логика
├── middleware/ # Проверка токена, валидация
├── schemas/ # Схемы валидации (Joi)
├── types/ # DTO и типы
├── config/ # Подключение к БД
├── swagger.ts # Подключение к БД
└── server.ts # Точка входа
```

### 3. Документация

Полная интерактивная документация доступна по адресу:
http://localhost:3000/api/docs

### 4. Postman Collection

Для удобного тестирования API доступна коллекция запросов.

[Postman Collection](https://telecoms-geoscientist-36440501-4149124.postman.co/workspace/Alexey-Chernecki's-Workspace~9895b577-0722-4852-8a7c-a22357aa0dac/collection/47106786-d1f0fe16-7e5d-43ea-9075-1cb8d4d2ad8f?action=share&source=copy-link&creator=47106786)
