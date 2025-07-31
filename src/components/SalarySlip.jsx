import React, { useState } from "react";
import {
  CssBaseline,
  Button,
  Container,
  Box,
  TextField,
  Typography,
  Paper,
  Grid,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import SalarySlipPreview from "./SalarySlipPreview";

function SalarySlipForm() {
  const [tab, setTab] = useState(1);
  const [employee, setEmployee] = useState({
    name: "",
    id: "",
    email: "",
    designation: "",
    department: "",
    joiningDate: "",
    location: "",
  });

  const [slipInfo, setSlipInfo] = useState({
    number: "PAY00001",
    issueDate: new Date().toISOString().split("T")[0],
    payPeriod: "",
  });

  const [earnings, setEarnings] = useState([
    { type: "Basic Pay", amount: 0 },
    { type: "HRA", amount: 0 },
  ]);

  const [deductions, setDeductions] = useState([
    { type: "PF", amount: 0 },
    { type: "TDS", amount: 0 },
  ]);

  const [notes, setNotes] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const [logoImage, setLogoImage] = useState(null);
  const [signatureImage, setSignatureImage] = useState(null);
  const [signatureRole, setSignatureRole] = useState("Director");

  const grossEarnings = earnings.reduce((acc, e) => acc + Number(e.amount), 0);
  const totalDeductions = deductions.reduce((acc, d) => acc + Number(d.amount), 0);
  const netSalary = grossEarnings - totalDeductions;

  const handleTabChange = (e, newVal) => setTab(newVal);

  const handleImageUpload = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setter(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (setter) => setter(null);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <CssBaseline />
      <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Preview" />
        <Tab label="Edit" />
      </Tabs>

      {tab === 0 ? (
        <SalarySlipPreview
          employee={employee}
          slipInfo={slipInfo}
          earnings={earnings}
          deductions={deductions}
          grossEarnings={grossEarnings}
          totalDeductions={totalDeductions}
          netSalary={netSalary}
          notes={notes}
          logoImage={logoImage}
          signatureName={signatureRole}
          signatureImage={signatureImage}
        />
      ) : (
        <Paper sx={{ p: 3, border: '1px solid transparent', boxShadow: 8, borderRadius: 2 }}>
          <Box mb={3}>
            <Typography variant="h6">Upload Company Logo</Typography>
            {!logoImage ? (
              <Button component="label" variant="outlined" sx={{ border: '1px dashed #999', borderRadius: 2, px: 4, py: 2, fontSize: '0.875rem', color: 'text.secondary' }}>
                + Logo
                <input type="file" hidden accept="image/*" onChange={(e) => handleImageUpload(e, setLogoImage)} />
              </Button>
            ) : (
              <Box position="relative" display="inline-block" sx={{ '&:hover .overlay': { opacity: 1 } }}>
                <img src={logoImage} alt="Logo" style={{ height: 140, border: '1px solid #ccc', borderRadius: 8 }} />
                <Box className="overlay" sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff', borderRadius: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', p: 1, opacity: 0, transition: 'opacity 0.3s' }}>
                  <Button size="small" variant="contained" onClick={() => document.getElementById('logo-input').click()}>Update</Button>
                  <IconButton size="small" onClick={() => handleRemoveImage(setLogoImage)}><Close sx={{ color: '#fff' }} /></IconButton>
                </Box>
                <input id="logo-input" hidden type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setLogoImage)} />
              </Box>
            )}
          </Box>

          <Box mb={3}>
            <Typography variant="h6">Employee Information</Typography>
            <Grid container spacing={2}>
              {Object.keys(employee).map((key) => (
                <Grid item xs={12} sm={6} key={key}>
                  <TextField
                    fullWidth
                    label={key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                    value={employee[key]}
                    onChange={(e) => setEmployee({ ...employee, [key]: e.target.value })}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box mb={3}>
            <Typography variant="h6">Slip Info</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Slip No." value={slipInfo.number} onChange={(e) => setSlipInfo({ ...slipInfo, number: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Issue Date" type="date" value={slipInfo.issueDate} onChange={(e) => setSlipInfo({ ...slipInfo, issueDate: e.target.value })} InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Pay Period" value={slipInfo.payPeriod} onChange={(e) => setSlipInfo({ ...slipInfo, payPeriod: e.target.value })} />
              </Grid>
            </Grid>
          </Box>

          <Box mb={3}>
            <Typography variant="h6">Earnings</Typography>
            {earnings.map((item, index) => (
              <Grid container spacing={2} key={index} mb={1} alignItems="center">
                <Grid item xs={5}>
                  <TextField fullWidth value={item.type} onChange={(e) => {
                    const updated = [...earnings];
                    updated[index].type = e.target.value;
                    setEarnings(updated);
                  }} />
                </Grid>
                <Grid item xs={5}>
                  <TextField fullWidth type="number" value={item.amount} onChange={(e) => {
                    const updated = [...earnings];
                    updated[index].amount = e.target.value;
                    setEarnings(updated);
                  }} />
                </Grid>
                <Grid item xs={2}>
                  {index >= 2 && (
                    <IconButton onClick={() => {
                      const updated = earnings.filter((_, i) => i !== index);
                      setEarnings(updated);
                    }}>
                      <Close />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            ))}
            <Button onClick={() => setEarnings([...earnings, { type: "", amount: 0 }])}>+ Add Earning</Button>
          </Box>

          <Box mb={3}>
            <Typography variant="h6">Deductions</Typography>
            {deductions.map((item, index) => (
              <Grid container spacing={2} key={index} mb={1} alignItems="center">
                <Grid item xs={5}>
                  <TextField fullWidth value={item.type} onChange={(e) => {
                    const updated = [...deductions];
                    updated[index].type = e.target.value;
                    setDeductions(updated);
                  }} />
                </Grid>
                <Grid item xs={5}>
                  <TextField fullWidth type="number" value={item.amount} onChange={(e) => {
                    const updated = [...deductions];
                    updated[index].amount = e.target.value;
                    setDeductions(updated);
                  }} />
                </Grid>
                <Grid item xs={2}>
                  {index >= 2 && (
                    <IconButton onClick={() => {
                      const updated = deductions.filter((_, i) => i !== index);
                      setDeductions(updated);
                    }}>
                      <Close />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            ))}
            <Button onClick={() => setDeductions([...deductions, { type: "", amount: 0 }])}>+ Add Deduction</Button>
          </Box>

          <Box mb={3}>
            <TextField
              label="Notes"
              multiline
              fullWidth
              minRows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Box>

          <Box mb={3}>
            <Typography variant="h6">{signatureRole}{"'s"} Signature</Typography>
            <FormControl sx={{ mb: 2, width: '50%' }}>
              <InputLabel>Role</InputLabel>
              <Select
                value={signatureRole}
                label="Role"
                onChange={(e) => setSignatureRole(e.target.value)}
              >
                <MenuItem value="Director">Director</MenuItem>
                <MenuItem value="CEO">CEO</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Team Manager">Team Manager</MenuItem>
              </Select>
            </FormControl>
            
            <br />

            {!signatureImage ? (
              <Button component="label" variant="outlined">
                + Signature
                <input type="file" hidden accept="image/*" onChange={(e) => handleImageUpload(e, setSignatureImage)} />
              </Button>
            ) : (
              <Box position="relative" display="inline-block" sx={{ '&:hover .overlay': { opacity: 1 } }}>
                <img src={signatureImage} alt="Signature" style={{ height: 100, border: '1px solid #ccc', borderRadius: 8 }} />
                <Box className="overlay" sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff', borderRadius: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', p: 1, opacity: 0, transition: 'opacity 0.3s' }}>
                  <Button size="small" variant="contained" onClick={() => document.getElementById('signature-input').click()}>Update</Button>
                  <IconButton size="small" onClick={() => handleRemoveImage(setSignatureImage)}><Close sx={{ color: '#fff' }} /></IconButton>
                </Box>
                <input id="signature-input" hidden type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setSignatureImage)} />
              </Box>
            )}
          </Box>
        </Paper>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
}

export default SalarySlipForm;

