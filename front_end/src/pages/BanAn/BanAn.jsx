
import { useEffect, useState } from "react"
import Search from "../../components/Search/Search"
import styles from "./BanAn.module.css"
import { formatCurrency } from "../../utils/format"

import table from "../../assets/icon/chair.svg"
import classNames from "classnames"
import { getTables } from "../../api/services/tableService"

export default function BanAn() {
    const [choosedStateDish, setChoosedStateDish] = useState("all")

    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    },[])

    const fetchData = async () => {
        try {
            const list = await getTables();
            setTables(list);
        } catch (error) {
            throw new Error(error);
        }
        setLoading(false);
    }

    return (
        <div className={styles.container}>
            <div className={styles.search}><Search placeHolder={"Tìm kiếm theo tên bàn..."}/> </div>

            <div className={styles.select}>
                <button onClick={()=>setChoosedStateDish("all")} className={choosedStateDish === "all" ? styles.active : ""}>Tất cả</button>
                <button onClick={()=>setChoosedStateDish("used")} className={choosedStateDish === "used" ? styles.active : ""}>Sử dụng</button>
                <button onClick={()=>setChoosedStateDish("none")} className={choosedStateDish === "none" ? styles.active : ""}>Còn trống</button>
            </div>

            <div className={styles.maincontent}> 
                {loading ? <div>Đang load dữ liệu...</div>: 
                    tables.map((tb) => (
                        <div className={classNames(styles.table)}>
                            <h5>{tb.name}</h5>
                            <div className={styles.infor}>
                                <div>
                                    <span></span>
                                    <h5></h5>
                                </div>
                                <img src={table} alt="" />
                            </div>
                        </div>
                    ))  
                }

                {/* <div className={classNames(styles.table)}>
                    <h5>Bàn 1</h5>
                    <div className={styles.infor}>
                        <div>
                            <span></span>
                            <h5></h5>
                        </div>
                        <img src={table} alt="" />
                    </div>
                </div>
                <div className={classNames(styles.table)}>
                    <h5>Bàn 1</h5>
                    <div className={styles.infor}>
                        <div>
                            <span></span>
                            <h5></h5>
                        </div>
                        <img src={table} alt="" />
                    </div>
                </div> */}

            </div>
        </div>
    )
}