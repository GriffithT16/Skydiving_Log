from django.db import models
from authentication.models import User

# Create your models here.
class Jump(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    jumpnum = models.CharField(max_length=30)
    date = models.DateField(("mm/dd/yyyy"), auto_now=False, auto_now_add=False)
    place = models.CharField(max_length=30)
    aircraft = models.CharField(max_length=30)
    equipment = models.CharField(max_length=30)
    altitude = models.IntegerField()
    freefall = models.IntegerField()
    description = models.CharField(max_length=500)
    weather = models.CharField(max_length=100)