from channels.consumer import AsyncConsumer
from channels.layers import get_channel_layer

class EchoConsumer(AsyncConsumer):

    async def websocket_connect(self, event):
        # Accept the WebSocket connection
        await self.send({
            "type": "websocket.accept",
        })

        # Properly check if the user is authenticated and print the username
        user = self.scope.get('user')
        print("user", user)
        # if user.is_authenticated:
        #     print("Authenticated user:", user.name)
        # else:
        #     print("User is not authenticated")
        # print("Scope data:", self.scope)

    async def websocket_receive(self, event):
        print("Message received:", event)
        msg = f'sended msg : {event["text"]} recived msg: Hey, I am from the backend'
        await self.send({
            "type": "websocket.send",
            "text": msg,
        })
 
    async def websocket_disconnect(self, event):
        print("Disconnected...")
