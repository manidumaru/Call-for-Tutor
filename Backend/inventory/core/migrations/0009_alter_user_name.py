# Generated by Django 4.1.2 on 2022-10-16 12:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_user_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='name',
            field=models.CharField(default='sssssssssssssssss', max_length=100),
        ),
    ]
