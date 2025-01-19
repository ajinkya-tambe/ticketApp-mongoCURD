import TicketForm from "@/app/(components)/TicketForm";
import React from "react";

const getTicketById = async (id) => {
  // console.log("\nCalled: ", id);
  try {
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to get ticket");
    }

    return res.json();
  } catch (error) {
    console.log("Error: ", error);
  }
};

const TicketPage = async ({ params }) => {
  const { id } = await params;
  const EDITMODE = id === "new" ? false : true;
  let updateTicketData = {};

  if (EDITMODE) {
    updateTicketData = await getTicketById(id);
    // console.log(updateTicketData);

    updateTicketData = updateTicketData.foundTicket;
  } else {
    updateTicketData = {
      _id: "new",
    };
  }

  return <TicketForm ticketData={updateTicketData} />;
};

export default TicketPage;
