# Generated by Django 5.0.3 on 2024-11-08 12:58

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('goods', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='categories',
            options={'verbose_name': 'Категорія', 'verbose_name_plural': 'Категорії'},
        ),
        migrations.AlterField(
            model_name='categories',
            name='name',
            field=models.CharField(max_length=150, unique=True, verbose_name='Назва'),
        ),
        migrations.AlterField(
            model_name='categories',
            name='slug',
            field=models.SlugField(blank=True, max_length=200, null=True, unique=True, verbose_name='URL'),
        ),
        migrations.AlterModelTable(
            name='categories',
            table='category',
        ),
        migrations.CreateModel(
            name='Products',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, unique=True, verbose_name='Назва')),
                ('slug', models.SlugField(blank=True, max_length=200, null=True, unique=True, verbose_name='URL')),
                ('descriptions', models.TextField(blank=True, null=True, verbose_name='Опис')),
                ('image', models.ImageField(blank=True, null=True, upload_to='goods_images', verbose_name='Картинка')),
                ('price', models.DecimalField(decimal_places=2, default=0.0, max_digits=7, verbose_name='Ціна')),
                ('discount', models.DecimalField(decimal_places=2, default=0.0, max_digits=7, verbose_name='Знижка')),
                ('quantity', models.PositiveIntegerField(default=0, verbose_name='Кількість')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='goods.categories', verbose_name='Категорія')),
            ],
            options={
                'verbose_name': 'Продукт',
                'verbose_name_plural': 'Продукти',
                'db_table': 'products',
            },
        ),
    ]
