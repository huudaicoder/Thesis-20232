from django.db import models

class Address(models.Model):
    address_id = models.AutoField(primary_key=True)
    district = models.CharField(max_length=50)
    province_city = models.CharField(max_length=50)

class TypeOfBDS(models.Model):
    Type_Id = models.AutoField(primary_key=True)
    TypeName = models.CharField(max_length=100)

class BDS(models.Model):
    BDS_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=18, decimal_places=2)
    area = models.DecimalField(max_digits=10, decimal_places=2)
    kind = models.CharField(max_length=50)
    law = models.CharField(max_length=100)
    bedroom = models.IntegerField()
    address_id = models.IntegerField()
    Type_id = models.IntegerField()     
    description = models.TextField()
    phonenumber = models.CharField(max_length=20)
    width = models.DecimalField(max_digits=10, decimal_places=2)
    direction = models.CharField(max_length=20)
    toilet = models.IntegerField()
    floor = models.IntegerField()
    location = models.CharField(max_length=100)
    geocode = models.CharField(max_length=100)

class Image(models.Model):
    Image_id = models.AutoField(primary_key=True)
    BDS_id = models.IntegerField()
    content = models.TextField()
    