/* eslint-disable prettier/prettier */
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(3001, { namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    const port = 3001; // Cổng mà server đang lắng nghe
    const namespace = 'chat'; // Namespace mà bạn sử dụng
    console.log(
      `WebSocket server is running on ws://localhost:${port}/${namespace}`,
    );
  }

  handleConnection(client: any) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    console.log(`Received message: ${message}`);
    this.server.emit('message', message);
  }
}
