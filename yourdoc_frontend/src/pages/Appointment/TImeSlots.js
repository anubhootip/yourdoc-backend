import React from 'react';
import { DateTime, Interval } from 'luxon';
import './Appointment.css';

export function TimeSlots({
  selectedDay = 'mon', selectedTimes = [], availableSlots = [],
  setSelectedTimes
}) {
  const gapInMinutes = 30;
  const selectedDaySlots = availableSlots.filter(as => as.day.toLowerCase() === selectedDay.toLowerCase());
  const slots = [];

  selectedDaySlots.forEach(sds => {
    const { day, from_time: from, to_time: to, isAvailable = true } = sds;
    const startTime = DateTime.fromFormat(from + ' ' + day, 'HH:mm:ss ccc');
    const endTime = DateTime.fromFormat(to + ' ' + day, 'HH:mm:ss ccc');
    const noOfTimesLoop = Math.round(Interval.fromDateTimes(startTime, endTime).length('minutes') / gapInMinutes);

    slots.push(Array(noOfTimesLoop).fill('').map((d, i) => {
      const time = startTime.plus({ minutes: gapInMinutes * i }).toFormat('HH:mm');
      const isSelectedTime = selectedTimes.includes(time);
      return <div key={time}>
        <button onClick={() => setSelectedTimes([time])} className={isSelectedTime ? "btnTime selected" : "btnTime"} disabled={!isAvailable} type="button">
          {time}
        </button>
      </div>
    }))
  })

  return <div className="grid grid-rows-6 grid-flow-col gap-1">
    {slots}
  </div>
}
