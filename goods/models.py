from django.db import models
from django.urls import reverse


class Categories(models.Model):
    name = models.CharField(max_length=150,unique=True,verbose_name='Назва')
    slug=models.SlugField(max_length=200,unique=True,blank=True,null=True,verbose_name='URL')


    class Meta:
        db_table="category"
        verbose_name="Категорія"
        verbose_name_plural="Категорії"
    def __str__(self):
        return f"{self.name}"


class Products(models.Model):
    name = models.CharField(max_length=150,unique=True,verbose_name='Назва')
    slug=models.SlugField(max_length=200,unique=True,blank=True,null=True,verbose_name='URL')
    descriptions=models.TextField(blank=True,null=True,verbose_name='Опис')
    image = models.ImageField(upload_to='goods_images',blank=True,null=True,verbose_name='Картинка')
    price=models.DecimalField(default=0.00,max_digits=7,decimal_places=2,verbose_name='Ціна')
    discount=models.DecimalField(default=0.00,max_digits=7,decimal_places=2,verbose_name='Знижка')
    quantity=models.PositiveIntegerField(default=0,verbose_name='Кількість')
    category=models.ForeignKey(to=Categories,on_delete=models.CASCADE,verbose_name='Категорія')



    class Meta:
        db_table="products"
        verbose_name="Продукт"
        verbose_name_plural="Продукти"
        ordering=('id',)

    def __str__(self):
        return f"{self.name}. Загальна кількість:{self.quantity}"
    
    def display_id(self):
        return f'{self.id:05}'
    
    def get_absolute_url(self):
        return reverse("catalog:product", kwargs={"product_slug": self.slug})
    
    def sell_price(self):
        if self.discount:
            return round(self.price-self.price*self.discount/100)
        return self.price