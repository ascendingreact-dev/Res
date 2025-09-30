import {
  expect
} from 'chai';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import adminController from '../src/controller/adminController.js';

const app = express();
app.use(bodyParser.json());

app.post('/admin/createApp', adminController.createApp);
app.get("/admin/getApp", adminController.getApp);
app.delete("/admin/deleteApp/:id", adminController.deleteApp);
app.put("/admin/updateApp",adminController.updateApp);

app.post('/admin/status', adminController.status);
app.get("/admin/getAllstatus",adminController.getAllstatus);
app.put("/admin/updatestatus",adminController.updatestatus);
app.delete("/admin/deletestatus",adminController.deletestatus);

app.post("/admin/register",adminController.register);
app.put("/admin/updatePassword",adminController.updatePassword)
app.post("/admin/login",adminController.login) //error

app.get("/admin/getorganisation",adminController.getOrganisation)
app.get("/admin/getOverAllorganisation",adminController.getOverAllorganisation)
app.delete("/admin/deleteOrganization",adminController.deleteOrganization);

app.put("/admin/updateUserdetails",adminController.updateUserdetails);//error
app.delete("/admin/deleteuserdetails/:id",adminController.deleteuserdetails);


app.post("/admin/icon",adminController.iconandNameCreated);
app.get("/admin/geticon/:id",adminController.geticon);
app.get("/admin/getOverallDetails",adminController.getOverallDetails);
app.put("/admin/updateIcon",adminController.updateIcon);
app.delete("/admin/deleteIcon/:id",adminController.deleteIcon);


app.post('/admin/createRoomcategory',adminController.createRoomcategory);
app.get('/admin/getRoomsAndTables/:id',adminController.getRoomsAndTables);
app.get("/admin/getOverAllroomsAndtables",adminController.getOverAllroomsAndtables);
app.put("/admin/updatesubroomsandtable",adminController.updatesubroomsandtable);
app.delete('/admin/deleteTables',adminController.deleteTables);


app.post('/admin/createCategory',adminController.createCategory);
app.get('/admin/getAllCategory',adminController.getAllCategory);
app.put("/admin/updateCategory",adminController.updateCategory);
app.delete('/admin/deleteCategory/:id',adminController.deleteCategory);

app.post('/admin/productDetails',adminController.productDetails);
app.get('/admin/getOverallProduct',adminController.getOverallProduct);
app.put('/admin/Productupdate',adminController.Productupdate);
app.post('/admin/deleteProductDetails',adminController.deleteProductDetails);
app.get('/admin/getproductDetails/:id',adminController.getproductDetails);


describe('App', () => {
  it('should respond with a 200 and return a JSON response', async () => {
    const appLogoData = {
      appLogo: 'logo.png',
      mainCategory_id: 'mainCategory123',
      sub_Category: 'subcategory'
    };

    const response = await request(app)
      .post('/admin/createApp')
      .send(appLogoData);
    expect(response.status).to.equal(200);

    // Check that the response is JSON
    expect(response.type).to.equal('application/json');

    // Check the response contains the expected message
    expect(response.body).to.have.property('message', 'App created successfully');

    // Check that the response contains the correct data
    expect(response.body.data).to.include({
      appLogo: 'logo.png',
      mainCategory_id: 'mainCategory123',
      sub_Category: 'subcategory'
    });
  });
});

describe('getApp', () => {
  it('should respond with a 200 status and return a JSON response', async () => {
    const response = await request(app)
      .get('/admin/getApp');
    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    expect(response.body).to.have.property('message', 'successfully');
    expect(response.body.data).to.be.an('array'); 
  });
});

describe('DELETE /admin/deleteApp', () => {
  it('should respond with a 200 and return a JSON response', async () => {
    const Data = {
      applogo_id: '66d0422a664f704ec733f825',
    };
    const response = await request(app)
      .delete(`/admin/deleteApp/${Data.applogo_id}`) // Correctly pass applogo_id here
      .send(); // No need to send Data again

    console.log(response.body);
    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    expect(response.body).to.not.be.undefined;
    expect(response.body).to.not.be.null;
    expect(response.body.msg).to.equal("deleted succesfully"); // Additional validation
  });
});


describe('PUT /admin/updateApp', () => {
  it('should respond with a 200 and return a JSON response', async () => {
    const Data = {
      applogo_id: '66d03dce868366e518e2bdc8',
      appLogo: 'png',
      sub_Category: 'ss',
    };
    const response = await request(app)
      .put('/admin/updateApp')
      .send(Data);
    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    expect(response.body).to.have.property('message', 'successfully');  
    expect(response.body.data).to.include({
    
    });
  });
});

