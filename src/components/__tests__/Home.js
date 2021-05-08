import Home from "../Home";
import renderer from "react-test-renderer";
import {render, fireEvent, screen} from "@testing-library/react";

test("Login button rendered", () => {
    const component = renderer.create(
        <button type="button" class="btn btn-outline-light" onClick={jest.fn()}>
                            "Login"
                        </button>
    )

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();

})


// DOM testing

test("Clicking Login button renders login screen", () => {
    const mockSubmit = jest.fn();

    render(<button type="button" className="btn btn-outline-light" onClick={mockSubmit}>
                "Login"
        </button>)
    fireEvent.click(screen.getByRole("button"));

    expect(mockSubmit).toHaveBeenCalled();
})

test("Clicking New Post button renders Add post form", () => {
    const mockSubmit = jest.fn();

    render(<button type="button" className="nav-link active option action" aria-current="page" value="New Post"
    onClick={mockSubmit}>New Post</button>)
    fireEvent.click(screen.getByRole("button"));

    expect(mockSubmit).toHaveBeenCalled();
})



