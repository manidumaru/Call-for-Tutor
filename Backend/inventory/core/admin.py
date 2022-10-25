from django.contrib import admin
from .models import  Apply, Employee, Employer, User, Vaccancy
# Register your models here.

admin.site.register(User)
admin.site.register(Vaccancy)
admin.site.register(Employer)
admin.site.register(Employee)
admin.site.register(Apply)