from rest_framework import serializers
from .models import Skydiver

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class SkydiverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skydiver
        fields = ['id', 'name', 'license', 'year', 'user_id']
        depth = 1