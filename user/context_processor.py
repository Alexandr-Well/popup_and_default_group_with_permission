from .forms import LoginUserForm


def get_login_form(request):
    return {'login_form': LoginUserForm()}
