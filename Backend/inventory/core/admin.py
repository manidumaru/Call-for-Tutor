from django.contrib import admin
from .models import Activity, Apply, Employee, Employer, User
# Register your models here.

admin.site.register(User)
admin.site.register(Activity)
admin.site.register(Employer)
admin.site.register(Employee)
admin.site.register(Apply)