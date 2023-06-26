import React from "react";
import { NavLink } from "react-router-dom";
 
const PageNavigation =({title})=>{ //destructure
    return(
        <>
        <NavLink to ="/" >Home</NavLink> / {title}
        </>
    )
}
export default PageNavigation;