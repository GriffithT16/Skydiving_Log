from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Skydiver
from .serializers import SkydiverSerializer




@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_skydivers(request):
    skydivers = Skydiver.objects.all()
    serializer = SkydiverSerializer(skydivers, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def user_skydivers(request):
    print(
        'User ', f"{request.user.id} {request.user.email} {request.user.username}")
    if request.method == 'POST':
        serializer = SkydiverSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        skydivers = Skydiver.objects.filter(user_id=request.user.id)
        serializer = SkydiverSerializer(skydivers, many=True)
        return Response(serializer.data)