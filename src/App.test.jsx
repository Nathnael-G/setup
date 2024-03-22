import { render, screen } from "@testing-library/react";
import App from "./App";
import { Button } from "./components/ui/button";

it("should display something", () => {
  render(<App />);
  const message = screen.queryByText(/hello/i);
  expect(message).toBeVisible();
});
