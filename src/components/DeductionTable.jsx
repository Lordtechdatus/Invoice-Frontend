import React from "react";
import { TextField, Grid, Button, Typography } from "@mui/material";

function DeductionsTable({ deductions, setDeductions }) {
  const handleChange = (index, field) => (e) => {
    const updated = [...deductions];
    updated[index][field] = field === "amount" ? Number(e.target.value) : e.target.value;
    setDeductions(updated);
  };

  const addRow = () => setDeductions([...deductions, { type: "", amount: 0 }]);

  return (
    <>
      <Typography variant="h6" gutterBottom>Deductions</Typography>
      {deductions.map((row, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Deduction Type"
              value={row.type}
              onChange={handleChange(index, "type")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={row.amount}
              onChange={handleChange(index, "amount")}
            />
          </Grid>
        </Grid>
      ))}
      <Button variant="outlined" onClick={addRow}>+ Add Deduction</Button>
    </>
  );
}

export default DeductionsTable;
