from django.http import HttpResponse
from django.shortcuts import render
from goods.models import Categories
def index(request):
    
    context={
        'title':'Головна сторінка ',
        'content':'Магазин меблів ',
    }
    return render(request,'main/index.html',context)
def about(request):
    context={
        'title':'Про нас ',
        'content':'Про нас ',
        'text_on_page':'Наш магазин чудовий',
    }
    return render(request,'main/about.html',context)