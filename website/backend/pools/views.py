from django.http import JsonResponse
from .models import BDS, Address, Image, TypeOfBDS
from django.db.models import Count
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from django.db.models import Avg

def get_all_properties(request):
    properties = BDS.objects.all()
    data = []

    for prop in properties:

        type = TypeOfBDS.objects.get(Type_Id=prop.Type_id)
        typeBDS = type.TypeName
        
        image = Image.objects.filter(BDS_id = prop.BDS_id).first()
        
        prop_data = {
            'id': prop.BDS_id,
            'title': prop.title,
            'price': str(prop.price),
            'area': str(prop.area),
            'address':prop.location,
            'bedroom': prop.bedroom,
            'toilet': prop.toilet,
            'floor': prop.floor,
            'kind': prop.kind,
            'law': prop.law,
            'direction': prop.direction,
            'description': prop.description,
            'width': str(prop.width) if prop.width is not None else None,
            'geocode': prop.geocode,
            'type': typeBDS,
            'image_link': image.content if image else None
        }
        data.append(prop_data)

    return JsonResponse(data, safe=False)


def get_property(request, pk):
    # Lấy thông tin bất động sản từ bảng BDS
    prop = BDS.objects.get(BDS_id=pk)

    # Lấy loại bất động sản từ bảng TypeOfBDS
    type = TypeOfBDS.objects.get(Type_Id=prop.Type_id)
    typeBDS = type.TypeName
        
    # Lấy địa chỉ từ bảng Address
    address = Address.objects.get(address_id=prop.address_id)
        
    # Lấy ảnh đầu tiên từ bảng Image
    image = Image.objects.filter(BDS_id=pk).first()
        
    prop_data = {
        'id': prop.BDS_id,
        'title': prop.title,
        'price': str(prop.price),
        'area': str(prop.area),
        'address': prop.location,
        'bedroom': prop.bedroom,
        'toilet': prop.toilet,
        'floor': prop.floor,
        'direction': prop.direction,
        'kind': prop.kind,
        'law': prop.law,
        'description': prop.description,
        'phonenumber': prop.phonenumber,
        'width': str(prop.width) if prop.width is not None else None,
        'geocode': prop.geocode,
        'type': typeBDS,
        'province_city': address.province_city,
        'image_link': image.content if image else None
    }        
    return JsonResponse(prop_data)    


def get_properties_by_type(request):
    typeName = request.GET.get('typeName')

    if not typeName:
        return JsonResponse({'error': 'Missing typeName parameter'}, status=400)

    # Lấy thông tin loại bất động sản từ TypeOfBDS
    bds_type = get_object_or_404(TypeOfBDS, TypeName=typeName)

    # Lấy danh sách các bất động sản thuộc loại này từ BDS
    properties = BDS.objects.filter(Type_id=bds_type.Type_Id)

    # Chuẩn bị dữ liệu để trả về dưới dạng JSON
    data = []
    for prop in properties:
        image = Image.objects.filter(BDS_id=prop.BDS_id).first()
        prop_data = {
            'id': prop.BDS_id,
            'title': prop.title,
            'price': str(prop.price),
            'area': str(prop.area),            
            'address':prop.location,
            'bedroom': prop.bedroom,
            'toilet': prop.toilet,
            'floor': prop.floor,
            'kind': prop.kind,
            'law': prop.law,
            'direction': prop.direction,
            'description': prop.description,
            'width': str(prop.width) if prop.width is not None else None,
            'geocode': prop.geocode,
            'address': prop.location,
            'type': bds_type.TypeName,
            'image_link': image.content if image else None
        }
        data.append(prop_data)

    # Trả về response dưới dạng JSON
    return JsonResponse(data, safe=False)


def get_properties_with_conditions(request):
    province_city = request.GET.get('province_city')
    district = request.GET.get('district')
    min_area = request.GET.get('min_area')
    max_area = request.GET.get('max_area')
    min_price = request.GET.get('min_price')
    max_price = request.GET.get('max_price')
    property_type = request.GET.get('type')  # Lấy giá trị tham số type từ query params
    kind = request.GET.get('kind')
    print(property_type)

    properties = BDS.objects.all()

    # Filter by province_city
    if province_city:
        properties = properties.filter(address_id__in=Address.objects.filter(province_city__icontains=province_city).values_list('address_id', flat=True))

    # Filter by district
    if district:
        properties = properties.filter(address_id__in=Address.objects.filter(district__icontains=district).values_list('address_id', flat=True))

    # Filter by min_area
    if min_area:
        properties = properties.filter(area__gte=min_area)

    # Filter by max_area
    if max_area:
        properties = properties.filter(area__lte=max_area)

    # Filter by min_price
    if min_price:
        properties = properties.filter(price__gte=min_price)

    # Filter by max_price
    if max_price:
        properties = properties.filter(price__lte=max_price)

    # Filter by property_type
    if property_type:
        type_of_bds = TypeOfBDS.objects.filter(TypeName=property_type).first()
        properties = properties.filter(Type_id=type_of_bds.Type_Id)

    # Filter by kind
    if kind:
        properties = properties.filter(kind=kind)

    # Prepare JSON response
    data = []
    for prop in properties:
        image = Image.objects.filter(BDS_id=prop.BDS_id).first()
        prop_data = {
            'id': prop.BDS_id,
            'title': prop.title,
            'price': str(prop.price),
            'area': str(prop.area),
            'address':prop.location,
            'bedroom': prop.bedroom,
            'toilet': prop.toilet,
            'floor': prop.floor,
            'kind': prop.kind,
            'law': prop.law,
            'direction': prop.direction,
            'description': prop.description,
            'width': str(prop.width) if prop.width is not None else None,
            'geocode': prop.geocode,
            'type': property_type,
            'image_link': image.content if image else None
        }
        data.append(prop_data)

    return JsonResponse(data, safe=False)




