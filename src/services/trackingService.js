export async function fetchTracking(number) {
  const code = encodeURIComponent(number.trim());
  const response = await fetch(`/api/tracking?number=${code}`, {
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Não foi possível consultar o rastreio.");
  }

  return data;
}

export async function geocodeCep(cep) {
  const response = await fetch(`/api/geocode?cep=${encodeURIComponent(cep)}`, {
    cache: "no-store",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Não foi possível localizar este CEP.");
  }

  return data;
}
