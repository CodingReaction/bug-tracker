from django.shortcuts import render, redirect
from django.views import View
from django.http import HttpRequest

from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required

from .forms import LoginForm, RegisterForm
from .models import CustomUser as User


def index_view(request: HttpRequest):
    return render(request, "core/index.html")


class LoginView(View):
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('tasks_app:index')

        login_form = LoginForm()
        return render(request, "core/auth/login.html", context={"form": login_form})

    def post(self, request, *args, **kwargs):
        login_form = LoginForm(request.POST)
        if login_form.is_valid():
            user = User.objects.get(username=login_form.cleaned_data.get("username"))
            login(request, user)
            return redirect("tasks_app:index")
        else:
            return render(request, "core/auth/login.html", context={"form": login_form})


@login_required
def logout_view(request):
    logout(request)
    return redirect('core:index')


class RegisterView(View):
    def get(self, request: HttpRequest, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('tasks_app:index')

        register_form = RegisterForm()
        return render(request, "core/auth/register.html", context={"form": register_form})

    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('tasks_app:index')

        register_form = RegisterForm(request.POST)
        if register_form.is_valid():
            user = register_form.save()
            login(request, user)
            return redirect("tasks_app:index")
        else:
            return render(request, "core/auth/register.html", context={"form": register_form})

