from datetime import date
from rest_framework import serializers
from .models import  Apply, Employer, Employee, User, Vaccancy

class VaccancySerializer(serializers.ModelSerializer):
    poster=serializers.ReadOnlyField(source='poster.username')
    poster_id=serializers.ReadOnlyField(source='poster.id')
    class Meta:
        model=Vaccancy
        fields=['id', 'name', 'district', 'subject', 'field', 'salary', 'position', 'description', 'deadline', 'venue', 'vaccancy_image', 'poster', 'poster_id']


    def validate(self, attrs):

        if(self.context.get('is_employer')) == False:
            raise serializers.ValidationError({'Error':"You need to have Employer-Profile to create Vaccancy!!"})
       
        if (attrs['deadline']< date.today()):

            raise serializers.ValidationError({'error':'No past dates can be entered!!'})
        
        return super().validate(attrs)
    def create(self, validated_data):
        return super().create(validated_data)


class EmployerSerializer(serializers.ModelSerializer):
    user=serializers.ReadOnlyField(source='user.name')

    class Meta:
        model=Employer
        fields=['id', 'user', 'username', 'employer_image']

    def validate(self, data):


        if(self.context.get('method')=='POST'):
            
            if(self.context.get('user').is_employer):
                raise serializers.ValidationError({'Error':"Only one Employer Profile per user!!"})
            if(self.context.get('user').is_employee):
                raise serializers.ValidationError({'Error':"Employee cannot create Employer's Profile!!"})
            if(self.context.get('user').role=='EMPLOYEE'):
                raise serializers.ValidationError({'error':"EMPLOYEE cannot create Employer's Profile"})
        return super().validate(data)

class EmployeeSerializer(serializers.ModelSerializer):
    user=serializers.ReadOnlyField(source='user.name')

    class Meta:
        model=Employee
        fields=['id', 'user', 'username', 'qualifications','date_of_birth', 'contact', 'address', 'gender', 'employee_image']

    def validate(self, data):
        print("BBBBBBBBBBBBBBBBBBBBBBB")
    
        
        if(self.context.get('method')=='POST'):
            if(self.context.get('user').is_employee):
                raise serializers.ValidationError({'Error':"Only one Employee Profile per user!!"})
            if(self.context.get('user').is_employer):
                raise serializers.ValidationError({'Error':"Employer cannot create Employee's Profile!!"})
            if(self.context.get('user').role=='EMPLOYER'):
                raise serializers.ValidationError({'error':"EMPLOYER cannot create Employee's Profile"})
            if (date.today().year-data['date_of_birth'].year<16):
                raise serializers.ValidationError({'error':'You must at least be 16 years of age!!'})
        return super().validate(data)


            



class ApplySerializer(serializers.ModelSerializer):
    employee=serializers.ReadOnlyField(source='employee.username')
    employee_id=serializers.ReadOnlyField(source='employee.id')
    vaccancy=serializers.ReadOnlyField(source='vaccancy.name')
    employer=serializers.ReadOnlyField(source='employer.username')
    employer_id=serializers.ReadOnlyField(source='employer.id')
    vaccancy_id=serializers.ReadOnlyField(source='vaccancy.id')
    status=serializers.ReadOnlyField()


    class Meta:
        model=Apply
        fields=['id', 'vaccancy', 'employer', 'employer_id', 'vaccancy_id', 'employee', 'employee_id', 'status']

    def validate(self, data):
        if(self.context.get('user').is_employer==False and self.context.get("user").is_employee==False):
            raise serializers.ValidationError({'Error':"You need Employee-Profile to apply!!"})
        if(self.context.get('user').is_employer):
            raise serializers.ValidationError({'Error':"Employer CANNOT apply for any Vaccancy!!"})
        if(self.context.get('apply')==None):
            raise serializers.ValidationError({'Error':"This Vaccancy does not exist!!"})
        if(self.context.get('apply').exists()):
            print('fffffffffffffffffffffffffffffff')
            print(self.context.get('apply'))
            raise serializers.ValidationError({'Error':"You have already applied for this Vaccancy"})


        return super().validate(data)

class ApplyRetrieveSerializer(serializers.ModelSerializer):
    employee=serializers.ReadOnlyField(source='employee.username')
    employee_id=serializers.ReadOnlyField(source='employee.id')
    vaccancy=serializers.ReadOnlyField(source='vaccancy.name')
    employer=serializers.ReadOnlyField(source='employer.username')
    employer_id=serializers.ReadOnlyField(source='employer.id')
    vaccancy_id=serializers.ReadOnlyField(source='vaccancy.id')
  


    class Meta:
        model=Apply
        fields=['id', 'vaccancy', 'employer', 'employer_id', 'vaccancy_id', 'employee', 'employee_id', 'status']

    def validate(self, data):
        
       

        return super().validate(data)

  

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model=User
        fields= '__all__'


class ChangePasswordSerializer(serializers.Serializer):
    model = User

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)