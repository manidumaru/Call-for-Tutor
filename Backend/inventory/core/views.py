from datetime import date
from http.client import ResponseNotReady
from rest_framework import generics, permissions
from .models import  Apply, Employer, Employee, User, Vaccancy
from .serializer import  ApplyRetrieveSerializer, ApplySerializer, ChangePasswordSerializer, EmployerSerializer, EmployeeSerializer, UserSerializer, VaccancySerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, logout
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from django.db import IntegrityError
from rest_framework.decorators import api_view, permission_classes
from rest_framework import serializers
from django.core import serializers as ser
from django.forms.models import model_to_dict
import json
from core import serializer
from rest_framework import status
from rest_framework.response import Response

# Create your views here.

class VaccancyList(generics.ListCreateAPIView):
    queryset= Vaccancy.objects.all()
    serializer_class=VaccancySerializer
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
        s=Employer.objects.filter(user=self.request.user)
        serializer.save(poster=Employer.objects.get(user=self.request.user))

class VaccancyRetrieve(generics.RetrieveAPIView):

    # def get_queryset(self):
    #     user=self.request.user
    #     return Vaccancy.objects.filter(poster=user)
    queryset=Vaccancy.objects.all()


    serializer_class=VaccancySerializer
    # permission_classes=[permissions.IsAuthenticatedOrReadOnly]

class VaccancyRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):

    def get_queryset(self):
        if(self.request.user.is_employer==False and self.request.user.is_employee==False ):

            raise serializers.ValidationError({"Error":"You need to have Employer-Profile for this link!!!"})
        if(self.request.user.is_employee):          

            raise serializers.ValidationError({"Error":"Employee cannot access this link!!!"})
        
        if(Vaccancy.objects.get(pk=self.kwargs['pk']).poster==Employer.objects.get(user=self.request.user)):
            return Vaccancy.objects.filter(pk=self.kwargs['pk'])
        else:
            raise serializers.ValidationError({"Error":"You are not the proprietor of this Vaccancy!!"})


    serializer_class=VaccancySerializer
    permission_classes=[permissions.IsAuthenticated]

class UserList(generics.ListAPIView):
    serializer_class=UserSerializer
    queryset=User.objects.all()
    # permission_classes=[permissions.IsAuthenticatedOrReadOnly]
    # def get_queryset(self):
    #     if(self.request.user.is_superuser==True):
    #         return User.objects.all()
    #     else:
    #         raise serializers.ValidationError({"error":"Only Super Users can access this link!!"})


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
            raise serializers.ValidationError({'Error':"You need to have Employee-Profile to apply!!"})
        elif (user.is_employee):
            return Apply.objects.filter(employee=Employee.objects.get(user=user) , vaccancy=self.kwargs['pk'])
        
        elif(Vaccancy.objects.filter(poster=Employer.objects.get(user=user), pk=self.kwargs['pk'])):
            return Apply.objects.filter(vaccancy=self.kwargs['pk'])
        else:
            raise serializers.ValidationError({'Error':"You are not the Proprietor of this Vaccancy!!"})


    def get_serializer_context(self):
        method=self.request.method

        user=self.request.user

        if(User.objects.filter(id=user.id).exists()):
            if(Employee.objects.filter(user=user).exists()):
                try:
                    apply=Apply.objects.filter(employee=Employee.objects.get(user=user), vaccancy=Vaccancy.objects.get(pk=self.kwargs['pk']))
                except:
                    apply=None
               
           
            else:
                apply=None
            

            return {'user':user, 'apply':apply, 'method':method}

    def perform_create(self, serializer):
        
        employee=Employee.objects.get(user=self.request.user)
        vaccancy=Vaccancy.objects.get(pk=self.kwargs['pk'])
        if(vaccancy.deadline==date.today()):
            raise serializers.ValidationError({'error':'Fucky you'})
        serializer.save(employee=employee, vaccancy=vaccancy, employer=vaccancy.poster)


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
            if('role' not in data):
                return JsonResponse({'error':'role must be specified(EMPLOYER/EMPLOYEE)!!'}, status=400)
            if(data['role'] != 'EMPLOYEE' and data['role']!='EMPLOYER'):
                return JsonResponse({'error':'role must be either EMPLOYER or EMPLOYEE!!'}, status=400)
            user = User.objects.create_user(data['email'], name=data['name'], password=data['password'], role=data['role'],)
            user.save()
            if(user.role=='EMPLOYER'):
                role="EMPLOYER"


            else:
                role="EMPLOYEE"
            token = Token.objects.create(user=user)
            

            return JsonResponse({"role":role,'token':str(token)}, status=201)
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
            if(user.role=='EMPLOYER'):
                if(user.is_employer):
                    
                    employer=Employer.objects.get(user=user)
                    userjson={'role':"Employer", 'employer_id':employer.id, 'username':employer.username}
                else:
                    userjson={'role':'Employer'}
            else:
                if(user.is_employee):
                    employee=Employee.objects.get(user=user)
                    userjson={'role':"Employee", 'employee_id': employee.id, 'username':employee.username}

                else:
                    userjson={'role':"Employee"}
         
            return JsonResponse({'user':userjson,'token':str(token)}, status=200)


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def user_logout(request):
    print("*************")
    # print(request.user)
    request.user.auth_token.delete()

    logout(request)

    return JsonResponse({'success':'User Logged out successfully'}, status=200)


class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                raise serializers.ValidationError({"old_password": "Wrong password"})
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)