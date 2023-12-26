from django.urls import path
from . import views


app_name = "core"
urlpatterns = [
    path("", views.index_view, name="index"),
    path("auth/login/", views.LoginView.as_view(), name="login"),
    path("auth/register/", views.RegisterView.as_view(), name="register"),
    path("auth/logout/", views.logout_view, name="logout"),
    path("docs/", views.DocsView.as_view(), name="docs"),
    path("github/main/", views.MainRepositoryView.as_view(), name="github"),
    path("contact/", views.ContactInfoView.as_view(), name="contact-info"),
    path("contact/job/", views.ContactJobView.as_view(), name="contact-job"),
    path("about/", views.AboutView.as_view(), name="about"),
]
