
import React, { useState, createContext, useContext } from 'react';
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Users, Plus, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { create } from "zustand";
import { getDay, getDaysInMonth, isSameDay, format, parseISO, isValid, addMonths, subMonths } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Calendar state management with zustand
const useCalendar = create((set) => ({
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  setMonth: (month) => set({ month }),
  setYear: (year) => set({ year }),
}));

// Calendar context
const CalendarContext = createContext({
  locale: 'en-US',
  startDay: 0,
});

// Helper functions
const monthsForLocale = (localeName, monthFormat = 'long') => {
  const format = new Intl.DateTimeFormat(localeName, { month: monthFormat }).format;
  return [...new Array(12).keys()].map((m) => format(new Date(Date.UTC(2021, m % 12))));
};

const daysForLocale = (locale, startDay) => {
  const weekdays = [];
  const baseDate = new Date(2024, 0, startDay);

  for (let i = 0; i < 7; i++) {
    weekdays.push(
      new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(baseDate)
    );
    baseDate.setDate(baseDate.getDate() + 1);
  }

  return weekdays;
};

// Combobox component
const Combobox = ({ value, setValue, data, labels, className }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={open}
          className={cn('w-40 justify-between capitalize', className)}
        >
          {value
            ? data.find((item) => item.value === value)?.label
            : labels.button}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-0">
        <Command>
          <CommandInput placeholder={labels.search} />
          <CommandList>
            <CommandEmpty>{labels.empty}</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                  className="capitalize"
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === item.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

// Out of bounds day component
const OutOfBoundsDay = ({ day }) => (
  <div className="p-1 text-muted-foreground text-xs">
    {day}
  </div>
);

// Calendar components
const CalendarDatePicker = ({ className, children }) => (
  <div className={cn('flex items-center gap-1', className)}>{children}</div>
);

const CalendarMonthPicker = ({ className }) => {
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

const CalendarYearPicker = ({ className, start, end }) => {
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

const CalendarDatePagination = ({ className }) => {
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

const CalendarDate = ({ children }) => (
  <div className="flex items-center justify-between p-3">{children}</div>
);

const CalendarHeader = ({ className }) => {
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

const CalendarItem = ({ training, className }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={cn('flex items-center gap-2 cursor-pointer', className)} key={training.id}>
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

const CalendarBody = ({ trainings, onDateClick, selectedDate }) => {
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
        const trainingDate = parseISO(training.date);
        return isValid(trainingDate) && isSameDay(trainingDate, currentDate);
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

const CalendarProvider = ({ locale = 'en-US', startDay = 0, children, className }) => (
  <CalendarContext.Provider value={{ locale, startDay }}>
    <div className={cn('flex flex-col', className)}>{children}</div>
  </CalendarContext.Provider>
);

// Main Schedule component
const Schedule = () => {
  const [date, setDate] = useState(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [trainings, setTrainings] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const { toast } = useToast();

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    const trainingOnDate = trainings.find(training => {
      try {
        // Safely parse the training date string to a Date object
        const trainingDate = parseISO(training.date);
        // Check if the parsed date is valid and matches the selected date
        return isValid(trainingDate) && isSameDay(trainingDate, selectedDate);
      } catch (error) {
        console.error("Error comparing dates:", error);
        return false;
      }
    });
    setSelectedTraining(trainingOnDate);
  };

  const handleAddTraining = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const date = formData.get('date');
    const time = formData.get('time');
    const location = formData.get('location');
    const attendees = formData.get('attendees');
    const description = formData.get('description');
    
    const newTraining = {
      id: Date.now(),
      title,
      date,
      time,
      location,
      attendees,
      description
    };
    
    setTrainings(prev => [...prev, newTraining]);
    setDialogOpen(false);
    toast({
      title: "Training Added",
      description: `${title} has been added to your schedule.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold font-montserrat text-white tracking-tight">Schedule</h1>
        <p className="text-muted-foreground">
          Manage your training schedule
        </p>
      </div>
      
      <div className="flex justify-end mb-4">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Training Session
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Training Session</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddTraining} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Training Title</Label>
                <Input id="title" name="title" placeholder="Enter training title" required />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" name="date" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" name="time" type="time" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" placeholder="Enter location" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="attendees">Expected Attendees</Label>
                <Input id="attendees" name="attendees" type="number" min="1" placeholder="Number of attendees" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Enter training description" />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Add Training</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Calendar Section - First Half of the page */}
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
              onDateClick={handleDateSelect} 
              selectedDate={date}
            />
          </CalendarProvider>
        </CardContent>
      </Card>
      
      {/* Training Details Section - Second Half of the page */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader className="border-b pb-3">
          <CardTitle className="text-xl font-semibold">
            {selectedTraining ? 'Training Details' : 'No Training Selected'}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {selectedTraining ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{selectedTraining.title}</h3>
                {selectedTraining.description && (
                  <p className="text-gray-700 mb-6">{selectedTraining.description}</p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="text-success-green">
                      <CalendarIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date</p>
                      <p className="text-gray-700">{selectedTraining.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-success-green">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Time</p>
                      <p className="text-gray-700">{selectedTraining.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-success-green">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p className="text-gray-700">{selectedTraining.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-success-green">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Attendees</p>
                      <p className="text-gray-700">{selectedTraining.attendees}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">No Training Selected</h3>
              <p className="text-muted-foreground">Select a date with a training session to view details.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Schedule;
