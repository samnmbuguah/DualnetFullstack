import { useEffect, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { authActions } from "_store";
import { Credentials } from "_components";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirm: Yup.boolean()
    .oneOf([true], "You must accept the terms of service")
    .required("You must accept the terms of service"),
});

function Login() {
  const dispatch = useDispatch();
  const authUser = useSelector((x) => x.auth.user);
  const [isEye, setIsEye] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // redirect to home if already logged in
    if (authUser) navigate("/");
  }, [authUser, navigate]);

  // form validation rules

  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm()
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  //get current screen width
  let screenWidth = window.innerWidth;

  function onSubmit({ email, password }) {
    const lowercaseEmail = email.toLowerCase();
    dispatch(authActions.login({ email: lowercaseEmail, password }))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Login failed:', error);
        // You can show an error message to the user here
      });
  }

  return (
    <>
      {/* check whether pc or mobile version */}
      {screenWidth > 425 ? ( //pc version
        <div className=" md:grid place-items-center md:min-w-[564px]">
          <Credentials>
            <form
              method="post"
              onSubmit={handleSubmit(onSubmit)}
              className="w-auto h-full flex justify-center items-center flex-col px-10 py-8 dark:from-[rgb(147, 39, 232)] dark:to-[#454555] dark:from-0 dark:to-90%"
            >
              <h1
                style={{ fontFamily: "'tomorrow-medium', sans-serif" }}
                className="drop-shadow-xl text-center text-3xl leading-7 whitespace-nowrap text-[#887F6F] dark:from-[#3A3737] dark:to-[#44AAFF]"
              >
                Welcome into <br /> dualnet
              </h1>

              <div
                style={{ fontFamily: "'tomorrow-medium', sans-serif" }}
                className="text-center font-medium mt-8 tracking-[0.48] text-[#7c7c7c] dark:text-[#887F6F]"
              >
                <h1 className="text-3xl">Sign in</h1>
              </div>

              <div
                style={{ fontFamily: "'tomorrow-light', sans-serif" }}
                className="my-12 w-full flex justify-center items-center flex-col"
              >
                <input
                  className={`bg-transparent border-b-[1px] border-black font-tomorrow-light outline-none p-2 text-lg text-[#887F6F] placeholder:text-[rgb(107,102,109)] w-auto ${
                    errors.email ? "is-invalid" : ""
                  } dark:placeholder:text-[#887F6F] dark:border-orange-300`}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email *"
                  {...register("email")}
                />
                <div className="text-red-500 text-sm h-3">
                  {errors.email?.message}
                </div>
                <div className="relative">
                  <input
                    className={`bg-transparent border-b-[1px] border-black outline-none p-2 text-lg font-syncopate-light text-[#887F6F] placeholder:text-[rgb(107,102,109)] mt-5 w-auto ${
                      errors.password ? "is-invalid" : ""
                    } dark:placeholder:text-[#887F6F] dark:border-orange-300`}
                    type={isEye ? "password" : "text"}
                    name="password"
                    id="password"
                    placeholder="Password *"
                    {...register("password")}
                  />
                  <span
                    className="absolute top-8 right-1 text-lg"
                    onClick={() => setIsEye(!isEye)}
                  >
                    {isEye ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                <div className="text-red-500 text-sm h-3">
                  {errors.password?.message}
                </div>
              </div>

              <div className="mt-5 text-center">
                <div
                  style={{ fontFamily: "'tomorrow-medium', sans-serif" }}
                  className="mt-4"
                >
                  <input
                    type="checkbox"
                    name="confirm"
                    id="confirm"
                    {...register("confirm")}
                  />{" "}
                  <span
                    data-tooltip-id="disclaimerTooltip"
                    className="text-[rgb(105,105,105) text-sm dark:text-[#887F6F]"
                  >
                    I accept Terms of Service**
                  </span>
                  <ReactTooltip
                    id="disclaimerTooltip"
                    place="right"
                    type="light"
                    style={{
                      width: "400px",
                      color: "#D6AC7C",
                      textAlign: "left",
                    }}
                  >
                    <div>
                      <h2>Disclaimer:</h2>
                      <p className="mb-1">
                        Sie bestätigen durch Einloggen oder durch Anmelden, dass
                        Sie von den folgenden Bedingungen Kenntnis genommen
                        haben:
                      </p>
                      <ul>
                        <li className="mb-1">
                          Die Plattform ist nur ein Spiegel ihres Kontos. Es
                          werden keine veränderbaren Daten von unserem Server
                          über die API-Schnittstelle transportiert. Alle Daten
                          sind read-only.
                        </li>
                        <li className="mb-1">
                          Der Nutzer handelt selbst, in eigenem Interesse,
                          entscheidet selbst und ist selbst verantwortlich für
                          seinen Account.
                        </li>
                        <li className="mb-1">
                          Der Plattformbetreiber stellt nur die Software zur
                          Verfügung. Er gibt keine Beratung und keine
                          Anweisungen.
                        </li>
                        <li className="mb-1">
                          Der Nutzer tritt durch Anmeldung und Registrierung in
                          keiner Art und Weise in ein Vertragsverhältnis mit dem
                          Verein Dualnet, dem Softwarebereitsteller, ein.
                        </li>
                        <li className="mb-1">
                          Der Nutzer erklärt sich durch Anmeldung mit allen
                          aufgeführten Artikeln einverstanden.
                        </li>
                        <li className="mb-1">
                          Wir verwenden keine Cookies und sammeln keine Daten.
                          Wir speichern auch keine Daten.
                        </li>
                      </ul>
                    </div>
                  </ReactTooltip>
                </div>
                <div
                  style={{ fontFamily: "'tomorrow-light', sans-serif" }}
                  className="text-red-500 font-normal text-sm mb-2"
                >
                  {errors.confirm?.message}
                </div>
                <button
                  disabled={formState.isSubmitting}
                  style={{ fontFamily: "'tomorrow-medium', sans-serif" }}
                  className="text-[#887F6F] bg-neutral-800 border border-orange-300 w-full px-20 py-1 rounded-3xl mb-3"
                >
                  {formState.isSubmitting && (
                    <span className="spinner-border spinner-border-sm me-1"></span>
                  )}
                  Sign In
                </button>
                <br />
                {/* <NavLink to="/forgot" className="text-sm text-[rgb(87,87,87)] text-center">ORGOT YOUR PASSWORD?</NavLink> */}
              </div>

              <NavLink
                style={{ fontFamily: "'tomorrow-medium', sans-serif" }}
                className="text-base mt-5 text-center whitespace-nowrap dark:text-[#887F6F] underline"
                to="/signup"
              >
                not a member? Sign up now!
              </NavLink>
            </form>
          </Credentials>
        </div>
      ) : (
        // mobile version
        <div className="md:hidden grid place-items-center">
          <Credentials>
            <form
              method="post"
              onSubmit={handleSubmit(onSubmit)}
              className="w-auto h-full flex justify-center items-center flex-col pt-[35px] pb-[115px] dark:from-[rgb(147, 39, 232)]"
            >
              <h1 className="login-title text-center text-base whitespace-nowrap bg-gradient-to-r from-[#483e4e] to-[#7df04a] from-10% to-100% text-transparent bg-clip-text dark:text-[#887F6F]">
                Welcome into <br /> dualnet
              </h1>

              <div className="text-center mt-[19px] text-[#887F6F]">
                <h1 className="text-base">Login</h1>
              </div>

              <div className="w-full flex justify-center items-center flex-col">
                <p className="text-base text-center mt-[53px] text-[#887F6F]">
                  E-MAIL
                </p>
                <input
                  className={`bg-transparent border-b-[1px] text-sm border-[#544A4A] font-roboto outline-none p-2 text-[#887F6F] placeholder:text-[rgb(107,102,109)] w-auto text-center ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  type="email"
                  name="email"
                  id="email"
                  {...register("email")}
                />
                <div className="text-red-500 text-sm h-3">
                  {errors.email?.message}
                </div>
                <div className="relative">
                  <p className="text-base text-center mt-[32px] text-[#887F6F]">
                    PASSWORD
                  </p>
                  <input
                    className={`bg-transparent border-b-[1px] text-sm	border-[#544A4A] font-roboto outline-none p-2 text-[#887F6F] placeholder:text-[rgb(107,102,109)] text-center w-auto ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    type={isEye ? "password" : "text"}
                    name="password"
                    id="password"
                    {...register("password")}
                  />
                  {/* <span className='absolute top-8 right-1 text-lg' onClick={()=>setIsEye(!isEye)} >{isEye?<FaEye />: <FaEyeSlash />}</span> */}
                </div>
                <div className="text-red-500 text-sm h-3">
                  {errors.password?.message}
                </div>
              </div>

              <div className="mt-[38px] text-center">
                <div className="my-4">
                  <input
                    type="checkbox"
                    name="confirm"
                    id="confirm"
                    {...register("confirm")}
                  />{" "}
                  <span
                    data-tooltip-id="disclaimerTooltip"
                    className="text-[rgb(105,105,105) text-sm dark:text-[#887F6F]"
                  >
                    I accept Terms of Service**
                  </span>
                  <ReactTooltip
                    id="disclaimerTooltip"
                    place="right"
                    type="light"
                    style={{
                      width: "400px",
                      color: "#D6AC7C",
                      textAlign: "left",
                    }}
                  >
                    <div>
                      <h2>Disclaimer:</h2>
                      <p className="mb-1">
                        Sie bestätigen durch Einloggen oder durch Anmelden, dass
                        Sie von den folgenden Bedingungen Kenntnis genommen
                        haben:
                      </p>
                      <ul>
                        <li className="mb-1">
                          Die Plattform ist nur ein Spiegel ihres Kontos. Es
                          werden keine veränderbaren Daten von unserem Server
                          über die API-Schnittstelle transportiert. Alle Daten
                          sind read-only.
                        </li>
                        <li className="mb-1">
                          Der Nutzer handelt selbst, in eigenem Interesse,
                          entscheidet selbst und ist selbst verantwortlich für
                          seinen Account.
                        </li>
                        <li className="mb-1">
                          Der Plattformbetreiber stellt nur die Software zur
                          Verfügung. Er gibt keine Beratung und keine
                          Anweisungen.
                        </li>
                        <li className="mb-1">
                          Der Nutzer tritt durch Anmeldung und Registrierung in
                          keiner Art und Weise in ein Vertragsverhältnis mit dem
                          Verein Dualnet, dem Softwarebereitsteller, ein.
                        </li>
                        <li className="mb-1">
                          Der Nutzer erklärt sich durch Anmeldung mit allen
                          aufgeführten Artikeln einverstanden.
                        </li>
                        <li className="mb-1">
                          Wir verwenden keine Cookies und sammeln keine Daten.
                          Wir speichern auch keine Daten.
                        </li>
                      </ul>
                    </div>
                  </ReactTooltip>
                </div>
                <button
                  disabled={formState.isSubmitting}
                  className="text-[#887F6F] bg-neutral-800 border border-orange-300 w-full px-[28px] py-[7px] rounded-3xl mb-3"
                >
                  {formState.isSubmitting && (
                    <span className="spinner-border spinner-border-sm me-1"></span>
                  )}
                  Sign in
                </button>
                <br />
                {/* <NavLink to="/forgot" className="text-sm text-[rgb(87,87,87)] text-center">sure ... share ?</NavLink>  */}
              </div>

              <NavLink
                className="text-base text-[#887F6F] text-opacity-68 text-center"
                to="/signup"
              >
                Forgot Your Password
              </NavLink>
            </form>
          </Credentials>
        </div>
      )}
    </>
  );
}

export { Login };