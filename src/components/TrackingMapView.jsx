"use client";

import { useEffect, useMemo, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./TrackingMapView.module.css";

const BOX_SVG = `
<svg viewBox="0 0 48 48" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
  <filter id="box-shadow" x="-20%" y="-10%" width="140%" height="140%">
    <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.45"/>
  </filter>
  <g filter="url(#box-shadow)">
    <path d="M8 18 24 10l16 8-16 8z" fill="#f59e0b"/>
    <path d="M8 18v14l16 8V26z" fill="#d97706"/>
    <path d="M24 26v14l16-8V18z" fill="#b45309"/>
    <path d="M24 10v16" stroke="#92400e" stroke-width="2"/>
    <rect x="18" y="20" width="12" height="7" rx="1.2" fill="#fde68a"/>
  </g>
</svg>`;

function houseSvg(delivered) {
  const fill = delivered ? "#22c55e" : "#ffffff";
  const stroke = delivered ? "#166534" : "#0f172a";
  const door = delivered ? "#14532d" : "#334155";
  return `
<svg viewBox="0 0 48 48" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
  <filter id="house-shadow" x="-20%" y="-10%" width="140%" height="140%">
    <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.45"/>
  </filter>
  <g filter="url(#house-shadow)">
    <path d="M8 22 24 8l16 14v18H8z" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
    <path d="M20 28h8v12h-8z" fill="${door}"/>
    <rect x="12" y="24" width="7" height="6" rx="1" fill="${delivered ? "#86efac" : "#e2e8f0"}"/>
    <rect x="29" y="24" width="7" height="6" rx="1" fill="${delivered ? "#86efac" : "#e2e8f0"}"/>
  </g>
</svg>`;
}

function makeIcon(html) {
  return L.divIcon({
    className: styles.marker,
    html: `<div class="${styles.marker__icon}">${html}</div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 40],
    popupAnchor: [0, -36],
  });
}

function offsetIfOverlap(packagePosition, homePosition) {
  if (!packagePosition || !homePosition) return packagePosition;
  const close =
    Math.abs(packagePosition[0] - homePosition[0]) < 0.0009 &&
    Math.abs(packagePosition[1] - homePosition[1]) < 0.0009;
  if (!close) return packagePosition;
  return [packagePosition[0] + 0.0014, packagePosition[1]];
}

function FitBounds({ points, recenterKey }) {
  const map = useMap();
  const lastKey = useRef("");

  useEffect(() => {
    map.invalidateSize();
    const valid = points.filter(Boolean);
    if (!valid.length) return;
    if (recenterKey === lastKey.current) return;
    lastKey.current = recenterKey;

    if (valid.length === 1) {
      map.setView(valid[0], 15);
      return;
    }

    map.fitBounds(valid, { padding: [56, 56], maxZoom: 15 });
  }, [map, points, recenterKey]);

  return null;
}

export default function TrackingMapView({
  homePosition,
  packagePosition,
  packageLabel,
  delivered,
  recenterKey,
}) {
  const visiblePackage = useMemo(
    () => offsetIfOverlap(packagePosition, homePosition),
    [packagePosition, homePosition]
  );
  const center = visiblePackage || homePosition || [-14.235, -51.9253];
  const line = homePosition && visiblePackage ? [homePosition, visiblePackage] : null;
  const houseIcon = useMemo(() => makeIcon(houseSvg(delivered)), [delivered]);
  const boxIcon = useMemo(() => makeIcon(BOX_SVG), []);

  return (
    <div className={styles["tracking-map"]}>
      <MapContainer
        center={center}
        zoom={13}
        className={styles["tracking-map__canvas"]}
        scrollWheelZoom
      >
        <TileLayer
          attribution="Tiles &copy; Esri"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}"
          opacity={0.9}
        />
        <FitBounds points={[homePosition, visiblePackage]} recenterKey={recenterKey} />
        {line && (
          <Polyline positions={line} pathOptions={{ color: "#fbbf24", weight: 4, opacity: 0.95 }} />
        )}
        {homePosition && (
          <Marker position={homePosition} icon={houseIcon} zIndexOffset={500}>
            <Popup>{delivered ? "Casa: encomenda entregue" : "Sua casa (destino)"}</Popup>
          </Marker>
        )}
        {visiblePackage && (
          <Marker position={visiblePackage} icon={boxIcon} zIndexOffset={800}>
            <Popup>{packageLabel || "Encomenda"}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
