import React, {useEffect} from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import { add } from 'date-fns'

const locales = {
  'fi': require('date-fns/locale/fi')
}
  
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export default function CalendarApp( { trainings, fetchData } ){

  useEffect(() => {
    fetchData();
    console.log('calendar')
  }, []);

  const events = trainings.map((training)=>{
    return {
      id: training.id,
      title: `${training.activity} with ${training.customer.firstname} `,
      start: new Date(training.date),
      end: add(new Date(training.date), {minutes: training.duration}),
      allDay: false
    }
  })

  return(
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: '50px' }}
      />
    </div>
  );

}