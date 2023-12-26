from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views


router = routers.DefaultRouter()
router.register(r'tasks', views.TaskViewSet)
router.register(r'tags', views.TagViewSet)


app_name = "api_v1"
urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token-access'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('token/me/', views.ProfileAPIView.as_view(), name='profile'),
    path('api-view/', include('rest_framework.urls')),
    path('related-users/', views.RelatedUsersAPIView.as_view(), name='related-users'),
    path('', include(router.urls)),
]
