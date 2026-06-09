import styles from './Accordion.module.css';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

export const Accordion = ({ title, children, expanded }) => {
  const [isOpen, setIsOpen] = useState(expanded || false);

  return (
    <div className={styles.accordionContainer}>
      <h3 className={styles.accordionTitle} onClick={() => setIsOpen(!isOpen)}>
        {title}
        <FiChevronDown style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </h3>
      {isOpen && <div className={styles.accordionContent}>{children}</div>}
    </div>
  );
};
