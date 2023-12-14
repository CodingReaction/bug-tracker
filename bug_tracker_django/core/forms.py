from django import forms
from core.models import CustomUser as User
from django.db.models.expressions import Q

class LoginForm(forms.Form):
    username = forms.CharField(max_length=20, required=True)
    password = forms.CharField(max_length=50, required=True, widget=forms.PasswordInput)

    def is_valid(self) -> bool:
        if not super().is_valid():
            return False

        username = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')

        try:
            user = User.objects.get(username=username, password=password)
        except:
            self.add_error(field=None, error="User data is invalid or doesn't exists")
            return False
        else:
            return True


class RegisterForm(forms.Form):
    username = forms.CharField(max_length=20, required=True)
    email = forms.EmailField(required=True)
    password1 = forms.CharField(max_length=50, required=True, widget=forms.PasswordInput)
    password2 = forms.CharField(max_length=50, required=True, widget=forms.PasswordInput)

    def is_valid(self) -> bool:
        if not super().is_valid():
            return False

        p1 = self.cleaned_data.get('password1')
        p2 = self.cleaned_data.get('password2')
        email = self.cleaned_data.get('email')
        username = self.cleaned_data.get('username')

        try:
            user = User.objects.get(Q(email=email) | Q(username=username))
        except User.DoesNotExist:
            pass
        else:
            self.add_error(field=None, error="User already exists")
            return False

        if p1 != p2:
            self.add_error(field="password2", error="Password doesn't match")
            return False

        return True


    def save(self):
        username = self.cleaned_data.get("username")
        email = self.cleaned_data.get("email")
        password = self.cleaned_data.get("password1")

        user_data = {"username": username, "email": email, "password": password}
        return User.objects.create(**user_data)
