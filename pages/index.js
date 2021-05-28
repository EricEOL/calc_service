import { useState } from 'react';
import { api } from '../services/api';
import styles from './home.module.scss';

export default function Home() {

  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [scale, setScale] = useState('');
  const [nextService, setNextService] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      date,
      quantity,
      scale
    }

    const response = await api.post('calculator', data);

    setNextService(response.data.response);
  }

  return (
    <>
      <header className={styles.homeHeader}>
        <h1>Calculadora de Serviço</h1>
        <span>Descubra qual será seu próximo serviço</span>
      </header>

      <main className={styles.homeMain}>

        <strong>Nós precisamos de algumas informações para realizar o cálculo</strong>

        <form onSubmit={handleSubmit}>

          <div className={styles.divInput}>
            <label>Qual foi o último serviço que você tirou ?</label>
            <input 
              type="date" 
              name="date" 
              onChange={(event) => setDate(event.target.value)} 
            />
          </div>

          <div className={styles.divInput}>
            <label>Existem quantos militares na sua escala ?</label>
            <input 
              type="number" 
              name="quantity" 
              onChange={(event) => setQuantity(event.target.value)} 
              placeholder="Inclusive você"
            />
          </div>

          <div className={styles.divInput}>
            <label>Qual escala você deseja saber ?</label>
            <div className={styles.scaleButtons}>
              <button className={scale == 'preta' ? styles.activeButton : undefined} onClick={() => setScale('preta')} type="button">Preta</button>
              <button className={scale == 'vermelha' ? styles.activeButton : undefined} onClick={() => setScale('vermelha')} type="button">Vermelha</button>
            </div>
          </div>

          <button type="submit" disabled={!scale && true}>Calcular</button>
        </form>

        {!!nextService && <strong>{nextService}</strong>}

      </main>
    </>
  );
}