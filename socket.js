
// import { Server } from 'socket.io';
// import axios from 'axios';
// import kitchenService from './src/service/kitchenService.js';

// function socket_(server) {
//   const io = new Server(server, {
//     cors: {
//       origin: "http://localhost:8100",
//     },
//   });

//   io.on('connection', (socket) => {
//     console.log('A client connected');
//     socket.on('getMenuitem', async (data) => {
//       const { category, menuName } = data;
//       console.log('data', data);
//       await kitchenService.getMenuitem(category, menuName, socket);
//     });
//     socket.on('disconnect', () => {
//       console.log('A client disconnected');
//     });
//   });
// }



// export default socket_;





// import { Server } from 'socket.io';
// import kitchenService from './src/service/kitchenService.js';

// function socket_(server) {
//   const io = new Server(server, {
//     cors: {
//       origin: "http://localhost:8100",
//     },
//   });

//   io.on('connection', async (socket) => {
//     console.log('A client connected');

//     socket.on('getAllUserOrder', async () => {
//       console.log('Received getAllUserOrder request');
//     });

//     socket.emit('getAllUserOrder',
//       await kitchenService.getAllUserOrder(socket));





//   socket.on('disconnect', () => {
//     console.log('A client disconnected');
//   });
// });
// }


// export default socket_;



import { Server } from 'socket.io';

const sockets = {
  getRoomsAndTables: (server) => {
    const io = new Server(server, {
      cors: {
        origin: "http://localhost:8100",  
        methods: ["GET", "POST"],       
      },
    });

    io.on('connection', (socket) => {
      console.log(`A user connected: ${socket.id}`);

      socket.on('getRoomsAndTablesAd', () => {
        console.log('getRoomsAndTablesAd:', );
        io.emit('getRoomsAndTablesAd', { message: 'fetched successfully' });
      });

      socket.on('getRoomsAndTablesWaiter', () => {
        console.log('getRoomsAndTablesWaiter:', );
        io.emit('getRoomsAndTablesWaiter', { message: 'fetched successfully' });
      }); 
      
       socket.on('getRoomsAndTablesAcc', () => {
        console.log('getRoomsAndTablesAcc:', );
        io.emit('getRoomsAndTablesAcc', { message: 'fetched successfully' });
      });
      
      socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });

    return io;
  },

//   waiter:(server) => {
//     const io = new Server(server, {
//       cors: {
//         origin: "http://localhost:8100", 
//         methods: ["GET", "POST"],    
//       },
//     });

//     io.on('connection', (socket) => {
//       console.log(`A user connected: ${socket.id}`);

//       socket.on('getRoomsAndTables', () => {
//         console.log('getRoomsAndTables:' );
//         io.emit('getRoomsAndTables', { message: 'fetched successfully' });
//       });
      
//       socket.on('MenuitemCategory', () => {
//         console.log('MenuitemCategory:' );
//         io.emit('MenuitemCategory', { message: 'fetched successfully' });
//       });

//       socket.on('getmenuItems', () => {
//         console.log('getmenuItems:' );
//         io.emit('getmenuItems', { message: 'fetched successfully' });
//       });

//       socket.on('getUserorder', () => {
//         console.log(':getUserorder' );
//         io.emit('getUserorder', { message: 'fetched successfully' });
//       });

//       socket.on('', () => {
//         console.log(':' );
//         io.emit('', { message: 'fetched successfully' });
//       });


//       socket.on('disconnect', () => {
//         console.log(`User disconnected: ${socket.id}`);
//       });
//     });

//     return io;
//   },

};

export default sockets;
