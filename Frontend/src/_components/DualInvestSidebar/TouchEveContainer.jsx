import React, { useState, useRef } from 'react';

// { children, wid=200, heg=200 }
const TouchEveContainer = (props) => {
    console.log(props, 'fdfs')
    const panRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);

    const onMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - panRef.current.offsetLeft);
        setStartY(e.pageY - panRef.current.offsetTop);
        setScrollLeft(panRef.current.scrollLeft);
        setScrollTop(panRef.current.scrollTop);
    };

    const onMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - panRef.current.offsetLeft;
        const y = e.pageY - panRef.current.offsetTop;
        const walkX = x - startX; // distance moved horizontally
        const walkY = y - startY; // distance moved vertically
        panRef.current.scrollLeft = scrollLeft - walkX;
        panRef.current.scrollTop = scrollTop - walkY;
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div className={`table-container relative w-[${props.wid}] h-[${props.heg}] overflow-auto`}
            ref={panRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            style={{height: props.heg}} >
            {props.children}
        </div>
    );
};

export default TouchEveContainer;
