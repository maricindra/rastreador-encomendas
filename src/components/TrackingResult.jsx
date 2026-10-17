"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { fetchTracking } from "@/services/trackingService";
import TrackingSearch from "@/components/TrackingSearch";
import TrackingStatusBadge from "@/components/TrackingStatusBadge";
import TrackingTimeline from "@/components/TrackingTimeline";
import TrackingMapSection from "@/components/TrackingMapSection";

export default function TrackingResult() {
  const searchParams = useSearchParams();
  const number = searchParams.get("number") || "";
  const [packageData, setPackageData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!number) {
      setPackageData(null);
      setError("");
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError("");

    fetchTracking(number)
      .then((data) => {
        if (!cancelled) setPackageData(data);
      })
      .catch((err) => {
        if (!cancelled) {
          setPackageData(null);
          setError(err.message);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [number]);

  return (
    <Box
      component="main"
      sx={{
        minHeight: { xs: "calc(100vh - 64px)", sm: "calc(100vh - 72px)" },
        px: 2,
        py: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack spacing={3} sx={{ width: "100%", maxWidth: 640 }}>
        <Typography component="h1" variant="h4" fontWeight={800}>
          Resultado do rastreio
        </Typography>
        <TrackingSearch initialCode={number} />

        {loading && (
          <Stack alignItems="center" py={4}>
            <CircularProgress aria-label="Carregando rastreio" />
          </Stack>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        {!loading && packageData && (
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", sm: "center" }}
                >
                  <Typography component="h2" variant="h5" fontWeight={700}>
                    {packageData.code}
                  </Typography>
                  <TrackingStatusBadge
                    status={packageData.status}
                    label={packageData.statusLabel}
                  />
                </Stack>

                {packageData.source === "estimated" && (
                  <Alert severity="info">
                    Este código ainda não tem movimentação real. Exibimos um
                    prazo estimado para você continuar acompanhando.
                  </Alert>
                )}

                <Typography color="text.secondary">
                  {packageData.origin} → {packageData.destination}
                </Typography>
                <Typography>
                  <strong>Tempo mínimo de entrega:</strong>{" "}
                  {packageData.minDeliveryTime}
                  {packageData.minDeliveryDate
                    ? ` (${packageData.minDeliveryDate})`
                    : ""}
                </Typography>
                <Typography>
                  <strong>Tempo estimado de entrega:</strong>{" "}
                  {packageData.estimatedDelivery}
                </Typography>
                <TrackingTimeline history={packageData.history} />
                <TrackingMapSection packageData={packageData} />
              </Stack>
            </CardContent>
          </Card>
        )}
      </Stack>
    </Box>
  );
}
