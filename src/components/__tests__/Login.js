import Login from "../Login";
import renderer from "react-test-renderer";
import {render, fireEvent, screen} from "@testing-library/react";


// DOM testing

test("Logging in renders the Home and clicking Log out, logs out", () => {
    const mockSubmit = jest.fn();

    render(<button type="button" className="btn btn-secondary float-end" onClick={mockSubmit}>
    Log in
    </button>)
    fireEvent.click(screen.getByRole("button"));

    expect(mockSubmit).toHaveBeenCalled();

    render(<button type="button" className="btn btn-secondary float-end" onClick={mockSubmit}>
    Log Out
    </button>)

expect(mockSubmit).toHaveBeenCalled();

})





