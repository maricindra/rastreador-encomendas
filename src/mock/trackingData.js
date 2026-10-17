function addBusinessDays(start, days) {
  const date = new Date(start);
  let added = 0;

  while (added < days) {
    date.setDate(date.getDate() + 1);
    const weekday = date.getDay();
    if (weekday !== 0 && weekday !== 6) {
      added += 1;
    }
  }

  return date;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
  }).format(date);
}

export const mockTracking = {
  LOG123: {
    code: "LOG123",
    status: "in_transit",
    statusLabel: "Em trânsito",
    origin: "São Paulo, SP",
    destination: "Rio de Janeiro, RJ",
    originCoords: { lat: -23.5505, lng: -46.6333 },
    destinationCoords: { lat: -22.9068, lng: -43.1729 },
    currentCoords: { lat: -23.22, lng: -45.0 },
    minDeliveryTime: "1 dia útil",
    estimatedDelivery: "18/10/2026",
    history: [
      {
        date: "16/10/2026 10:00",
        location: "São Paulo",
        event: "Objeto postado",
      },
      {
        date: "16/10/2026 14:30",
        location: "São Paulo",
        event: "Em trânsito para o centro de distribuição",
      },
    ],
  },
  LOG999: {
    code: "LOG999",
    status: "delivered",
    statusLabel: "Entregue",
    origin: "Curitiba, PR",
    destination: "Belo Horizonte, MG",
    originCoords: { lat: -25.4284, lng: -49.2733 },
    destinationCoords: { lat: -19.9167, lng: -43.9345 },
    currentCoords: { lat: -19.9167, lng: -43.9345 },
    minDeliveryTime: "1 dia útil",
    estimatedDelivery: "15/10/2026",
    history: [
      {
        date: "15/10/2026 09:00",
        location: "Belo Horizonte",
        event: "Saiu para entrega",
      },
      {
        date: "15/10/2026 11:20",
        location: "Belo Horizonte",
        event: "Objeto entregue ao destinatário",
      },
    ],
  },
  LOG456: {
    code: "LOG456",
    status: "out_for_delivery",
    statusLabel: "Saiu para entrega",
    origin: "Campinas, SP",
    destination: "Santos, SP",
    originCoords: { lat: -22.9099, lng: -47.0626 },
    destinationCoords: { lat: -23.9618, lng: -46.3322 },
    currentCoords: { lat: -23.9, lng: -46.38 },
    minDeliveryTime: "1 dia útil",
    estimatedDelivery: "16/10/2026",
    history: [
      {
        date: "15/10/2026 08:10",
        location: "Campinas",
        event: "Objeto recebido no centro de distribuição",
      },
      {
        date: "16/10/2026 07:40",
        location: "Santos",
        event: "Saiu para entrega",
      },
    ],
  },
};

export function normalizeTrackingCode(code = "") {
  return code.trim().toUpperCase().replace(/\s+/g, "");
}

export function listTrackingCodes() {
  return Object.keys(mockTracking);
}

export function getPackageByCode(code) {
  const cleanCode = normalizeTrackingCode(code);

  if (!cleanCode) {
    return null;
  }

  if (mockTracking[cleanCode]) {
    return {
      ...mockTracking[cleanCode],
      found: true,
      source: "mock",
    };
  }

  const now = new Date();
  const minDate = addBusinessDays(now, 1);
  const estimatedDate = addBusinessDays(now, 3);

  return {
    code: cleanCode,
    found: true,
    source: "estimated",
    status: "created",
    statusLabel: "Pedido registrado",
    origin: "Centro de distribuição",
    destination: "Endereço do destinatário",
    originCoords: { lat: -23.5505, lng: -46.6333 },
    destinationCoords: { lat: -23.5505, lng: -46.6333 },
    currentCoords: { lat: -23.5505, lng: -46.6333 },
    minDeliveryTime: "1 dia útil",
    estimatedDelivery: formatDate(estimatedDate),
    minDeliveryDate: formatDate(minDate),
    history: [
      {
        date: formatDate(now),
        location: "Sistema de rastreio",
        event: "Código aceito. Aguardando a primeira movimentação da transportadora.",
      },
    ],
  };
}
