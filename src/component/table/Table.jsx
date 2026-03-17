import React, { useState, useEffect } from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Paper,
  Button,
  TextField,
  Typography,
  Box,
} from "@mui/material";

const Table = () => {
  const [rows, setRows] = useState([
    {
      orderId: "",
      customerName: "",
      customerContact: "",
      productName: "",
      productId: "",
      sellerId: "",
      sellQuantity: 0,
      remainedQuantity: 100,
      pricePerUnit: 0,
      totalPrice: 0,
      orderDateTime: "",
      deliverDateTime: "",
      isConfirmed: false, // new flag
    },
  ]);

  useEffect(() => {
    const storedRows = JSON.parse(localStorage.getItem("salesRows"));
    if (storedRows) setRows(storedRows);
  }, []);

  useEffect(() => {
    localStorage.setItem("salesRows", JSON.stringify(rows));
  }, [rows]);

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;

    // auto update totalPrice
    if (field === "sellQuantity" || field === "pricePerUnit") {
      const qty = Number(updatedRows[index].sellQuantity || 0);
      const price = Number(updatedRows[index].pricePerUnit || 0);
      updatedRows[index].totalPrice = qty * price;
    }

    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        orderId: "",
        customerName: "",
        customerContact: "",
        productName: "",
        productId: "",
        sellerId: "",
        sellQuantity: 0,
        remainedQuantity: 100,
        pricePerUnit: 0,
        totalPrice: 0,
        orderDateTime: "",
        deliverDateTime: "",
        isConfirmed: false,
      },
    ]);
  };

  const deleteRow = (index) => {
    if (rows.length === 1) return;
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const toggleConfirmOrder = (index) => {
    const updatedRows = [...rows];
    const row = updatedRows[index];
    const sellQty = Number(row.sellQuantity || 0);
    const remainQty = Number(row.remainedQuantity || 0);

    if (!row.isConfirmed) {
      // Confirm order
      if (sellQty > remainQty) {
        alert("Sell quantity exceeds remaining stock!");
        return;
      }
      row.remainedQuantity = remainQty - sellQty;
      row.isConfirmed = true;
    } else {
      // Cancel order
      row.remainedQuantity = remainQty + sellQty;
      row.isConfirmed = false;
    }

    setRows(updatedRows);
  };

  const renderCell = (row, index, field, type = "text") => (
    <TableCell>
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 1,
          p: 0.5,
        }}
      >
        <TextField
          type={type}
          value={row[field]}
          onChange={(e) => handleChange(index, field, e.target.value)}
          variant="standard"
          fullWidth
          InputProps={{ disableUnderline: true }}
        />
      </Box>
    </TableCell>
  );

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
      <MuiTable stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Customer Contact</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Product ID</TableCell>
            <TableCell>Seller ID</TableCell>
            <TableCell>Sell Quantity</TableCell>
            <TableCell>Remained Quantity</TableCell>
            <TableCell>Price/Unit</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Order Date & Time</TableCell>
            <TableCell>Delivery Date & Time</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {renderCell(row, index, "orderId")}
              {renderCell(row, index, "customerName")}
              {renderCell(row, index, "customerContact")}
              {renderCell(row, index, "productName")}
              {renderCell(row, index, "productId")}
              {renderCell(row, index, "sellerId")}
              {renderCell(row, index, "sellQuantity", "number")}
              {renderCell(row, index, "remainedQuantity", "number")}
              {renderCell(row, index, "pricePerUnit", "number")}
              <TableCell>
                <Box sx={{ border: "1px solid #ccc", borderRadius: 1, p: 0.5 }}>
                  <Typography>{row.totalPrice}</Typography>
                </Box>
              </TableCell>
              {renderCell(row, index, "orderDateTime", "datetime-local")}
              {renderCell(row, index, "deliverDateTime", "datetime-local")}
              <TableCell>
                <Button
                  color={row.isConfirmed ? "warning" : "success"}
                  onClick={() => toggleConfirmOrder(index)}
                  sx={{ mr: 1 }}
                >
                  {row.isConfirmed ? "Cancel Order" : "Confirm Order"}
                </Button>
                <Button color="error" onClick={() => deleteRow(index)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={6} align="right">
              <Typography fontWeight="bold">Grand Total Quantity:</Typography>
            </TableCell>
            <TableCell>
              <Typography fontWeight="bold">
                {rows.reduce(
                  (sum, row) => sum + Number(row.sellQuantity || 0),
                  0
                )}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography fontWeight="bold">
                {rows.reduce(
                  (sum, row) => sum + Number(row.remainedQuantity || 0),
                  0
                )}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography fontWeight="bold">Grand Total Price:</Typography>
            </TableCell>
            <TableCell>
              <Typography fontWeight="bold">
                {rows.reduce((sum, row) => sum + Number(row.totalPrice || 0), 0)}
              </Typography>
            </TableCell>
            <TableCell colSpan={5} />
          </TableRow>
        </TableFooter>
      </MuiTable>

      <Button variant="contained" onClick={addRow} sx={{ m: 2 }}>
        Add Row
      </Button>
    </TableContainer>
  );
};

export default Table;