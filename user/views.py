from django.http import JsonResponse
from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.views import View
from django.views.generic import CreateView

from user.forms import RegistrationUserForm
from django.contrib.auth import login as auth_login, logout, login, authenticate

from user.models import CustomUser


class RegisterUser(CreateView):
    """ форма для создания юзера
    form_valid авторизирует только что созданного юзера
    """
    form_class = RegistrationUserForm
    template_name = "user/add_user.html"
    success_url = reverse_lazy("main")

    def form_valid(self, form):
        user = form.save()
        auth_login(self.request, user)
        return redirect('main')


class LoginUser(View):
    """ форма для входа под учетную запись"""
    template_name = "user/user_auth.html"

    def post(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password')

        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                login(request, user)
                return JsonResponse(
                    data={
                        'status': 201
                    },
                    status=200
                )
            return JsonResponse(
                data={
                    'status': 400,
                    'error': 'Пароль или логин/email не не корректны'
                },
                status=200
            )
        return JsonResponse(
            data={
                'status': 400,
                'error': 'Введите логин/email и пароль'
            },
            status=200
        )


def logout_user(request):
    """
    logout
    """
    logout(request)
    return redirect('login')


def validate_username(request):
    """Проверка доступности логина"""
    username = request.GET.get('username', None)
    response = {
        'is_taken': CustomUser.objects.filter(username__iexact=username).exists()
    }
    return JsonResponse(response)
