from djoser.serializers import UserCreateSerializer
from chatApp.models import *

class MyUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model= MyUser
        fields = ['id', 'email', 'name', 'password']
