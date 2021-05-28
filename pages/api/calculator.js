import { add, parseISO, isSaturday, isSunday, format } from 'date-fns';
import localePtBr from 'date-fns/locale/pt-BR';

export default (req, res) => {
  if (req.method === 'POST') {

    const { date, quantity, scale } = req.body;

    const formattedDate = parseISO(date);

    if (scale === 'preta') {

      if(isSaturday(formattedDate) === true || isSunday(formattedDate) === true) {
        res.json({response: 'Você escolheu escala preta, entretanto, a data do seu último serviço é um sábado ou domingo.'});
        return;
      }

      let workingDays = Number(quantity);
      let nextService = add(formattedDate, {
        days: -1
      })

      while (workingDays >= 0) {

        nextService = add(nextService, {
          days: 1
        })

        if (isSaturday(nextService) === true || isSunday(nextService) === true) {
          workingDays = workingDays + 1;
        }

        workingDays = workingDays - 1;
      }

      const response = format(nextService, 'dd/MM/yyyy - (EEEE)', {locale: localePtBr});

      res.json({ response });

    } else {

      if(isSaturday(formattedDate) === false && isSunday(formattedDate) === false) {
        res.json({response: 'Você escolheu escala vermelha, entretanto, a data do seu último serviço é um dia útil.'});
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

        if (isSaturday(nextService) === true || isSunday(nextService) === true) {
          weekendDays = weekendDays - 1;
        }

        weekendDays = weekendDays;
      }

      const response = format(nextService, 'dd/MM/yyyy - (EEEE)', {locale: localePtBr});

      res.json({ response })
    }

  } else {
    res.json({ response: 'O sistema só aceita requisições POST.' })
  }

}
