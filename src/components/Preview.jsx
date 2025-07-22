import React, { useRef } from "react";
import { Box, Typography, Divider, Button } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const currencyFormat = (value, symbol = "₹") => `${symbol}${value.toFixed(2)}`;

const PreviewPage = ({
  from,
  billTo,
  invoiceInfo,
  items,
  subtotal,
  taxAmount,
  discountAmount,
  total,
  currency,
  logoImage,
  signatureImage,
  notes,
}) => {
  const currencySymbol = currency === "INR" ? "₹" : currency === "USD" ? "$" : "€";
  const taxRate = taxAmount > 0 ? `(${((taxAmount / subtotal) * 100).toFixed(0)}%)` : "";

  const previewRef = useRef();

  const handleDownload = async () => {
    const input = previewRef.current;

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pageWidth;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${invoiceInfo.number || "invoice"}.pdf`);
  };

  return (
    <Box>
    
      {/* Printable Content */}
      <Box ref={previewRef} p={4} maxWidth="800px" mx="auto" sx={{ backgroundColor: "#fff", color: "#000", mt: 3, border: '1px solid     lightgray' }}>
        {/* Your existing content... */}
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
          {logoImage && <img src={logoImage} alt="Logo" style={{ height: 160 }} />}
          <Box textAlign="right">
            <Typography variant="h6" fontWeight="bold">{from.businessName}</Typography>
            <Typography>{from.name}</Typography>
            <Typography>{from.address}</Typography>
            <Typography>{from.phone}</Typography>
            <Typography>{from.email}</Typography>
            <Typography>Business Number: {from.businessNumber}</Typography>
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" mb={3}>
          <Box>
            <Typography fontWeight="bold">Bill To:</Typography>
            <Typography>{billTo.name}</Typography>
            <Typography>{billTo.address}</Typography>
            <Typography>{billTo.phone}</Typography>
            <Typography>{billTo.email}</Typography>
          </Box>
          <Box textAlign="right">
            <Typography><strong>Invoice:</strong> {invoiceInfo.number}</Typography>
            <Typography><strong>Date:</strong> {invoiceInfo.date}</Typography>
            <Typography><strong>Terms:</strong> {invoiceInfo.terms}</Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 16 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #000" }}>
              <th align="left">Description</th>
              <th align="right">Rate</th>
              <th align="right">Qty</th>
              <th align="right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: "1px dashed #ccc" }}>
                <td>
                  <strong>{item.description}</strong><br />
                  <small>{item.additionalDetails}</small>
                </td>
                <td align="right">{currencyFormat(item.rate, currencySymbol)}</td>
                <td align="right">{item.qty}</td>
                <td align="right">{currencyFormat(item.qty * item.rate, currencySymbol)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Box textAlign="right" mb={3}>
          <Typography>Subtotal: {currencyFormat(subtotal, currencySymbol)}</Typography>
          <Typography>Tax {taxRate}: {currencyFormat(taxAmount, currencySymbol)}</Typography>
          {discountAmount > 0 && (
            <Typography>Discount: -{currencyFormat(discountAmount, currencySymbol)}</Typography>
          )}
          <Divider sx={{ my: 1 }} />
          <Typography variant="h6">Total: {currencyFormat(total, currencySymbol)}</Typography>
          <Typography fontWeight="bold" fontSize="1.1rem">Balance Due: {currencyFormat(total, currencySymbol)}</Typography>
        </Box>

        {signatureImage && (
          <Box mt={2}>
            <Typography fontWeight="bold">Authorized Signature:</Typography>
            <img src={signatureImage} alt="Signature" style={{ height: 80 }} />
            <Typography variant="caption">Date Signed: {invoiceInfo.date}</Typography>
          </Box>
        )}

        {notes && (
          <Box mt={2}>
            <Typography fontWeight="bold">Notes:</Typography>
            <Typography>{notes}</Typography>
          </Box>
        )}
      </Box>
      <br />
      {/* Download Button */}
      <Box textAlign="right" mb={2}>
            <Button variant="contained" sx={{borderRadius: 2}} onClick={handleDownload}>
            Download PDF
            </Button>
        </Box>

    </Box>

    
  );
};

export default PreviewPage;



// import React, { useRef, useEffect, useState } from "react";
// import { Box, Typography, Divider, Button } from "@mui/material";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import { useParams } from 'react-router-dom';
// import { useInvoiceContext } from './InvoiceContext';

// const currencyFormat = (value, symbol = "₹") => `${symbol}${value.toFixed(2)}`;

// const PreviewPage = () => {
//   const { invoiceId } = useParams();
//   const { invoices } = useInvoiceContext();
//   const previewRef = useRef();
//   const [invoice, setInvoice] = useState(null);

//   useEffect(() => {
//     const found = invoices.find(inv => inv.id === invoiceId);
//     setInvoice(found);
//   }, [invoiceId, invoices]);

//   if (!invoice) {
//     return <Typography variant="h6" textAlign="center" mt={4}>Invoice not found</Typography>;
//   }

//   const { from = {}, billTo = {}, invoiceInfo = {}, items = [], subtotal = 0, taxAmount = 0, discountAmount = 0, total = 0, currency = 'INR', logoImage, signatureImage, notes } = invoice;

//   const currencySymbol = currency === "INR" ? "₹" : currency === "USD" ? "$" : "€";
//   const taxRate = taxAmount > 0 && subtotal > 0 ? `(${((taxAmount / subtotal) * 100).toFixed(0)}%)` : "";

//   const handleDownload = async () => {
//     const input = previewRef.current;
//     const canvas = await html2canvas(input, { scale: 2 });
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", "a4");
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save(`${invoiceInfo.number || "invoice"}.pdf`);
//   };

//   return (
//     <Box>
//       <Box ref={previewRef} p={4} maxWidth="800px" mx="auto" sx={{ backgroundColor: "#fff", color: "#000", mt: 3, border: '1px solid lightgray' }}>
//         <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
//           {logoImage && <img src={logoImage} alt="Logo" style={{ height: 160 }} />}
//           <Box textAlign="right">
//             <Typography variant="h6" fontWeight="bold">{from.businessName}</Typography>
//             <Typography>{from.name}</Typography>
//             <Typography>{from.address}</Typography>
//             <Typography>{from.phone}</Typography>
//             <Typography>{from.email}</Typography>
//             <Typography>Business Number: {from.businessNumber}</Typography>
//           </Box>
//         </Box>

//         <Box display="flex" justifyContent="space-between" mb={3}>
//           <Box>
//             <Typography fontWeight="bold">Bill To:</Typography>
//             <Typography>{billTo.name}</Typography>
//             <Typography>{billTo.address}</Typography>
//             <Typography>{billTo.phone}</Typography>
//             <Typography>{billTo.email}</Typography>
//           </Box>
//           <Box textAlign="right">
//             <Typography><strong>Invoice:</strong> {invoiceInfo.number}</Typography>
//             <Typography><strong>Date:</strong> {invoiceInfo.date}</Typography>
//             <Typography><strong>Terms:</strong> {invoiceInfo.terms}</Typography>
//           </Box>
//         </Box>

//         <Divider sx={{ mb: 2 }} />

//         <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 16 }}>
//           <thead>
//             <tr style={{ borderBottom: "1px solid #000" }}>
//               <th align="left">Description</th>
//               <th align="right">Rate</th>
//               <th align="right">Qty</th>
//               <th align="right">Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((item, idx) => (
//               <tr key={idx} style={{ borderBottom: "1px dashed #ccc" }}>
//                 <td>
//                   <strong>{item.description}</strong><br />
//                   <small>{item.additionalDetails}</small>
//                 </td>
//                 <td align="right">{currencyFormat(item.rate, currencySymbol)}</td>
//                 <td align="right">{item.qty}</td>
//                 <td align="right">{currencyFormat(item.qty * item.rate, currencySymbol)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <Box textAlign="right" mb={3}>
//           <Typography>Subtotal: {currencyFormat(subtotal, currencySymbol)}</Typography>
//           <Typography>Tax {taxRate}: {currencyFormat(taxAmount, currencySymbol)}</Typography>
//           {discountAmount > 0 && (
//             <Typography>Discount: -{currencyFormat(discountAmount, currencySymbol)}</Typography>
//           )}
//           <Divider sx={{ my: 1 }} />
//           <Typography variant="h6">Total: {currencyFormat(total, currencySymbol)}</Typography>
//           <Typography fontWeight="bold" fontSize="1.1rem">Balance Due: {currencyFormat(total, currencySymbol)}</Typography>
//         </Box>

//         {signatureImage && (
//           <Box mt={2}>
//             <Typography fontWeight="bold">Authorized Signature:</Typography>
//             <img src={signatureImage} alt="Signature" style={{ height: 80 }} />
//             <Typography variant="caption">Date Signed: {invoiceInfo.date}</Typography>
//           </Box>
//         )}

//         {notes && (
//           <Box mt={2}>
//             <Typography fontWeight="bold">Notes:</Typography>
//             <Typography>{notes}</Typography>
//           </Box>
//         )}
//       </Box>

//       <Box textAlign="right" mb={2} mt={2}>
//         <Button variant="contained" sx={{ borderRadius: 2 }} onClick={handleDownload}>
//           Download PDF
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default PreviewPage;

