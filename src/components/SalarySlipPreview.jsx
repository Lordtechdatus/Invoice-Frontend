import React, { useRef } from "react";
import { Box, Typography, Divider, Button, Grid } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const SalarySlipPreview = ({
  employee,
  slipInfo,
  earnings,
  deductions,
  grossEarnings,
  totalDeductions,
  netSalary,
  notes,
  logoImage,
  signatureName,
  signatureImage,
}) => {
  const previewRef = useRef();

  const handleDownload = async () => {
    const canvas = await html2canvas(previewRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${slipInfo.number || "salary-slip"}.pdf`);
  };

  const formatCurrency = (val) => `₹${parseFloat(val).toFixed(2)}`;

  return (
    <Box>
      <Box
        ref={previewRef}
        p={4}
        maxWidth="800px"
        mx="auto"
        sx={{ backgroundColor: "#fff", color: "#000", mt: 3, border: "1px solid lightgray" }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
          <Typography variant="h5" fontWeight="bold">Salary Slip</Typography>
          {logoImage && <img src={logoImage} alt="Logo" style={{ height: 120 }} />}
        </Box>

        <Box mb={2}>
          <Grid container spacing={35}>
            <Grid item xs={6}>
              <Typography><strong>Employee Name:</strong> {employee.name}</Typography>
              <Typography><strong>Employee ID:</strong> {employee.id}</Typography>
              <Typography><strong>Designation:</strong> {employee.designation}</Typography>
              <Typography><strong>Department:</strong> {employee.department}</Typography>
              <Typography><strong>Location:</strong> {employee.location}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Slip No:</strong> {slipInfo.number}</Typography>
              <Typography><strong>Issue Date:</strong> {slipInfo.issueDate}</Typography>
              <Typography><strong>Pay Period:</strong> {slipInfo.payPeriod}</Typography>
              <Typography><strong>Email:</strong> {employee.email}</Typography>
              <Typography><strong>Joining Date:</strong> {employee.joiningDate}</Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" fontWeight="bold" borderBottom="1px solid #000">Earnings</Typography>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 16 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #000" }}> 
              <th align="left">Type</th>
              <th align="right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {earnings.map((e, idx) => (
              <tr key={idx}>
                <td>{e.type}</td>
                <td align="right">{formatCurrency(e.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" fontWeight="bold" borderBottom="1px solid #000">Deductions</Typography>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 16 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #000" }}>
              <th align="left">Type</th>
              <th align="right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {deductions.map((d, idx) => (
              <tr key={idx}>
                <td>{d.type}</td>
                <td align="right">{formatCurrency(d.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Divider sx={{ my: 2 }} />

        <Box textAlign="right">
          <Typography><strong>Gross Earnings:</strong> {formatCurrency(grossEarnings)}</Typography>
          <Typography><strong>Total Deductions:</strong> {formatCurrency(totalDeductions)}</Typography>
          <Typography variant="h6"><strong>Net Salary:</strong> {formatCurrency(netSalary)}</Typography>
        </Box>

        {notes && (
          <Box mt={2}>
            <Typography fontWeight="bold">Notes:</Typography>
            <Typography>{notes}</Typography>
          </Box>
        )}

        {signatureImage && (
          <Box mt={4}>
            <Typography fontWeight="bold">{signatureName}{"'s"} Signature:</Typography>
            <img src={signatureImage} alt="Signature" style={{ height: 80 }} />
          </Box>
        )}
      </Box>

      <Box textAlign="right" mt={2}>
        <Button variant="contained" sx={{ borderRadius: 2 }} onClick={handleDownload}>
          Download PDF
        </Button>
      </Box>
    </Box>
  );
};

export default SalarySlipPreview;