def get_all_provinces(request):
    provinces = Address.objects.values_list('province_city', flat=True).distinct()
    provinces_list = list(provinces)
    return JsonResponse({'provinces': provinces_list})


def get_districts_by_province(request, province_city):
    try:
        districts = Address.objects.filter(province_city=province_city).values_list('district', flat=True)
        districts_list = list(districts)
        return JsonResponse({'districts': districts_list})
    except Address.DoesNotExist:
        return JsonResponse({'error': 'Không tìm thấy quận nào cho tỉnh/thành phố đã chỉ định'}, status=404)


def get_all_districts(request):
    districts = Address.objects.values_list('district', flat=True).distinct()
    return JsonResponse({'districts': list(districts)})

def search_properties_by_kind(request):
    property_type = request.GET.get('kind')  # Lấy loại bất động sản từ query string

    # Kiểm tra xem type có được cung cấp không
    if not property_type:
        return JsonResponse({'error': 'Missing type parameter'}, status=400)

    # Tìm kiếm bất động sản theo loại
    properties = BDS.objects.filter(kind=property_type)

    # Chuẩn bị dữ liệu response
    data = []
    for prop in properties:
        prop_data = {
            'id': prop.BDS_id,
            'title': prop.title,
            'price': str(prop.price),
            'address':prop.location,
            'area': str(prop.area),
            'bedroom': prop.bedroom,
            'toilet': prop.toilet,
            'floor': prop.floor,
            'kind': prop.kind,
            'law': prop.law,
            'type':prop.Type_id,
            'direction': prop.direction,
            'description': prop.description,
            'width': str(prop.width),
            'geocode': prop.geocode,
            'address_id': prop.address_id,
        }
        data.append(prop_data)

    return JsonResponse(data, safe=False)


def average_price_per_sqm(request):
    province_city = request.GET.get('province_city')
    kind = request.GET.get('kind')
    types = request.GET.getlist('type')

    type_ids = TypeOfBDS.objects.filter(TypeName__in=types).values_list('Type_Id', flat=True)

    address_ids = Address.objects.filter(province_city=province_city).values_list('address_id', flat=True)

    bds_queryset = BDS.objects.filter(kind=kind, Type_id__in=type_ids, address_id__in=address_ids)

    average_prices = bds_queryset.values('address_id').annotate(
        avg_price_per_sqm=Avg('price') / Avg('area')
    )

    result = []
    for entry in average_prices:
        address = Address.objects.get(address_id=entry['address_id'])
        avg_price_per_sqm = entry['avg_price_per_sqm']        
        if kind == 'Mua Bán':
            avg_price_per_sqm *= 1000
        
        avg_price_per_sqm = round(avg_price_per_sqm, 2)
        
        result.append({
            'district': address.district,
            'avg_price_per_sqm': avg_price_per_sqm
        })

    return JsonResponse(result, safe=False)

def property_count(request):
    province_city = request.GET.get('province_city', None)
    kind = request.GET.get('kind', None)
    types = request.GET.getlist('type')

    if not (province_city and kind and types):
        return JsonResponse({'error': 'Missing parameters'}, status=400)

    try:
        type_ids = TypeOfBDS.objects.filter(TypeName__in=types).values_list('Type_Id', flat=True)

        addresses = Address.objects.filter(province_city=province_city).values('address_id', 'district')

        address_map = {address['address_id']: address['district'] for address in addresses}

        bds_queryset = BDS.objects.filter(kind=kind, Type_id__in=type_ids, address_id__in=list(address_map.keys()))

        district_counts = bds_queryset.values('address_id').annotate(property_count=Count('BDS_id'))

        results = []
        for entry in district_counts:
            address_id = entry['address_id']
            property_count = entry['property_count']
            district = address_map.get(address_id, None)
            if district is not None:
                results.append({
                    'district': district,
                    'property_count': property_count
                })

        return JsonResponse(results, safe=False)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)