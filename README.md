
# Інтернет-магазин на Django


Це повноцінний проект інтернет-магазину, розроблений на Django. У ньому я використовував AJAX-запити для динамічного оновлення кількості товарів на сторінці кошика без перезавантаження сторінки.
## Встановлення 

### Клонуйте репозиторій 
```bash
git clone https://github.com/Tarasgr7/coursework_main.git
cd OnlineStore
```

Якщо ви не використовуєте Git, ви можете просто скачати вихідний код репозиторію в ZIP-архіві і розпакувати його на свій комп'ютер.

### Створіть віртуальне оточення та активуйте його
```bash
python -m venv venv
source venv/bin/activate
```

### Встановіть бібліотеки
```bash
pip install -r requirements.txt
```

### Запустіть міграції та завантажте дані до БД
```bash
python manage.py migrate
python manage.py loaddata categories.json
python manage.py loaddata products.json
```

### Створіть адміністратора магазину
```bash
python manage.py createsuperuser
```

### Запустіть сервер
```bash
python manage.py runserver
```

### Відкрийте браузер та перейдіть за адресою
[http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

Введіть ім'я користувача та пароль адміністратора, щоб увійти до панелі керування магазином.

## Готово!
Ви успішно встановили магазин на Django та готові почати його використовувати!
