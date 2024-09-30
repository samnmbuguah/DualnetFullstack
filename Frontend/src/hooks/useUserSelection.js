import { useState, useRef } from 'react';

export function useUserSelection(authUser, users) {
  const [seluserid, setSelUserid] = useState(authUser[1]?.id || 0);
  const selectedUser = useRef({
    username: authUser[1]?.username || "",
    wallet: authUser[1]?.wallet || 0,
    investment: authUser[1]?.investment || 0,
    beginDate: authUser[1]?.begin_date || "Not Set",
    fee: authUser[1]?.fee || 0,
    Net_client_share_in_percent: authUser[1]?.Net_client_share_in_percent || 0,
    usertype: authUser[1]?.usertype || 0,
    user_role: authUser[1]?.user_roles || null,
    profit_now: authUser[1]?.profit_now || 0,
  });

  const onSelectUser = (user_id) => {
    if (user_id !== 0 && seluserid !== user_id) {
      setSelUserid(user_id);
      const userOne = getUser(users.rows, user_id);
      // ... (update selectedUser.current)
    }
  };

  const getUser = (arr, id) => arr.find((item) => item.id == id);

  return { selectedUser, onSelectUser };
}