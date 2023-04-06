import React, { useState } from 'react';
import { DateTime } from 'luxon';
import './Appointment.css';

export function DaySelector({ luxSelectedDay = DateTime.now(), setLuxSelectedDay }) {
  const [luxInitialSelectedDay] = useState(() => luxSelectedDay);

  return Array(7).fill('').map((d, i) => {
    const luxCurrentDay = luxInitialSelectedDay.plus({ days: i });

    return <div onClick={() => setLuxSelectedDay(luxCurrentDay)}
      className={luxSelectedDay.toFormat('yyyyMMdd') === luxCurrentDay.toFormat('yyyyMMdd') ? 'day selected' : 'day'}
    >
      <div className="flex items-center px-4 py-4" >
        <div className="text-center">
          <p className="text-gray-800 dark:text-gray-300 group-hover:text-blue-700 text-sm transition-all duration-150">{luxCurrentDay.toFormat('ccc')}</p>
          <p className="text-gray-800 dark:text-gray-300 group-hover:text-blue-700 mt-3 group-hover:font-bold transition-all	duration-150">{Number(luxCurrentDay.toFormat('d'))}</p>
        </div>
      </div >
    </div>
  })
}