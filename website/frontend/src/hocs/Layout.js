import React from "react";
import Heading from "../Header/Heading";

const Layout = (props) => {
    return (
        <>
            <div className='container-fluid p-0 m-0' style={{ backgroundColor: '#C2E3C7', minHeight: '10vh', paddingTop: '10px' }}>
                <Heading />
                <hr />
            </div>
            {props.children}
        </>
    );
};

export default Layout;
