from django.db import models

# Create your models here.


class Zone(models.Model):
	user = models.ForeignKey('common.User', related_name='user', on_delete = models.CASCADE)
	zone_name = models.CharField(max_length=255, blank=False)
	description = models.TextField(blank=True)
	coordinate = models.CharField(max_length=1500, blank=False)

	def __str__(self):
		return self.zone_name