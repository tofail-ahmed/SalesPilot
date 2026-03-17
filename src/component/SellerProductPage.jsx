import React, { useState, useEffect } from "react";

// Sample product database
const initialProducts = [
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

export default function SellerProductPage() {
  const [products, setProducts] = useState(() => {
    // Load from localStorage if exists
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : initialProducts;
  });

  // Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // Handle input changes
  const handleChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] =
      field === "pricePerUnit" || field === "remainedQuantity" ? Number(value) : value;
    setProducts(updated);
  };

  // Save single product (here just alert for demo)
  const saveProduct = (index) => {
    alert(`Product ${products[index].productId} saved!`);
    // In a real app, you would call a backend API here
  };

  // Delete product row
  const deleteProduct = (index) => {
    const empty = Object.values(products[index]).every(
      (val) => val === "" || val === 0
    );
    if (!empty) {
      alert("Cannot delete row with data! Clear first.");
      return;
    }
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Seller Product Management</h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {["Product ID", "Product Name", "Price Per Unit", "Remained Quantity", "Action", "Delete"].map(
              (h) => (
                <th
                  key={h}
                  style={{ border: "1px solid #000", padding: "6px", minWidth: "120px" }}
                >
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {products.map((prod, i) => (
            <tr key={prod.productId}>
              <td style={{ border: "1px solid #000", padding: "6px" }}>{prod.productId}</td>
              <td style={{ border: "1px solid #000", padding: "6px" }}>
                <input
                  type="text"
                  value={prod.productName}
                  onChange={(e) => handleChange(i, "productName", e.target.value)}
                  style={{ width: "100%" }}
                />
              </td>
              <td style={{ border: "1px solid #000", padding: "6px" }}>
                <input
                  type="number"
                  value={prod.pricePerUnit}
                  onChange={(e) => handleChange(i, "pricePerUnit", e.target.value)}
                  style={{ width: "100%" }}
                />
              </td>
              <td style={{ border: "1px solid #000", padding: "6px" }}>
                <input
                  type="number"
                  value={prod.remainedQuantity}
                  onChange={(e) => handleChange(i, "remainedQuantity", e.target.value)}
                  style={{ width: "100%" }}
                />
              </td>
              <td style={{ border: "1px solid #000", padding: "6px" }}>
                <button onClick={() => saveProduct(i)}>Save</button>
              </td>
              <td style={{ border: "1px solid #000", padding: "6px" }}>
                <button
                  onClick={() => deleteProduct(i)}
                  disabled={
                    !Object.values(prod).every((val) => val === "" || val === 0)
                  }
                  style={{
                    backgroundColor: Object.values(prod).every((val) => val === "" || val === 0)
                      ? "#f00"
                      : "#ccc",
                    color: "#fff",
                    cursor: Object.values(prod).every((val) => val === "" || val === 0)
                      ? "pointer"
                      : "not-allowed",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}