import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaSave } from "react-icons/fa";
import Swal from 'sweetalert2';

function AdminRow(props) {
  const { data, editUser, deleteUser, details, isDarkMode } = props;
  console.log(data)
  const [editFlag, setEditFlag] = useState(0);
  let userData = {
    Admin_id: data.Admin_id,
    username: data.username,
    email: data.email,
    password: data.password,
    account_no: data.account_no,
    api_token: data.api_token,
    reward: data.reward,
    reward_stopout: data.reward_stopout,
    hedge: data.hedge,
    hedge_stopout: data.hedge_stopout,
    wallet: data.wallet,
    user_roles: data.user_roles,
    Net_client_share_in_percent: data.Net_client_share_in_percent,
    Total_assets_today: data.Total_assets_today,
    profit_now: data.profit_now,
    Share_of_main_account_in_percent: data.Share_of_main_account_in_percent,
    state: data.state || 0
  };

  let keys = Object.keys(data);
  const hadleEdit = () => {
    setEditFlag(1);
  }
  keys = keys.slice(1, keys.length);

  const handleSave = () => {
    setEditFlag(0);
    let wallet = Number(userData.wallet);
    userData.wallet = wallet;
    // Check if the account number already exists
    if (
      existingAccountNumbers.includes(userData.account_no) &&
      userData.account_no !== data.account_no
    ) {
      // Display an error message or prevent the save operation
      Swal.fire({
        title: 'Account number already exists!',
        icon: 'warning'
      })
      return;
    }

    editUser(data.id, userData);
  }

  const existingAccountNumbers = details.map(item => item.account_no);

  // console.log(existingAccountNumbers)
  const onChangeData = (e, field) => {
    userData[field] = e.target.value;
  }

  return (
    <div className="mb-8 mx-5">
      <div className="flex justify-between" >
        <span className="text-[#3b93eb]">{data.username}</span>
        <span className="flex items-center text-lg text-[#444] gap-4 font-syncopate-light dark:text-dark-text">
          {editFlag ? <FaSave onClick={handleSave} /> : <FaEdit onClick={hadleEdit} />}
          <FaTrashAlt onClick={() => deleteUser(data.id)} />
        </span>
      </div>
      {
        keys.map(
          (field, index) => {
            return (
              <div key={index} className="grid grid-flow-col">
                <div className="w-full grid grid-cols-3  border-r-0 border-[#999] border-solid border-b lg:p-1 lg:px-5 p-1 pl-2 text-xs ">
                  <span
                    className={`font-syncopate-light text-[#555]`}>
                    {field == 'state' ? 'PIN' : field}
                  </span>
                  <div className="col-span-2 flex justify-end">
                    <input
                      type={['wallet', 'investment', 'Net_client_share_in_percent', 'account_no', 'state'].includes(field) ? 'number' : (field === 'begin_date' ? 'date' : 'text')}
                      className={`font-syncopate-light w-[400px] ${isDarkMode
                          ? 'text-white bg-[#454545] focus:bg-[#454545]'
                          : 'text-[#555]'
                        }`}
                      onChange={(e) => onChangeData(e, field)}
                      disabled={!editFlag}
                      defaultValue={data[field]}
                    />
                  </div>
                </div>
              </div>
            )
          }
        )
      }
    </div>
  );

}

export { AdminRow };
