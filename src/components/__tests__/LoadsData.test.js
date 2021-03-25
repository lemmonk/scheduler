import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";

/* with the rest of the imports */
import { fireEvent } from "@testing-library/react";
import { getByText } from "@testing-library/react";
import { queryByText } from "@testing-library/react";
import { getByAltText } from "@testing-library/react";
import { getByPlaceholderText } from "@testing-library/react";
import { waitForElement } from "@testing-library/react";
import { getAllByTestId } from "@testing-library/react";
import { prettyDOM } from "@testing-library/react";



describe("Application", () => {
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
 
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    fireEvent.click(getByText(appointment, "Save"));
   
    console.log(prettyDOM(appointment));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
});


 
