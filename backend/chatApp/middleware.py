import jwt
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.exceptions import AuthenticationFailed
from channels.middleware import BaseMiddleware
from channels.db import database_sync_to_async

User = get_user_model()

@database_sync_to_async
def get_user_from_token(token):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        user = User.objects.get(id=payload['user_id'])
        return user
    except (jwt.ExpiredSignatureError, jwt.DecodeError, User.DoesNotExist):
        return None

class JWTAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        query_string = scope['query_string'].decode()
        query_params = {}
        for param in query_string.split("&"):
            if '=' in param:
                key, value = param.split('=')
                query_params[key] = value

        token = query_params.get('token')
        
        if token:
            user = await get_user_from_token(token)
            if user:
                print(f"User {user.name} authenticated and added to scope")  # Debugging
                scope['user'] = user
            else:
                print("User could not be authenticated")
                scope['user'] = None
        else:
            print("No token found in query params")
        
        return await super().__call__(scope, receive, send)

