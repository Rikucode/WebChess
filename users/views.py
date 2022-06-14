from django.shortcuts import redirect, render
from django.views.generic import ListView, DetailView, CreateView
from django.contrib.auth.forms import UserCreationForm
from .forms import UserRegisterForm
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

def home(request):
    return render(request, 'users/home.html')

def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            return redirect('home')
    else:
        form = UserRegisterForm()
    return render(request, 'users/register.html', {'form':form})

def loginfunc(request):
    if request.user.is_authenticated:
        return redirect('home')
    if request.method == 'POST':
        name = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username = name, password = password)
        if user is not None:
            login(request, user)
            return redirect('home')
    return render(request, 'users/login.html')

def level(request):
    return render(request, 'users/level-pick.html')

def play(request):
    return render(request, 'users/play.html')

def ranking(request):
    return render(request, 'users/ranking.html')

def logoutfunc(request):
    logout(request)
    return redirect('home')