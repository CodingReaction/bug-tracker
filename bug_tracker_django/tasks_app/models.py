from django.db import models
from core.models import CustomUser as User


class CreateUpdateBaseModel(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Organization(CreateUpdateBaseModel):
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)
    name = models.CharField(max_length=200, blank=False, null=False)


class Tag(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return f"({self.id})-{self.name}"


class TaskPriorityChoices(models.Choices):
    LOW       = "L"
    NORMAL    = "N"
    HIGHT     = "H"
    INMEDIATE = "I"


class TaskStatusChoices(models.Choices):
    NOT_STARTED = "n"
    ASSIGNED    = "a"
    IN_PROGRESS = "p"
    STOPPED     = "s"
    CANCELED    = "c"
    FINISHED    = "f"


class Task(CreateUpdateBaseModel):
    title = models.CharField(max_length=50)
    tags = models.ManyToManyField(Tag, blank=True)
    description = models.TextField()
    priority = models.CharField(max_length=1, choices=TaskPriorityChoices, default=TaskPriorityChoices.NORMAL, blank=False, null=False)
    due_date = models.DateTimeField(blank=True, null=True)
    organization = models.ForeignKey(Organization, on_delete=models.SET_NULL, blank=True, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False, related_name="author")
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name="assigned_to")
    status = models.CharField(max_length=1, choices=TaskStatusChoices, default=TaskStatusChoices.NOT_STARTED, blank=False, null=False)


class Comment(CreateUpdateBaseModel):
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    content = models.TextField()
    parent_task = models.ForeignKey(Task, on_delete=models.CASCADE, blank=False, null=False)
    parent_comment = models.ForeignKey("self", on_delete=models.CASCADE, blank=True, null=True)

