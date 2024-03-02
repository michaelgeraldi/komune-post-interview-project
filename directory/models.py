from django.db import models

# Create your models here.
class UserInput(models.Model):
    data = models.JSONField()

