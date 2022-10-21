from wsgiref import validate
from django.forms import ValidationError
from rest_framework import generics, permissions
from .models import Activity, Apply, Employer, Employee, User
from .serializer import ActivitySerializer, ApplyRetrieveSerializer, ApplySerializer, EmployerSerializer, EmployeeSerializer, UserSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, logout
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from django.db import IntegrityError
from rest_framework.decorators import api_view, permission_classes
from rest_framework import serializers

from core import serializer
# Create your views here.

class ActivityList(generics.ListCreateAPIView):
    queryset= Activity.objects.all()
    serializer_class=ActivitySerializer
    permission_classes=[permissions.IsAuthenticatedOrReadOnly]
    def get_serializer_context(self):
        print("GGGGGGGGGGGGGGGGGGGGG")
        print(self.request.user)

        is_employer=False
        if(self.request.user.is_authenticated):
            if(self.request.user.is_employer):
                is_employer=True
        return {'is_employer':is_employer}

    def perform_create(self, serializer):
        print("FFFFFFFFFFFFFFFFF")
        s=Employer.objects.filter(user=self.request.user)
        print(s)
        serializer.save(poster=Employer.objects.get(user=self.request.user))

class ActivityRetrieve(generics.RetrieveAPIView):

    # def get_queryset(self):
    #     user=self.request.user
    #     return Activity.objects.filter(poster=user)
    queryset=Activity.objects.all()


    serializer_class=ActivitySerializer
    # permission_classes=[permissions.IsAuthenticatedOrReadOnly]

class ActivityRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):

    def get_queryset(self):
        if(self.request.user.is_employer==False and self.request.user.is_employee==False ):

            raise serializers.ValidationError({"Error":"First create Employer-Profile!!!"})
        if(self.request.user.is_employee):          

            raise serializers.ValidationError({"Error":"Employee cannot access this link!!!"})
        
        if(Activity.objects.get(pk=self.kwargs['pk']).poster==Employer.objects.get(user=self.request.user)):
            return Activity.objects.filter(pk=self.kwargs['pk'])
        else:
            raise serializers.ValidationError({"Error":"You are not the proprietor of this Activity!!"})


    serializer_class=ActivitySerializer
    permission_classes=[permissions.IsAuthenticated]

class UserList(generics.ListAPIView):
    serializer_class=UserSerializer
    permission_classes=[permissions.IsAuthenticated]
    def get_queryset(self):
        if(self.request.user.is_superuser==True):
            return User.objects.all()
        else:
            raise serializers.ValidationError({"error":"Only Super Users can access this link!!"})


class EmployerListCreate(generics.ListCreateAPIView):
    queryset= Employer.objects.all()
    serializer_class=EmployerSerializer
    permission_classes=[permissions.IsAuthenticatedOrReadOnly]
    def get_serializer_context(self):
        method=self.request.method
        return {'user':self.request.user, 'method':method}
    
    def perform_create(self, serializer):

        User.objects.filter(id=self.request.user.id).update(is_employer=True)
        serializer.save(user=self.request.user)


class EmployerRetrieve(generics.RetrieveAPIView):

    queryset=Employer.objects.all()
    serializer_class=EmployerSerializer

class EmployerRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):

    def get_queryset(self):
        user=self.request.user
        return Employer.objects.filter(user=user)
    def get_serializer_context(self):
        
        method=self.request.method
        return {'user':self.request.user,"method":method}

    serializer_class=EmployerSerializer
    permission_classes=[permissions.IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        User.objects.filter(id=self.request.user.id).update(is_employer=False)
        return super().destroy(request, *args, **kwargs)




class EmployeeListCreate(generics.ListCreateAPIView):
    queryset= Employee.objects.all()
    serializer_class=EmployeeSerializer
    permission_classes=[permissions.IsAuthenticatedOrReadOnly]
    def get_serializer_context(self):
        method=self.request.method
        return {'user':self.request.user,"method":method}
    
    def perform_create(self, serializer):
        # if(Employer.objects.filter(user=self.request.user).exists()):
        #     return    
        User.objects.filter(id=self.request.user.id).update(is_employee=True)
        serializer.save(user=self.request.user)


class EmployeeRetrieve(generics.RetrieveAPIView):

    queryset=Employee.objects.all()
    serializer_class=EmployeeSerializer

class EmployeeRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):

    def get_queryset(self):
        user=self.request.user
        return Employee.objects.filter(user=user)
    def get_serializer_context(self):
        
        method=self.request.method
        return {'user':self.request.user,"method":method}


    serializer_class=EmployeeSerializer
    permission_classes=[permissions.IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        User.objects.filter(id=self.request.user.id).update(is_employee=False)
        return super().destroy(request, *args, **kwargs)




class ApplyListCreate(generics.ListCreateAPIView):
    serializer_class=ApplySerializer
    permission_classes=[permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # post = Post.objects.get(pk=self.kwargs['pk'])
        if(user.is_employee==False and user.is_employer==False):
            raise serializers.ValidationError({'Error':"You need to create Employee-Profile to apply!!"})
        elif (user.is_employee):
            return Apply.objects.filter(employee=Employee.objects.get(user=user) , activity=self.kwargs['pk'])
        
        elif(Activity.objects.filter(poster=Employer.objects.get(user=user), pk=self.kwargs['pk'])):
            return Apply.objects.filter(activity=self.kwargs['pk'])
        else:
            raise serializers.ValidationError({'Error':"You are not the Proprietor of this Activity!!"})


    def get_serializer_context(self):
        method=self.request.method

        user=self.request.user

        if(User.objects.filter(id=user.id).exists()):
            if(Employee.objects.filter(user=user).exists() and (user.is_employee or user.is_employee)):
                try:
                    apply=Apply.objects.filter(employee=Employee.objects.get(user=user), activity=Activity.objects.get(pk=self.kwargs['pk']))
                except:
                    apply=None
               
            else:
                
                apply=Apply.objects.filter(activity=self.kwargs['pk'])
            

            return {'user':user, 'apply':apply, 'method':method}

    def perform_create(self, serializer):
        employee=Employee.objects.get(user=self.request.user)
        activity=Activity.objects.get(pk=self.kwargs['pk'])
        serializer.save(employee=employee, activity=activity, employer=activity.poster)


class ApplyList(generics.ListAPIView):
    serializer_class=ApplySerializer
    permission_classes=[permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # post = Post.objects.get(pk=self.kwargs['pk'])
        if(user.is_employee==False and user.is_employer==False):
            raise serializers.ValidationError({'Error':"You first need to create either Employer or Employee Profile!!"})
        elif (user.is_employee):
            return Apply.objects.filter(employee=Employee.objects.get(user=user))
        else:
            return Apply.objects.filter(employer=Employer.objects.get(user=user))
   

class ApplyRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):

    def get_queryset(self):
        user = self.request.user
        # post = Post.objects.get(pk=self.kwargs['pk'])
        if(user.is_employee==False and user.is_employer==False):
            raise serializers.ValidationError({'Error':"You first need to create either Employer or Employee Profile!!"})
        elif (user.is_employee):
            raise serializers.ValidationError({'Error':"Sorry, only Employer can access!!"})
        elif (Apply.objects.get(pk=self.kwargs['pk']).employer != Employer.objects.get(user=user)):
            raise serializers.ValidationError({'Error':"Sorry, you don't have permission to make changes to this application!!"})
        else:
            return Apply.objects.filter(pk=self.kwargs['pk'])

    def get_serializer_context(self):
        
        method=self.request.method
        return {'user':self.request.user,"method":method}


    serializer_class=ApplyRetrieveSerializer
    permission_classes=[permissions.IsAuthenticated]







@csrf_exempt
def user_signup(request):
    if request.method == 'POST':
        try:
            data = JSONParser().parse(request)
            if('email' not in data):
                return JsonResponse({'error':'Email must be provided!!'}, status=400)
            if('name' not in data):
                return JsonResponse({'error':'name must be provided!!'}, status=400)
            user = User.objects.create_user(data['email'], name=data['name'], password=data['password'])
            user.save()
            token = Token.objects.create(user=user)
            

            return JsonResponse({'token':str(token)}, status=201)
        except IntegrityError:

            return JsonResponse({'error':'Email already exists!!'}, status=400)

@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        user = authenticate(request, email=data['email'], password=data['password'])
        if user is None:
            return JsonResponse({'error':'Could not login. Please check username and password'}, status=400)
        else:
            try:
                token = Token.objects.get(user=user)
            except:
                token = Token.objects.create(user=user)
            return JsonResponse({'token':str(token)}, status=200)


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def user_logout(request):
    print("*************")
    # print(request.user)
    request.user.auth_token.delete()

    logout(request)

    return JsonResponse({'success':'User Logged out successfully'}, status=200)