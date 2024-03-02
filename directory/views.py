from django.shortcuts import render
from django.http import JsonResponse
from csv import DictReader, Sniffer
from .models import *
from .serializers import *

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
    
    return JsonResponse({"data": reader_array, "header": reader.fieldnames})

def save(request):
    return JsonResponse({"message": "success!"})

def download(request):
    return JsonResponse({"message": "hello!"})