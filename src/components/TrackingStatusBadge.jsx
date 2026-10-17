"use client";

import Chip from "@mui/material/Chip";

const STATUS_COLOR = {
  created: "default",
  in_transit: "warning",
  out_for_delivery: "info",
  delivered: "success",
};

export default function TrackingStatusBadge({ status, label }) {
  return (
    <Chip
      color={STATUS_COLOR[status] || "default"}
      label={label}
      sx={{ fontWeight: 700 }}
    />
  );
}
