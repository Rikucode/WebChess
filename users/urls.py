from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('register/', views.register, name='register'),
    path('login/', views.loginfunc, name='login'),
    path('level/', views.level, name='level'),
    path('play/', views.play, name='play'),
    path('rankings/', views.ranking, name='ranking'),
    path('logout/', views.logoutfunc, name='logout'),
]
