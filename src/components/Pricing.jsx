import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Fade,
  Grow,
  Avatar,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { styled, keyframes } from "@mui/system";
import { useNavigate } from "react-router-dom";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import StarIcon from "@mui/icons-material/Star";

const plans = {
  monthly: [
    {
      name: "Starter",
      price: "$0",
      period: "/mo",
      features: [
        "1 Invoice Template",
        "Basic Support",
        "Download as PDF",
        "Watermark on Invoice",
      ],
      button: "Get Started",
      highlight: false,
    },
    {
      name: "Pro",
      price: "$12",
      period: "/mo",
      features: [
        "Unlimited Invoices",
        "Custom Branding",
        "Priority Support",
        "No Watermark",
        "Export to Excel",
      ],
      button: "Upgrade Now",
      highlight: true,
    },
    {
      name: "Business",
      price: "$29",
      period: "/mo",
      features: [
        "All Pro Features",
        "Multi-user Access",
        "Advanced Reports",
        "API Access",
        "Dedicated Support",
      ],
      button: "Contact Sales",
      highlight: false,
    },
  ],
  yearly: [
    {
      name: "Starter",
      price: "$0",
      period: "/yr",
      features: [
        "1 Invoice Template",
        "Basic Support",
        "Download as PDF",
        "Watermark on Invoice",
      ],
      button: "Get Started",
      highlight: false,
    },
    {
      name: "Pro",
      price: "$115",
      period: "/yr",
      features: [
        "Unlimited Invoices",
        "Custom Branding",
        "Priority Support",
        "No Watermark",
        "Export to Excel",
        "Save 20% vs monthly!",
      ],
      button: "Upgrade Now",
      highlight: true,
    },
    {
      name: "Business",
      price: "$275",
      period: "/yr",
      features: [
        "All Pro Features",
        "Multi-user Access",
        "Advanced Reports",
        "API Access",
        "Dedicated Support",
        "Save 20% vs monthly!",
      ],
      button: "Contact Sales",
      highlight: false,
    },
  ],
};

const testimonials = [
  {
    name: "Sarah Lee",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    comment:
      "LordInvoice made my freelance billing so much easier. The Pro plan is worth every penny!",
    company: "Freelance Designer",
  },
  {
    name: "James Smith",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    comment:
      "The yearly Business plan saved us money and gave our team the tools we needed to scale.",
    company: "Startup Founder",
  },
  {
    name: "Priya Patel",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    comment:
      "Beautiful invoices, easy to use, and great support. Highly recommend!",
    company: "Small Business Owner",
  },
];

const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const AnimatedPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "highlight",
})(({ theme, highlight }) => ({
  borderRadius: 24,
  padding: theme.spacing(4, 3),
  boxShadow: highlight
    ? "0 8px 32px 0 rgba(33,150,243,0.25)"
    : theme.shadow[2],
  border: highlight ? `2px solid ${theme.palette.primary.main}` : "none",
  background: highlight
    ? "linear-gradient(135deg, #e3f2fd 0%, #fff 100%)"
    : "#fff",
  position: "relative",
  animation: highlight ? `${float} 3s ease-in-out infinite` : "none",
  transition: "box-shadow 0.3s, border 0.3s",
  zIndex: highlight ? 2 : 1,
}));

const TestimonialCard = styled(Paper)(({ theme }) => ({
  boxShadow: "0 4px 24px 0 rgba(33,150,243,0.10)",
  border: `1.5px solid ${theme.palette.primary.light}`,
  background: "rgba(255,255,255,0.98)",
  minHeight: 220,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  transition: "box-shadow 0.3s, border 0.3s, background 0.3s",
  "&:hover": {
    boxShadow: "0 8px 32px 0 rgba(33,150,243,0.18)",
    border: `2px solid ${theme.palette.primary.main}`,
    background: "#f0f7ff",
  },
}));

