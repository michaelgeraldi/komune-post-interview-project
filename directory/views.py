from django.shortcuts import render
from django.http import JsonResponse
from csv import DictReader, Sniffer
from .models import *
import json

# Create your views here.
def index(request):
    return render(request, "directory/index.html")

def reader(request):
    file = request.FILES["file"]
    decoded_file = file.read().decode("utf-8").splitlines()
    reader = DictReader(decoded_file, dialect=Sniffer().sniff(decoded_file[0]))
    
    reader_array = []
    for row in reader:
        reader_array.append(row)
    
    return JsonResponse({"header": reader.fieldnames, "data": reader_array})

def save(request):
    json_data = json.loads(request.body)
    user_input = UserInput.objects.create(data=json_data)
    return JsonResponse({"message": "Data Saved!"})

def download(request):
    json_data = UserInput.objects.last()
    return JsonResponse(json_data.data)