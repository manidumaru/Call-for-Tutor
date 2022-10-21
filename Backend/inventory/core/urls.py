from django.db import router
from django.urls import path, include
from core import views

urlpatterns = [
    path('activity',views.ActivityList.as_view()),
    path('activity/<int:pk>',views.ActivityRetrieve.as_view()),
    path('activity/<int:pk>/updelete',views.ActivityRetrieveUpdateDestroy.as_view()),
    path('employer',views.EmployerListCreate.as_view()),
    path('employer/<int:pk>',views.EmployerRetrieve.as_view()),
    path('employer/<int:pk>/updelete',views.EmployerRetrieveUpdateDestroy.as_view()),


    path('employee',views.EmployeeListCreate.as_view()),
    path('employee/<int:pk>',views.EmployeeRetrieve.as_view()),
    path('employee/<int:pk>/updelete',views.EmployeeRetrieveUpdateDestroy.as_view()),

    path('activity/<int:pk>/apply',views.ApplyListCreate.as_view()),
    path('activity/apply',views.ApplyList.as_view()),
    path('activity/apply/<int:pk>',views.ApplyRetrieveUpdateDestroy.as_view()),



    path('signup',views.user_signup),
    path('login',views.user_login),
    path('logout',views.user_logout),
    path('users',views.UserList.as_view()),
    path('api-auth', include('rest_framework.urls')),

]

