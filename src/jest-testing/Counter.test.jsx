import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Counter } from "./Counter";

describe("Counter", () => {
  test("starts at 0 and increments on click", () => {
    render(<Counter />);

    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /increment/i });
    fireEvent.click(button);

    expect(screen.getByText(/Count: 1/i)).toBeInTheDocument();
  });

  test("increments multiple times", () => {
    render(<Counter />);

    const button = screen.getByRole("button", { name: /increment/i });
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(screen.getByText(/Count: 3/i)).toBeInTheDocument();
  });
});
