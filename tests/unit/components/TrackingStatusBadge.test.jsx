import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import TrackingStatusBadge from "@/components/TrackingStatusBadge";

function renderBadge(props) {
  return render(
    <ThemeProvider theme={theme}>
      <TrackingStatusBadge {...props} />
    </ThemeProvider>
  );
}

describe("TrackingStatusBadge", () => {
  it("mostra o rótulo de entregue", () => {
    renderBadge({ status: "delivered", label: "Entregue" });
    expect(screen.getByText("Entregue")).toBeInTheDocument();
  });

  it("mostra o rótulo em trânsito", () => {
    renderBadge({ status: "in_transit", label: "Em trânsito" });
    expect(screen.getByText("Em trânsito")).toBeInTheDocument();
  });
});
