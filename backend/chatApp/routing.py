from django.urls import path
from .consumers import EchoConsumer

websocket_urlpatterns = [
    path('ws/sc/', EchoConsumer.as_asgi())
] 