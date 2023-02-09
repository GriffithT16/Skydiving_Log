from django.db import models
from authentication.models import User

# Create your models here.
class Skydiver(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    license = models.CharField(max_length=30)
    year = models.IntegerField()