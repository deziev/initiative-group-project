from django.shortcuts import render, redirect, get_object_or_404
from dasein.models import *
from dasein.forms import *
from common.models import *
# Create your views here.

def create_zone(request):
    user = get_object_or_404(User, pk = request.user.pk)

    #coordinates

    coordinates=request.POST.get('coordinates')

    zone_form = ZoneForm()
    if request.method == 'POST':
        zone_form = ZoneForm(request.POST)
        if zone_form.is_valid():
            zone = zone_form.save(commit=False)
            zone.user = user
            zone.coordinate = coordinates
            print(coordinates)
            zone.save()
            
            return redirect("dasein:list_zone")
        else:
            return render(request, 'zone_form.html', {'zone_form': zone_form, "errors": zone_form.errors})
    else:
        return render(request, 'zone_form.html', {'zone_form': zone_form})


def remove_zone(request, pk):
    zone = get_object_or_404(Zone, pk = pk)
    zone.delete()
    return redirect("dasein:list_zone")

def edit_zone(request):
	pass

def view_zone(request, pk):
	pass

def list_zone(request):
    user = get_object_or_404(User, pk = request.user.pk)

    zones = Zone.objects.filter(user = user)

    return render(request, 'zone_list.html', {'zones' : zones,})