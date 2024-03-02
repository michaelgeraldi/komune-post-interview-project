from django.db import models

# Create your models here.
class Books(models.Model):
    isbn = models.CharField(max_length=250, blank=True)
    title = models.CharField(max_length=250, blank=True)
    author = models.CharField(max_length=250, blank=True)
    publisher = models.CharField(max_length=250, blank=True)
    price = models.IntegerField(blank=True)
    tel = models.CharField(max_length=250, blank=True)

