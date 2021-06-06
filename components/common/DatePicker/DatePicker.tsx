import React, { useState } from 'react'
import styles from './datePicker.module.scss'
import DayPicker from 'react-day-picker';


const DatePicker = ({ meetingDates }: { meetingDates: any[] }) => {
  // const [selectedDays, setSelectedDays] = useState([])
  const handleDateClick = (data: any) => { // bind with an arrow function
    console.log('args', data.toISOString())
    console.log('args', data)
    // console.log(selected)
  }

  return (
    <div className="col-span-2">
      <DayPicker
        selectedDays={meetingDates}
        onDayClick={handleDateClick}
        className={styles.calender}
      />
    </div>
  )
}

export default DatePicker
