from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("handler", views.handler, name="handler"),
    path("download", views.download, name="download")
]