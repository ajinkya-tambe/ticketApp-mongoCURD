"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TicketForm = ({ ticketData }) => {
  // const { _id } = ticketData;
  const EDITMODE = ticketData._id === "new" ? false : true;
  const router = useRouter();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (EDITMODE) {
      // Update existing ticket
      const res = await fetch(`/api/Tickets/${ticketData._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });

      console.log("Res: ", res);
      if (!res.ok) {
        throw new Error("Failed to update ticket!");
      } else {
        alert("Ticket Updated!");
      }
    } else {
      // Create new ticket
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });

      // console.log("Res: ", res);
      if (!res.ok) {
        throw new Error("Failed to create ticket!");
      }

      alert("Ticket Created!");
    }
    router.refresh();
    router.push("/");
  };

  const startingTicketData = {
    title: "",
    description: "",
    category: "Software",
    priority: 1,
    progress: 0,
    status: "Not started",
  };

  if (EDITMODE) {
    startingTicketData["title"] = ticketData.title;
    startingTicketData["description"] = ticketData.description;
    startingTicketData["priority"] = ticketData.priority;
    startingTicketData["progress"] = ticketData.progress;
    startingTicketData["category"] = ticketData.category;
    startingTicketData["status"] = ticketData.status;
  }

  const [formData, setFormData] = useState(startingTicketData);
  return (
    <div className="flex justify-center">
      <form
        action=""
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3 className="flex justify-center">
          {EDITMODE ? "Update Your Ticket" : "Create Your Ticket"}
        </h3>
        <label htmlFor="">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />

        <label htmlFor="">Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows="5"
        />

        <label htmlFor="" className="className">
          Category
        </label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
          className="className"
        >
          <option value="Software">Software</option>
          <option value="Hardware">Hardware</option>
          <option value="Bug">Bug</option>
          <option value="Project">Project</option>
        </select>

        <label htmlFor="">Priority</label>
        <div className="">
          <input
            type="radio"
            id="priority-1"
            name="priority"
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label htmlFor="" className="pr-3">
            1
          </label>

          <input
            type="radio"
            id="priority-2"
            name="priority"
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label htmlFor="" className="pr-3">
            2
          </label>

          <input
            type="radio"
            id="priority-3"
            name="priority"
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label htmlFor="" className="pr-3">
            3
          </label>

          <input
            type="radio"
            id="priority-4"
            name="priority"
            onChange={handleChange}
            value={4}
            checked={formData.priority == 4}
          />
          <label htmlFor="" className="pr-3">
            4
          </label>

          <input
            type="radio"
            id="priority-5"
            name="priority"
            onChange={handleChange}
            value={5}
            checked={formData.priority == 5}
          />
          <label htmlFor="" className="pr-3">
            5
          </label>
        </div>

        <label htmlFor="">Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />

        <label htmlFor="">Status</label>
        <select
          name="status"
          value={formData.status}
          id=""
          onChange={handleChange}
        >
          <option value="not-started">Not Started</option>
          <option value="Started">Started</option>
          <option value="done">Done</option>
        </select>

        <input
          type="submit"
          name=""
          id=""
          className="btn"
          value={EDITMODE ? "Update Ticket" : "Create Ticket"}
        />
      </form>
    </div>
  );
};

export default TicketForm;
