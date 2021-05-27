import { add, parseISO, isSaturday, isSunday, format } from 'date-fns';

export default (req, res) => {
  if (req.method === 'POST') {

    const { date, quantity, scale } = req.body;

    const formattedDate = parseISO(date);

    if (scale === 'preta') {

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

      nextService = format(nextService, 'dd/MM/yyyy');

      res.json({ nextService });

    } else {
      res.json({ nextService: 'Escala vermelha.' })
    }

  } else {
    res.json({ error: 'O sistema só aceita requisições POST.' })
  }

}
