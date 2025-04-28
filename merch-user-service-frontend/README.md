# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# Merch User Service Frontend

Фронтенд-приложение для взаимодействия с Merch User Service API.

## Запуск
1. Убедитесь, что бэкенд работает на `http://localhost:8080`.
2. Запустите локальный сервер:
   ```bash
   python -m http.server 3000


**Описание**:
- **`public/`**: Статические файлы (иконки, изображения).
- **`src/assets/`**: Ресурсы, такие как логотип.
- **`src/components/`**: Компоненты React (навигация, страницы).
- **`src/context/`**: Контекст для управления аутентификацией.
- **`src/App.jsx`**: Основной компонент с маршрутизацией.
- **`src/main.jsx`**: Точка входа.
- **`src/index.css`**: Глобальные стили Tailwind CSS.
- **`package.json`**: Зависимости (`react`, `react-router-dom`, `axios`, `tailwindcss`).
- **`vite.config.js`**: Конфигурация Vite.
- **`tailwind.config.js`**: Конфигурация Tailwind CSS.
- **`postcss.config.js`**: Конфигурация PostCSS для Tailwind.
