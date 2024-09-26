// import bg from  'images/loginBack.jpg';

function Credentials({ children }) {
  let screenWidth = window.innerWidth;
  return (
    <div className=" mx-auto flex justify-center items-center flex-col">
      {/* <div className="flex justify-start items-start w-full">
        <img width={96} height={96} className="my-[30px] md:my-0 md:mb-5" src={logo} alt="logo" />
      </div> */}
      {screenWidth > 425 ? ( //pc version
        <div
          border-radius="0px 10px 10px 0px"
          className={`md:flex justify-between items-center w-full h-auto rounded-2xl overflow-hidden  credentialBack`}
        >
          <div className="w-auto">{children}</div>
          <div className="w-475px"></div>
        </div>
      ) : (
        <div
          className={`md:hidden md:flex justify-between items-center w-full h-auto rounded overflow-hidden  credentialBack`}
        >
          <div className="w-auto">{children}</div>
          <div className="w-[50%]"></div>
        </div>
      )}
    </div>
  );
}

export { Credentials };
