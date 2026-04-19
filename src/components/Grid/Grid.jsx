import styles from './Grid.module.css';
export const Grid = ({ children, className }) => {
  return <div className={`${styles.grid} ${className || ''}`}>{children}</div>;
};
