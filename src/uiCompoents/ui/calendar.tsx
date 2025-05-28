import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  .react-datepicker {
    background-color: #1a1a1a;
    border: 1px solid #333;
    border-radius: 8px;
    font-family: 'Arial', sans-serif;
  }

  .react-datepicker__header {
    background-color: #2a2a2a;
    border-bottom: 1px solid #333;
    padding: 10px 0;
  }

  .react-datepicker__current-month,
  .react-datepicker__day-name {
    color: #ffffff;
    font-weight: 500;
  }

  .react-datepicker__day {
    color: #cccccc;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: #404040;
      color: #ffffff;
      border-radius: 4px;
    }
  }

  .react-datepicker__day--selected {
    background-color: #6200ea;
    color: #ffffff;
    border-radius: 4px;
    
    &:hover {
      background-color: #7c4dff;
    }
  }

  .react-datepicker__day--keyboard-selected {
    background-color: #3700b3;
    color: #ffffff;
  }

  .react-datepicker__day--outside-month {
    color: #666666;
  }

  .react-datepicker__navigation {
    top: 12px;
  }

  .react-datepicker__navigation-icon::before {
    border-color: #ffffff;
  }

  .react-datepicker__triangle {
    display: none;
  }
`;

const StyledInput = styled.input`
  padding: 10px 15px;
  background-color: #1a1a1a;
  border: 1px solid #333;
  border-radius: 6px;
  color: #ffffff;
  font-size: 16px;
  width: 200px;
  outline: none;
  
  &:focus {
    border-color: #6200ea;
    box-shadow: 0 0 5px rgba(98, 0, 234, 0.3);
  }

  &::placeholder {
    color: #666666;
  }
`;

interface CalendarProps {
  setDate: Dispatch<SetStateAction<Date | undefined>>
}

const Calendar = ({ setDate }: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(dayjs().toDate());

  return (
    <CalendarContainer>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => { 
          setSelectedDate(date)
          setDate(date ?? undefined);
        }}
        customInput={<StyledInput />}
        dateFormat="dd/MM/yyyy"
        showPopperArrow={false}
        calendarClassName="dark-calendar"
        placeholderText="Выберите дату"
      />
    </CalendarContainer>
  );
};

export default Calendar;