
import { useState,useEffect } from "react";
import style from "./Loading.module.css"
const Loading = () => {
    return (
        <div
            className={style.lopphu}
        >
            <div className={style.dot_loading}>
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </div>
        </div>
    );
};

export default Loading;