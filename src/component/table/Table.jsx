import { useState, useEffect } from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
  TableFooter,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "salespilot_data";

const Table = () => {
  const createEmptyRow = () => ({
    id: uuidv4(),
    orderId: "",
    customer: "",
    product: "",
    quantity: "",
    price: "",
    total: 0,
    status: "Pending",
  });

  const [rows, setRows] = useState([]);

  const columns = [
    { id: "orderId", label: "Order ID" },
    { id: "customer", label: "Customer" },
    { id: "product", label: "Product" },
    { id: "quantity", label: "Quantity" },
    { id: "price", label: "Price" },
    { id: "total", label: "Total" },
    { id: "status", label: "Status" },
  ];

  // 🔥 Load from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      const parsed = JSON.parse(savedData);
      setRows(parsed.length ? parsed : [createEmptyRow()]);
    } else {
      setRows([createEmptyRow()]); // always 1 row
    }
  }, []);

  // 🔥 Save to localStorage
  useEffect(() => {
    if (rows.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
    }
  }, [rows]);

  const handleAddRow = () => {
    setRows([...rows, createEmptyRow()]);
  };

  const handleChange = (id, field, value) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        const updatedRow = { ...row, [field]: value };

        const qty = Number(updatedRow.quantity) || 0;
        const price = Number(updatedRow.price) || 0;
        updatedRow.total = qty * price;

        return updatedRow;
      }
      return row;
    });

    setRows(updatedRows);
  };

  const handleDelete = (id) => {
    let filtered = rows.filter((row) => row.id !== id);

    // ❗ always keep at least 1 row
    if (filtered.length === 0) {
      filtered = [createEmptyRow()];
    }

    setRows(filtered);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleAddRow}
        style={{ marginBottom: "10px" }}
      >
        Add Row
      </Button>

      <TableContainer component={Paper}>
        <MuiTable>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.id}>{col.label}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {columns.map((col) => (
                  <TableCell key={col.id}>
                    {col.id === "status" ? (
                      <Select
                        value={row.status}
                        onChange={(e) =>
                          handleChange(row.id, "status", e.target.value)
                        }
                        size="small"
                        fullWidth
                      >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Shipped">Shipped</MenuItem>
                        <MenuItem value="Delivered">Delivered</MenuItem>
                      </Select>
                    ) : col.id === "total" ? (
                      <strong>{row.total}</strong>
                    ) : (
                      <TextField
                        value={row[col.id]}
                        onChange={(e) =>
                          handleChange(row.id, col.id, e.target.value)
                        }
                        size="small"
                        type={
                          col.id === "quantity" || col.id === "price"
                            ? "number"
                            : "text"
                        }
                      />
                    )}
                  </TableCell>
                ))}

                <TableCell>
                  <Button
                    color="error"
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
  <TableRow>
    <TableCell colSpan={3} align="right">
      <Typography fontWeight="bold">Grand Total Quantity:</Typography>
    </TableCell>
    <TableCell>
      <Typography fontWeight="bold">
        {rows.reduce(
          (sum, row) => sum + Number(row.quantity || 0),
          0
        )}
      </Typography>
    </TableCell>

    <TableCell colSpan={1} align="right">
      <Typography fontWeight="bold">Grand Total Price:</Typography>
    </TableCell>
    <TableCell>
      <Typography fontWeight="bold">
        {rows.reduce((sum, row) => sum + Number(row.total || 0), 0)}
      </Typography>
    </TableCell>

    <TableCell /> {/* empty cell for Actions column */}
  </TableRow>
</TableFooter>
        </MuiTable>
      </TableContainer>
    </div>
  );
};

export default Table;