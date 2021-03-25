import React from "react";
import axios from "axios";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";

/* with the rest of the imports */
import { fireEvent } from "@testing-library/react";
import { getByText } from "@testing-library/react";
import { queryByText } from "@testing-library/react";
import { getByAltText } from "@testing-library/react";
import { queryByAltText } from "@testing-library/react";
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
   
    // console.log(prettyDOM(appointment));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });




  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
   
    const { container, debug } = render(<Application />);
   
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));
  
  
  expect(
    getByText(appointment, "Are you sure you would like to delete this appointment?")
  ).toBeInTheDocument();

  fireEvent.click(queryByText(appointment, "Confirm"));

  expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  await waitForElement(() => getByAltText(appointment, "Add"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  
    debug();
  });



  // it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {

  //   const { container, debug } = render(<Application />);
    
  //   await waitForElement(() => getByText(container, "Archie Cohen"));

  //   const appointment = getAllByTestId(container, "appointment").find(
  //     appointment => queryByText(appointment, "Archie Cohen")
  //   );


  //   fireEvent.click(queryByAltText(appointment, "Edit"));

  //   fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
  //     target: { value: "Lydia Miller-Jones" }
  //   });

  //   fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  //   fireEvent.click(getByText(appointment, "Save"));
  
  //   // console.log(prettyDOM(appointment));

  //   expect(getByText(appointment, "Saving")).toBeInTheDocument();

  //   const day = getAllByTestId(container, "day").find(day =>
  //     queryByText(day, "Monday")
  //   );

  //   expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    
  //     debug();

  // });
  

  // ERROR TESTING
  it("shows the save error when failing to save an appointment", async() => {

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

    axios.put.mockRejectedValueOnce();
    //  expect(getByText(appointment, "Error")).toBeInTheDocument();
    debug();
  });


  



  it("shows the delete error when failing to delete an existing appointment", async () => {

    const { container, debug } = render(<Application />);
   
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));
  
  
  expect(
    getByText(appointment, "Are you sure you would like to delete this appointment?")
  ).toBeInTheDocument();

  fireEvent.click(queryByText(appointment, "Confirm"));

  expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    axios.delete.mockRejectedValueOnce();

    // expect(getByText(appointment, "Error")).toBeInTheDocument();
    debug();
  });



});