import Image from 'next/image';
import { useState } from 'react';
import styles from './serviceItem.module.scss';

export function ServiceItem( props ) {

  const [showDropdown, setShowDropdown] = useState(false);

  function handleChangeDropdowItemService() {
    if (showDropdown === false) {
      setShowDropdown(true);
      return;
    } else {
      setShowDropdown(false);
      return;
    }
  }

  return (
    <>
      <div className={styles.serviceItem}>
        <div className={styles.header}>

          <button
            onClick={handleChangeDropdowItemService}
          >
            <Image src={showDropdown ? "/icon/up-arrow.svg" : "/icon/down-arrow.svg"} width={15} height={15} />
          </button>

          <strong>{props.serviceCalculated}</strong>

          <button>
            <Image src="/icon/garbage-can.svg" width={20} height={20} onClick={props.onClick} />
          </button>

        </div>
      </div>
      <div className={showDropdown ? styles.dropdownInformationsShow : styles.dropdownInformationsHidden}>
        <span><strong>Último serviço: </strong>{props.lastService}</span>
        <span><strong>Escala: </strong>{props.scale}</span>
        <span><strong>Militares: </strong>{props.quantity}</span>
        <span><strong>Estado: </strong>{props.state}</span>
      </div>
    </>
  )
}