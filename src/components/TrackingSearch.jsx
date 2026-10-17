"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const DEMO_CODES = ["LOG123", "LOG999", "LOG456"];

export default function TrackingSearch({ initialCode = "" }) {
  const [trackingNumber, setTrackingNumber] = useState(initialCode);
  const router = useRouter();

  const search = (code) => {
    const value = (code ?? trackingNumber).trim();
    if (!value) return;
    router.push(`/tracking?number=${encodeURIComponent(value)}`);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    search();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{ width: "100%", maxWidth: 520 }}
    >
      <Stack spacing={2}>
        <TextField
          label="Código de rastreio"
          placeholder="Ex.: LOG999"
          value={trackingNumber}
          onChange={(event) => setTrackingNumber(event.target.value)}
          inputProps={{ "aria-label": "Código de rastreio" }}
        />
        <Button type="submit" variant="contained" fullWidth>
          Rastrear
        </Button>
        <Typography variant="body2" color="text.secondary">
          Experimente um código de demonstração:
        </Typography>
        <Stack direction="row" flexWrap="wrap" useFlexGap gap={1}>
          {DEMO_CODES.map((code) => (
            <Chip
              key={code}
              label={code}
              onClick={() => {
                setTrackingNumber(code);
                search(code);
              }}
              clickable
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
