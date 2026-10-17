import {
  getPackageByCode,
  listTrackingCodes,
  normalizeTrackingCode,
} from "@/mock/trackingData";

describe("normalizeTrackingCode", () => {
  it("remove espaços e deixa o código em maiúsculas", () => {
    expect(normalizeTrackingCode(" log999 ")).toBe("LOG999");
  });
});

describe("listTrackingCodes", () => {
  it("inclui os códigos de demonstração", () => {
    expect(listTrackingCodes()).toEqual(
      expect.arrayContaining(["LOG123", "LOG999", "LOG456"])
    );
  });
});

describe("getPackageByCode", () => {
  it("retorna a encomenda mockada LOG999 como entregue", () => {
    const result = getPackageByCode("LOG999");

    expect(result.found).toBe(true);
    expect(result.source).toBe("mock");
    expect(result.status).toBe("delivered");
    expect(result.minDeliveryTime).toBe("1 dia útil");
  });

  it("gera um rastreio estimado para código desconhecido", () => {
    const result = getPackageByCode("XYZ000");

    expect(result.found).toBe(true);
    expect(result.source).toBe("estimated");
    expect(result.code).toBe("XYZ000");
  });

  it("retorna null quando o código está vazio", () => {
    expect(getPackageByCode("   ")).toBeNull();
  });
});
