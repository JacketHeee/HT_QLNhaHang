import React from 'react';
import styles from './Table.module.css';

const Table = ({ columns = [], data = [], actions }) => {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {columns.map(col => (
                            <th key={col.key} className={styles.th}>
                                {col.title}
                            </th>
                        ))}
                        {actions && <th className={styles.th}>Hành động</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} className={styles.tr}>
                            {columns.map(col => (
                                <td key={col.key} className={styles.td}>
                                    {col.render ? col.render(row) : row[col.key]}
                                </td>
                            ))}
                            {actions && (
                                <td className={styles.td}>
                                    {actions(row)}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {data.length === 0 && (
                <div className={styles.empty}>Không có dữ liệu</div>
            )}
        </div>
    );
};

export default Table;