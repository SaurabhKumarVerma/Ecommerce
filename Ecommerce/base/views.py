from abc import ABC

from django.shortcuts import render
from django.http import JsonResponse
from .products import products
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from .models import Product
from .serailizers import ProductSerializer, UserSerializer,UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    # @classmethod
    # def get_token(cls, user):
    #     token = super().get_token(user)
    #
    #     # Add custom claims
    #     token['username'] = user.username
    #
    #     # ...

    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k] = v


        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


def getRoutes(request):
    return JsonResponse('Hello', safe=False)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getProducts(request):
    product = Product.objects.all()
    serializer = ProductSerializer(product, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)
