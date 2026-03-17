import React, { useState, useEffect } from "react";

// Main product database
const productDB = [
  { productId: "P001", productName: "Apple iPhone 15", pricePerUnit: 1200, remainedQuantity: 50 },
  { productId: "P002", productName: "Samsung Galaxy S23", pricePerUnit: 1100, remainedQuantity: 40 },
  { productId: "P003", productName: "Dell XPS 13 Laptop", pricePerUnit: 1500, remainedQuantity: 20 },
  { productId: "P004", productName: "HP Spectre x360", pricePerUnit: 1400, remainedQuantity: 25 },
  { productId: "P005", productName: "Sony WH-1000XM5 Headphones", pricePerUnit: 350, remainedQuantity: 60 },
  { productId: "P006", productName: "Apple AirPods Pro", pricePerUnit: 250, remainedQuantity: 70 },
  { productId: "P007", productName: "Google Pixel 8", pricePerUnit: 900, remainedQuantity: 35 },
  { productId: "P008", productName: "Amazon Echo Dot", pricePerUnit: 50, remainedQuantity: 100 },
  { productId: "P009", productName: "Kindle Paperwhite", pricePerUnit: 130, remainedQuantity: 80 },
  { productId: "P010", productName: "Nintendo Switch", pricePerUnit: 350, remainedQuantity: 30 },
  { productId: "P011", productName: "PlayStation 5", pricePerUnit: 500, remainedQuantity: 20 },
  { productId: "P012", productName: "Xbox Series X", pricePerUnit: 500, remainedQuantity: 25 },
  { productId: "P013", productName: "Canon EOS R6 Camera", pricePerUnit: 2500, remainedQuantity: 15 },
  { productId: "P014", productName: "Nikon Z6 II Camera", pricePerUnit: 2000, remainedQuantity: 18 },
  { productId: "P015", productName: "GoPro Hero 12", pricePerUnit: 400, remainedQuantity: 40 },
  { productId: "P016", productName: "Apple MacBook Air M2", pricePerUnit: 1300, remainedQuantity: 22 },
  { productId: "P017", productName: "Logitech MX Master 3 Mouse", pricePerUnit: 100, remainedQuantity: 75 },
  { productId: "P018", productName: "Dell UltraSharp Monitor", pricePerUnit: 600, remainedQuantity: 30 },
  { productId: "P019", productName: "Samsung QLED TV 55\"", pricePerUnit: 1200, remainedQuantity: 15 },
  { productId: "P020", productName: "LG OLED TV 65\"", pricePerUnit: 2000, remainedQuantity: 12 },
  { productId: "P021", productName: "Bose SoundLink Speaker", pricePerUnit: 250, remainedQuantity: 50 },
  { productId: "P022", productName: "Sony Bravia 50\" TV", pricePerUnit: 900, remainedQuantity: 20 },
  { productId: "P023", productName: "HP Omen Gaming Laptop", pricePerUnit: 1600, remainedQuantity: 15 },
  { productId: "P024", productName: "Asus ROG Zephyrus", pricePerUnit: 1800, remainedQuantity: 10 },
  { productId: "P025", productName: "Lenovo ThinkPad X1 Carbon", pricePerUnit: 1400, remainedQuantity: 18 },
  { productId: "P026", productName: "Microsoft Surface Pro 9", pricePerUnit: 1100, remainedQuantity: 25 },
  { productId: "P027", productName: "Apple iPad Pro 12.9\"", pricePerUnit: 1100, remainedQuantity: 20 },
  { productId: "P028", productName: "Samsung Galaxy Tab S9", pricePerUnit: 900, remainedQuantity: 22 },
  { productId: "P029", productName: "Apple Watch Series 9", pricePerUnit: 400, remainedQuantity: 50 },
  { productId: "P030", productName: "Fitbit Charge 6", pricePerUnit: 150, remainedQuantity: 60 },
  { productId: "P031", productName: "Nvidia RTX 4090 GPU", pricePerUnit: 2000, remainedQuantity: 10 },
  { productId: "P032", productName: "AMD Ryzen 9 7950X CPU", pricePerUnit: 700, remainedQuantity: 15 },
  { productId: "P033", productName: "Corsair 32GB RAM Kit", pricePerUnit: 180, remainedQuantity: 40 },
  { productId: "P034", productName: "Samsung 1TB SSD", pricePerUnit: 120, remainedQuantity: 50 },
  { productId: "P035", productName: "Seagate 4TB HDD", pricePerUnit: 100, remainedQuantity: 45 },
  { productId: "P036", productName: "LG Ultrawide Monitor", pricePerUnit: 450, remainedQuantity: 25 },
  { productId: "P037", productName: "Razer BlackWidow Keyboard", pricePerUnit: 120, remainedQuantity: 60 },
  { productId: "P038", productName: "Logitech G502 Mouse", pricePerUnit: 80, remainedQuantity: 70 },
  { productId: "P039", productName: "Apple TV 4K", pricePerUnit: 180, remainedQuantity: 40 },
  { productId: "P040", productName: "Google Nest Hub", pricePerUnit: 90, remainedQuantity: 55 },
  { productId: "P041", productName: "Instant Pot Duo 7-in-1", pricePerUnit: 120, remainedQuantity: 50 },
  { productId: "P042", productName: "KitchenAid Stand Mixer", pricePerUnit: 400, remainedQuantity: 20 },
  { productId: "P043", productName: "Dyson V15 Vacuum", pricePerUnit: 700, remainedQuantity: 15 },
  { productId: "P044", productName: "Philips Air Fryer", pricePerUnit: 150, remainedQuantity: 40 },
  { productId: "P045", productName: "Samsung Refrigerator 300L", pricePerUnit: 900, remainedQuantity: 10 },
  { productId: "P046", productName: "LG Washing Machine 7kg", pricePerUnit: 600, remainedQuantity: 15 },
  { productId: "P047", productName: "Sony PlayStation VR2", pricePerUnit: 500, remainedQuantity: 12 },
  { productId: "P048", productName: "Oculus Quest 3", pricePerUnit: 450, remainedQuantity: 20 },
  { productId: "P049", productName: "Canon Pixma Printer", pricePerUnit: 150, remainedQuantity: 25 },
  { productId: "P050", productName: "Epson EcoTank Printer", pricePerUnit: 200, remainedQuantity: 30 },
  { productId: "P051", productName: "Apple Mac Mini M2", pricePerUnit: 800, remainedQuantity: 18 },
  { productId: "P052", productName: "Lenovo Legion 5 Laptop", pricePerUnit: 1200, remainedQuantity: 22 },
  { productId: "P053", productName: "Asus TUF Gaming Laptop", pricePerUnit: 1000, remainedQuantity: 25 },
  { productId: "P054", productName: "Bose QuietComfort 45", pricePerUnit: 350, remainedQuantity: 40 },
  { productId: "P055", productName: "Samsung Galaxy Buds 3", pricePerUnit: 150, remainedQuantity: 50 },
  { productId: "P056", productName: "Sony Xperia 1 V", pricePerUnit: 900, remainedQuantity: 30 },
  { productId: "P057", productName: "Google Pixel Buds Pro", pricePerUnit: 200, remainedQuantity: 60 },
  { productId: "P058", productName: "Anker Portable Charger", pricePerUnit: 50, remainedQuantity: 100 },
  { productId: "P059", productName: "TP-Link WiFi Router", pricePerUnit: 80, remainedQuantity: 50 },
  { productId: "P060", productName: "Netgear WiFi 6 Router", pricePerUnit: 120, remainedQuantity: 40 },
  { productId: "P061", productName: "Apple HomePod Mini", pricePerUnit: 90, remainedQuantity: 55 },
  { productId: "P062", productName: "Samsung Galaxy Watch 6", pricePerUnit: 300, remainedQuantity: 35 },
  { productId: "P063", productName: "Garmin Fenix 7", pricePerUnit: 600, remainedQuantity: 20 },
  { productId: "P064", productName: "Fitbit Versa 4", pricePerUnit: 200, remainedQuantity: 45 },
  { productId: "P065", productName: "Roku Streaming Stick 4K", pricePerUnit: 50, remainedQuantity: 70 },
  { productId: "P066", productName: "Apple iMac 24\"", pricePerUnit: 1500, remainedQuantity: 12 },
  { productId: "P067", productName: "Microsoft Xbox Wireless Controller", pricePerUnit: 60, remainedQuantity: 80 },
  { productId: "P068", productName: "Sony DualSense Controller", pricePerUnit: 70, remainedQuantity: 75 },
  { productId: "P069", productName: "Logitech StreamCam", pricePerUnit: 170, remainedQuantity: 25 },
  { productId: "P070", productName: "Canon EOS M50 Mark II", pricePerUnit: 700, remainedQuantity: 20 },
  { productId: "P071", productName: "Nikon D7500 DSLR", pricePerUnit: 900, remainedQuantity: 18 },
  { productId: "P072", productName: "Lenovo IdeaPad 5", pricePerUnit: 600, remainedQuantity: 30 },
  { productId: "P073", productName: "HP Pavilion Laptop", pricePerUnit: 800, remainedQuantity: 22 },
  { productId: "P074", productName: "Samsung Galaxy Tab A8", pricePerUnit: 200, remainedQuantity: 40 },
  { productId: "P075", productName: "Apple iPad 10.9\"", pricePerUnit: 500, remainedQuantity: 25 },
  { productId: "P076", productName: "JBL Flip 6 Speaker", pricePerUnit: 120, remainedQuantity: 60 },
  { productId: "P077", productName: "Anker Soundcore Speaker", pricePerUnit: 80, remainedQuantity: 70 },
  { productId: "P078", productName: "Sony SRS-XB43 Speaker", pricePerUnit: 150, remainedQuantity: 55 },
  { productId: "P079", productName: "Apple Pencil 2nd Gen", pricePerUnit: 130, remainedQuantity: 40 },
  { productId: "P080", productName: "Logitech K380 Keyboard", pricePerUnit: 40, remainedQuantity: 80 },
  { productId: "P081", productName: "Samsung T7 SSD 1TB", pricePerUnit: 100, remainedQuantity: 45 },
  { productId: "P082", productName: "WD My Passport 2TB", pricePerUnit: 90, remainedQuantity: 50 },
  { productId: "P083", productName: "Seagate Expansion 5TB", pricePerUnit: 120, remainedQuantity: 30 },
  { productId: "P084", productName: "Asus ZenBook 14", pricePerUnit: 1200, remainedQuantity: 18 },
  { productId: "P085", productName: "LG Gram 16", pricePerUnit: 1400, remainedQuantity: 15 },
  { productId: "P086", productName: "Dell Inspiron 15", pricePerUnit: 800, remainedQuantity: 20 },
  { productId: "P087", productName: "Sony Alpha a7C", pricePerUnit: 1800, remainedQuantity: 10 },
  { productId: "P088", productName: "Canon RF 24-70mm Lens", pricePerUnit: 1200, remainedQuantity: 12 },
  { productId: "P089", productName: "Nikon Z 24-70mm Lens", pricePerUnit: 1100, remainedQuantity: 15 },
  { productId: "P090", productName: "DJI Mini 3 Pro Drone", pricePerUnit: 800, remainedQuantity: 18 },
  { productId: "P091", productName: "DJI Air 3 Drone", pricePerUnit: 1000, remainedQuantity: 12 },
  { productId: "P092", productName: "Apple MacBook Pro 16\"", pricePerUnit: 2500, remainedQuantity: 8 },
  { productId: "P093", productName: "Microsoft Surface Laptop 5", pricePerUnit: 1300, remainedQuantity: 15 },
  { productId: "P094", productName: "Asus ROG Strix G17", pricePerUnit: 1700, remainedQuantity: 10 },
  { productId: "P095", productName: "HP Envy 15", pricePerUnit: 1400, remainedQuantity: 12 },
  { productId: "P096", productName: "Samsung Galaxy Book3 Pro", pricePerUnit: 1500, remainedQuantity: 18 },
  { productId: "P097", productName: "Lenovo ThinkBook 14", pricePerUnit: 900, remainedQuantity: 25 },
  { productId: "P098", productName: "Apple HomeKit Hub", pricePerUnit: 200, remainedQuantity: 35 },
  { productId: "P099", productName: "Google Nest Thermostat", pricePerUnit: 250, remainedQuantity: 30 },
  { productId: "P100", productName: "Ring Video Doorbell 4", pricePerUnit: 200, remainedQuantity: 25 },
];

