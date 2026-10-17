import { NextResponse } from "next/server";

function onlyCepDigits(cep = "") {
  return String(cep).replace(/\D/g, "");
}

async function geocodeAddress(query) {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "br");

  const response = await fetch(url, {
    headers: {
      "User-Agent": "rastreador-encomendas/1.0 (desafio-frontend)",
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) return null;
  const results = await response.json();
  if (!results[0]) return null;

  return {
    lat: Number(results[0].lat),
    lng: Number(results[0].lon),
  };
}

export async function GET(request) {
  const cep = onlyCepDigits(new URL(request.url).searchParams.get("cep") || "");

  if (cep.length !== 8) {
    return NextResponse.json(
      { error: "Informe um CEP válido com 8 dígitos." },
      { status: 400 }
    );
  }

  const brasilApi = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`, {
    cache: "no-store",
  });

  if (!brasilApi.ok) {
    return NextResponse.json(
      { error: "CEP não encontrado." },
      { status: 404 }
    );
  }

  const data = await brasilApi.json();
  if (data.errors || data.message) {
    return NextResponse.json(
      { error: "CEP não encontrado." },
      { status: 404 }
    );
  }

  const street = [data.street, data.neighborhood, data.city, data.state, "Brasil"]
    .filter(Boolean)
    .join(", ");

  let lat = Number(data.location?.coordinates?.latitude);
  let lng = Number(data.location?.coordinates?.longitude);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    const fallback = await geocodeAddress(street || `${cep}, Brasil`);
    if (!fallback) {
      return NextResponse.json(
        {
          error: "Este CEP não tem coordenadas. Tente outro CEP.",
          address: street,
        },
        { status: 422 }
      );
    }
    lat = fallback.lat;
    lng = fallback.lng;
  }

  return NextResponse.json({
    cep,
    address: street,
    lat,
    lng,
  });
}
