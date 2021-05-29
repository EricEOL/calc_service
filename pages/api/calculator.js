import axios from 'axios';
import { add, parseISO, isSaturday, isSunday, format } from 'date-fns';
import localePtBr from 'date-fns/locale/pt-BR';

export default async (req, res) => {

  const { state, date, quantity, scale } = req.body;

  const nationalHolidays = await axios.get('http://dadosbr.github.io/feriados/nacionais.json').then(response => response.data);

  const stateHolidays = await axios.get(`http://dadosbr.github.io/feriados/estaduais/${state}.json`).then(response => response.data);

  function isHoliday(date) {

    date = format(date, 'dd/MM/yyyy', { locale: localePtBr });

    const nationalHolidaysFormatted = nationalHolidays.map(holiday => {
      return {
        date: `${holiday.date}/2021`
      }
    });
    
    const stateHolidaysFormatted = stateHolidays.map(holiday => {
      return {
        date: `${holiday.date}/2021`
      }
    });

    const matchNationalHoliday = nationalHolidaysFormatted.find(holiday => holiday.date === date);
    const matchStateHoliday = stateHolidaysFormatted.find(holiday => holiday.date === date);

    if (matchNationalHoliday !== undefined || matchStateHoliday !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  if (req.method === 'POST') {

    const formattedDate = parseISO(date);

    if (scale === 'preta') {

      if (isSaturday(formattedDate) === true || isSunday(formattedDate) === true || isHoliday(formattedDate) === true) {
        res.json({ response: 'Você escolheu escala preta, entretanto, a data do seu último serviço foi um sábado, domingo ou feriado.' });
        return;
      }

      let workingDays = Number(quantity);
      let nextService = add(formattedDate, {
        days: -1
      })

      //326773878449

      while (workingDays >= 0) {

        nextService = add(nextService, {
          days: 1
        })

        if (isSaturday(nextService) === true || isSunday(nextService) === true || isHoliday(nextService) === true ) {
          workingDays = workingDays + 1;
        }

        workingDays = workingDays - 1;
      }

      const response = format(nextService, 'dd/MM/yyyy - (EEEE)', { locale: localePtBr });

      res.json({ response });

    } else {

      if (isSaturday(formattedDate) === false && isSunday(formattedDate) === false && isHoliday(formattedDate) === false) {
        res.json({ response: 'Você escolheu escala vermelha, entretanto, a data do seu último serviço foi um dia útil.' });
        return;
      }

      let weekendDays = Number(quantity);
      let nextService = add(formattedDate, {
        days: -1
      })

      while (weekendDays >= 0) {

        nextService = add(nextService, {
          days: 1
        })

        if (isSaturday(nextService) === true || isSunday(nextService) === true || isHoliday(nextService) === true) {
          weekendDays = weekendDays - 1;
        }

        weekendDays = weekendDays;
      }

      const response = format(nextService, 'dd/MM/yyyy - (EEEE)', { locale: localePtBr });

      res.json({ response })
    }

  } else {
    res.json({ response: 'O sistema só aceita requisições POST.' })
  }

}
