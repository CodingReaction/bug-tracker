from django.urls import path
from . import views


app_name = "core"
urlpatterns = [
    path("", views.index_view, name="index"),
    path("auth/login/", views.LoginView.as_view(), name="login"),
    path("auth/register/", views.RegisterView.as_view(), name="register"),
    path("auth/logout/", views.logout_view, name="logout"),
]
