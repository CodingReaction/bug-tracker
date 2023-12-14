from django.urls import path
from . import views

app_name = 'tasks_app'
urlpatterns = [
    path('', views.index_view, name='index'),
    path('list-tasks', views.list_tasks_view, name="list-tasks"),
    path('create-task/', views.CreateTaskView.as_view(), name="create-task"),
    path('create-tag/', views.CreateTagView.as_view(), name="create-tag")
]
