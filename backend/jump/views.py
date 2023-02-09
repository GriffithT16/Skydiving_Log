from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Jump
from .serializers import JumpSerializer
import requests
from django.shortcuts import get_object_or_404




@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_jumps(request):
    jumps = Jump.objects.all()
    serializer = JumpSerializer(jumps, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_jumps(request):
    print(
        'User ', f"{request.user.id} {request.user.email} {request.user.username}")
    if request.method == 'POST':
        serializer = JumpSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        jumps = Jump.objects.filter(user_id=request.user.id)
        serializer = JumpSerializer(jumps, many=True)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_locations(request):
    URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=skydive&key=AIzaSyCA5nB4DmZh91lOhVk86-klyBy2Mup3bAE'
    res = requests.get(URL)
    return Response(res.json())


@api_view(['GET', 'PUT', 'DELETE'])
def jump_detail(request, pk):
    jump = get_object_or_404(Jump, pk=pk)
    if request.method == 'GET':
        serializer = JumpSerializer(jump)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = JumpSerializer(jump, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(jump=pk)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        jump.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
