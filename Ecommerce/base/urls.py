from django.urls import path
from . import views
from .views import MyTokenObtainPairView

urlpatterns = [
    path('',views.getRoutes, name='routes'),
    path('user/profile/',views.getUserProfile, name='user-profile'),
    path('products/',views.getProducts, name='products'),
    path('products/<str:pk>',views.getProduct, name='product'),
    path('users/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
]