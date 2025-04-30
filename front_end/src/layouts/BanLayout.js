import  {Outlet, useParams} from "react-router-dom";

import Header from "../components/Header/Header";
import Menu from "../pages/Menu/Menu";
import "../App.css"

export default function BanLayout() {
    const {id} = useParams(); 

    return (
        <div className="app">
            <div className="main">  
                <Header title={id}/>  
                <Outlet/>   
            </div>
        </div>
    )
}