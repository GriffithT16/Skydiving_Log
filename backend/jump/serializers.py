from rest_framework import serializers
from .models import Jump


class JumpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jump
        fields = ['id', 'jumpnum', 'date', 'place', 'aircraft', 'equipment', 'altitude', 'freefall', 'description', 'weather', 'user_id']
        depth = 1