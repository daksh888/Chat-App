# asgi.py
import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
from chatApp.middleware import JWTAuthMiddleware
import chatApp.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chatProject.settings')

# application = ProtocolTypeRouter({
#     'http': get_asgi_application(),
#     'websocket': AllowedHostsOriginValidator(
#         AuthMiddlewareStack(  
#             URLRouter(
#                 chatApp.routing.websocket_urlpatterns
#             )
#         )
#     ),
# })
application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': JWTAuthMiddleware( 
        URLRouter(
            chatApp.routing.websocket_urlpatterns
        )
    ),
})

 