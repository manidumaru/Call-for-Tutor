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
    def _create_user(self, email, name, role, password,**extra_fields):
        print(name)
        if not email:
            raise ValueError("Email must be provided")
        if not password:
            raise ValueError('Password is not provided')
 

        user = self.model(
            email = self.normalize_email(email),
            name=name,
            role=role,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, name, role,  password, **extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_active',True)
        extra_fields.setdefault('is_superuser',False)
        # extra_fields.setdefault('is_employer',False)
        # extra_fields.setdefault('is_employee',False)
        return self._create_user(email, name, role,  password, **extra_fields)

    def create_superuser(self, email, name, role,  password, **extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_active',True)
        extra_fields.setdefault('is_superuser',True)
        # extra_fields.setdefault('is_employer',False)
        # extra_fields.setdefault('is_employee',False)
        return self._create_user(email, name, role,  password, **extra_fields)

# Create your User Model here.
class User(AbstractBaseUser,PermissionsMixin):
    # Abstractbaseuser has password, last_login, is_active by default
    ROLE =(
    ("EMPLOYER", "EMPLOYER"),
    ("EMPLOYEE", "EMPLOYEE"),
    )

    email = models.EmailField(db_index=True, unique=True, max_length=254)
    name=models.CharField(max_length=100, default='***')
    role=models.CharField(max_length=30,default='EMPLOYEE', choices=ROLE)
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
    REQUIRED_FIELDS=['name', 'role']
    # class Meta:
    #     verbose_name = 'User'
    #     verbose_name_plural = 'Users'

    def __str__(self):
        return self.name

class Employer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username=models.CharField(max_length=240)
    employer_image= models.ImageField(upload_to='images/employer', max_length=255,  default="images/employer/default_profile.png")

    def __str__(self):
        return self.username

class Employee(models.Model):
    GENDER =(
    ("MALE", "MALE"),
    ("FEMALE", "FEMALE"),
    ("OTHER", "OTHER")
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username=models.CharField(max_length=240)
    contact=models.CharField(max_length=16)
    address=models.CharField(max_length=50)
    qualifications=models.TextField(max_length=500)
    date_of_birth=models.DateField()
    
    gender=models.CharField(max_length=16, default='EMPLOYEE', choices=GENDER)
    employee_image= models.ImageField(upload_to='images/employee', max_length=255, default="images/employer/default_profile.png")

    def __str__(self):
        return self.username

class Vaccancy(models.Model):
    poster = models.ForeignKey(Employer, on_delete=models.CASCADE)
    name=models.CharField(max_length=240)
    district=models.CharField(max_length=50)
    deadline=models.DateField()
    subject=models.CharField(max_length=100)
    field=models.CharField(max_length=100)
    salary=models.CharField(max_length=50)
    position=models.CharField(max_length=50)
    description=models.TextField(max_length=1000)
    venue=models.CharField(max_length=240)
    vaccancy_image= models.ImageField(upload_to='images/vaccancy', max_length=255, null=True, blank=True)

    class Meta:
        ordering=['deadline']

    def __str__(self):
        return self.name

class Apply(models.Model):
    STATUS =(
    ("PENDING", "PENDING"),
    ("ACCEPTED", "ACCEPTED"),
    ("REJECTED", "REJECTED"),
    )

    vaccancy=models.ForeignKey(Vaccancy, on_delete=models.CASCADE)
    employer=models.ForeignKey(Employer,on_delete=models.CASCADE)
    employee=models.ForeignKey(Employee, on_delete=models.CASCADE)
    applied_date=models.DateTimeField(auto_now_add=True)
    status=models.CharField(max_length=30, default="PENDING", choices=STATUS)

    def __str__(self):
        return "Vaccancy: " + str(self.vaccancy) + "  Applied by: " + str(self.employee)