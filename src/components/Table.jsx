import React, { useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const InvoiceTable = () => {
  const [items, setItems] = useState([
    { description: "", details: "", rate: 0, qty: 1 },
  ]);

  const currency = "₹";

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = field === "rate" || field === "qty" ? parseFloat(value) : value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { description: "", details: "", rate: 0, qty: 1 }]);
  };

  const handleRemoveItem = (index) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
    }
  };

  return (
    <Paper sx={{ p: 2, mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell><strong>DESCRIPTION</strong></TableCell>
            <TableCell><strong>RATE</strong></TableCell>
            <TableCell><strong>QTY</strong></TableCell>
            <TableCell><strong>AMOUNT</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
              {items.length > 1 && (
                <IconButton
                    color="error"
                    onClick={() => handleRemoveItem(index)}
                >
                    <CloseIcon />
                </IconButton>
                )}
              </TableCell>
              <TableCell sx={{ width: "40%" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Item Description"
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(index, "description", e.target.value)
                  }
                  size="small"
                  margin="dense"
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Additional details"
                  value={item.details}
                  onChange={(e) =>
                    handleItemChange(index, "details", e.target.value)
                  }
                  multiline
                  rows={2}
                  size="small"
                  margin="dense"
                  sx={{ mt: 1 }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value={item.rate}
                  onChange={(e) =>
                    handleItemChange(index, "rate", e.target.value)
                  }
                  size="small"
                  margin="dense"
                  inputProps={{ min: 0, step: "0.01" }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value={item.qty}
                  onChange={(e) =>
                    handleItemChange(index, "qty", e.target.value)
                  }
                  size="small"
                  margin="dense"
                  inputProps={{ min: 1 }}
                />
              </TableCell>
              <TableCell>
                <Typography>
                  {currency}
                  {(item.rate * item.qty).toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box mt={2}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddItem}
        >
          Add Item
        </Button>
      </Box>
    </Paper>
  );
};

export default InvoiceTable;
