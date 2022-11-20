$(document).ready(function () {
    window.console.log($('#test_btn'))
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    $('#login_form').submit(function (e) {
        e.preventDefault()
        $.ajax({
            type: this.method,
            url: this.action,
            data: $(this).serialize(),
            // headers: {'X-CSRFToken': getCookie('csrftoken')},
            dataType: 'json',
            success: function (response) {
                if (response.status === 201) {
                    window.location.reload()
                } else if (response.status === 400) {
                    $('.alert-danger').text(response.error).removeClass('d-none')
                }
            },
        })
    })

    $('#id_usr').keyup(function () {
        // создаем AJAX-вызов
        $.ajax({
            data: $(this).serialize(), // получаяем данные формы
            url: "{% url 'validate_username' %}",
            // если успешно, то
            success: function (response) {
                if (response.is_taken == true) {
                    window.console.log(response)
                    $('#id_usr').removeClass('is-valid').addClass('is-invalid');
                    $('#id_usr').after('Это имя пользователя недоступно!')
                }
                else {
                    $('#id_usr').removeClass('is-invalid').addClass('is-valid');
                    $('#usernameError').remove();
                }
            },
            // если ошибка, то
            error: function (response) {
                // предупредим об ошибке
                console.log(response.responseJSON)
            }
        });
        return false;
    });
    console.log($('#test_btn'))
    $('#test_btn').click(function () {
        console.log('aaa')
        // создаем AJAX-вызов
        $.ajax({
            data: $(this).serialize(), // получаяем данные формы
            url: "{% url 'get_all_use' %}",
            // если успешно, то
            success: function (response) {
                if (response.is_taken == true) {
                    window.console.log(response)
                    $('#id_usr').removeClass('is-valid').addClass('is-invalid');
                    $('#id_usr').after('Это имя пользователя недоступно!')
                }
                else {
                    $('#id_usr').removeClass('is-invalid').addClass('is-valid');
                    $('#usernameError').remove();
                }
            },
            // если ошибка, то
            error: function (response) {
                // предупредим об ошибке
                console.log(response.responseJSON)
            }
        });
        return false;
    });

})