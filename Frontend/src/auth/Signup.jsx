import { useEffect } from 'react';
import {Tooltip as ReactTooltip} from "react-tooltip";
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { Credentials } from "_components";
import { authActions } from '_store';
import { history } from '_helpers';



function Signup() {

    const dispatch = useDispatch();
    const authUser = useSelector(x => x.auth.user);

    useEffect(() => {
      // redirect to home if already logged in
      if (authUser) history.navigate("/");
    }, [authUser]);
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
        email: Yup.string()
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        repassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        confirm: Yup.boolean().oneOf([true], 'You must accept the terms of service').required('You must accept the terms of service'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(user) {
        console.log('user,',user);
        const userData = { ...user, email: user.email.toLowerCase() };
        console.log('after update',userData);

        return dispatch(authActions.signup(userData));
    }

    return (
        <div className="grid place-items-center md:min-w-[564px]">
            <Credentials>
                <form onSubmit={handleSubmit(onSubmit)}
                    className="w-full h-full flex justify-center items-center flex-col  px-10 py-8">
                    <h1 
                    style={{ fontFamily: "'tomorrow-medium', sans-serif" }}
                    className="text-center text-xl md:text-3xl leading-7 bg-gradient-to-r from-[#3b3a3a] to-[#db9235] from-10% to-100% bg-clip-text text-[#887F6F]">
                    Sign up
                    </h1>

                    <div className="text-center mt-5 text-[#887F6F]">
                    <p 
                    style={{ fontFamily: "'tomorrow-medium', sans-serif" }}                    
                    className="text-md">
                        Dualnet service allows you to  <br /> monitor your accounts.
                    </p>
                    </div>

                    <div 
                    style={{ fontFamily: "'tomorrow-medium', sans-serif" }}
                    className="mt-3 md:mt-10 w-full flex justify-center items-center flex-col">
                    <input
                        required
                        className="bg-transparent border-b-2 border-black outline-none p-1 md:p-2 text-sm md:text-base  text-[#887F6F] placeholder:text-[#887F6F] w-full md:w-auto dark:placeholder:text-[#887F6F] dark:border-orange-300"
                        name="email" 
                        type="email" 
                        {...register('email')}
                        id="email"
                        placeholder="Email *"
                    />
                    <div className="text-red-500 text-xs h-3">{errors.email?.message}</div>
                    <input
                        required
                        className="bg-transparent border-b-2 border-black outline-none p-1 md:p-2 text-sm md:text-base  text-[#887F6F] placeholder:text-[#887F6F] w-full md:w-auto dark:placeholder:text-[#887F6F] dark:border-orange-300"
                        name="username" 
                        type="text" 
                        {...register('username')}
                        id="username"
                        placeholder="Username *"
                    />
                    <div className="text-red-500 text-xs h-3">{errors.username?.message}</div>
                    
                    <input
                        required
                        className="bg-transparent border-b-2 border-black outline-none p-1 md:p-2 text-sm md:text-base  text-[#887F6F] placeholder:text-[#887F6F] mt-2 w-full md:w-auto dark:placeholder:text-[#887F6F] dark:border-orange-300"
                        name="password" 
                        type="password" 
                        {...register('password')}
                        id="password"
                        placeholder="Password *"
                    />
                    <div className="text-red-500 text-xs h-3">{errors.password?.message}</div>
                    <input
                        required
                        className="bg-transparent border-b-2 border-black outline-none p-1 md:p-2 text-sm md:text-base  text-[#887F6F] placeholder:text-[#887F6F] mt-2 w-full md:w-auto dark:placeholder:text-[#887F6F] dark:border-orange-300"
                        name="repassword" 
                        type="password" 
                        {...register('repassword')}
                        id="repassword"
                        placeholder="Confirm Password *"
                    />
                    <div className="text-red-500 text-xs h-3">{errors.repassword?.message}</div>
                    </div>

                    <div 
                    style={{ fontFamily: "'tomorrow-medium', sans-serif" }}
                    className=" text-center">
                        <div className="my-4">
                            <input type="checkbox" name="confirm" id="confirm" {...register("confirm")}/>{" "}
                            <span 
                            data-tooltip-id="disclaimerTooltip"
                            className="text-[rgb(105,105,105) text-sm dark:text-[#887F6F]">
                            I accept Terms of Service**
                            </span>
                            <ReactTooltip id="disclaimerTooltip" place='right' type="light" style={{ width: '400px',color: '#D6AC7C',textAlign:'left' }}>
                                <div>
                                    <h2>Disclaimer:</h2>
                                    <p className='mb-1'>Sie bestätigen durch Einloggen oder durch Anmelden, dass Sie von den folgenden Bedingungen Kenntnis genommen haben:</p>
                                    <ul>
                                        <li className='mb-1'>Die Plattform ist nur ein Spiegel ihres Kontos. Es werden keine veränderbaren Daten von unserem Server über die API-Schnittstelle transportiert. Alle Daten sind read-only.</li>
                                        <li className='mb-1'>Der Nutzer handelt selbst, in eigenem Interesse, entscheidet selbst und ist selbst verantwortlich für seinen Account.</li>
                                        <li className='mb-1'>Der Plattformbetreiber stellt nur die Software zur Verfügung. Er gibt keine Beratung und keine Anweisungen.</li>
                                        <li className='mb-1'>Der Nutzer tritt durch Anmeldung und Registrierung in keiner Art und Weise in ein Vertragsverhältnis mit dem Verein Dualnet, dem Softwarebereitsteller, ein.</li>
                                        <li className='mb-1'>Der Nutzer erklärt sich durch Anmeldung mit allen aufgeführten Artikeln einverstanden.</li>
                                        <li className='mb-1'>Wir verwenden keine Cookies und sammeln keine Daten. Wir speichern auch keine Daten.</li>
                                    </ul>
                                </div>
                            </ReactTooltip>
                            
                        </div>
                        <div 
                            style={{ fontFamily: "'tomorrow-light', sans-serif" }}
                            className="text-red-500 font-normal text-sm mb-2">
                            {errors.confirm?.message}
                        </div>
                        <button
                            disabled={formState.isSubmitting}
                            className="text-[#887F6F] bg-neutral-800 border border-orange-300 w-full md:px-20 py-1 rounded-3xl mb-5 whitespace-nowrap"
                            >
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}Sign up
                        </button>
                    </div>

                    <div
                    style={{ fontFamily: "'tomorrow-medium', sans-serif" }}
                    className="mt-3 text-center">
                    <span className="text-[rgb(105,105,105)  text-base dark:text-[#887F6F]">
                        Already have an account?{" "}
                    </span>
                    <NavLink
                        className="text-base mt-5 text-center whitespace-nowrap dark:text-[#887F6F] underline"
                        to="/login">
                        Sign in
                    </NavLink>
                    </div>
                </form>
            </Credentials>
        </div>
    );
}

export { Signup };