import React from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { ClientSideBar } from "_components";

function ClientView({ dark }) {
  // Add any necessary state or hooks here

  return (
    <div className="flex flex-col w-full min-h-fit px-4 bg-[#25292F] rounded-[25px] justify-center mb-4">
      <Header
        username={/* Add username here */}
        onLogout={/* Add logout function here */}
        dark={dark}
      />
      <div className="flex flex-row justify-center">
        <Sidebar user={/* Add user data here */} dark={dark} />
        <ClientSideBar
          dark={dark}
          show={true}
          setShow={() => {/* Add function to handle closing sidebar */}}
          loggedInUser={/* Add logged in user data here */}
          userList={/* Add user list here */}
          onSelect={/* Add user selection function here */}
          selectedUserId={/* Add selected user ID here */}
          allInfo={/* Add all info here */}
        />
      </div>
    </div>
  );
}

export { ClientView };