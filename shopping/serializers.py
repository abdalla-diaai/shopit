from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class ProductDetailsSerializer(serializers.ModelSerializer):
    similar_products = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ["id", "name", "price", "slug", "image", "description", "similar_products"]

    def get_similar_products(self, product):
        products = Product.objects.filter(category=product.category).exclude(id=product.id)
        serializer = ProductSerializer(products, many=True)
        return serializer.data
  
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ["id", "quantity", "product", "total"] 
    def get_total(self, cart_item):
        price = cart_item.product.price * cart_item.quantity
        return price


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(read_only=True, many=True)
    sum_total = serializers.SerializerMethodField()
    num_of_items = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ["id", "cart_code", "items", "num_of_items", "sum_total", "created_at", "updated_at"]
    def get_sum_total(self, cart):
        total = sum([item.product.price * item.quantity for item in cart.items.all()])
        return total
    
    def get_num_of_items(self, cart):
        items_num = sum([item.quantity for item in cart.items.all()])
        return items_num

# return number of items in the cart
class SimpleCartSerializer(serializers.ModelSerializer):
    num_of_items = serializers.SerializerMethodField()
    class Meta:
        model = Cart
        fields = ["id", "cart_code", "num_of_items"]
    
    def get_num_of_items(self, cart):
        items_num = sum([item.quantity for item in cart.items.all()])
        return items_num


class NewCartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    order_id = serializers.SerializerMethodField()
    order_date = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ["id", "product", "quantity", "order_id", "order_date"]

    def get_order_id(self, cart_item):
        order_id = cart_item.cart.cart_code
        return order_id
    
    def get_order_date(self, cart_item):
        order_date = cart_item.cart.updated_at
        return order_date.strftime('%Y-%m-%d %H:%M:%S')

class UserSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    date_joined = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", input_formats=None)

    class Meta:
        # currently used model
        model = get_user_model()
        fields = ["id", "username", "email", "first_name", "last_name", "city", "state", "address", "phone", "date_joined", "items"]

    def get_items(self, user):
        cart_items = CartItem.objects.filter(cart__user=user, cart__paid=True)[:10]
        serializer = NewCartItemSerializer(cart_items, many=True)
        return serializer.data