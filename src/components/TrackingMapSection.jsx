"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { geocodeCep } from "@/services/trackingService";

const TrackingMapView = dynamic(() => import("@/components/TrackingMapView"), {
  ssr: false,
  loading: () => (
    <Typography color="text.secondary">Carregando mapa…</Typography>
  ),
});

function toLatLng(coords) {
  if (!coords || typeof coords.lat !== "number" || typeof coords.lng !== "number") {
    return null;
  }
  return [coords.lat, coords.lng];
}

function formatCep(value) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

export default function TrackingMapSection({ packageData }) {
  const delivered = packageData?.status === "delivered";
  const [active, setActive] = useState(false);
  const [cep, setCep] = useState("");
  const [cepStatus, setCepStatus] = useState("idle");
  const [cepError, setCepError] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [packagePosition, setPackagePosition] = useState(
    toLatLng(packageData?.currentCoords)
  );
  const [homePosition, setHomePosition] = useState(
    toLatLng(packageData?.destinationCoords)
  );

  useEffect(() => {
    setPackagePosition(toLatLng(packageData?.currentCoords));
    if (cepStatus !== "ready") {
      setHomePosition(toLatLng(packageData?.destinationCoords));
    }
  }, [packageData, cepStatus]);

  useEffect(() => {
    if (!active || delivered) return undefined;

    const destination = homePosition || toLatLng(packageData?.destinationCoords);
    if (!destination) return undefined;

    const timer = setInterval(() => {
      setPackagePosition((current) => {
        if (!current) return destination;
        const step = 0.08;
        return [
          current[0] + (destination[0] - current[0]) * step,
          current[1] + (destination[1] - current[1]) * step,
        ];
      });
    }, 2500);

    return () => clearInterval(timer);
  }, [active, delivered, homePosition, packageData]);

  const openMap = () => setActive(true);

  const locateHomeByCep = async (event) => {
    event.preventDefault();
    setCepError("");
    setCepStatus("loading");
    setActive(true);

    try {
      const result = await geocodeCep(cep);
      setHomePosition([result.lat, result.lng]);
      setHomeAddress(result.address);
      setCepStatus("ready");
    } catch (error) {
      setCepStatus("error");
      setCepError(error.message);
    }
  };

  return (
    <Box component="section" aria-labelledby="map-section-title">
      <Stack spacing={2}>
        <Typography id="map-section-title" component="h3" variant="h6" fontWeight={700}>
          Localização em tempo real
        </Typography>
        <Typography variant="body2" color="text.secondary">
          A caixa é a encomenda. A casinha é o destino: verde se já entregue, branca se ainda
          está a caminho. O CEP posiciona a sua casa, não some com a caixa.
        </Typography>

        <Button variant="contained" onClick={openMap}>
          {active ? "Mapa visível" : "Mostrar encomenda no mapa"}
        </Button>

        <Box component="form" onSubmit={locateHomeByCep}>
          <Stack spacing={1.5}>
            <TextField
              label="CEP da sua casa"
              placeholder="00000-000"
              value={cep}
              onChange={(event) => setCep(formatCep(event.target.value))}
              inputProps={{ inputMode: "numeric", "aria-label": "CEP da sua casa" }}
            />
            <Button type="submit" variant="outlined" disabled={cepStatus === "loading"}>
              {cepStatus === "loading" ? "Buscando CEP…" : "Posicionar minha casa pelo CEP"}
            </Button>
          </Stack>
        </Box>

        {cepStatus === "ready" && homeAddress && (
          <Alert severity="success">Casa posicionada em {homeAddress}.</Alert>
        )}
        {cepError && <Alert severity="error">{cepError}</Alert>}

        {active && (
          <TrackingMapView
            homePosition={homePosition}
            packagePosition={packagePosition}
            packageLabel={
              packageData?.code
                ? `Encomenda ${packageData.code}`
                : "Encomenda"
            }
            delivered={delivered}
            recenterKey={`${packageData?.code || ""}-${cepStatus}-${homeAddress}-${delivered}`}
          />
        )}
      </Stack>
    </Box>
  );
}
