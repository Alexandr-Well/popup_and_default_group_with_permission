from django.db import models

from user.models import CustomUser


class Post(models.Model):

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    name = models.CharField('name', max_length=255)

    def __str__(self):
        return f'{self.pk} - {self.name}'
