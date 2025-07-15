import React, { useRef, useState, useEffect } from "react";
import { ChromePicker } from 'react-color';
import SignatureCanvas from 'react-signature-canvas';
import {
  CssBaseline,
  Switch,
  createTheme,
  ThemeProvider,
  Typography,
  Button,
  Container,
  Box,
  TextField,
  Grid,
  Paper,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
  Select,
  Menu,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  Divider,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./index.css";
import Header from "./Header";

const currencyList = [
  { code: "INR", symbol: "₹", label: "Indian Rupee", flag: "🇮🇳" },
  { code: "USD", symbol: "$", label: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", label: "Euro", flag: "🇪🇺" },
];

const colorThemes = [
  "#000000",
  "#4b4b4b",
  "#797979",
  "#c8232a",
  "#e6007e",
  "#a600e6",
  "#4b00e6",
  "#0077e6",
  "#00aad4",
  "#7cbb00",
  "#cbdc00",
  "#701e00",
];

function InvoiceForm() {
    const sigPadRef = useRef(null);
    const [tab, setTab] = useState(0);
    const [showSignaturePad, setShowSignaturePad] = useState(false);
    
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [darkMode, setDarkMode] = useState(false);

    //Theme
    const theme = createTheme({
      palette: {
        mode: darkMode ? "dark" : "light",
      },
    });
  
    // From section state
    const [from, setFrom] = useState({
      businessName: "",
      email: "",
      address: "",
      phone: "",
      businessNumber: "",
      additionalDetailsVisible: false,
      additionalDetails: "",
    });
  
    // Bill To section state
    const [billTo, setBillTo] = useState({
      name: "",
      email: "",
      address: "",
      phone: "",
      mobile: "",
      fax: "",
    });
  
    // Invoice info
    const [invoiceInfo, setInvoiceInfo] = useState({
      number: "INV0001",
      date: new Date().toLocaleDateString('en-GB'), 
      terms: "On Receipt",
    });
  
    // Items array state for invoice lines
    const [items, setItems] = useState([
      {
        description: "Item Description",
        additionalDetails: "",
        rate: 0,
        qty: 1,
        tax: true,
      },
    ]);
  
    const [notes, setNotes] = useState("Notes - any relevant information not covered, additional terms and conditions");

    // Signature and photo
    const [signatureImage, setSignatureImage] = useState(null);
    const [photoImage, setPhotoImage] = useState(null);
    const [logoImage, setLogoImage] = useState(null);

    // Discount value input
    const [discountValue, setDiscountValue] = useState(0);

  
    // Template color theme
    const [selectedColor, setSelectedColor] = useState(colorThemes[0]);
    const [showColorPicker, setShowColorPicker] = useState(false);
  
    // Tax and discount settings
    const [tax, setTax] = useState({
      type: "Per Item",
      label: "Tax",
      inclusive: false,
    });
  
    const [discount, setDiscount] = useState({
      type: "None",
    });
  
    // Currency
    const [currency, setCurrency] = useState(currencyList[0].code);
  
    // Email input for preview
    const [previewEmail, setPreviewEmail] = useState("");
  
    // Snackbar state for notifications
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  
    // Handlers for basic inputs
    const handleFromChange = (field) => (e) => setFrom((prev) => ({ ...prev, [field]: e.target.value }));
    const handleBillToChange = (field) => (e) => setBillTo((prev) => ({ ...prev, [field]: e.target.value }));
    const handleInvoiceInfoChange = (field) => (e) =>
      setInvoiceInfo((prev) => ({ ...prev, [field]: e.target.value }));
    
    const handleImageUpload = (e, setImage) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => setImage(reader.result);
          reader.readAsDataURL(file);
        }
      };

    const saveSignatureFromPad = () => {
      if (!sigPadRef.current) return;
      
      try {
        const isEmpty = sigPadRef.current.isEmpty();
        if (isEmpty) {
          alert("Please draw a signature before saving.");
          return;
        }
      
        const dataUrl = sigPadRef.current.getTrimmedCanvas().toDataURL('image/png');
        setSignatureImage(dataUrl);
        setShowSignaturePad(false);
      } catch (err) {
        console.error("Error saving signature:", err);
      }
    };
      

    const clearSignaturePad = () => {
      sigPadRef.current?.clear();
    };

    const removeSignature = () => {
      setSignatureImage(null);
    };
  
    const handleLogoUpload = (event, setLogoImage) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setLogoImage(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };

    const handleLogoClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
      
    const handleClose = () => {
      setAnchorEl(null);
    };
      
    const handleDeleteLogo = () => {
      setLogoImage(null);
      setAnchorEl(null);
    };
      
    const handleUpdateLogo = () => {
      document.getElementById("logo-input").click();
      setAnchorEl(null);
    };
      
  
    const handleItemChange = (index, field) => (e) => {
      const value = field === "tax" ? e.target.checked : e.target.value;
      setItems((prev) =>
        prev.map((item, i) => (i === index ? { ...item, [field]: field === "rate" || field === "qty" ? Number(value) : value } : item))
      );
    };
  
    const handleAddItem = () => setItems((prev) => [...prev, { description: "", additionalDetails: "", rate: 0, qty: 1, tax: true }]);
    const handleRemoveItem = (index) => {
      if (items.length === 1) return;
      setItems((prev) => prev.filter((_, i) => i !== index));
    };

    const handleCloseInvoice = () => {
        setSnackbar({ open: true, message: "Invoice closed.", severity: "info" });
      };
      
    const handleDeleteInvoice = () => {
        if (window.confirm("Are you sure you want to delete this invoice?")) {
          setLogoImage(null);
          setFrom({
            name: "",
            email: "",
            address: "",
            phone: "",
            businessNumber: "",
            additionalDetailsVisible: false,
            additionalDetails: "",
          });
          setBillTo({
            name: "",
            email: "",
            address: "",
            phone: "",
            mobile: "",
            fax: "",
          });
          setInvoiceInfo({
            number: "",
            date: new Date().toISOString().split("T")[0],
            terms: "On Receipt",
          });
          setItems([{ description: "", additionalDetails: "", rate: 0, qty: 1, tax: true }]);
          setNotes("");
          setSignatureImage(null);
          setPhotoImage(null);
          setSnackbar({ open: true, message: "Invoice deleted.", severity: "warning" });
        }
      };
      
  
    // Calculations
    const subtotal = items.reduce((acc, item) => acc + item.rate * item.qty, 0);
    const taxAmount = tax.type.toLowerCase() === "none" ? 0 : items.reduce((acc, item) => acc + (item.tax ? item.rate * item.qty * 0.1 : 0), 0);
  
    // For now discount not implemented in calculation since type none
    const discountAmount =
    discount.type === "Percentage"
      ? (subtotal * discountValue) / 100
      : discount.type === "Fixed"
      ? discountValue
      : 0;
  
    const total = subtotal + taxAmount - discountAmount;
  
  
    // Handlers for UI
    const handleTabChange = (event, newValue) => setTab(newValue);
  
    // Color theme handling - sets the CSS variable --theme-color
    useEffect(() => {
      document.documentElement.style.setProperty("--theme-color", selectedColor);
    }, [selectedColor]);
  
    // Sending preview email mockup
    const handleSendEmail = () => {
      if (!previewEmail || !previewEmail.includes("@")) {
        setSnackbar({ open: true, message: "Please enter a valid email.", severity: "error" });
        return;
      }
      setSnackbar({ open: true, message: `Invoice preview sent to ${previewEmail}`, severity: "success" });
    };
  
    // Currency symbol from currency code
    const currencySymbol = currencyList.find((c) => c.code === currency)?.symbol || "";
  
    return (
      <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Container maxWidth="lg" sx={{ mb: 5 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Invoice Builder</Typography>
            <FormControlLabel
              control={<Switch checked={darkMode} onChange={() => setDarkMode((prev) => !prev)} />}
              label="Dark Mode"
            />
            </Box>
          <Paper elevation={3} sx={{ p: 3 }}>
              {/* Responsive Tabs */}
              <Tabs
                value={tab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                sx={{ mb: 3 }}
              >
                <Tab label="Preview" />
                <Tab label="Edit" />
                <Tab label="Payment scheduling" />
                <Tab label="PDF" />
                <Tab label="Email Invoice" />
              </Tabs>
    
              {/* Invoice Form Grid */}
              <Box
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                gap={3}
               >
                {/* Left Main Form */}
                <Box flex={2} sx={{ minWidth: 0 }}>
                  <Paper variant="outlined" sx={{ p: 2,    mb: 3 }}>
                    <Box
                      sx={{
                        height: '4px',
                        width: '100%',
                        backgroundColor: selectedColor,
                        borderRadius: '4px 4px 0 0',
                        mb: 2,
                      }}
                    />

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom>
                        Invoice
                      </Typography>
                      {!logoImage ? (
                        <Button
                          component="label"
                          variant="outlined"
                          startIcon={<Add />}
                          sx={{
                            border: '1px dashed #999',
                            borderRadius: 2,
                            px: 4,
                            py: 1,
                            fontSize: '0.875rem',
                            color: 'text.secondary',
                          }}
                        >
                          + Logo
                          <input
                            id="logo-input"
                            hidden
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleLogoUpload(e, setLogoImage)}
                          />
                        </Button>
                      ) : (
                        <>
                          <Button
                            onClick={handleLogoClick}
                            sx={{ p: 0, border: '1px solid #ccc', borderRadius: 2 }}
                          >
                            <img
                              src={logoImage}
                              alt="Logo"
                              style={{ maxHeight: 200, maxWidth: '100%', borderRadius: 8 }}
                            />
                          </Button>
                          <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                          >
                            <MenuItem onClick={handleUpdateLogo}>Update Logo</MenuItem>
                            <MenuItem onClick={handleDeleteLogo}>Delete Logo</MenuItem>
                          </Menu>
                          <input
                            id="logo-input"
                            hidden
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleLogoUpload(e, setLogoImage)}
                          />
                        </>
                      )}
                    </Box>

                      {/* From and Bill To */}
                      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4} sx={{ mb: 3 }}>
                        <Box flex={1} minWidth={0}>
                          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            From
                          </Typography>
                          <TextField fullWidth label="Business Name" value={from.name} onChange={handleFromChange("name")} variant="outlined" margin="dense" />
                          <TextField fullWidth label="Email" value={from.email} onChange={handleFromChange("email")} variant="outlined" margin="dense" />
                          <TextField fullWidth label="Address" value={from.address} onChange={handleFromChange("address")} variant="outlined" margin="dense" />
                          <TextField fullWidth label="Phone" value={from.phone} onChange={handleFromChange("phone")} variant="outlined" margin="dense" />
                          <TextField fullWidth label="Business Number" value={from.businessNumber} onChange={handleFromChange("businessNumber")} variant="outlined" margin="dense" />
                          <Button size="small" sx={{ mt: 0.5, mb: 1 }} onClick={() => setFrom((prev) => ({ ...prev, additionalDetailsVisible: !prev.additionalDetailsVisible }))}>
                            {from.additionalDetailsVisible ? "Hide" : "Show"} additional business details
                          </Button>
                          {from.additionalDetailsVisible && (
                            <TextField fullWidth label="Additional details" multiline rows={2} value={from.additionalDetails} onChange={handleFromChange("additionalDetails")} variant="outlined" />
                          )}
                        </Box>

                        <Box flex={1} minWidth={0}> 
                          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Bill To
                          </Typography>
                          <TextField fullWidth label="Client Name" value={billTo.name} onChange={handleBillToChange("name")} variant="outlined" margin="dense" />
                          <TextField fullWidth label="Email" value={billTo.email} onChange={handleBillToChange("email")} variant="outlined" margin="dense" />
                          <TextField fullWidth label="Address" value={billTo.address} onChange={handleBillToChange("address")} variant="outlined" margin="dense" />
                          <TextField fullWidth label="Phone" value={billTo.phone} onChange={handleBillToChange("phone")} variant="outlined" margin="dense" />
                          <TextField fullWidth label="Mobile" value={billTo.mobile} onChange={handleBillToChange("mobile")} variant="outlined" margin="dense" />
                          <TextField fullWidth label="Fax" value={billTo.fax} onChange={handleBillToChange("fax")} variant="outlined" margin="dense" />
                        </Box>
                      </Box>
      
                      {/* Number, Date, Terms */}
                      <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            label="Number"
                            variant="outlined"
                            value={invoiceInfo.number}
                            onChange={handleInvoiceInfoChange("number")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            label="Date"
                            type="date"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            value={invoiceInfo.date}
                            onChange={handleInvoiceInfoChange("date")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <FormControl fullWidth>
                            <InputLabel id="terms-label">Terms</InputLabel>
                            <Select
                              labelId="terms-label"
                              label="Terms"
                              value={invoiceInfo.terms}
                              onChange={handleInvoiceInfoChange("terms")}
                            >
                              <MenuItem value="On Receipt">On Receipt</MenuItem>
                              <MenuItem value="Net 15">Net 15</MenuItem>
                              <MenuItem value="Net 30">Net 30</MenuItem>
                              <MenuItem value="Net 60">Net 60</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
      
                      {/* Table Headers */}
                      <Grid container sx={{ borderBottom: "1px solid #ccc", pb: 1, justifyContent: "space-evenly" }}>
                        <Grid item xs={5} sx={{ fontWeight: "bold" }}>
                          DESCRIPTION
                        </Grid>
                        <Grid item xs={2} sx={{ fontWeight: "bold" }} textAlign="center">
                          RATE
                        </Grid>
                        <Grid item xs={1} sx={{ fontWeight: "bold" }} textAlign="center">
                          QTY
                        </Grid>
                        <Grid item xs={2} sx={{ fontWeight: "bold" }} textAlign="right">
                          AMOUNT
                        </Grid>
                        <Grid item xs={1} sx={{ fontWeight: "bold" }} textAlign="center">
                          TAX
                        </Grid>
                        <Grid item xs={1} />
                      </Grid>
      
                      {/* Invoice items rows */}
                      {items.map((item, index) => (
                        <Grid
                          container
                          spacing={1}
                          key={index}
                          alignItems="center"
                          sx={{ borderBottom: "1px solid #eee", py: 1 }}
                        >
                          <Grid item xs={5}>
                            <TextField
                              fullWidth
                              variant="standard"
                              placeholder="Item Description"
                              value={item.description}
                              onChange={handleItemChange(index, "description")}
                            />
                            <TextField
                              fullWidth
                              variant="standard"
                              placeholder="Additional details"
                              multiline
                              minRows={1}
                              maxRows={3}
                              value={item.additionalDetails}
                              onChange={handleItemChange(index, "additionalDetails")}
                              sx={{ mt: 0.5 }}
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <TextField
                              type="number"
                              variant="standard"
                              inputProps={{ min: 0, step: "0.01" }}
                              value={item.rate}
                              onChange={handleItemChange(index, "rate")}
                              InputProps={{
                                startAdornment: <InputAdornment position="start">{currencySymbol}</InputAdornment>,
                              }}
                            />
                          </Grid>
                          <Grid item xs={1}>
                            <TextField
                              type="number"
                              variant="standard"
                              inputProps={{ min: 1, step: "1" }}
                              value={item.qty}
                              onChange={handleItemChange(index, "qty")}
                            />
                          </Grid>
                          <Grid item xs={2} textAlign="right" sx={{ pt: 1 }}>
                            {currencySymbol}
                            {(item.rate * item.qty).toFixed(2)}
                          </Grid>
                          <Grid item xs={1} textAlign="center">
                            <Checkbox
                              checked={item.tax}
                              onChange={handleItemChange(index, "tax")}
                              inputProps={{ "aria-label": "Tax included for this item" }}
                            />
                          </Grid>
                          <Grid item xs={1} textAlign="center">
                            <IconButton
                              aria-label="Remove item"
                              size="small"
                              onClick={() => handleRemoveItem(index)}
                              disabled={items.length === 1}
                            >
                              <Remove fontSize="small" />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))}
      
                      <Box mt={1}>
                        <Button startIcon={<Add />} onClick={handleAddItem}>
                          Add Item
                        </Button>
                      </Box>
      
                      {/* Totals */}
                      <Box mt={3} sx={{ textAlign: "right", pr: 2 }}>
                        <Typography>
                          Subtotal: {currencySymbol}
                          {subtotal.toFixed(2)}
                        </Typography>
                        <Typography>
                          Tax: {currencySymbol}
                          {taxAmount.toFixed(2)}
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="h6">
                          Total: {currencySymbol}
                          {total.toFixed(2)}
                        </Typography>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 0.5 }}>
                          Balance Due: {currencySymbol}
                          {total.toFixed(2)}
                        </Typography>
                      </Box>
      
                      {/* Notes */}
                      <Box mt={3}>
                        <TextField
                          label="Notes"
                          multiline
                          fullWidth
                          minRows={3}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          variant="outlined"
                        />
                      </Box>
      
                      {/* Signature and Photos placeholders */}
                      <Box mt={3} display="flex" alignItems="center" gap={2} flexWrap="wrap">
                        <Button
                          variant="outlined"
                          startIcon={<Add />}
                          onClick={() => setShowSignaturePad(true)}
                        >
                          Draw Signature
                        </Button>

                        <Button component="label" variant="outlined" startIcon={<Add />}>
                          Upload Signature
                          <input
                            hidden
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, setSignatureImage)}
                          />
                        </Button>

                        <Button component="label" variant="outlined" startIcon={<Add />}>
                          Add Photo
                          <input
                            hidden
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, setPhotoImage)}
                          />
                        </Button>
                      </Box>

                      {showSignaturePad && (
                        <Box mt={2}>
                          <Typography variant="subtitle2">Draw your signature:</Typography>
                          <SignatureCanvas
                            penColor="black"
                            canvasProps={{
                              width: 400,
                              height: 150,
                              className: 'sigCanvas',
                              style: { border: '1px solid #ccc', borderRadius: 4 }
                            }}
                            ref={sigPadRef}
                          />
                          <Box mt={1} display="flex" gap={2}>
                            <Button variant="outlined" onClick={clearSignaturePad}>Clear</Button>
                            <Button variant="contained" onClick={saveSignatureFromPad}>Save</Button>
                          </Box>
                        </Box>
                      )}

                      {signatureImage && (
                        <Box mt={2}>
                          <Typography variant="subtitle2">Signature:</Typography>
                          <Box display="flex" alignItems="center" gap={2}>
                            <img src={signatureImage} alt="Signature" style={{ maxHeight: 100, border: '1px solid #ddd', borderRadius: 4 }} />
                            <Button size="small" variant="outlined" onClick={removeSignature}>Remove</Button>
                          </Box>
                        </Box>
                      )}

                      {photoImage && (
                        <Box mt={2}>
                          <Typography variant="subtitle2">Photo:</Typography>
                          <img src={photoImage} alt="Photo" style={{ maxHeight: 100, border: '1px solid #ddd', borderRadius: 4 }} />
                        </Box>
                      )}
                  </Paper>

    
                  {/* Bottom Buttons */}
                  <Box display="flex" justifyContent="space-evenly" mt={2}>
                      <Button variant="outlined" color="primary" onClick={handleCloseInvoice}>
                          Close Invoice
                      </Button>
                      <Button variant="outlined" color="error" onClick={handleDeleteInvoice}>
                          Delete Invoice
                      </Button>
                  </Box>
                </Box>
              

    
                {/* Right Sidebar */}
                <Box flex={1} sx={{ minWidth: 0 }}>
                  <Paper variant="outlined" sx={{ p: 3 }}>
                    {/* Preview via Email */}
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
                      PREVIEW VIA EMAIL
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="name@business.com"
                      value={previewEmail}
                      onChange={(e) => setPreviewEmail(e.target.value)}/>
                    <Button fullWidth sx={{ mt: 1, mb: 2 }} variant="contained" onClick={handleSendEmail}>
                      Send
                    </Button>
    
                    {/* Template Colors */}
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
                      TEMPLATE
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                      {colorThemes.map((color) => (
                        <Box
                          key={color}
                          sx={{
                            width: 30,
                            height: 30,
                            bgcolor: color,
                            borderRadius: 1,
                            border: selectedColor === color ? "3px solid var(--mui-palette-primary-main)" : "1px solid #ccc",
                            cursor: "pointer",
                          }}
                          onClick={() => setSelectedColor(color)}
                          title={`Select color: ${color}`}
                        />
                      ))}
                    </Box>

                    <Button
                      variant="outlined"
                      sx={{ mb: 1 }}
                      onClick={() => setShowColorPicker((prev) => !prev)}
                    >
                      {showColorPicker ? 'Close Picker' : 'Customize'}
                    </Button>

                    {showColorPicker && (
                      <ChromePicker
                        color={selectedColor}
                        onChangeComplete={(color) => setSelectedColor(color.hex)}
                        disableAlpha
                        styles={{ default: { picker: { width: '25%' } } }}
                      />
                    )}
    
                    {/* Tax Section */}
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
                      TAX
                    </Typography>
                    <FormControl fullWidth size="small" sx={{ mb: 1 }}>
                      <InputLabel id="tax-type-label">Type</InputLabel>
                      <Select
                        labelId="tax-type-label"
                        label="Type"
                        value={tax.type}
                        onChange={(e) =>
                          setTax((prev) => ({
                            ...prev,
                            type: e.target.value,
                          }))
                        }
                      >
                        <MenuItem value="Per Item">Per Item</MenuItem>
                        <MenuItem value="None">None</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      label="Label"
                      size="small"
                      variant="outlined"
                      value={tax.label}
                      onChange={(e) => setTax((prev) => ({ ...prev, label: e.target.value }))}
                      sx={{ mb: 1 }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={tax.inclusive}
                          onChange={(e) => setTax((prev) => ({ ...prev, inclusive: e.target.checked }))}
                        />
                      }
                      label="Inclusive?"
                      sx={{ mb: 2 }}
                    />
    
                    {/* Discount Section */}
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
                      DISCOUNT
                    </Typography>
                    <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                      <InputLabel id="discount-type-label">Type</InputLabel>
                      <Select
                        labelId="discount-type-label"
                        label="Type"
                        value={discount.type}
                        onChange={(e) => setDiscount({ type: e.target.value })}
                      >
                        <MenuItem value="None">None</MenuItem>
                        <MenuItem value="Percentage">Percentage</MenuItem>
                        <MenuItem value="Fixed">Fixed</MenuItem>

                        {discount.type !== "None" && (
                          <TextField
                              fullWidth
                              size="small"
                              type="number"
                              label={discount.type === "Percentage" ? "Percentage (%)" : "Fixed Amount"}
                              value={discountValue}
                              onChange={(e) => setDiscountValue(Number(e.target.value))}
                              sx={{ mb: 3 }}
                          />
                          )}

                      </Select>
                    </FormControl>
    
                    {/* Currency */}
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
                      CURRENCY
                    </Typography>
                    <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                      <InputLabel id="currency-label">Currency</InputLabel>
                      <Select
                        labelId="currency-label"
                        label="Currency"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                      >
                        {currencyList.map((c) => (
                          <MenuItem key={c.code} value={c.code}>
                            {c.code} {c.flag} ({c.label})
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
    
                    {/* Options */}
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
                      OPTIONS
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ mb: 1, width: '250px' }}
                      onClick={() => {
                        const fakeLink = `${window.location.origin}/invoice/INV0001`;
                        navigator.clipboard.writeText(fakeLink);
                        setSnackbar({ open: true, message: "Link copied to clipboard!", severity: "success" });
                      }}
                    >
                      Get Link
                    </Button>
                    <br/>

                    <Button
                      variant="outlined"
                      sx={{ width: '250px' }}
                      onClick={() => window.print()}
                    >
                      Print Invoice
                    </Button>

                </Paper>
              </Box>
            </Box>
            </Paper>
          </Container>
    
          {/* Snackbar for notifications */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={() => setSnackbar({ open: false, message: "", severity: "info" })}
          >
            <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </ThemeProvider>
      </>
    );
}

export default InvoiceForm;