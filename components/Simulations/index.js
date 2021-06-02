import styles from './simulations.module.scss';

export function Simulations({weekDay, numberDay, monthAndYear}) {
  return (
    <div className={styles.simulationContainer}>
      <span className={styles.weekDay}>{weekDay}</span>
      <strong>{numberDay}</strong>
      <span className={styles.monthAndYear}>{monthAndYear}</span>
    </div>
  )
}