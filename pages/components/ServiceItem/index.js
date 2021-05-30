import Image from 'next/image';
import styles from './serviceItem.module.scss';

export function ServiceItem({order, date, onClick}) {
  return (
    <div className={styles.serviceItem}>
      <span>{order}</span>
      <strong>{date}</strong>
      <button><Image src="/icon/garbage-can.svg" width={20} height={20} onClick={onClick}/></button>
    </div>
  )
}