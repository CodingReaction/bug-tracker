from django.test import TestCase
from django.urls import reverse
from .models import Task, Tag, TaskPriorityChoices
from core.models import CustomUser as User

# Create your tests here.

class TaskTest(TestCase):
    def setUp(self):
        # MOCK USERS
        self.user = User.objects.create(username="test_user_task_author", email="test_user_task_author@test_user.com", password="12345")
        self.client.force_login(self.user)

        # MOCK TAGS

        # MOCK TASKS
        self.tasks_without_tags = [
            Task.objects.create(
                title="A - Task without tags",
                description="Description of the task without tags",
                priority=TaskPriorityChoices.HIGHT,
                author=self.user,
                assigned_to=self.user,
            ),
            Task.objects.create(
                title="B - Task without tags",
                description="Description of the task without tags",
                priority=TaskPriorityChoices.HIGHT,
                author=self.user,
                assigned_to=self.user,
            ),
        ]

    def test_url_exists_tasks_list(self):
        response = self.client.get(reverse("tasks_app:list-tasks"))
        self.assertEquals(response.status_code, 200)

    def test_render_tasks_list(self):
        self.assertEqual(True, False)
        pass

    def test_render_tasks_form(self):
        self.assertEqual(True, False)
        pass

    def test_create_task_without_tags(self):
        self.assertEqual(True, False)
        pass

    def test_create_task_with_tags(self):
        self.assertEqual(True, False)
        pass

    def test_create_task_defaults(self):
        self.assertEqual(True, False)
        pass

    def test_render_task_title(self):
        self.assertEqual(True, False)
        pass

    def test_render_task_priority(self):
        self.assertEqual(True, False)
        pass

    def test_render_task_assigned_to(self):
        self.assertEqual(True, False)
        pass


