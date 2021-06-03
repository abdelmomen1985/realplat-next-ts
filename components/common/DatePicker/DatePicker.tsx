import React, { useState } from 'react'
import styles from './datePicker.module.scss'
import DayPicker from 'react-day-picker';


const DatePicker = () => {
  const [selectedDay, setSelectedDay] = useState(undefined)
  const handleDateClick = (data: any) => { // bind with an arrow function
    console.log('args', data)
    // console.log(selected)
  }
  return (
    <div className="col-span-2">
      <DayPicker
        selectedDays={selectedDay}
        onDayClick={handleDateClick}
      />
    </div>
  )
}

export default DatePicker
