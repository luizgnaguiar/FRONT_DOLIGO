import React, { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import styles from './Table.module.css';
import type { Column } from './Table';

interface VirtualTableProps<T> {
  columns: Column<T>[];
  data: T[];
  estimateRowHeight?: number;
  height?: string | number;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function VirtualTable<T>({
  columns,
  data,
  estimateRowHeight = 48,
  height = '600px',
  isLoading,
  emptyMessage = 'Nenhum registro encontrado.',
}: VirtualTableProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateRowHeight,
    overscan: 10,
  });

  if (isLoading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  if (data.length === 0) {
    return <div className={styles.empty}>{emptyMessage}</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <div
        ref={parentRef}
        className={styles.viewport}
        style={{
          height: height,
        }}
      >
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
          <tbody
            className={styles.tbody}
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const item = data[virtualRow.index];
              return (
                <tr
                  key={virtualRow.key}
                  className={`${styles.tr} ${styles.virtualTr}`}
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className={styles.td}>
                      {typeof col.accessor === 'function'
                        ? col.accessor(item)
                        : (item[col.accessor] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
