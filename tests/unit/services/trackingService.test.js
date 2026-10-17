import { fetchTracking, geocodeCep } from "@/services/trackingService";

describe("trackingService", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("busca uma encomenda na API de rastreio", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ code: "LOG999", status: "delivered" }),
    });

    const result = await fetchTracking("LOG999");

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/tracking?number=LOG999",
      expect.objectContaining({ cache: "no-store" })
    );
    expect(result.code).toBe("LOG999");
  });

  it("lança erro quando o rastreio falha", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Código de rastreio não encontrado." }),
    });

    await expect(fetchTracking("NOPE")).rejects.toThrow(
      "Código de rastreio não encontrado."
    );
  });

  it("propaga erro quando a API de CEP falha", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "CEP não encontrado." }),
    });

    await expect(geocodeCep("00000000")).rejects.toThrow("CEP não encontrado.");
  });
});
