from django.contrib.auth.mixins import PermissionRequiredMixin
from django.contrib.auth.models import Group
from django.views.generic import ListView
from core.models import Post


# Create your views here.

class PostView(PermissionRequiredMixin, ListView):

    permission_required = 'core.view_post'
    template_name = 'main.html'
    model = Post

    def get_context_data(self, *, object_list=None, **kwargs):
        print(self.request.user.groups.all()) ### получаем все группы пользователя
        kwargs.update({'groups': Group.objects.all()})
        return super().get_context_data(**kwargs)
