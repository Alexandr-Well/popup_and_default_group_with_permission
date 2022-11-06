from datetime import datetime
from django import forms
from .models import CustomUser
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm


class RegistrationUserForm(UserCreationForm):
    """форма регистрации пользователя"""
    username = forms.CharField(label="Login name", widget=forms.TextInput(attrs={'class': "form-input", 'id': 'id_usr'}))
    email = forms.EmailField(max_length=100, label="Email", widget=forms.TextInput(attrs={'class': "form-input"}))
    password1 = forms.CharField(label="Password", widget=forms.PasswordInput(attrs={'class': "form-input"}))
    password2 = forms.CharField(label="Again Password", widget=forms.PasswordInput(attrs={'class': "form-input"}))

    class Meta:
        model = CustomUser
        fields = (
            'username', 'email', 'password1', 'password2'
        )


class LoginUserForm(AuthenticationForm):
    """форма aутентификации"""
    username = forms.CharField(label="Login",
                               widget=forms.TextInput(attrs={'class': "form-control", 'autocomplete': 'email'}))
    password = forms.CharField(label="Password", widget=forms.PasswordInput(attrs={'class': "form-control"}))
