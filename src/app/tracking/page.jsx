import { Suspense } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import TrackingResult from "@/components/TrackingResult";

function TrackingFallback() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress aria-label="Carregando rastreio" />
    </Box>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={<TrackingFallback />}>
      <TrackingResult />
    </Suspense>
  );
}