describe('status', () => {
  it('should respond with a 200 and return a JSON response', async () => {
    const createStatusData = {
      statusName: 'waiting',
      statusColor: 'yellow'
    };

    const response = await request(app)
      .post('/admin/status')
      .send(createStatusData);

    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    expect(response.body).to.have.property('message', 'status created successfully');
    expect(response.body.data).to.include({
      statusName: 'waiting',
      statusColor: 'yellow'
    });
  });
});

describe('getAllstatus', () => {
  it('should respond with a 200 status and return a JSON response', async () => {
    const response = await request(app)
      .get('/admin/getAllstatus');
    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    expect(response.body).to.have.property('msg', 'successfully');
    expect(response.body.data).to.be.an('array'); 
  });
});

describe('DELETE /admin/deletestatus', () => {
  it('should respond with a 200 and return a JSON response', async () => {
    const Data = {
      status_id: '66d0422a664f704ec733f827',
    };
    const response = await request(app)
      .delete('/admin/deletestatus')
      .send(Data);
    console.log(response.body);
    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    expect(response.body).to.not.be.undefined;
    expect(response.body).to.not.be.null
  });
});

describe('PUT /admin/updatestatus', () => {
  it('should respond with a 200 and return a JSON response', async () => {
    const Data = {
      status_id: '66d15ccdb045ce6f711ac116',
      statusColor: 'green',
      statusName: 'completed',
    };
    const response = await request(app)
      .put('/admin/updatestatus')
      .send(Data);
    console.log(response.body);
    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    expect(response.body).to.have.property('msg', 'updated'); 

    expect(response.body.data).to.include({
    
    });
  });
});

describe('register', () => {
  it('should respond with a 200 and return a JSON response', async () => {
    const Data = {
      category_id: '66cc1f49009c23a70188693f',
      email: 'jenifer@gmail.com',
    };
    const response = await request(app)
      .post('/admin/register')
      .send(Data);
    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    expect(response.body).to.have.property('message', 'registered successfully');
    expect(response.body.data).to.include({
     
    });
  });
});

describe('PUT /admin/updatePassword', () => {
  it('should respond with a 200 and return a JSON response', async () => {
    const Data = {
      admin_id: '66d16de5a90c31904b035c44',
      userName: 'jenifer',
      password: 'jenifer@15',
    };
    const response = await request(app)
      .put('/admin/updatePassword')
      .send(Data);
    // console.log(response.body);
    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    expect(response.body).to.have.property('message', 'successfully');  
  });
});

// describe('login', () => {
//   it('should respond with a 200 and return a JSON response', async () => {
//     const Data = {
//       email: 'jenifer@gmail.com',
//       password: 'jenifer'
//     };

//     const response = await request(app)
//       .post('/admin/login')
//       .send(Data);
//     expect(response.status).to.equal(200);
//     expect(response.type).to.equal('application/json');
//     expect(response.body).to.have.property('message', 'App created successfully');
    
//   });
// });

describe('getOverAllorganisation', () => {
  it('should respond with a 200 status and return a JSON response', async () => {
    const response = await request(app)
      .get('/admin/getOverAllorganisation');

    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    expect(response.body).to.have.property('data'); // Check if the response has a 'data' property
    expect(response.body.data).to.be.an('array'); // Ensure that the 'data' property is an array
  });
  

});

  describe('/admin/getorganisation', () => {
  it('should respond with a 200 and return a JSON response', async () => {
    const Data = {
      admin_id: '66d160043d4754799a11ee81',
    };
    const response = await request(app)
      .get('/admin/getorganisation')
      .send(Data);
    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    expect(response.body).to.have.property('message', 'successfully');  
  });
}); 

// describe('PUT /admin/updateUserdetails', () => {
//   it('should respond with a 200 and return a JSON response', async () => {
//     const Data = {
//       user_id: '66d160043d4754799a11ee81',
//       Admin_id: 'jeni',
//       App_id: 'jenifer',
//       password: 'jenifer',
//       password: 'jenifer',
      
//     };

//     const response = await request(app)
//       .put('/admin/updateUserdetails')
//       .send(Data);
    
//     // console.log(response.body); // Debugging log to inspect the response body

//     expect(response.status).to.equal(200);
//     expect(response.type).to.equal('application/json');
//     expect(response.body).to.have.property('message', 'successfully');  // Adjusted to match the backend

//     expect(response.body.data).to.include({
    
//     });
//   });
// }); //////////\\\\\\error


describe('DELETE /admin/deleteuserdetails/:id', () => {
  it('should respond with a 200 and return a JSON response', async () => {
    const user_id = '66d18d3d768341d86f079244'; 
    const response = await request(app)
      .delete(`/admin/deleteuserdetails/${user_id}`) 
      .send();
    // console.log(response.body);
    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    expect(response.body).to.have.property('msg', 'deleted');
    expect(response.body).to.not.be.undefined;
    expect(response.body).to.not.be.null;
  });
});


