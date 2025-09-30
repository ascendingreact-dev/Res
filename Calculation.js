



const Calculation = {
    totalAmount: async (dishes) => {
      console.log(dishes, "UY");
  
      if (!Array.isArray(dishes) || dishes.length === 0) {
        throw new Error("No dishes available for calculation.");
      }
  
      let totalAmount = 0;
  
      dishes.forEach(dish => {
        console.log(dish.Price,dish.quantity)
        if (!dish.Price && !dish.quantity) {
          throw new Error(`Dish with ID ${dish._id} is missing price or quantity.`);
        }
  
        totalAmount += dish.Price * dish.quantity;
        console.log(totalAmount,"kur")
      });
  
      return totalAmount;
    },
  // =========================================
    calculateTotalWithGst: (totalAmount, tableType, gstRates) => {
      console.log(totalAmount, tableType, gstRates,"kkkik")
      let gstRate;
    
      if (tableType === "NonAC") {
        gstRate = gstRates["NonAC"];
      } else if (tableType === "AC"  || tableType === "Takeaway") {
        gstRate = gstRates["AC"];
      } else if (tableType === "Garden") {
        gstRate = gstRates["Garden"];
      } else {
        throw new Error(`Invalid TableType: ${tableType}`);
      }
    
      console.log(gstRate, "gstRate");
    
      const gstPercentage = parseFloat(gstRate) / 100;
      console.log(gstPercentage, "gstPercentage");

      const cgstPercentage = gstPercentage / 2;
      const sgstPercentage = gstPercentage / 2;
    
      const cgstAmount = totalAmount * cgstPercentage;
      const sgstAmount = totalAmount * sgstPercentage;
    
      console.log(cgstAmount, "cgstAmount");
      console.log(sgstAmount, "sgstAmount");
    
      const totalGstAmount = cgstAmount + sgstAmount;
    console.log(totalAmount)
      return {
        totalAmountWithGst: Math.round(totalAmount + totalGstAmount),
        cgstAmount:Math.round(cgstAmount),
        sgstAmount:Math.round(sgstAmount),
        totalGstAmount: Math.round(totalGstAmount)
      };
    },
    
    // ===============
    
  
    generateKOT: (previousKotNo) => {
      const lastNumber = parseInt(previousKotNo.slice(1), 10);
      const incrementedNumber = lastNumber + 1;
      const newKOTNumber = `K${String(incrementedNumber).padStart(3, '0')}`; // Always 3 digits
      return newKOTNumber;
  },
  
  

  generateBill: async (previousBillNo) => {
    const lastNumber = parseInt(previousBillNo.slice(2), 10);
    const incrementedNumber = lastNumber + 1;
    const newBillNumber = `FB${String(incrementedNumber).padStart(3, '0')}`; // Always 3 digits
    return newBillNumber;
}





  };
  
 
  

export default Calculation