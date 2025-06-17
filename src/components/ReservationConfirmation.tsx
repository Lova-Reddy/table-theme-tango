
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CheckCircle, Calendar, Clock, Users, Mail, Phone, Utensils } from "lucide-react";
import type { Reservation } from "@/pages/Index";

interface ReservationConfirmationProps {
  reservation: Reservation;
  onNewReservation: () => void;
}

export const ReservationConfirmation = ({ reservation, onNewReservation }: ReservationConfirmationProps) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-amber-900">Reservation Confirmed!</h2>
        <p className="text-lg text-amber-700">
          Thank you for choosing Savory Haven. Your table has been reserved.
        </p>
      </div>

      <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-amber-200">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
          <CardTitle className="text-2xl text-amber-900 flex items-center gap-2">
            <Utensils className="h-6 w-6" />
            Reservation Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Reservation Summary */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                <Calendar className="h-5 w-5 text-amber-600" />
                <div>
                  <div className="font-semibold text-amber-900">Date</div>
                  <div className="text-amber-700">{format(reservation.date, "EEEE, MMMM do, yyyy")}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                <Clock className="h-5 w-5 text-amber-600" />
                <div>
                  <div className="font-semibold text-amber-900">Time</div>
                  <div className="text-amber-700">{reservation.time}</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                <Users className="h-5 w-5 text-amber-600" />
                <div>
                  <div className="font-semibold text-amber-900">Party Size</div>
                  <div className="text-amber-700">{reservation.guests} {reservation.guests === 1 ? 'Guest' : 'Guests'}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                <Utensils className="h-5 w-5 text-amber-600" />
                <div>
                  <div className="font-semibold text-amber-900">Table</div>
                  <div className="text-amber-700">Table {reservation.tableId}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-t border-amber-200 pt-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="font-semibold text-amber-900 w-24">Name:</div>
                <div className="text-amber-700">{reservation.name}</div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-amber-600" />
                <div className="font-semibold text-amber-900 w-20">Email:</div>
                <div className="text-amber-700">{reservation.email}</div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-amber-600" />
                <div className="font-semibold text-amber-900 w-20">Phone:</div>
                <div className="text-amber-700">{reservation.phone}</div>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="border-t border-amber-200 pt-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Important Information</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Please arrive 10 minutes before your reservation time</li>
                <li>• Your table will be held for 15 minutes past the reservation time</li>
                <li>• For parties of 6 or more, a 18% gratuity will be added</li>
                <li>• To modify or cancel, please call us at (555) 123-4567</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              onClick={onNewReservation}
              className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
            >
              Make Another Reservation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
