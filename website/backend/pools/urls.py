from django.urls import path
from pools.views import (
  get_all_properties,
  get_property,
  get_all_provinces,
  search_properties_by_kind,
  get_districts_by_province,
  get_all_districts,
  get_properties_by_type,
  get_properties_with_conditions
)

app_name = "pools"

urlpatterns = [
  path('properties/search/',search_properties_by_kind, name='search_properties_by_type'),
  path('properties-with-conditions/',get_properties_with_conditions, name='properties_with_conditions'),
  path('list-properties/',get_all_properties, name = 'list-property'),
  path('property/<str:pk>/',get_property, name = 'property'),
  path('provinces/', get_all_provinces, name='get-all-provinces'),
  path('districts/', get_all_districts, name='get-all-districts'),
  path('properties-by-type/', get_properties_by_type, name='properties_by_type'),
  path('address/<str:province_city>/', get_districts_by_province, name='get-districts-by-province'),
]