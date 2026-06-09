import styles from './Grid.module.css';
export const Item = ({
  xxlSpan,
  xlSpan,
  lgSpan,
  mdSpan,
  smSpan,
  children,
  className = '',
}) => {
  const spanClass = [
    styles.item,
    styles[`xxl-span-${xxlSpan}`],
    styles[`xl-span-${xlSpan}`],
    styles[`lg-span-${lgSpan}`],
    styles[`md-span-${mdSpan}`],
    styles[`sm-span-${smSpan}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return <div className={`${spanClass} ${className || ''}`}>{children}</div>;
};
