from django.contrib.auth.mixins import PermissionRequiredMixin
from django.contrib.auth.models import Group
from django.http import JsonResponse
from django.shortcuts import render
from django.views import View
from django.views.generic import ListView
from core.models import Post
from user.models import CustomUser


class PostView(PermissionRequiredMixin, ListView):
    permission_required = 'core.view_post'
    template_name = 'main.html'
    model = Post

    def get_context_data(self, *, object_list=None, **kwargs):
        # print(self.request.user.groups.all()) ### получаем все группы пользователя
        kwargs.update({'groups': Group.objects.all()})
        return super().get_context_data(**kwargs)


def get_all_user(request):
    response = {
        'user': list(CustomUser.objects.all().values())
    }
    return JsonResponse(response)

class GetAllUser(View):

    def get(self, request):
        context = {'users': CustomUser.objects.all()}
        return render(request, 'main.html', context=context)

