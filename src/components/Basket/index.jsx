import styles from './Basket.module.css';

export const Basket = () => {
  function dragoverHandler(ev) {
    ev.preventDefault();
  }

  const dropHandler = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const url = data;
    const elem = document.createElement('a');
    elem.innerHTML = url;
    console.log(data);
    event.target.appendChild(elem);
  }

  return (
    <div className={styles.basket} onDrop={() => dropHandler(event)} onDragOver={() => dragoverHandler(event)}>
      
    </div>
  );
};

//export default Basket;