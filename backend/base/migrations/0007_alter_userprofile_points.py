# Generated by Django 4.2.10 on 2024-03-21 00:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_question_points_spent_alter_userprofile_points'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='points',
            field=models.IntegerField(default=100),
        ),
    ]
