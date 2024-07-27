import React, { useState } from "react";
import { MdInfo } from "react-icons/md";

function BotCell({
    title,
    titleStyle,
    ValueColor,
    value,
    subValue,
    valueStyle,
    showHelpIcon,
    onHelpIconClick // New prop to handle help icon click
}) {
    const [helpIconClicked, setHelpIconClicked] = useState(false);

    const renderHTML = (htmlString) => ({ __html: htmlString });

    const handleHelpIconClick = () => {
        // Update the state or trigger any action
        setHelpIconClicked(!helpIconClicked);
        // Call the function passed through props
        if (onHelpIconClick) {
            onHelpIconClick();
        }
    };

    return (
        <div className="flex justify-between items-center">
            <div className={`flex items-center font-normal font-[inter] ${titleStyle}`}>
                <span dangerouslySetInnerHTML={renderHTML(title)} />
                {/* Conditionally render the help icon */}
                {showHelpIcon && (
                    <sup onClick={handleHelpIconClick} style={{ cursor: 'pointer' }}>
                        <MdInfo  className="text-sm ml-1"/>
                    </sup>
                )}
            </div>
            <div className={`font-normal text-right ${ValueColor ? ValueColor : 'dark:text-white '}  font-[inter] ${valueStyle}`} dangerouslySetInnerHTML={renderHTML(value)}>
                {/* {value} */}
                {subValue && <sub className="bottom-0 ml-2">{subValue + "%"}</sub>}
            </div>
        </div>
    );
}

export { BotCell };
