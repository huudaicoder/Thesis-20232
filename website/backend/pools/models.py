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
    address_id = models.IntegerField()  # Thay vì ForeignKey(Address, on_delete=models.CASCADE)
    Type_id = models.IntegerField()     # Thay vì ForeignKey(TypeOfBDS, on_delete=models.CASCADE)
    description = models.TextField()
    width = models.DecimalField(max_digits=10, decimal_places=2)
    direction = models.CharField(max_length=20)
    toilet = models.IntegerField()
    floor = models.IntegerField()
    location = models.CharField(max_length=100)
    geocode = models.CharField(max_length=100)

class Image(models.Model):
    Image_id = models.AutoField(primary_key=True)
    BDS_id = models.IntegerField()  # Thay vì ForeignKey(BDS, on_delete=models.CASCADE)
    content = models.TextField()