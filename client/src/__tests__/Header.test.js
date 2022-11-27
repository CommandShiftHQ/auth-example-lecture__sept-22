import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import Header from "../components/Header";

describe("Login form component", () => {
    it("matches snapshot", () => {
        const generated = renderer
            .create(
                <Router>
                    <Header />
                </Router>
            ).toJSON();

        expect(generated).toMatchSnapshot();
    });

    it("all links render as expected", () => {
        render(
            <Router>
                <Header />
            </Router>
        );
        const homeLink = screen.getByRole("link", { name: "Home" });
        const loginLink = screen.getByRole("link", { name: "Login" });
        const accountLink = screen.getByText("Account");

        expect(homeLink).toBeInTheDocument();
        expect(loginLink).toBeInTheDocument();
        expect(accountLink).toBeInTheDocument();
    });
});