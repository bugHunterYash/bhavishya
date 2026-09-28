const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// Initialize Next.js
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, {
    path: '/api/socket',
    addTrailingSlash: false,
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    }
  });

  // Socket auth middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    // Real auth would check the token and attach user to socket
    // For prototype, we will just let it through if a user object is sent or token exists
    if (socket.handshake.auth.user) {
      socket.user = socket.handshake.auth.user;
      next();
    } else {
      next(new Error("Unauthorized"));
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id, socket.user.role);

    socket.on('community:join', (data) => {
      const { communityId, schoolId } = data;
      // In a real app, validate that socket.user is allowed to join this community/school
      if (socket.user.schoolId !== schoolId) {
        return socket.emit('error', { message: 'Unauthorized school access' });
      }

      const room = \`community:\${communityId}\`;
      socket.join(room);
      console.log(\`User \${socket.user.name} joined room \${room}\`);
    });

    socket.on('community:leave', (data) => {
      const { communityId } = data;
      const room = \`community:\${communityId}\`;
      socket.leave(room);
      console.log(\`User \${socket.user.name} left room \${room}\`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  // Make io globally available for Next.js API routes (hacky but works for custom server)
  global.io = io;

  server.listen(port, () => {
    console.log(\`> Ready on http://\${hostname}:\${port}\`);
  });
});
