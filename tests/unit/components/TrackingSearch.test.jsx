import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TrackingSearch from "@/components/TrackingSearch";

const push = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

describe("TrackingSearch", () => {
  beforeEach(() => {
    push.mockClear();
  });

  it("navega para a página de rastreio ao enviar um código", async () => {
    const user = userEvent.setup();
    render(<TrackingSearch />);

    await user.type(
      screen.getByLabelText(/código de rastreio/i),
      "LOG999"
    );
    await user.click(screen.getByRole("button", { name: /rastrear/i }));

    expect(push).toHaveBeenCalledWith("/tracking?number=LOG999");
  });
});
