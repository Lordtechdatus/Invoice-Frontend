import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
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
import { useSalarySlipContext } from "./SalarySlipContext";

function formatSlipNo(n) {
  return `PAY${String(n).padStart(5, "0")}`;
}

function findMaxSlipNoFromSaved() {
  try {
    const raw = localStorage.getItem("salarySlips");
    if (!raw) return 0;
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return 0;
    let maxNum = 0;
    for (const item of arr) {
      const candidate = item?.slipNo || item?.number || "";
      const m = typeof candidate === "string" && candidate.match(/^PAY(\d{1,})$/);
      if (m) {
        const num = parseInt(m[1], 10);
        if (!Number.isNaN(num)) maxNum = Math.max(maxNum, num);
      }
    }
    return maxNum;
  } catch {
    return 0;
  }
}

function SalarySlipForm() {
  const navigate = useNavigate();
  const { addSlip } = useSalarySlipContext();
  const [tab, setTab] = useState(1);
  const [employee, setEmployee] = useState({
    Name: "",
    EmpId: "",
    Designation: "",
    Department: "",
    JoiningDate: "",
    PayPeriod: "",
    PaidDays: "",
    LossOfPayDays: "",
    PayDate: "",
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

  const grossEarnings = earnings.reduce((acc, e) => acc + Number(e.amount || 0), 0);
  const totalDeductions = deductions.reduce((acc, d) => acc + Number(d.amount || 0), 0);
  const netSalary = grossEarnings - totalDeductions;

  useEffect(() => {
    let nextNum = 1;
    try {
      const stored = localStorage.getItem("next_slip_no");
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!Number.isNaN(parsed) && parsed >= 1) {
          nextNum = parsed;
        }
      } else {
        const maxFromSaved = findMaxSlipNoFromSaved();
        nextNum = maxFromSaved > 0 ? maxFromSaved + 1 : 1;
        localStorage.setItem("next_slip_no", String(nextNum));
      }
    } catch {
      nextNum = 1;
      localStorage.setItem("next_slip_no", "1");
    }
    setSlipInfo((prev) => ({ ...prev, number: formatSlipNo(nextNum) }));
  }, []);

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

  const handleSaveSlip = () => {
    try {
      const slipToSave = {
        slipNo: slipInfo.number,
        issueDate: slipInfo.issueDate,
        payPeriod: slipInfo.payPeriod,
        employee,
        earnings,
        deductions,
        grossEarnings,
        totalDeductions,
        netSalary,
        notes,
        logoImage,
        signatureRole,
        signatureImage,
        createdAt: new Date().toISOString(),
      };

      const listRow = {
        id: slipInfo.number,
        employee: employee.Name || "-",
        date: slipInfo.issueDate,
        netPay: Number(netSalary) || 0,
        status: "pending",
      };
      addSlip(listRow);
      // addSlip(slipToSave);

      const raw = localStorage.getItem("salarySlips");
      const list = raw ? JSON.parse(raw) : [];
      const idx = Array.isArray(list) ? list.findIndex((s) => (s.slipNo || s.number) === slipInfo.number) : -1;

      if (idx >= 0) {
        list[idx] = { ...list[idx], ...slipToSave, updatedAt: new Date().toISOString() };
      } else {
        list.push(slipToSave);
      }

      localStorage.setItem("salarySlips", JSON.stringify(list));

      const current = parseInt(localStorage.getItem("next_slip_no") || "1", 10);
      const nextVal = Number.isNaN(current) ? 2 : current + 1;
      localStorage.setItem("next_slip_no", String(nextVal));
      setSlipInfo((prev) => ({ ...prev, number: formatSlipNo(nextVal) }));

      setSnackbar({ open: true, message: "Slip saved successfully!", severity: "success" });
      navigate("/salary-slips");
    } catch {
      setSnackbar({ open: true, message: "Failed to save slip.", severity: "error" });
    }
  };

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

          <Box display="flex" gap={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={() => setTab(0)}>
              Preview
            </Button>
            <Button variant="contained" onClick={handleSaveSlip}>
              Save Slip
            </Button>
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