import socketio from 'socket.io-client';

const socket = socketio('http://localhost:3005', {
  autoConnect: false,
});

// function subscribeToNewDevs(subscribeFunction) {
//   socket.on('new-dev', subscribeFunction);
// }
function subscribeToNewDevs(subscribeFunction) {
  socket.on('new-order', subscribeFunction);
}

function connect() {
  // socket.io.opts.query = { latitude, longitude, techs };
  socket.connect();
}

function disconnect() {
  if (socket.connected) socket.disconnect();
}

export { connect, disconnect, subscribeToNewDevs };
