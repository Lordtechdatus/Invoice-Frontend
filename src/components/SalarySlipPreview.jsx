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

  function numberToWords(num) {
    const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    const units = ["", "thousand", "million", "billion"];
  
    if (num === 0) return "zero";
  
    function convertBelowThousand(n) {
      if (n < 20) return ones[n];
      if (n < 100) {
        return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? "-" + ones[n % 10] : "");
      }
      return ones[Math.floor(n / 100)] + " hundred" + (n % 100 !== 0 ? " and " + convertBelowThousand(n % 100) : "");
    }
  
    let words = "";
    let i = 0;
    while (num > 0) {
      if (num % 1000 !== 0) {
        words = convertBelowThousand(num % 1000) + " " + units[i] + " " + words;
      }
      num = Math.floor(num / 1000);
      i++;
    }
    return words.trim();
  }

  return (
    <Box>
      <Box
        ref={previewRef}
        p={4}
        maxWidth="800px"
        mx="auto"
        sx={{ backgroundColor: "#fff", color: "#000", mt: 3, border: "1px solid lightgray" }}
      >
        <Box display="flex" alignItems="flex-start" mb={1}>
          <Typography variant="h5" fontWeight="bold">Salary Slip</Typography>
          {/* {logoImage && <img src={logoImage} alt="Logo" style={{ height: 120 }} />} */}
        </Box>

        {logoImage && <img src={logoImage} alt="Logo" style={{ height: 160 }} />}

        <Box mb={2} mt={2}>
          <Grid container spacing={35}>
            <Grid item xs={6}>
              <Typography><strong>Employee Name:</strong> {employee.Name}</Typography>
              <Typography><strong>Employee ID:</strong> {employee.EmpId}</Typography>
              <Typography><strong>Designation:</strong> {employee.Designation}</Typography>
              <Typography><strong>Department:</strong> {employee.Department}</Typography>
              <Typography><strong>Joining Date:</strong> {employee.JoiningDate}</Typography>
              {/* <Typography><strong>Location:</strong> {employee}</Typography> */}
            </Grid>
            <Grid item xs={6}>
              {/* <Typography><strong>Slip No:</strong> {slipInfo.number}</Typography> */}
              <Typography><strong>Issue Date:</strong> {slipInfo.issueDate}</Typography>
              <Typography><strong>Pay Period:</strong> {employee.PayPeriod}</Typography>
              <Typography><strong>Paid Days:</strong> {employee.PaidDays}</Typography>
              <Typography><strong>LOP Days:</strong> {employee.LossOfPayDays}</Typography>
              {/* <Typography><strong>Email:</strong> {employee.email}</Typography> */}
              
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
          <Typography><strong>Net Salary in words:</strong> {numberToWords(parseInt(netSalary)).charAt(0).toUpperCase() + numberToWords(parseInt(netSalary)).slice(1)} Rupees </Typography>
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

      <Box textAlign="center" mt={2}>
        <Button variant="contained" sx={{ borderRadius: 2 }} onClick={handleDownload}>
          Download PDF
        </Button>
      </Box>
    </Box>
  );
};

export default SalarySlipPreview;