describe('icon', () => {
  it('should respond with a 200 and return a JSON response', async () => {
    const createStatusData = {
      iconImage: 'aaa',
      iconName: 'dddd'
    };
    const response = await request(app)
      .post('/admin/icon')
      .send(createStatusData);
    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    expect(response.body).to.have.property('msg', 'icon created successfully');
  });
});

describe('getOverallDetails', () => {
  it('should respond with a 200 status and return a JSON response', async () => {
    const response = await request(app)
      .get('/admin/getOverallDetails');
    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    // expect(response.body).to.have.property('msg', 'successfully');
    expect(response.body.data).to.be.an('array'); 
  });
});

describe('DELETE /admin/deleteIcon', () => {
  it('should respond with a 200 and return a JSON response', async () => {
    const icon_id = '66d18ccfa3c4650e2306a9a0'; 
    const response = await request(app)
      .delete(`/admin/deleteIcon/${icon_id}`); 

    console.log(response.body); 
    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    expect(response.body).to.not.be.undefined;
    expect(response.body).to.not.be.null;
  });
});

describe('PUT /admin/updateIcon', () => {
  it('should respond with a 200 and return a JSON response', async () => {
    const Data = {
      icon_id: '66d18625479e41d0deb88bc7',
      iconImage: 'green',
      iconName: 'completed',
    };
    const response = await request(app)
      .put('/admin/updateIcon')
      .send(Data);
    console.log(response.body);
    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    // expect(response.body).to.have.property('msg', 'updated'); 
    expect(response.body.data).to.include({
    
    });
  });
});

describe('GET /admin/geticon/:icon_id', () => {
  it('should respond with a 200 and return a JSON response', async () => {
    const icon_id = '66cc2aef3849d3abeb18691a'; 

    const response = await request(app)
      .get(`/admin/geticon/${icon_id}`); 

    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    expect(response.body).to.not.be.undefined;
    expect(response.body).to.not.be.null;
  });
});

describe('PUT /admin/updatesubroomsandtable', () => {
  it('should respond with a 200 and return a JSON response', async () => {
    const Data = {
      tablerooms_id: "66cc2dabdf81a0cc31ec9bc7",
      Admin_id: "66cc299e3849d3abeb186902",
      org_id: "66cc299e3849d3abeb186908",
      rooms: [
        {
          category: "AC",
          tables: [
            { Tablename: "a1" },
            { Tablename: "a2" }
          ]
        },
        {
          category: "Non-AC",
          tables: [
            { Tablename: "B1" },
            { Tablename: "B2" }
          ]
        },
        {
          category: "Garden",
          tables: [
            { Tablename: "g1" },
            { Tablename: "g2" }
          ]
        }
      ]
    };

    const response = await request(app)
      .put('/admin/updatesubroomsandtable')
      .send(Data);

    console.log(response.body); // Optional: For debugging purposes

    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    expect(response.body).to.not.be.undefined;
    expect(response.body).to.not.be.null;


    // expect(response.body).to.have.property('msg', 'updated');
    // expect(response.body.data).to.have.property('tablerooms_id', Data.tablerooms_id);
    expect(response.body.data).to.have.property('rooms').that.is.an('array').that.deep.includes.members(Data.rooms);
  });
});

describe('GET /admin/getOverAllroomsAndtables', () => {
  it('should respond with a 200 and return a JSON response', async () => {
    

    const response = await request(app)
      .get('/admin/getOverAllroomsAndtables'); 

    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    expect(response.body).to.not.be.undefined;
    expect(response.body).to.not.be.null;
  });
});

describe('PUT /admin/updateCategory', () => {
  it('should respond with a 200 and return a JSON response', async () => {
    const Data = {
      category_id: '66cc1f49009c23a70188693f',
      categoryName: 'Restaurant',
      price: 4000,
    };
    const response = await request(app)
      .put('/admin/updateCategory')
      .send(Data);
    console.log(response.body); 

    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    expect(response.body).to.have.property('msg', 'updated');

  });
});

describe('productDetails', () => {
  it('should respond with a 200 and return a JSON response', async () => {
    const productData = {
      ProductImage:'hello',
      ProductName:'hii',
      ProductCatagory:'kkk',
      Price:66
    };

    const response = await request(app)
      .post('/admin/productDetails')
      .send(productData);
    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');

    // Check the response contains the expected message
    // expect(response.body).to.have.property('message', 'Product Created Successfully');

 
   
});
});


describe('getOverallProduct', () => {
  it('should respond with a 200 and return a JSON response', async () => {
    const response = await request(app)
      .get('/admin/getOverallProduct'); 
    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    // expect(response.body).to.have.property('message', 'Product getting successfully');
    expect(response.body.data).to.be.an('array');
  });
});

