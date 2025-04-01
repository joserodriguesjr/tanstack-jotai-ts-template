export interface EventMessage {
  user: string;
  message: string;
}

export class WebSocketClient {
  private socket: WebSocket;

  constructor() {
    this.socket = new WebSocket('wss://localhost:3000/_ws');

    this.socket.onopen = () => {
      console.log(`WebSocket connected`);
    };

    this.socket.onclose = () => console.log('WebSocket disconnected');

    this.socket.onerror = (error) => console.error('WebSocket Error: ', error);
  }

  send(data: object) {
    if (this.socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({ ...data });
      this.socket.send(message);
    }
  }

  onMessage(callback: (data: EventMessage) => void) {
    this.socket.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      callback(parsedData);
    };
  }

  close() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.close();
      console.log('WebSocket closed');
    }
  }
}
