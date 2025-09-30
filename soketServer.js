import { Server as SocketServer } from "socket.io";
import kitchenService from "./src/service/kitchenService.js";
import adminService from "./src/service/adminService.js";
import tableService from "./src/service/tableService.js";

const planCheck = async () => {
  try {
    const { org_id } = socket.handshake.query;

    if (!org_id) {
      console.warn("⚠️ Missing org_id in socket handshake");
      return;
    }

    const org = await organizationModel.findById(org_id);
    if (!org) {
      console.warn(`⚠️ Organization not found for org_id: ${org_id}`);
      return;
    }

    const now = new Date();
    const isExpired = new Date(org.validto) < now;

    socket.org_id = org_id;
    socket.join(`org_${org_id}`);
    console.log(`✅ Socket joined room org_${org_id}`);

    if (isExpired) {
      console.log(`🔒 Plan expired for org ${org_id}`);
      io.to(`org_${org_id}`).emit("planExpired", {
        message: `🚫 Plan expired for org ${org_id}`,
      });
    } else {
      console.log(`🟢 Plan active for org ${org_id}`);
    }
  } catch (error) {
    console.error("❌ Error in planCheck:", error.message);
  }
};



function socket_server(server) {
  const io = new SocketServer(server, {
    cors: {
      origin: "*",
    },
  });

  global.io = io;

  io.on("connection", (socket) => {
    console.log("socket .............");
    /* const { org_id } = socket.handshake.query;

    console.log("🔌 New socket connected");

    if (org_id) {
      socket.join(`org_${org_id}`);
      console.log(`✅ User ${org_id} joined room org_${org_id}`);

      // Emit test planExpired event after 5s
      setTimeout(() => {
        io.to(`org_${org_id}`).emit("planExpired", {
          message: "🧪 Testing plan expiration.",
        });
      }, 5000);
    } */

     planCheck(socket);

    socket.on("getmenuItems", async () => {
      console.log("getmenuItems:");
      try {
        socket.emit("getmenuItems", { msg: "successfuly fetched" });
        return "kkk";
      } catch (error) {
        console.error("Error getting menu items:", error);
      }
    });

    socket.on("getoverallMenuitem", async () => {
      try {
        const getoverallMenuitem = await adminService.getoverallMenuitem();
        console.log("MenuItem", getoverallMenuitem);
        io.emit("getoverallMenuitem", { getoverallMenuitem });
      } catch (error) {
        console.error("Error getoverallMenuitem:", error);
      }
    });

    socket.on("getoverallDate", async (input) => {
      try {
        const getoverallDate = await kitchenService.getoverallDate(input);
        console.log(getoverallDate);
        io.emit("getoverallDate", { getoverallDate });
      } catch (error) {
        console.error("Error getoverallDate:", error);
      }
    });

    socket.on("removeOverallId", async (_id) => {
      try {
        const removeOverallId = await kitchenService.removeOverallId(_id);
        console.log(removeOverallId);
        io.emit("removeOverallId", { removeOverallId });
      } catch (error) {
        console.error("Error removeOverallId:", error);
      }
    });

    socket.on("updateUserOrder", async ({ userorder_id, Dishes }) => {
      try {
        const updateUserOrder = await kitchenService.updateUserOrder(
          userorder_id,
          Dishes
        );
        console.log(updateUserOrder);
        io.emit("updateUserOrder", { updateUserOrder });
      } catch (error) {
        console.error("Error updateUserOrder:", error);
      }
    });

    socket.on("updateStatusKds", async ({ userorder_id, status }) => {
      try {
        const updateStatusKds = await kitchenService.updateStatusKds(
          userorder_id,
          status
        );
        console.log(updateStatusKds);
        io.emit("updateStatusKds", { updateStatusKds });
      } catch (error) {
        console.error("Error updateStatusKds:", error);
      }
    });

    socket.on("getUserOrderHistory", async () => {
      try {
        const getUserOrderHistory = await kitchenService.getUserOrderHistory();
        console.log(getUserOrderHistory);
        io.emit("getUserOrderHistory", { getUserOrderHistory });
      } catch (error) {
        console.error("Error getUserOrderHistory:", error);
      }
    });

    socket.on("getTotalOreder", async () => {
      try {
        const getTotalOreder = await kitchenService.getTotalOreder();
        console.log(getTotalOreder);
        io.emit("getTotalOreder", { getTotalOreder });
      } catch (error) {
        console.error("Error getTotalOreder:", error);
      }
    });

    socket.on("getAllUserOrder", async () => {
      try {
        const getAllUserOrder = await kitchenService.getAllUserOrder();
        console.log(getAllUserOrder);
        io.emit("getAllUserOrder", { getAllUserOrder });
      } catch (error) {
        console.error("Error getAllUserOrder:", error);
      }
    });

    socket.on("updateMenuName", async (data) => {
      try {
        const updateMenuName = await kitchenService.updateMenuName(data);
        console.log(updateMenuName);
        io.emit("updateMenuName", { updateMenuName });
      } catch (error) {
        console.error("Error updateMenuName:", error);
      }
    });

    socket.on("getTablenameType", async (data) => {
      try {
        const getTablenameType = await kitchenService.getTablenameType(data);
        console.log(getTablenameType);
        io.emit("getTablenameType", { getTablenameType });
      } catch (error) {
        console.error("Error getTablenameType:", error);
      }
    });

    socket.on("getRoomsAndTables", async (data) => {
      try {
        const getRoomsAndTables = await adminService.getRoomsAndTables(
          admin_id
        );
        console.log(getRoomsAndTables);
        io.emit("getRoomsAndTables", { getRoomsAndTables });
      } catch (error) {
        console.error("Error getRoomsAndTables:", error);
      }
    });

    socket.on("getAllstatus", async (data) => {
      try {
        const getAllstatus = await adminService.getAllstatus(data);
        console.log(getAllstatus);
        io.emit("getAllstatus", { getAllstatus });
      } catch (error) {
        console.error("Error getAllstatus:", error);
      }
    });

    socket.on("getAllstatus", async (data) => {
      try {
        const getAllstatus = await adminService.getAllstatus(data);
        console.log(getAllstatus);
        io.emit("getAllstatus", { getAllstatus });
      } catch (error) {
        console.error("Error getAllstatus:", error);
      }
    });

    socket.on("getmenuItems", async (Category) => {
      try {
        const getmenuItems = await adminService.getmenuItems(Category);
        console.log(getmenuItems);
        io.emit("getmenuItems", { getmenuItems });
      } catch (error) {
        console.error("Error getmenuItems:", error);
      }
    });

    socket.on("userOrder", async (data) => {
      try {
        const userOrder = await tableService.userOrder(data);
        console.log(userOrder);
        io.emit("userOrder", { userOrder });
      } catch (error) {
        console.error("Error userOrder:", error);
      }
    });

    socket.on("updateStatusKds", async (data) => {
      try {
        const updateStatusKds = await kitchenService.updateStatusKds(data);
        console.log(updateStatusKds);
        io.emit("updateStatusKds", { updateStatusKds });
      } catch (error) {
        console.error("Error updateStatusKds:", error);
      }
    });

    socket.on("updateStatus", async (data) => {
      try {
        const updateStatus = await tableService.updateStatus(data);
        console.log(updateStatus);
        io.emit("updateStatus", { updateStatus });
      } catch (error) {
        console.error("Error updateStatus:", error);
      }
    });

    socket.on("getUserorder", async (data) => {
      try {
        const getUserorder = await tableService.getUserorder(data);
        console.log(getUserorder);
        io.emit("getUserorder", { getUserorder });
      } catch (error) {
        console.error("Error getUserorder:", error);
      }
    });

    socket.on("getuserorderTable", async ({ admin_id, org_id, table_id }) => {
      try {
        const getuserorderTable = await tableService.getuserorderTable({
          admin_id,
          org_id,
          table_id,
        });
        console.log(getuserorderTable);
        io.emit("getuserorderTable", { getuserorderTable });
      } catch (error) {
        console.error("Error getuserorderTable:", error);
      }
    });

    socket.on("updateQuantity", async (data) => {
      try {
        const updateQuantity = await tableService.updateQuantity(data);
        console.log(updateQuantity);
        io.emit("updateQuantity", { updateQuantity });
      } catch (error) {
        console.error("Error updateQuantity:", error);
      }
    });

    console.log("New client connected:", socket.id);

    socket.on("updateTableOrder", (data) => {
      try {
        console.log("Received update request for table:", data.tableId);

        io.emit("updateTableOrder", { tableId: data.tableId });
      } catch (error) {
        console.error("Error updateQuantity:", error);
      }
    });

    socket.on("foodReadyUpdate", (data) => {
      try {
        console.log("Food ready update received:", data);
        socket.broadcast.emit("foodReadyUpdate", data);
      } catch (error) {
        console.error("Error updateQuantity:", error);
      }
    });

    /*     socket.on('foodReadyUpdate', (data) => {
            console.log('Food ready update received:', data);
        
        
            socket.broadcast.emit('foodReadyNotification', data); 
        }); */

    socket.on("updatestock", (data) => {
      try {
        console.log("stock updated:", data);
        socket.broadcast.emit("updatestock", data);
      } catch (error) {
        console.error("Error updateQuantity:", error);
      }
    });

    socket.on("tableUpdate", (data) => {
      try {
        console.log("update table:", data);
        socket.broadcast.emit("tableUpdate", data);
      } catch (error) {
        console.error("Error updateQuantity:", error);
      }
    });

    socket.on("updateTakeAway", (data) => {
      try {
        console.log("refreshed takeaway:", data);
        socket.broadcast.emit("updateTakeAway", data);
      } catch (error) {
        console.error("error refreshing kitchen:");
      }
    });

    socket.on("showTable", (data) => {
      try {
        console.log("new showTable:", data);
        socket.broadcast.emit("showTable", data);
      } catch (error) {
        console.error("error refreshing table:");
      }
    });

    //   socket.on('updatedBill', (data) => {
    //     try {
    //         console.log('bill received:', data);
    //         socket.broadcast.emit('updatedBill', data);
    //     } catch (error) {
    //         console.error("Error updateQuantity:", error);
    //     }

    //   });

    // socket.on('itemsUpdate',(data)=>{
    //     console.log('itemsUpadate:',data)
    //     io.emit('itemsUpdate',data)
    // })

    // socket.on('ItemsMove',(data)=>{
    //     console.log('ItemsMove:',data)
    //     io.emit('ItemsMove', data)
    // })

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

export default socket_server;
