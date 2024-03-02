from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("reader", views.reader, name="reader"),
    path("save", views.save, name="save"),
    path("download", views.download, name="download"),
]