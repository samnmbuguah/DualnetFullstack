import React from "react";

function AmountCell({
    title,
    color,
    value,
    subValue,
    headingColor,
    active = false,
    ownstyle = "t-heading md:text-[11px] text-[16px]",
    ownstyle2 = "text-[18px]",
}) {
    const renderHTML = (htmlString) => ({ __html: htmlString });
    return (

        <div className="flex justify-between items-center">
            <div className="dark:text-stone-300 font-bold" dangerouslySetInnerHTML={renderHTML(title)} />
            <div className={`text-right ${color ? color : 'text-[#BD905D]' }  font-[syncopate-light] text-lg font-bold`}>
                {value}
            {subValue && <sub className="bottom-0 ml-2">{subValue + "%"}</sub>}
            </div>

        </div>
    );
}

export { AmountCell };
