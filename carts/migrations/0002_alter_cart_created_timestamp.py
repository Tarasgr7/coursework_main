# Generated by Django 5.0.3 on 2024-11-21 13:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('carts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='created_timestamp',
            field=models.DateTimeField(auto_now_add=True, verbose_name='Дата додавання'),
        ),
    ]
