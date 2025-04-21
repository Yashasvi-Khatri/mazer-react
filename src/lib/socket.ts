
import { toast } from 'sonner';

// Socket.io connection
const SOCKET_URL = 'https://socket.example.com'; // Replace with your socket server URL

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.token = null;
    this.callbacks = {};
    
    this.token = localStorage.getItem('token');
  }

  connect() {
    if (this.isConnected) return;

    try {
      this.socket = io(SOCKET_URL, {
        auth: {
          token: this.token
        },
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      this.socket.on('connect', () => {
        this.isConnected = true;
        console.log('Socket connected');
      });

      this.socket.on('disconnect', () => {
        this.isConnected = false;
        console.log('Socket disconnected');
      });

      this.socket.on('error', (error) => {
        console.error('Socket error:', error);
        toast.error('Connection error. Please try again.');
      });

      this.socket.on('beat:update', (beat) => {
        if (this.callbacks.onBeatUpdate) {
          this.callbacks.onBeatUpdate(beat);
        }
      });

      this.socket.on('user:joined', (username) => {
        if (this.callbacks.onUserJoined) {
          this.callbacks.onUserJoined(username);
        }
      });

      this.socket.on('user:left', (username) => {
        if (this.callbacks.onUserLeft) {
          this.callbacks.onUserLeft(username);
        }
      });

    } catch (error) {
      console.error('Socket connection error:', error);
      toast.error('Failed to establish connection.');
    }
  }

  disconnect() {
    if (!this.socket) return;
    
    this.socket.disconnect();
    this.isConnected = false;
    this.socket = null;
  }

  sendBeat(beat) {
    if (!this.socket || !this.isConnected) {
      toast.error('Not connected to server');
      return;
    }

    this.socket.emit('beat:send', beat);
  }

  onBeatUpdate(callback) {
    this.callbacks.onBeatUpdate = callback;
  }

  onUserJoined(callback) {
    this.callbacks.onUserJoined = callback;
  }

  onUserLeft(callback) {
    this.callbacks.onUserLeft = callback;
  }

  // Mock implementation for demo purposes
  // This simulates what would happen with a real socket connection
  mockSendBeat(beat) {
    console.log('Mocking socket sending beat:', beat);
    
    // For demo purposes, simulate a response after a short delay
    setTimeout(() => {
      toast.success('Beat sent to server successfully');
      
      // Simulate user joined event
      if (this.callbacks.onUserJoined) {
        this.callbacks.onUserJoined('RandomUser123');
      }
      
      // Simulate beat update event
      if (this.callbacks.onBeatUpdate) {
        this.callbacks.onBeatUpdate({
          ...beat,
          id: `updated-${Date.now()}`,
        });
      }
    }, 800);
  }
}

export const socketService = new SocketService();
export default socketService;
