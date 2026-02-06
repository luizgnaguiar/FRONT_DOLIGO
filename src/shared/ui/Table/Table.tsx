import React from 'react';
import styles from './Table.module.css';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  width?: string | number;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function Table<T>({
  columns,
  data,
  isLoading,
  emptyMessage = 'Nenhum registro encontrado.',
}: TableProps<T>) {
  if (isLoading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  if (data.length === 0) {
    return <div className={styles.empty}>{emptyMessage}</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className={styles.th} style={{ width: col.width }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.map((item, rowIdx) => (
            <tr key={rowIdx} className={styles.tr}>
              {columns.map((col, colIdx) => (
                <td key={colIdx} className={styles.td}>
                  {typeof col.accessor === 'function'
                    ? col.accessor(item)
                    : (item[col.accessor] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
