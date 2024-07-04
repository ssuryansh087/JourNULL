import React from "react";
import NavBar from "../components/NavBar";
import ToDoLeft from "./components/ToDoLeft";
import ToDoRight from "./components/ToDoRight";
import Footer from "../components/Footer";

function ToDo(){
    return(
        <>
            <NavBar />
            <div style={{display: "flex"}}>
            <ToDoLeft />
            <ToDoRight />
            </div>
            <Footer />
        </>
    )
}

export default ToDo;