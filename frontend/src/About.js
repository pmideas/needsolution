import React,{useContext} from 'react';
import { AppContext } from './context/productContext';

const About =()=>{
    const {myName} = useContext(AppContext); // destructring
    return(
        <>
{myName}
        <h1>About</h1>
        </>
    )
}

export default About;