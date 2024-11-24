```mermaid
classDiagram
    class Main {
        <<Table>>
    }
    
    class Goods {
        <<Table>>
        +id: int
        +Назва: string
    }

    class Товар {
        <<Table>>
        +id: int
        +slug: string
        +Назва: string
        +Опис: string
        +Зображення: string
        +Кількість: int
        +Ціна: float
        +Знижка: float
        +Акція: boolean
        +Категорія: string
    }

    class Users {
        <<Table>>
        +id: int
        +Username: string
        +Ім'я: string
        +Прізвище: string
        +Аватар: string
    }

    class Кошик {
        <<Table>>
        +id: int
        +Користувач: int
        +Товар: int
        +Кількість: int
        +Ключ сесії: string
        +Дата створення: datetime
    }

    class Замовлення {
        <<Table>>
        +id: int
        +Користувач: int
        +Дата створення: datetime
        +Адреса доставки: string
        +Статус оплати: string
        +Статус доставки: string
    }

    class ЗамовленийТовар {
        <<Table>>
        +id: int
        +Замовлення: int
        +Товар: int
        +Кількість: int
        +Вартість: float
    }

    Main --> Goods
    Goods --> Товар
    Users --> Кошик
    Кошик --> Товар
    Кошик --> Users
    Users --> Замовлення
    Замовлення --> ЗамовленийТовар
    ЗамовленийТовар --> Товар
