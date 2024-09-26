import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'
import { AdminRow } from "_components";
import { userActions, authActions } from '_store';
import { history } from '_helpers';

import logo from '../_assets/logo.png';
import goYourChart from '../_assets/goYourChart.svg';
import power from '../_assets/log-out.png';
import darkChart from '../_assets/dark-sub-client.png';

function Users({setCurrentView}) {

    const dispatch = useDispatch();
    const { user: authUser } = useSelector(x => x.auth);
    const { usersDetail } = useSelector(x => x.users);

    if(authUser[1] && authUser[1].usertype === 0) {
        history.navigate('/');
    }

    useEffect(()=>{
        dispatch(userActions.getAllUsers());
    }, []);

    const logout = () => {
        dispatch(authActions.logout())
        setCurrentView("chart");
      };

    const deleteUser = (id)=> {
        Swal.fire({
            title: 'Delete User!',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            icon: 'warning'
        }
        ).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                dispatch(userActions.deleteUser(id));
            } else
                Swal.fire(' Cancelled', '', 'error')
 
        })
    }

    const editUser = (id, userData)=> {
        let data = userData;
        data.id = id;
        dispatch(userActions.updateUser(data));
    }

    return (
        <div className="h-[40rem] overflow-y-auto">
            <div className="py-4 mx-24">
                <img width={96} height={96} src={logo} className="pb-3" alt=""  />
                <div className="flex gap-6 justify-between items-center">
                    <div>
                        <p className="text-lg block lg:text-xl bg-gradient-to-r from-[#9327E8] to-30% to-[#3B93EB] text-transparent bg-clip-text whitespace-nowrap font-syn-regular">
                            <span>{ authUser[1].username }</span>
                        </p>
                    </div>
                    <NavLink to="/" className="flex items-center gap-3 font-syn-regular">
                        <img width={150}  height={100} src={goYourChart}  className=" inline-block dark:hidden" alt="go your chart" property="true" />
                        <span className='hidden text-[12px] text-white dark:block dark:text-dark-text'>Go your Chart </span>{' '} <img width={30} src={darkChart} className='hidden dark:block' alt="power" />
                    </NavLink>
                    <button className="ml-10 inline-flex items-center text-xs bg-gradient-to-r from-[#777] to-[#0094FF] from-10% to-100% text-transparent bg-clip-text" onClick={()=>logout()}>
                        Logout<img height={37} width={29} src={power} alt="power" />
                    </button>
                </div>

                <div className="grid grid-cols-1 mt-8 w-full">
                { 
                    usersDetail && usersDetail.rows && usersDetail.rows.map((e) => {
                        return <AdminRow editUser={editUser} deleteUser={deleteUser} key={e.id} data={e} details={usersDetail.rows}/>;
                    })
                }
                </div>
            </div>
        </div>
    );
};

export { Users };


