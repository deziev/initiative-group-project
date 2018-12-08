from django import forms
from django.contrib.auth import authenticate

from dasein.models import *

class ZoneForm(forms.ModelForm):

	class Meta:
		model = Zone
		fields = ['zone_name', 'description']

	def __init__(self, *args, **kwargs):
		super(ZoneForm, self).__init__(*args, **kwargs)
		for field in self.fields.values():
			field.widget.attrs = {"class": "form-control"}