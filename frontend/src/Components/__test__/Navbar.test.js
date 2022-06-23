import React from "react";
import Navbar from "../Navbar";
import {fireEvent, render} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("Dropdown button working efficiently",()=>{
    const comp=render(<Navbar/>);
    const drop=comp.getByTestId("head");
    const t=comp.getByTestId("h");
    expect(t.textContent).toBe("Open user menu")
})