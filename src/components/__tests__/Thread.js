import Login from "../Login";
import renderer from "react-test-renderer";
import {render, fireEvent, screen} from "@testing-library/react";


// DOM testing

test("Clicking Submit button adds a reply", () => {
    const mockSubmit = jest.fn();

    render(<><input type="text" className="form-control" placeholder="Add a reply" aria-label="Add a reply" 
    aria-describedby="button-addon2" onChange={mockSubmit}/>
    <button className="btn btn-secondary" type="button" id="button-addon2" onClick={mockSubmit}>Submit</button></>)
    fireEvent.click(screen.getByRole("button"));

    expect(mockSubmit).toHaveBeenCalled();

})





