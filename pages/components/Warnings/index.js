import styles from './warnings.module.scss';

export function Warnings() {
  return (
    <section className={styles.section}>
      <h3>Informações importantes</h3>

      <ul>
        <li>
          Na informação sobre quantidade de militares em sua escala,
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
  )
}