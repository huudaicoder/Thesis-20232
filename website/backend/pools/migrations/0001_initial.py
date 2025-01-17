# Generated by Django 5.0.3 on 2024-07-14 23:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('address_id', models.AutoField(primary_key=True, serialize=False)),
                ('district', models.CharField(max_length=50)),
                ('province_city', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='BDS',
            fields=[
                ('BDS_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('price', models.DecimalField(decimal_places=2, max_digits=18)),
                ('area', models.DecimalField(decimal_places=2, max_digits=10)),
                ('kind', models.CharField(max_length=50)),
                ('law', models.CharField(max_length=100)),
                ('bedroom', models.IntegerField()),
                ('address_id', models.IntegerField()),
                ('Type_id', models.IntegerField()),
                ('description', models.TextField()),
                ('phonenumber', models.CharField(max_length=20)),
                ('width', models.DecimalField(decimal_places=2, max_digits=10)),
                ('direction', models.CharField(max_length=20)),
                ('toilet', models.IntegerField()),
                ('floor', models.IntegerField()),
                ('location', models.CharField(max_length=100)),
                ('geocode', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('Image_id', models.AutoField(primary_key=True, serialize=False)),
                ('BDS_id', models.IntegerField()),
                ('content', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='TypeOfBDS',
            fields=[
                ('Type_Id', models.AutoField(primary_key=True, serialize=False)),
                ('TypeName', models.CharField(max_length=100)),
            ],
        ),
    ]
