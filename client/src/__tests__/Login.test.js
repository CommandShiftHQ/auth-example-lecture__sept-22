import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import Login from "../components/Login";

describe("Login form component", () => {
    it("matches snapshot", () => {
        const generated = renderer
            .create(
                <Router>
                    <Login />
                </Router>
            ).toJSON();

        expect(generated).toMatchSnapshot();
    });

    it("title renders as expected", () => {
        render(
            <Router>
                <Login />
            </Router>
        );

        expect(screen.getByText("Please enter your details below to login")).toBeInTheDocument();
    });

    it("renders all form elements", () => {
        render(
            <Router>
                <Login />
            </Router>
        );
        const usernameField = screen.getByText("Username");
        const emailField = screen.getByText("Email");
        const passwordField = screen.getByText("Password");
        const loginButton = screen.getByRole("button", { name: "Login" });

        expect(usernameField).toBeInTheDocument();
        expect(emailField).toBeInTheDocument();
        expect(passwordField).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    });

    it("shows login failure message with non existent user", async () => {
        render(
            <Router>
                <Login />
            </Router>
        );

        const usernameField = screen.getByLabelText("Username");
        const emailField = screen.getByLabelText("Email");
        const passwordField = screen.getByLabelText("Password");
        const loginButton = screen.getByRole("button", { name: "Login" });

        fireEvent.change(usernameField, { target: { value: "test" } });
        fireEvent.change(emailField, { target: { value: "test@email.com" } });
        fireEvent.change(passwordField, { target: { value: "testPassword" } });
        fireEvent.click(loginButton);

        const errorMessage = await screen.findByText("details are incorrect");
        expect(errorMessage).toBeInTheDocument();
    });
});