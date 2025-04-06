
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarProvider } from "./calendar-context";
import { 
  CalendarDate,
  CalendarDatePicker,
  CalendarMonthPicker,
  CalendarYearPicker,
  CalendarDatePagination,
  CalendarHeader,
  CalendarBody
} from "./calendar-components";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Calendar = ({ trainings, onDateClick, selectedDate }) => {
  const renderCalendarItem = (training) => (
    <TooltipProvider key={training.id}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer" key={training.id}>
            <div className="h-2 w-2 shrink-0 rounded-full bg-vibrant-green" />
            <span className="truncate text-xs">{training.title}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-medium">{training.title}</p>
          <p className="text-xs">{training.time}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <Card className="bg-white shadow-sm border-0 mb-6">
      <CardHeader className="border-b pb-3">
        <CardTitle className="text-xl font-semibold">
          Training Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <CalendarProvider>
          <CalendarDate>
            <CalendarDatePicker>
              <CalendarMonthPicker />
              <CalendarYearPicker start={2020} end={2030} />
            </CalendarDatePicker>
            <CalendarDatePagination />
          </CalendarDate>
          <CalendarHeader />
          <CalendarBody 
            trainings={trainings} 
            onDateClick={onDateClick} 
            selectedDate={selectedDate}
          />
        </CalendarProvider>
      </CardContent>
    </Card>
  );
};

export default Calendar;
