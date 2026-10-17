import { NextResponse } from "next/server";
import { getPackageByCode, listTrackingCodes } from "@/mock/trackingData";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const trackingNumber = searchParams.get("number");

  if (!trackingNumber) {
    return NextResponse.json(
      {
        codes: listTrackingCodes(),
        hint: "Envie ?number=LOG999 para consultar uma encomenda.",
      },
      { status: 200 }
    );
  }

  const result = getPackageByCode(trackingNumber);

  if (!result) {
    return NextResponse.json(
      { error: "Código de rastreio não fornecido." },
      { status: 400 }
    );
  }

  return NextResponse.json(result, { status: 200 });
}
