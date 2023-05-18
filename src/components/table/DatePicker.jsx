import { DateRangePicker } from "react-next-dates";
import { fr } from "date-fns/locale";
import { useState } from "react";
import "react-next-dates/dist/style.css";
import DateIcon from "../../svgs/DateIcon";
function DatePicker({ setFilter }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="date-picker-container">
      <DateRangePicker
        locale={fr}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        portalContainer={document.body}
        startDatePlaceholder="date debut"
        endDatePlaceholder="date fin"
      >
        {({ startDateInputProps, endDateInputProps }) => (
          <div className="input_date">
            <div className="text-xs text-[#707070] font-normal">Date</div>
            <div className="flex flex-row justify-start gap-2 items-center">
              <div className="flex flex-row justify-start gap-2 items-center">
                <span>de</span> <input {...startDateInputProps} />{" "}
                <span>à</span>
                <input {...endDateInputProps} />
              </div>
              <div className="relative top-[-5px]">
                <DateIcon />
              </div>
            </div>
          </div>
        )}
      </DateRangePicker>
    </div>
  );
}

export default DatePicker;
