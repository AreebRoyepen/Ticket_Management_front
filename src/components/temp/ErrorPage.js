import React from "react";
import './style.css'
import CustomPopUp from "../Modal";

export const ErrorPage = () => (

    <div>
        <CustomPopUp content={"Something has gone wrong server side, try checking your internet connection and reloading the page"} />
    </div>

)