import Head from 'next/head';
import { useState } from 'react';
import { api } from '../services/api';
import ufs from '../utils/ufs.json';
import styles from './home.module.scss';

export default function Home() {

  const [state, setState] = useState('RJ');
  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [scale, setScale] = useState('');
  const [nextService, setNextService] = useState('');
  const [screenState, setScreenState] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if ((date === '') || (quantity === '') || (scale === '') || (state === '')) {
      setNextService('Você não preencheu todos os campos.');
      return;
    }

    setScreenState(true);

    const data = {
      state,
      date,
      quantity,
      scale
    }

    const response = await api.post('calculator', data);

    setTimeout(() => {
      setNextService(response.data.response);

      setScreenState(false);
    }, 3000)
  }

  return (
    <>
      <Head><title>Calculadora de Serviço</title></Head>

      <header className={styles.homeHeader}>
        <h1>Calculadora de Serviço</h1>
        <span>Descubra qual será seu próximo serviço</span>
      </header>

      <main className={styles.homeMain}>

        <strong>São necessárias algumas informações para realizar o cálculo</strong>

        <form onSubmit={handleSubmit}>

          <div className={styles.divInput}>
            <label>Qual é o Estado(UF) ?</label>
            <select name="ufs" defaultValue="RJ" onChange={(event) => setState(event.target.value)}>
              {ufs.uf.map(uf => (
                <option key={uf.nome} value={uf.sigla}>{uf.sigla}</option>
              ))}
            </select>
          </div>

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

          <button type="submit" disabled={!scale && true} onClick={() => setNextService('')}>Calcular</button>
        </form>


        {!!screenState && <div className={styles.loading}></div>}

        {!!nextService && <p className={styles.response}>{nextService}</p>}

      </main>

      <section className={styles.section}>
        <h3>Informações importantes</h3>

        <ul>
          <li>
            Na informações sobre quantidade de militares em sua escala,
            a pessoa que está preenchendo deve incluir a si próprio na contagem.
          </li>

          <li>
            Não coloque seu último serviço incompatível com a escala que você deseja saber,
            ou seja, não é possível colocar uma data de final de semana e pedir para calcular
            a escala preta e vice-versa.
          </li>

          <li>
            A aplicação considera feriados nacionais e estaduais que possuem data fixa, ou seja,
            não considera feriados que são a "10ª quinta-feira após o feriado X".
          </li>
        </ul>

      </section>
    </>
  );
}