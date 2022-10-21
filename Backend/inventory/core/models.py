from email.policy import default
from random import choices
from statistics import mode
from tkinter import CASCADE
from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager
from django.forms import ImageField
# Create your CustomUserManager here.
# class CustomUserManager(BaseUserManager):
#     def _create_user(self, email, password, name, address, mobile, **extra_fields):
#         if not email:
#             raise ValueError("Email must be provided")
#         if not password:
#             raise ValueError('Password is not provided')

#         user = self.model(
#             email = self.normalize_email(email),
#             name = name,
#             address = address,
#             mobile = mobile,
#             **extra_fields
#         )

#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_user(self, email, password, name, address, mobile, **extra_fields):
#         extra_fields.setdefault('is_staff',True)
#         extra_fields.setdefault('is_active',True)
#         extra_fields.setdefault('is_superuser',False)
#         return self._create_user(email, password, name, address, mobile, password, **extra_fields)

#     def create_superuser(self, email, password, name, address, mobile, **extra_fields):
#         extra_fields.setdefault('is_staff',True)
#         extra_fields.setdefault('is_active',True)
#         extra_fields.setdefault('is_superuser',True)
#         return self._create_user(email, password, name, address, mobile, **extra_fields)
class CustomUserManager(BaseUserManager):
    def _create_user(self, email,name, password,**extra_fields):
        if not email:
            raise ValueError("Email must be provided")
        if not password:
            raise ValueError('Password is not provided')

        user = self.model(
            email = self.normalize_email(email),
            name=name,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, name, password, **extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_active',True)
        extra_fields.setdefault('is_superuser',False)
        # extra_fields.setdefault('is_employer',False)
        # extra_fields.setdefault('is_employee',False)
        return self._create_user(email, name, password, **extra_fields)

    def create_superuser(self, email, name, password, **extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_active',True)
        extra_fields.setdefault('is_superuser',True)
        # extra_fields.setdefault('is_employer',False)
        # extra_fields.setdefault('is_employee',False)
        return self._create_user(email, name, password, **extra_fields)

# Create your User Model here.
class User(AbstractBaseUser,PermissionsMixin):
    # Abstractbaseuser has password, last_login, is_active by default

    email = models.EmailField(db_index=True, unique=True, max_length=254)
    name=models.CharField(max_length=100, default='***')
    is_employer=models.BooleanField(default=False)
    is_employee=models.BooleanField(default=False)
    # name = models.CharField(max_length=240)
    # mobile = models.CharField(max_length=50)
    # address = models.CharField( max_length=250)

    is_staff = models.BooleanField(default=True) # must needed, otherwise you won't be able to loginto django-admin.
    is_active = models.BooleanField(default=True) # must needed, otherwise you won't be able to loginto django-admin.
    is_superuser = models.BooleanField(default=False) # this field we inherit from PermissionsMixin.

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = ['name','address','mobile']
    REQUIRED_FIELDS=['name']
    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.name

class Employer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username=models.CharField(max_length=240)
    employer_image= models.ImageField(upload_to='images/employer', max_length=255,  default="images/employer/default_profile.png")

    def __str__(self):
        return self.username

class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username=models.CharField(max_length=240)
    qualifications=models.TextField(max_length=500,null=True, blank=True)
    employer_image= models.ImageField(upload_to='images/employee', max_length=255, default="images/employer/default_profile.png")

    def __str__(self):
        return self.username

class Activity(models.Model):
    poster = models.ForeignKey(Employer, on_delete=models.CASCADE)
    name=models.CharField(max_length=240)
    date=models.DateField()
    venue=models.CharField(max_length=240)
    activity_image= models.ImageField(upload_to='images/activity', max_length=255, null=True, blank=True)

    class Meta:
        ordering=['date']

    def __str__(self):
        return self.name

class Apply(models.Model):
    STATUS =(
    ("PENDING", "PENDING"),
    ("ACCEPTED", "ACCEPTED"),
    ("REJECTED", "REJECTED"),
    )

    activity=models.ForeignKey(Activity, on_delete=models.CASCADE)
    employer=models.ForeignKey(Employer,on_delete=models.CASCADE)
    employee=models.ForeignKey(Employee, on_delete=models.CASCADE)
    applied_date=models.DateTimeField(auto_now_add=True)
    status=models.CharField(max_length=30, default="PENDING", choices=STATUS)

    def __str__(self):
        return "Activity: " + str(self.activity) + "  Applied by: " + str(self.employee)