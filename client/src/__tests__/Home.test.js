import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import Home from '../components/Home';

describe("Home component", () => {
    it("matches snapshot", () => {
        const generated = renderer
            .create(
                <Router>
                    <Home />
                </Router>
            ).toJSON();

        expect(generated).toMatchSnapshot();
    });

    it("displays welcome message", () => {
        render(
            <Router>
                <Home />
            </Router>
        );

        expect(screen.getByText("This is the homepage")).toBeInTheDocument;
    })
});