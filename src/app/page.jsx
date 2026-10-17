"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SiteLogo from "@/components/SiteLogo";
import TrackingSearch from "@/components/TrackingSearch";

export default function HomePage() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: { xs: "calc(100vh - 64px)", sm: "calc(100vh - 72px)" },
        px: 2,
        py: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack spacing={3} alignItems="center" textAlign="center" maxWidth={560}>
        <SiteLogo size={112} />
        <Typography component="h1" variant="h3" fontWeight={800}>
          Rastreador de Encomendas
        </Typography>
        <Typography color="text.secondary">
          Acompanhe o status, o prazo mínimo e a data estimada da sua entrega.
        </Typography>
        <TrackingSearch />
      </Stack>
    </Box>
  );
}
