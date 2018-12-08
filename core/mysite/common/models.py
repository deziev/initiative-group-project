from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager

from django.dispatch import receiver
from django.db.models.signals import post_save

class User(AbstractBaseUser, PermissionsMixin):
	username = models.CharField(max_length=100, unique=True, null=True)
	email = models.EmailField(max_length=255, unique=True)
	date_joined = models.DateTimeField(('date joined'), auto_now_add=True)
	is_staff = models.BooleanField(default=False)
	is_active = models.BooleanField(default=True)
	is_admin = models.BooleanField(default=False)

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['username', ]

	objects = UserManager()

	def __unicode__(self):
		return self.email

@receiver(post_save, sender=User)
def create_base64_str(sender, instance=None, created=False, **kwargs):
    if created:
        instance.username = str(instance.pk)
        instance.save()