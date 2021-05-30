import Head from 'next/head';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import ufs from '../utils/ufs.json';
import { ServiceItem } from '../components/ServiceItem';
import { Warnings } from '../components/Warnings';
import styles from './home.module.scss';

export default function Home() {

  const [state, setState] = useState('RJ');
  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [scale, setScale] = useState('');
  const [nextService, setNextService] = useState('');
  const [screenState, setScreenState] = useState(false);

  const [servicesLocalStorage, setServicesLocalStorage] = useState([]);

  useEffect(() => {
    const servicesStoraged = localStorage.getItem('@calc-sv');
    const servicesStoragedFormatted = JSON.parse(servicesStoraged);

    if (servicesStoraged) {
      setServicesLocalStorage(servicesStoragedFormatted);
    }
  }, [])

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

    const serviceReponse = response.data.response;


    setTimeout(() => {
      setNextService(response.data.response);

      setScreenState(false);

      localStorage.setItem('@calc-sv', JSON.stringify([...servicesLocalStorage, serviceReponse]));
      setServicesLocalStorage([...servicesLocalStorage, serviceReponse]);
    }, 3000)
  }

  function handleExcludeService(serviceToExclude) {
    const servicesLocalStorageFiltered = servicesLocalStorage.filter((service, index) => {
      if(index !== serviceToExclude) {
        return service;
      }
    });

    localStorage.setItem('@calc-sv', JSON.stringify(servicesLocalStorageFiltered));
    setServicesLocalStorage(servicesLocalStorageFiltered);
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
        <h3>Serviços calculados</h3>

        {servicesLocalStorage == '' && <p>Ainda não há serviços calculados</p>}

        {servicesLocalStorage.map((service, index) => (
          <ServiceItem key={`${index}/${service}`} order={index + 1} date={service} onClick={() => handleExcludeService(index)}/>
        ))}

      </section>

      <Warnings />
    </>
  );
}