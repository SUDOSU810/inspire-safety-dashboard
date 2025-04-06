
import React, { useContext } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCalendar } from "./calendar-store";
import { CalendarContext } from "./calendar-context";
import Combobox from "./combobox";
import { monthsForLocale, daysForLocale, cn } from "./utils";
import { getDay, getDaysInMonth, isSameDay } from "date-fns";

// Out of bounds day component
export const OutOfBoundsDay = ({ day }) => (
  <div className="p-1 text-muted-foreground text-xs">
    {day}
  </div>
);

// Calendar components
export const CalendarDatePicker = ({ className, children }) => (
  <div className={cn('flex items-center gap-1', className)}>{children}</div>
);

export const CalendarMonthPicker = ({ className }) => {
  const { month, setMonth } = useCalendar();
  const { locale } = useContext(CalendarContext);

  return (
    <Combobox
      className={className}
      value={month.toString()}
      setValue={(value) => setMonth(Number.parseInt(value))}
      data={monthsForLocale(locale).map((month, index) => ({
        value: index.toString(),
        label: month,
      }))}
      labels={{
        button: 'Select month',
        empty: 'No month found',
        search: 'Search month',
      }}
    />
  );
};

export const CalendarYearPicker = ({ className, start, end }) => {
  const { year, setYear } = useCalendar();

  return (
    <Combobox
      className={className}
      value={year.toString()}
      setValue={(value) => setYear(Number.parseInt(value))}
      data={Array.from({ length: end - start + 1 }, (_, i) => ({
        value: (start + i).toString(),
        label: (start + i).toString(),
      }))}
      labels={{
        button: 'Select year',
        empty: 'No year found',
        search: 'Search year',
      }}
    />
  );
};

export const CalendarDatePagination = ({ className }) => {
  const { month, year, setMonth, setYear } = useCalendar();

  const handlePreviousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button onClick={() => handlePreviousMonth()} variant="ghost" size="icon">
        <ChevronLeft size={16} />
      </Button>
      <Button onClick={() => handleNextMonth()} variant="ghost" size="icon">
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};

export const CalendarDate = ({ children }) => (
  <div className="flex items-center justify-between p-3">{children}</div>
);

export const CalendarHeader = ({ className }) => {
  const { locale, startDay } = useContext(CalendarContext);

  return (
    <div className={cn('grid grid-cols-7', className)}>
      {daysForLocale(locale, startDay).map((day) => (
        <div key={day} className="p-3 text-center text-muted-foreground text-xs font-medium">
          {day}
        </div>
      ))}
    </div>
  );
};

export const CalendarItem = ({ training, className }) => {
  return (
    <div className={cn('flex items-center gap-2 cursor-pointer', className)} key={training.id}>
      <div className="h-2 w-2 shrink-0 rounded-full bg-vibrant-green" />
      <span className="truncate text-xs">{training.title}</span>
    </div>
  );
};

export const CalendarBody = ({ trainings, onDateClick, selectedDate }) => {
  const { month, year } = useCalendar();
  const { startDay } = useContext(CalendarContext);
  const daysInMonth = getDaysInMonth(new Date(year, month, 1));
  const firstDay = (getDay(new Date(year, month, 1)) - startDay + 7) % 7;
  const days = [];

  const prevMonth = month === 0 ? 11 : month - 1;
  const prevMonthYear = month === 0 ? year - 1 : year;
  const prevMonthDays = getDaysInMonth(new Date(prevMonthYear, prevMonth, 1));

  // Previous month days
  for (let i = 0; i < firstDay; i++) {
    const day = prevMonthDays - firstDay + i + 1;
    days.push(<OutOfBoundsDay key={`prev-${i}`} day={day} />);
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(year, month, day);
    const trainingsForDay = trainings.filter(training => {
      try {
        const trainingDate = training.date ? new Date(training.date) : null;
        return trainingDate && isSameDay(trainingDate, currentDate);
      } catch (error) {
        console.error("Error comparing dates:", error);
        return false;
      }
    });

    const isSelected = selectedDate && isSameDay(selectedDate, currentDate);

    days.push(
      <div
        key={`current-${day}`}
        className={cn(
          "min-h-24 p-1 border border-border/20 hover:bg-muted/10 transition-colors",
          isSelected && "bg-muted/20"
        )}
        onClick={() => onDateClick(currentDate)}
      >
        <div className="text-xs mb-1">{day}</div>
        <div className="space-y-1">
          {trainingsForDay.slice(0, 3).map((training) => (
            <CalendarItem key={training.id} training={training} />
          ))}
          {trainingsForDay.length > 3 && (
            <span className="block text-muted-foreground text-xs mt-1">
              +{trainingsForDay.length - 3} more
            </span>
          )}
        </div>
      </div>
    );
  }

  // Next month days
  const nextMonthDaysNeeded = 42 - (firstDay + daysInMonth); // Always show 6 weeks (42 days)
  
  for (let i = 1; i <= nextMonthDaysNeeded; i++) {
    days.push(<OutOfBoundsDay key={`next-${i}`} day={i} />);
  }

  return (
    <div className="grid grid-cols-7 auto-rows-fr">
      {days}
    </div>
  );
};
