from django.urls import path
from . import views

urlpatterns = [
    # path('', views.index, name='index'),
    path('products/', views.products, name='products'),
    path('product_details/<slug:slug>', views.product_details, name='product_details'),
    path('add_item/', views.add_item, name='add_item'),
    path('product_in_cart/', views.product_in_cart, name='product_in_cart'),
    path('get_cart_stats/', views.get_cart_stats, name='get_cart_stats'),
    path('get_cart/', views.get_cart, name='get_cart'),
    path('update_quantity/', views.update_quantity, name='update_quantity'), 
    path('delete_cart_item/', views.delete_cart_item, name='delete_cart_item'),
    path('get_username/', views.get_username, name='get_username'),
    path('user_info/', views.user_info, name='user_info'),
    # path('initiate_payment/', views.initiate_payment, name='initiate_payment'), 
    path('initiate_paypal_payment/', views.initiate_paypal_payment, name='initiate_paypal_payment'),
    path('paypal_payment_callback/', views.paypal_payment_callback, name='paypal_payment_callback'),
]