from django.urls import path, include
from skydiver import views


urlpatterns = [
    path('', views.user_skydivers),
    path('all/', views.get_all_skydivers),
]