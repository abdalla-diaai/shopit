from django.shortcuts import render
from rest_framework import decorators, response, status
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
from decimal import Decimal
import uuid
from django.conf import settings
import requests
import paypalrestsdk

BASE_URL = settings.REACT_BASE_URL

paypalrestsdk.configure({
    "mode": settings.PAYPAL_MODE,
    "client_id": settings.PAYPAL_CLIENT_ID,
    "client_secret": settings.PAYPAL_CLIENT_SECRET,
})
# Create your views here.
def index(request):
    return render(request, "shopping/index.html")

@decorators.api_view(['GET'])
def products(request):
    products = Product.objects.all()
    # expecting more than one product
    serializer = ProductSerializer(products, many=True)
    return response.Response(serializer.data)

@decorators.api_view(['GET'])
def product_details(request, slug):
    product = Product.objects.get(slug=slug)
    serializer = ProductDetailsSerializer(product)
    return response.Response(serializer.data)

@decorators.api_view(['POST'])
def add_item(request):
    try:
        cart_code = request.data.get("cart_code")
        product_id = request.data.get("product_id")
        cart, created = Cart.objects.get_or_create(cart_code=cart_code)
        product = Product.objects.get(id=product_id)
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        cart_item.quantity = 1
        cart_item.save()
        serializer = CartItemSerializer(cart_item)
        return response.Response({"data": serializer.data, "message": "Cart item created successfully."}, status=201)
    except Exception as e:
        return response.Response({"error": str(e)}, status=400)
 

@decorators.api_view(['GET'])
def product_in_cart(request):
    cart_code = request.query_params.get("cart_code")
    product_id = request.query_params.get("product_id")
    cart = Cart.objects.get(cart_code=cart_code)
    product = Product.objects.get(id=product_id)
    product_exists_in_cart = CartItem.objects.filter(cart=cart, product=product).exists()
    return response.Response({"product_in_cart": product_exists_in_cart})

@decorators.api_view(['GET'])
def get_cart_stats(request):
    cart_code = request.query_params.get("cart_code")
    cart = Cart.objects.get(cart_code=cart_code, paid=False)
    serializer = SimpleCartSerializer(cart)
    return response.Response(serializer.data)

@decorators.api_view(['GET'])
def get_cart(request):
    cart_code = request.query_params.get("cart_code")
    cart = Cart.objects.get(cart_code=cart_code, paid=False)
    serializer = CartSerializer(cart)
    return response.Response(serializer.data)

@decorators.api_view(['PATCH'])
def update_quantity(request):
    try:
        cart_item_id = request.data.get("item_id")
        quantity = request.data.get("quantity")
        quantity = int(quantity)
        cart_item = CartItem.objects.get(id=cart_item_id)
        cart_item.quantity = quantity
        cart_item.save()
        serializer = CartItemSerializer(cart_item)
        return response.Response({ "data": serializer.data, "message": "Cart item updated successfully!"})
    except Exception as e:
        return response.Response({'error': str(e)}, status=400)

@decorators.api_view(['POST'])
def delete_cart_item(request):
    cart_item_id = request.data.get("item_id")
    cart_item = CartItem.objects.get(id=cart_item_id)
    cart_item.delete()
    return response.Response(status=status.HTTP_204_NO_CONTENT)

@decorators.api_view(['GET'])
@decorators.permission_classes([IsAuthenticated])
def get_username(request):
    print(request.user.username)
    if request.user.is_authenticated:
        return response.Response({"username": request.user.username})
    else:
        return response.Response({"error": "User is not authenticated"}, status=401)


@decorators.api_view(['GET'])
@decorators.permission_classes([IsAuthenticated])
def user_info(request):
    user = request.user
    serializer = UserSerializer(user)
    return response.Response(serializer.data)

# @decorators.api_view(['POST'])
# @decorators.permission_classes([IsAuthenticated])
# def initiate_payment(request):
#     if request.user:
#         try:
#             # generate unique transaction reference
#             tx_ref = str(uuid.uuid4())
#             cart_code = request.data.get("cart_code")
#             cart = Cart.objects.get(cart_code=cart_code)
#             user = request.user
#             amount = sum([item.quantity * item.product.price for item in cart.items.all()])
#             tax = Decimal("4.00")
#             total_amount = amount + tax
#             currency ="USD"
#             redirect_url = f"{BASE_URL}/payment-status/"
#             transaction = Transaction.objects.create(
#                 ref = tx_ref,
#                 cart = cart,
#                 amount = total_amount,
#                 currency = currency,
#                 user = user,
#                 status = "pending",
#             )

#             flutterwave_payload = {
#                 "tx_ref": tx_ref,
#                 "amount": str(total_amount),
#                 "currency": currency,
#                 "redirect_url": redirect_url,
#                 "customer": {
#                     "email": user.email,
#                     "name": user.username,
#                     "phonenumber": user.phone
#                 },
#                 "customizations": {
#                     "title": "Shopit Payment"
#                 }
#             }

#             headers = {
#                 "Authorization": f"Bearer {settings.FLUTTERWAVE_SECRET_KEY}",
#                 "Content-Type": "application/json"
#             }

#             response = requests.post(
#                 'https://api.flutterwave/com/v3/payments',
#                 json = flutterwave_payload,
#                 headers = headers
#             )

#             if response.status_code == 200:
#                 return response.Response(response.json(), status=status.HTTP_200_OK)
#             else:
#                 return response.Response(response.json(), status=status.status_code)
            
#         except requests.exceptions.RequestException as e:
#             return response.Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@decorators.api_view(['POST'])
def initiate_paypal_payment(request):
    if request.method == "POST" and request.user.is_authenticated:
        # generate unique transaction reference
        tx_ref = str(uuid.uuid4())
        cart_code = request.data.get("cart_code")
        cart = Cart.objects.get(cart_code=cart_code)
        user = request.user
        amount = sum([item.quantity * item.product.price for item in cart.items.all()])
        tax = Decimal("4.00")
        total_amount = amount + tax
        currency ="USD"

        payment = paypalrestsdk.Payment({
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": f"{BASE_URL}/payment-status?paymentStatus=success&ref={tx_ref}",
                "cancel_url": f"{BASE_URL}/payment-status?paymentStatus=cancel&ref={tx_ref}"
            },
            "transactions": [{
                "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": str(total_amount),
                    "currency": currency,
                    "quantity": 1}]},
                "amount": {
                    "total": str(total_amount),
                    "currency": currency
                },
                "description": "Purchase from ShopIt"
            }]
        })
        
        print("pay_id", payment)
        transaction, created = Transaction.objects.get_or_create(
            ref = tx_ref,
            cart = cart,
            amount = total_amount,
            currency = currency,
            user = user,
            status = "pending",
        )

        if payment.create():
            for link in payment.links:
                if link.rel == "approval_url":
                    approval_url = str(link.href)
                    return response.Response({"approval_url": approval_url})
        else:
            return response.Response({"error": payment.error}, status=400)
        

@decorators.api_view(['POST'])
def paypal_payment_callback(request):
    payment_id = request.query_params.get("paymentId")
    payer_id = request.query_params.get("PayerID")
    ref = request.query_params.get("ref")
    user = request.user
    print("ref", ref)

    transaction = Transaction.objects.get(ref=ref)

    if payment_id and payer_id:
        payment = paypalrestsdk.Payment.find(payment_id)
        transaction.status = 'completed'
        transaction.save()
        cart = transaction.cart
        cart.paid = True
        cart.user = user
        cart.save()

        return response.Response({"message": "Payment Successful"})

    else:
        return response.Response({"error": "Invalid payment"}, status=400)

