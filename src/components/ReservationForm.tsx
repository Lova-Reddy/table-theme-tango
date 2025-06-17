
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { calendar, clock, users, arrow-left } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Reservation } from "@/pages/Index";

interface ReservationFormProps {
  tableId: string;
  onSubmit: (reservation: Reservation) => void;
  onBack: () => void;
}

export const ReservationForm = ({ tableId, onSubmit, onBack }: ReservationFormProps) => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("");
  const [guests, setGuests] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const timeSlots = [
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", 
    "20:00", "20:30", "21:00", "21:30", "22:00"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && time && guests && name && email && phone) {
      onSubmit({
        tableId,
        date,
        time,
        guests: parseInt(guests),
        name,
        email,
        phone
      });
    }
  };

  const isFormValid = date && time && guests && name && email && phone;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack} className="bg-white/90">
          <arrow-left className="h-4 w-4 mr-2" />
          Back to Table Selection
        </Button>
        <h2 className="text-3xl font-bold text-amber-900">Complete Your Reservation</h2>
      </div>

      <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-amber-200">
        <CardHeader>
          <CardTitle className="text-2xl text-amber-900 flex items-center gap-2">
            <calendar className="h-6 w-6" />
            Table {tableId} Reservation Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date and Time Selection */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-amber-900 font-semibold">Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-white",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <calendar className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                      className="rounded-md border border-amber-200"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="text-amber-900 font-semibold">Select Time</Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Choose time slot" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot} className="hover:bg-amber-50">
                        <div className="flex items-center gap-2">
                          <clock className="h-4 w-4" />
                          {slot}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Number of Guests */}
            <div className="space-y-2">
              <Label htmlFor="guests" className="text-amber-900 font-semibold">Number of Guests</Label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select number of guests" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <SelectItem key={num} value={num.toString()} className="hover:bg-amber-50">
                      <div className="flex items-center gap-2">
                        <users className="h-4 w-4" />
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-amber-900">Contact Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="name" className="text-amber-900 font-semibold">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="bg-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-amber-900 font-semibold">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-amber-900 font-semibold">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="bg-white"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={!isFormValid}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Reservation
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
