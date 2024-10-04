import React from "react";
import { NavLink } from "react-router-dom";
import settingIcon from "../_assets/setting.png";

export function Footer({ authUser, dark }) {
  const isAdmin =
    authUser.user_roles === "admin" || authUser.user_roles === "super_admin";
  const isSuperAdmin = authUser.user_roles === "super_admin";
  const isClient = authUser.user_roles === "client" && authUser.usertype === 4;

  const renderAdminLinks = () => (
    <>
      {isSuperAdmin && (
        <NavLink
          to="/admin"
          className="lg:flex space-x-2 mr-4 text-xxs text-[#A3A2A2] text-center cursor-pointer items-center"
        >
          Admin
        </NavLink>
      )}
      <FooterLink to="/dual-invest" label="DUAL-INVEST" />
      <FooterLink to="/bot" label="Bot" />
      <FooterLink to="/clients" label="Sub-Clients" />
    </>
  );

  const renderClientLinks = () => (
    <span
      onClick={() =>
        window.open(
          `${process.env.REACT_APP_API_URL}/pdfs/user_${authUser.id}.pdf`,
          "_blank"
        )
      }
      className="lg:flex items-center mr-2 text-sm dark:text-[#A3A2A2] cursor-pointer"
    >
      <img
        width={26}
        className="cursor-pointer"
        src={settingIcon}
        alt="second logo"
      />
      Statement
    </span>
  );

  return (
    <div className="flex pt-4 justify-between pr-24">
      <div className="flex justify-between w-full items-center text-[11px]">
        <div className="flex space-x-4 cursor-pointer"></div>
        <div className="flex place-items-baseline justify-between space-x-4">
          <div className="p flex justify-center">
            {isAdmin && renderAdminLinks()}
            <FooterLink to="/wallet" label="Statement" className="lg:flex" />
            <FooterLink to="/exchange" label="Exchange" className="lg:flex" />
            {isClient && renderClientLinks()}
          </div>
        </div>
      </div>
    </div>
  );
}

const FooterLink = ({ to, label, className = "" }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center mr-4 text-xxs cursor-pointer ${
        isActive ? "text-[#15FF00]" : "text-[#A3A2A2]"
      } ${className}`
    }
  >
    {label}
  </NavLink>
);