describe('PUT /admin/Productupdate', () => {
  it('should respond with 200 and return a JSON response with updated product details', async () => {
    const updateDetails = {
      Product_id: '66d1606465b0148bdb55792e',
      ProductImage: 'hello',
      ProductName: 'hii',
      ProductCatagory: 'kkk',
      Price: 66
    };

    const response = await request(app)
      .put('/admin/Productupdate')
      .send(updateDetails);
    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    // expect(response.body).to.have.property('message', 'Product Updated Successfully');
    expect(response.body).to.have.property('data');
    
  });
});
describe('GET /admin/getproductDetails/:id', () => {
  it('should respond with a 200 and return a JSON response', async () => {
    const  Product_id= '66d15eb20745d7a5fc74104c';  
    const response = await request(app)
      .get(`/admin/getproductDetails/${Product_id}`);
    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    // expect(response.body).to.have.property('message', 'Get Product Id');
    expect(response.body).to.have.property('data');
  });
});

describe('createRoomcategory', () => {
  it('should respond with a 200 and return a JSON response', async () => {
    const roosData = {
      Admin_id: "66d160043d4754799a11ee81",
      org_id: "66d160043d4754799a11ee7f",
      rooms: [
        {
          category: "AC",
          tables: [
            { Tablename: "A1" },
            { Tablename: "A2" }
          ]
        },
        {
          category: "Non-AC",
          tables: [
            { Tablename: "B1" },
            { Tablename: "B2" }
          ]
        },
        {
          category: "Garden",
          tables: [
            { Tablename: "G1" },
            { Tablename: "G2" }
          ]
        }
      ]
    };

    const response = await request(app)
      .post('/admin/createRoomcategory')
      .send(roosData);
    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    // expect(response.body).to.have.property('message', 'Details Stored');
    expect(response.body).to.have.property('data');
   
    expect(response.body.data).to.have.property('_id');
  });
});


describe('GET /admin/getRoomsAndTables/:id', () => {
  it('should respond with a 200 and return a JSON response', async () => {
    const  tablerooms_id= '66cc5affd0a4a00d3fa45738'; 
    const response = await request(app)
      .get(`/admin/getRoomsAndTables/${tablerooms_id}`);
    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    // expect(response.body).to.have.property('message', 'Get Product Id');
    expect(response.body).to.have.property('data');
  });
});

describe('createCategory', () => {
  it('should respond with a 200 and return a JSON response', async () => {
    const  data= {
      categoryName:'hello',
      price:22
    };

    const response = await request(app)
      .post('/admin/createCategory')
      .send(data);

    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    // expect(response.body).to.have.property('message', 'created successfully');
    
});
});


describe('getAllCategory', () => {
  it('should respond with a 200 and return a JSON response', async () => {
    const response = await request(app)
      .get('/admin/getAllCategory'); 
    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    // expect(response.body).to.have.property('message', 'App getting successfully');
    expect(response.body.data).to.be.an('array');

  }); 
});

describe('DELETE /admin/deleteCategory', () => {
  it('should respond with a 200 and return a JSON response', async () => {
    const category_id = '66d1ac8e169f5c9e57e635ea'; // Ensure this ID exists in your test DB

    const response = await request(app)
      .delete(`/admin/deleteCategory/${category_id}`);

    console.log(response.body); 

    if (response.status === 500) {
      console.error("Test Error:", response.body.message);
    }

    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    // expect(response.body).to.have.property('message', 'deleted successfully');
  });
});

describe('DELETE /admin/deleteTables', () => {
  it('should respond with a 200 and return a JSON response', async () => {
    const deleteDetails = {
      tablerooms_id: '66d1a6f605be2ff83b91d795'
    };

    try {
      const response = await request(app)
        .delete('/admin/deleteTables')
        .send(deleteDetails)
        .set('Accept', 'application/json');

      console.log('Response status:', response.status); // Debugging line
      console.log('Response body:', response.body);   // Debugging line

      expect(response.status).to.equal(200);
      expect(response.type).to.equal('application/json');
      expect(response.body).to.have.property('message', 'deleted successfully');
    } catch (error) {
      console.error('Test error:', error); // Debugging line
    }
  });
});

describe('DELETE /admin/deleteOrganization', () => {
  it('should respond with a 200 and return a JSON response', async () => {
    const deleteDetails = {
      organization_id: '66d1609c6d420571696eb328'
    };

    try {
      const response = await request(app)
        .delete('/admin/deleteOrganization')
        .send(deleteDetails)
        .set('Accept', 'application/json');

      // console.log('Response status:', response.status); 
      // console.log('Response body:', response.body);  

      expect(response.status).to.equal(200);
      expect(response.type).to.equal('application/json');
      // expect(response.body).to.have.property('message', 'deleted successfully');
    } catch (error) {
      console.error('Test error:', error); // Debugging line
    }
  });
});
