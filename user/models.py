from django.contrib.auth.models import AbstractUser, Group
from django.db.models.signals import post_save


class CustomUser(AbstractUser):
    """Модель юзера"""

    class Meta:
        verbose_name = "CustomUser"
        verbose_name_plural = "CustomUser"


#
#
#
# main code

def add_default_group(sender, instance, created, **kwargs):
    """
    задаем дефолтную группу для пользователя по средствам сигнала, можно переопределить метод save
    """
    if created:
        """ только при создании """
        if Group.objects.all():
            """ если группы есть"""
            instance.groups.add(Group.objects.get(name='default'))  # вместо default любая из существующих групп


post_save.connect(add_default_group, sender=CustomUser)  # регистрируем сигнал
