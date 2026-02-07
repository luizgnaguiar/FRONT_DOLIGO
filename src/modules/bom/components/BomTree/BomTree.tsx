import React, { useState } from 'react';
import type { BomComponentDTO } from '@api/dtos/bom';
import { Text } from '@shared/ui';
import styles from './BomTree.module.css';

interface BomTreeProps {
  components: BomComponentDTO[];
  level?: number;
}

export const BomTree: React.FC<BomTreeProps> = ({ components, level = 0 }) => {
  return (
    <ul className={styles.treeList} style={{ marginLeft: level > 0 ? '20px' : '0' }}>
      {components.map((component) => (
        <BomTreeNode key={component.id} component={component} level={level} />
      ))}
    </ul>
  );
};

const BomTreeNode: React.FC<{ component: BomComponentDTO; level: number }> = ({ component, level }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = component.components && component.components.length > 0;

  return (
    <li className={styles.treeNode}>
      <div className={styles.nodeContent} onClick={() => hasChildren && setIsExpanded(!isExpanded)}>
        {hasChildren ? (
          <span className={`${styles.toggle} ${isExpanded ? styles.expanded : ''}`}>
             ▶
          </span>
        ) : (
          <span className={styles.dot}>•</span>
        )}
        <Text size="sm" weight="medium" className={styles.sku}>{component.sku}</Text>
        <Text size="sm" className={styles.name}>{component.name}</Text>
        <Text size="xs" color="neutral" className={styles.quantity}>
          {component.quantity} {component.unit}
        </Text>
      </div>
      {hasChildren && isExpanded && component.components && (
        <BomTree components={component.components} level={level + 1} />
      )}
    </li>
  );
};
