from django.shortcuts import render
from django.http import JsonResponse
from csv import DictReader, Sniffer
from .models import *
from .serializers import *

# Create your views here.
def index(request):
    return render(request, "directory/index.html")

def handler(request):
    file = request.FILES["file"]
    decoded_file = file.read().decode("utf-8").splitlines()
    reader = DictReader(decoded_file, dialect=Sniffer().sniff(decoded_file[0]))
    
    Books.objects.all().delete()

    for row in reader:
        Books.objects.create(
            isbn = row["ISBN"],
            title = row["Title"],
            author = row["Author"],
            publisher = row["Publisher"],
            price = row["Price"],
            tel = row["Telephone Number"],
        )

    book = Books.objects.all()
    serializer = BooksSerializer(book, many=True)
    
    return JsonResponse(serializer.data, safe=False)

def download(request):
    return JsonResponse({"message": "hello!"})