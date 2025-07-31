import React from "react";
import { TextField, Grid, Button, Typography } from "@mui/material";

function EarningsTable({ earnings, setEarnings }) {
  const handleChange = (index, field) => (e) => {
    const updated = [...earnings];
    updated[index][field] = field === "amount" ? Number(e.target.value) : e.target.value;
    setEarnings(updated);
  };

  const addRow = () => setEarnings([...earnings, { type: "", amount: 0 }]);

  return (
    <>
      <Typography variant="h6" gutterBottom>Earnings</Typography>
      {earnings.map((row, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Earning Type"
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
      <Button variant="outlined" onClick={addRow}>+ Add Earning</Button>
    </>
  );
}

export default EarningsTable;