const Pricing = () => {
  const [type, setType] = useState("monthly");
  const nav = useNavigate();

  const handleType = (_, t) => {
    if (t === "monthly" || t === "yearly") {
      setType(t);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #f5f5f5 0%, #e3f2fd 100%)",
        py: { xs: 6, md: 10 },
        px: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Fade in timeout={900}>
        <Typography
          variant="h2"
          fontWeight="bold"
          color="primary.main"
          gutterBottom
          align="center"
        >
          Pricing
        </Typography>
      </Fade>
      <Fade in timeout={1500}>
        <Typography variant="h6" color="text.secondary" align="center" mb={6}>
          Choose the plan that works for you
        </Typography>
      </Fade>

      <ToggleButtonGroup
        value={type}
        exclusive
        onChange={handleType}
        aria-label="Plan type toggle"
        sx={{
          mb: 6,
          background: "#fff",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <ToggleButton value="monthly" sx={{ fontWeight: 700, px: 3 }}>
          MONTHLY
        </ToggleButton>
        <ToggleButton value="yearly" sx={{ fontWeight: 700, px: 3 }}>
          YEARLY&nbsp;
          <span style={{ fontSize: "0.9em", color: "#888" }}>(SAVE 20%)</span>
        </ToggleButton>
      </ToggleButtonGroup>
      <Grid container spacing={4} justifyContent="center" alignItems="flex-end">
        {plans[type].map((p, i) => (
          <Grow in timeout={1000 + i * 400} key={p.name}>
            <Grid item xs={12} sm={6} md={4}>
              <AnimatedPaper elevation={p.highlight ? 8 : 3} highlight={p.highlight}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color={p.highlight ? "primary.main" : "text.primary"}
                  gutterBottom
                  align="center"
                >
                  {p.name}
                </Typography>
                <Box display="flex" alignItems="baseline" justifyContent="center" mb={2}>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={p.highlight ? "primary.main" : "text.primary"}
                  >
                    {p.price}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" ml={1}>
                    {p.period}
                  </Typography>
                </Box>
                <Box mb={3}>
                  {p.features.map((f, j) => (
                    <Typography
                      key={j}
                      variant="body1"
                      color="text.secondary"
                      align="center"
                      sx={{ mb: 0.5 }}
                    >
                      • {f}
                    </Typography>
                  ))}
                </Box>
                <Button
                  variant={p.highlight ? "contained" : "outlined"}
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{
                    borderRadius: 8,
                    fontWeight: 700,
                    boxShadow: p.highlight ? 3 : 0,
                    py: 1.2,
                    letterSpacing: 1,
                    fontSize: "1.1rem",
                    mt: 2,
                    background: p.highlight
                      ? "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)"
                      : undefined,
                  }}
                  onClick={() => nav("/SignUp")}
                >
                  {p.button}
                </Button>
              </AnimatedPaper>
            </Grid>
          </Grow>
        ))}
      </Grid>

      {/* Testimonials */}
      <Box sx={{ position: "relative", py: 8, background: "transparent" }}>
        <Fade in timeout={1800}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary.main"
            align="center"
            mb={4}
          >
            What Our Users Say
          </Typography>
        </Fade>
        <Grid container spacing={4} justifyContent="center">
          {testimonials.map((t) => (
            <Grid item xs={12} sm={6} md={4} key={t.name}>
              <TestimonialCard>
                <Avatar
                  src={t.avatar}
                  alt={t.name}
                  sx={{
                    width: 80,
                    height: 80,
                    mb: 2,
                    boxShadow: 3,
                    border: "3px solid #e3f2fd",
                  }}
                />
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                >
                  {t.name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="primary.main"
                  gutterBottom
                >
                  {t.company}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                  {[...Array(5)].map((_, k) => (
                    <StarIcon
                      key={k}
                      sx={{ color: "#FFD700", fontSize: 22 }}
                    />
                  ))}
                </Box>
                <FormatQuoteRoundedIcon
                  sx={{ color: "primary.light", fontSize: 32, mb: -2 }}
                />
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontStyle: "italic", mt: 1 }}
                >
                  {t.comment}
                </Typography>
              </TestimonialCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Pricing; 
