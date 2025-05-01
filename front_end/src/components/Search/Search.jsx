import styles from "./Search.module.css";
import iconSearch from "../../assets/icon/iconSearch.svg"
import { useState } from "react";

export default function Search({onSearch, placeHolder}) {
    const [keyword, setKeyword] = useState('');

    const handleInputChange = (e) => {
        setKeyword(e.target.value);
    };

    const handleSearch = () => {
        onSearch(keyword);
    };

    return (
        <div className={styles.divSearch}>
            <input 
                type="text" 
                placeholder={placeHolder}
                value={keyword}
                onChange={handleInputChange}
                onKeyDown={handleSearch}
            />
            <img src={iconSearch} alt="" onClick={handleSearch}/>
        </div>
    )
}