from django.shortcuts import render, redirect, get_object_or_404
from dasein.models import *
from dasein.forms import *
from common.models import *

from django.http import JsonResponse
import random
import math
import time

def update(request):

    values = []
    for i in range(0, 50):
        uuid = random.randint(0,500)
        timestamp = time.time()
        base_lat = 55.7
        base_lng = 37.6

        lat = base_lat + random.random()/100
        lng = base_lng + random.random()/100

        results = {
            "uuid" : uuid,
            "time" : timestamp,
            "lat" : lat,
            "long" : lng,
        }
        values.append(results)

    print(values)

    return JsonResponse({'latest_results_list':values})


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
    zone = get_object_or_404(Zone, pk = pk)
    my_list  = str(zone.coordinate).split(",")
    final_zone = []

    count = 0
    #for element in my_list:

    for x, y in zip(*[iter(my_list)] * 2):
        #print(x, y)
        final_zone.append([float(x), float(y)])
        #print()

    return render(request, 'zone_detail.html', {'zone' : zone, 'coordinates' : final_zone })

def list_zone(request):
    user = get_object_or_404(User, pk = request.user.pk)

    zone = Zone.objects.filter(user = user)

    return render(request, 'zone_list.html', {'zones' : zone})