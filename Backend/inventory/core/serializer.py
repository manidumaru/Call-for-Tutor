from datetime import date
from rest_framework import serializers
from .models import Activity, Apply, Employer, Employee, User

class ActivitySerializer(serializers.ModelSerializer):
    poster=serializers.ReadOnlyField(source='poster.username')
    poster_id=serializers.ReadOnlyField(source='poster.id')
    class Meta:
        model=Activity
        fields=['id', 'name', 'date', 'venue', 'activity_image', 'poster', 'poster_id']


    def validate(self, attrs):

        if(self.context.get('is_employer')) == False:
            raise serializers.ValidationError({'Error':"Only Employer can create Activity!!"})
       
        if (attrs['date']< date.today()):

            raise serializers.ValidationError({'error':'No past dates can be entered!!'})
        
        return super().validate(attrs)
    def create(self, validated_data):
        return super().create(validated_data)
    # def create(self, validated_data):
    #     print("FFFFFFFFFFFFFFF")
    #     # print(User.objects.filter(id=self.poster.id))
    #     print(self.fields["id"])
    #     print(self.field_name)
    #     try:
            
    #         if User.objects.filter(id=self.request.user.id).is_employer==True:

    #             return super().create(validated_data)
    #     except :
    #         raise serializers.ValidationError("Only Employer can Create Activity!!")

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

        return super().validate(data)

class EmployeeSerializer(serializers.ModelSerializer):
    user=serializers.ReadOnlyField(source='user.name')

    class Meta:
        model=Employee
        fields=['id', 'user', 'username', 'qualifications', 'employer_image']

    def validate(self, data):
        
        if(self.context.get('method')=='POST'):
            if(self.context.get('user').is_employee):
                raise serializers.ValidationError({'Error':"Only one Employee Profile per user!!"})
            if(self.context.get('user').is_employer):
                raise serializers.ValidationError({'Error':"Employer cannot create Employer's Profile!!"})

        return super().validate(data)


            
        return super().validate(data)



class ApplySerializer(serializers.ModelSerializer):
    employee=serializers.ReadOnlyField(source='employee.username')
    activity=serializers.ReadOnlyField(source='activity.name')
    employer=serializers.ReadOnlyField(source='employer.username')
    activity_id=serializers.ReadOnlyField(source='activity.id')
    status=serializers.ReadOnlyField()


    class Meta:
        model=Apply
        fields=['id', 'activity', 'employer', 'activity_id', 'employee', 'status']

    def validate(self, data):
        
        if(self.context.get('user').is_employer):
            raise serializers.ValidationError({'Error':"Employer CANNOT apply for any Activity!!"})
        if(self.context.get('apply')==None):
            raise serializers.ValidationError({'Error':"This Activity does not exist!!"})
        if(self.context.get('apply').exists()):
            raise serializers.ValidationError({'Error':"You have already applied for this Activity"})


        return super().validate(data)

class ApplyRetrieveSerializer(serializers.ModelSerializer):
    employee=serializers.ReadOnlyField(source='employee.username')
    activity=serializers.ReadOnlyField(source='activity.name')
    employer=serializers.ReadOnlyField(source='employer.username')
    activity_id=serializers.ReadOnlyField(source='activity.id')
  


    class Meta:
        model=Apply
        fields=['id', 'activity', 'employer', 'activity_id', 'employee', 'status']

    def validate(self, data):
        
       

        return super().validate(data)

    #     try:
    #         if(self.context.get('user').is_employee==False):
    #             print('shoe')
    #             raise serializers.ValidationError({'Error':"Only Employee can apply!!"})
    #         if(self.context.get('apply').exists):
    #             raise serializers.ValidationError({'Error':"You have already applied for this activity!!"})
    #     except:
    #         pass
    #     return super().validate(data)




class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model=User
        fields= '__all__'
