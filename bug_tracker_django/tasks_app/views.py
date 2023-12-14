from django.shortcuts import render
from django.http import HttpRequest, HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import View
from django.template import loader

from .models import Task
from .forms import TaskForm, TagForm


@login_required
def index_view(request: HttpRequest):
    return render(request, 'tasks_app/index.html', context={})


@login_required
def list_tasks_view(request: HttpRequest):
    tasks = Task.objects.all()
    print(len(tasks))
    return render(request, 'tasks_app/partials/_tasks-list.html', context={"tasks": tasks})


class CreateTaskView(LoginRequiredMixin, View):
    def get(self, request: HttpRequest):
        task_create_form = TaskForm()

        return render(request, 'tasks_app/partials/_task-create.html', context={"form": task_create_form})

    def post(self, request: HttpRequest):
        task_create_form = TaskForm(request.POST)
        if task_create_form.is_valid():
            new_task = task_create_form.save()
            clean_task_create_form = TaskForm()
            tasks = Task.objects.all()
            new_task_html = loader.render_to_string("tasks_app/partials/_task-preview-new.html", {"task": new_task}, request)
            task_form_html = loader.render_to_string("tasks_app/partials/_task-create.html", {"form": clean_task_create_form}, request)
            content = new_task_html + task_form_html
            return HttpResponse(content, "text/html", 200)
        return render(request, 'tasks_app/partials/_task-create.html', context={"form": task_create_form})


class CreateTagView(LoginRequiredMixin, View):
    def get(self, request: HttpRequest):
        tag_create_form = TagForm()
        return render(request, 'tasks_app/partials/_tag-create.html', context={"form": tag_create_form})

    def post(self, request: HttpRequest):
        pass