// Seller database
const sellerDB = [
  { sellerId: "S001", sellerName: "John Doe" },
  { sellerId: "S002", sellerName: "Jane Smith" },
  { sellerId: "S003", sellerName: "Alice Johnson" },
  { sellerId: "S004", sellerName: "Bob Williams" },
  { sellerId: "S005", sellerName: "Michael Brown" },
  { sellerId: "S006", sellerName: "Emily Davis" },
  { sellerId: "S007", sellerName: "David Wilson" },
  { sellerId: "S008", sellerName: "Sophia Martinez" },
  { sellerId: "S009", sellerName: "James Anderson" },
  { sellerId: "S010", sellerName: "Olivia Thomas" },
];

export default function SalesOrderTable() {
  const [rows, setRows] = useState(() => {
    const storedRows = JSON.parse(localStorage.getItem("salesRows"));
    return storedRows && storedRows.length > 0
      ? storedRows
      : [
          {
            orderId: "",
            customerName: "",
            customerContact: "",
            sellerId: "",
            productName: "",
            productId: "",
            sellQuantity: 0,
            remainedQuantity: 0,
            pricePerUnit: 0,
            totalPrice: 0,
            orderDateTime: "",
            deliverDateTime: "",
            isConfirmed: false,
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("salesRows", JSON.stringify(rows));
  }, [rows]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        orderId: "",
        customerName: "",
        customerContact: "",
        sellerId: "",
        productName: "",
        productId: "",
        sellQuantity: 0,
        remainedQuantity: 0,
        pricePerUnit: 0,
        totalPrice: 0,
        orderDateTime: "",
        deliverDateTime: "",
        isConfirmed: false,
      },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    const row = updatedRows[index];

    if (row.isConfirmed) return;

    row[field] = value;

    if (field === "productId") {
      const product = productDB.find((p) => p.productId === value);
      if (product) {
        row.productName = product.productName;
        row.pricePerUnit = product.pricePerUnit;
        row.remainedQuantity = product.remainedQuantity;
      } else {
        row.productName = "";
        row.pricePerUnit = 0;
        row.remainedQuantity = 0;
      }
    }

    if (field === "sellQuantity") {
      row.sellQuantity = Math.min(Number(value), row.remainedQuantity);
    }

    row.totalPrice = row.sellQuantity * row.pricePerUnit;

    setRows(updatedRows);
  };

  const generateOrderId = (row) => {
    const prodName = row.productName ? row.productName.slice(0, 3).toUpperCase() : "XXX";
    const prodId = row.productId || "000";
    const price = row.pricePerUnit || 0;
    const custName = row.customerName ? row.customerName.slice(0, 2).toUpperCase() : "XX";
    const custContact = row.customerContact ? row.customerContact.slice(-4) : "0000";
    const timestamp = Date.now().toString().slice(-3);
    return `${prodName}-${prodId}-${price}-${custName}-${custContact}-${timestamp}`;
  };

  const toggleConfirm = (index) => {
    const updatedRows = [...rows];
    const row = updatedRows[index];
    const product = productDB.find((p) => p.productId === row.productId);

    if (!row.isConfirmed) {
      if (!row.productId || !row.customerName || !row.customerContact || !row.sellerId || row.sellQuantity <= 0) {
        alert("Please fill all required fields and sell quantity before confirming!");
        return;
      }

      if (product && row.sellQuantity <= product.remainedQuantity) {
        product.remainedQuantity -= row.sellQuantity;
        row.remainedQuantity = product.remainedQuantity;
        row.isConfirmed = true;
        row.orderId = generateOrderId(row);
      } else {
        alert("Sell quantity exceeds available quantity!");
        return;
      }
    } else {
      if (product) {
        product.remainedQuantity += row.sellQuantity;
        row.remainedQuantity = product.remainedQuantity;
        row.isConfirmed = false;
        row.orderId = "";
      }
    }

    setRows(updatedRows);
  };

  const clearRow = (index) => {
    const updatedRows = [...rows];
    updatedRows[index] = {
      orderId: "",
      customerName: "",
      customerContact: "",
      sellerId: "",
      productName: "",
      productId: "",
      sellQuantity: 0,
      remainedQuantity: 0,
      pricePerUnit: 0,
      totalPrice: 0,
      orderDateTime: "",
      deliverDateTime: "",
      isConfirmed: false,
    };
    setRows(updatedRows);
  };

  const grandTotalPrice = rows.reduce((acc, r) => acc + r.totalPrice, 0);
  const grandTotalQty = rows.reduce((acc, r) => acc + Number(r.sellQuantity), 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Sales & Order Management</h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {[
              "Order ID",
              "Customer Name",
              "Customer Contact",
              "Seller ID",
              "Product Name",
              "Product ID",
              "Sell Quantity",
              "Remained Quantity",
              "Price/Unit",
              "Total Price",
              "Order DateTime",
              "Deliver DateTime",
              "Action",
              "Clear",
            ].map((h) => (
              <th
                key={h}
                style={{
                  border: "1px solid #000",
                  padding: "6px",
                  fontSize: "12px",
                  minWidth: "100px",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {[
                { field: "orderId", readonly: true },
                { field: "customerName" },
                { field: "customerContact" },
                { field: "sellerId", type: "select" }, // <-- dropdown
                { field: "productName", readonly: true },
                { field: "productId" },
                { field: "sellQuantity", type: "number" },
                { field: "remainedQuantity", type: "number", readonly: true },
                { field: "pricePerUnit", readonly: true },
                { field: "totalPrice", readonly: true },
                { field: "orderDateTime", type: "datetime-local" },
                { field: "deliverDateTime", type: "datetime-local" },
              ].map(({ field, readonly, type }) => (
                <td key={field} style={{ border: "1px solid #000", padding: "6px" }}>
                  {readonly || row.isConfirmed ? (
                    row[field]
                  ) : type === "select" ? (
                    <select
                      value={row[field]}
                      onChange={(e) => handleChange(i, field, e.target.value)}
                      style={{ width: "100%", fontSize: "12px" }}
                    >
                      <option value="">Select Seller</option>
                      {sellerDB.map((s) => (
                        <option key={s.sellerId} value={s.sellerId}>
                          {s.sellerId} - {s.sellerName}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={type || "text"}
                      value={row[field]}
                      onChange={(e) => handleChange(i, field, e.target.value)}
                      style={{ width: "100%", fontSize: "12px" }}
                      min={field === "sellQuantity" ? 0 : undefined}
                      max={field === "sellQuantity" ? row.remainedQuantity : undefined}
                    />
                  )}
                </td>
              ))}

              <td style={{ border: "1px solid #000", padding: "6px" }}>
                <button onClick={() => toggleConfirm(i)} style={{ fontSize: "12px" }}>
                  {row.isConfirmed ? "Cancel Order" : "Confirm Order"}
                </button>
              </td>
              <td style={{ border: "1px solid #000", padding: "6px" }}>
                <button onClick={() => clearRow(i)} style={{ fontSize: "12px" }}>
                  Clear
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6} style={{ border: "1px solid #000", padding: "6px", textAlign: "right" }}>
              Grand Total
            </td>
            <td style={{ border: "1px solid #000", padding: "6px" }}>{grandTotalQty}</td>
            <td colSpan={2} style={{ border: "1px solid #000", padding: "6px" }}></td>
            <td style={{ border: "1px solid #000", padding: "6px" }}>{grandTotalPrice}</td>
            <td colSpan={4}></td>
          </tr>
        </tfoot>
      </table>

      <button onClick={addRow} style={{ marginTop: "10px" }}>
        Add Row
      </button>
    </div>
  );
}