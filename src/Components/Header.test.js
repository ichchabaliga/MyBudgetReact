// Header.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PageHeader from "./Header";

describe("PageHeader Component", () => {
  it("should call handleLogout when Logout button is clicked", () => {
    // Arrange
    const mockHandleLogout = jest.fn();
    const { getByText } = render(
      <PageHeader
        isLoggedIn={true}
        username="John"
        handlelogout={mockHandleLogout}
      />
    );

    // Act
    fireEvent.click(getByText("Logout"));

    // Assert
    expect(mockHandleLogout).toHaveBeenCalled();
  });

  // Add more tests as needed
});
