import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions, userActions } from "_store";
import { useUserSelection } from "../hooks/useUserSelection";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { MainContent } from "../components/MainContent";

// Add setCurrentView to the component props
function Home({ dark, infoType, currentView, setCurrentView }) {
  const dispatch = useDispatch();
  const { user: authUser } = useSelector((x) => x.auth);
  const { users } = useSelector((x) => x?.users);
  
  const [allInfo, setAllInfo] = useState({});
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const { selectedUser, onSelectUser } = useUserSelection(authUser, users);

  useEffect(() => {
    dispatch(userActions.getAll());
    dispatch(userActions.adminCommission(authUser[1].id));

    setLoggedInUser(JSON.parse(localStorage.getItem("user"))[1]);
    setIsSuperAdmin(loggedInUser.user_roles === "super_admin");
  }, [authUser, dispatch, loggedInUser.user_roles]);

  const logout = () => {
    dispatch(authActions.logout());
  };

  return (
    <div className={`flex flex-col w-full px-4 ${dark ? 'bg-[#25292F]' : 'bg-transparent'} rounded-[25px] justify-center pb-10`}>
      <Header
        username={selectedUser.current.username}
        onLogout={logout}
        dark={dark}
      />
      <div className="flex flex-row justify-center">
        <Sidebar user={selectedUser.current} dark={dark} />
        <MainContent
          className="flex-grow"
          currentView={currentView}
          setCurrentView={setCurrentView}
          dark={dark}
          authUser={authUser[1]}
          users={users.rows}
          onSelectUser={onSelectUser}
          selectedUserId={selectedUser.current.id}
          allInfo={allInfo}
          infoType={infoType}
        />
      </div>
    </div>
  );
}

export { Home };