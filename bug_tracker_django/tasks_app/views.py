from django.shortcuts import render
from django.http import HttpRequest, HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import View
from django.template import loader
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator

from .models import Task, Tag
from .forms import TaskForm, TagForm


@login_required
def index_view(request: HttpRequest):
    return render(request, 'tasks_app/index.html', context={})


@login_required
def list_tasks_view(request: HttpRequest):
    paginator = Paginator(Task.objects.all().order_by("title"), 5)
    page_obj = None
    page_num = request.GET.get("page")
    try:
        page_obj = paginator.page(page_num)
    except PageNotAnInteger:
        page_obj = paginator.page(1)
    except EmptyPage:
        page_obj = paginator.page(paginator.num_pages)

    return render(request, 'tasks_app/partials/_tasks-list.html', context={"page_obj": page_obj})


@login_required
def empty_new_tag_form_template(request: HttpRequest):
    return render(request, "tasks_app/partials/_tag-add.html", {})


@login_required
def add_or_create_tag(request: HttpRequest):
    empty_new_tag_form_template = loader.render_to_string("tasks_app/partials/_tag-add.html", {}, request)

    tag_name = request.POST.get("new-tag", None)
    if tag_name == None:
        return HttpResponse(empty_new_tag_form_template, "text/html", 200)

    tag = None
    new_tag_template = ""
    try:
        tag = Tag.objects.get(name=tag_name)
    except Tag.DoesNotExist:
        tag = Tag.objects.create(name=tag_name)
        new_tag_template = loader.render_to_string("tasks_app/partials/_tag.html", {"tag": tag}, request)
        new_tag_template = '<div hx-swap-oob="beforeend:#selected-tags-list">' + new_tag_template + '</div>'
        new_tag_option_hidden = f'<div hx-swap-oob="beforeend:#id_tags"><option value="{tag.id}" selected>{tag.name}</option></div>'

    content = empty_new_tag_form_template + new_tag_template + new_tag_option_hidden
    return HttpResponse(content, "text/html", 200)




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
