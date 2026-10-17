"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "./TrackingTimeline.module.css";

export default function TrackingTimeline({ history = [] }) {
  return (
    <ol className={styles["tracking-timeline"]}>
      {history.map((item, index) => (
        <li
          key={`${item.date}-${item.event}`}
          className={`${styles["tracking-timeline__item"]} ${
            index === 0 ? styles["tracking-timeline__item--current"] : ""
          }`}
        >
          <Box className={styles["tracking-timeline__dot"]} aria-hidden />
          <Box>
            <Typography component="p" fontWeight={700}>
              {item.event}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.date} · {item.location}
            </Typography>
          </Box>
        </li>
      ))}
    </ol>
  );
}
