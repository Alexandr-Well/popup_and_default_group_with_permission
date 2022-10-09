# Popup и Добавление дефолтной группы для пользователя

## Добавление дефолтной группы для пользователя

1. models and view
```
в модели user/models реализован сигнал для дефолтной группы
в core/views небольшая шпаргалка для того чтоб достучатся до группы 
и реализация permission
```

## Popup(модальное/всплывающее окно) авторизации

1. Подключение модулей
```
base.html
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
        integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3"
        crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.min.js"
        integrity="sha384-IDwe1+LCz02ROU9k972gdyvl+AESN10+x7tBKgc9I5HFtuNz0wWnPclzo6p9vxnk"
        crossorigin="anonymous"></script>
<script
        src="https://code.jquery.com/jquery-3.6.1.min.js"
        integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ="
        crossorigin="anonymous">

</script>
<script src="{% static 'js/main.js' %}"></script>
как пример подключения (bootstrap, Jquery, сам файл с js)
```
2. Реализовано на CBV (View)
```
user/views
```

3. Основные действия
```
на странице с попап не забыть подключить сам попап
<a href="{% url 'login' %}" data-bs-toggle="modal" data-bs-target="#loginModal">Login</a>
и не забыть инклуд 
{% include 'user/user_auth.html' %}
```
4. Подготовка файлов 
```
forms.py обычная форма, не забыть прокинуть в нее классы
context_processor.py также не забыть подключить в settings
шаблон обычный бутстраповский
```
5. Логика
```
Вся логика написана в файле main.js
core/static/js/main.js
```