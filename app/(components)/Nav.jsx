import { faHome, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href={"/"}>
          <FontAwesomeIcon icon={faHome} className="icon" />
        </Link>
      </div>

      <h1 className="text-yellow-100"> Timepass Ticketing System</h1>
      <Link href={"/TicketPage/new"}>
        <FontAwesomeIcon icon={faTicket} className="icon" />
      </Link>
    </nav>
  );
};

export default Nav;
