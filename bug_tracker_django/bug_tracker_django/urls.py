from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    #THIRD PARTY
    path("__reload__/", include("django_browser_reload.urls")),
    path('admin/', admin.site.urls),
    #API
    path('api/v1/', include('api_v1.urls')),
    #LOCAL APPS
    path('', include('core.urls')),
    path('tasks/', include('tasks_app.urls')),
]
