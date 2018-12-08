from django.conf.urls import url
from dasein import views

app_name = 'dasein'


urlpatterns = [
    url(r'^$', views.list_zone, name="list_zone"),
    url(r'^update/$', views.update, name="update"),
    url(r'^create/$', views.create_zone, name="create_zone"),
    url(r'^(?P<pk>[-\w]+)/edit/$', views.edit_zone, name="edit_zone"),
    url(r'^(?P<pk>[-\w]+)/remove/$', views.remove_zone, name="remove_zone"),
    url(r'^(?P<pk>[-\w]+)/$', views.view_zone, name="view_zone"),
   ]
