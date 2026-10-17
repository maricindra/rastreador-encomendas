"use client";

import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SiteLogo from "@/components/SiteLogo";

export default function AppHeader() {
  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={4}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        backgroundImage: "none",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "center",
          minHeight: { xs: 64, sm: 72 },
          px: 2,
        }}
      >
        <Box
          component="nav"
          aria-label="Principal"
          sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Box
            component={Link}
            href="/"
            aria-label="Ir para a página inicial"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <SiteLogo size={48} />
            <Typography component="span" fontWeight={800} fontSize={{ xs: "1rem", sm: "1.15rem" }}>
              Rastreador
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
