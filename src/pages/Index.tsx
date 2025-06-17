
import { useState } from "react";
import { RestaurantHeader } from "@/components/RestaurantHeader";
import { TableSelection } from "@/components/TableSelection";
import { ReservationForm } from "@/components/ReservationForm";
import { ReservationConfirmation } from "@/components/ReservationConfirmation";

export interface Reservation {
  tableId: string;
  date: Date;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
}

const Index = () => {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'selection' | 'form' | 'confirmation'>('selection');
  const [reservation, setReservation] = useState<Reservation | null>(null);

  const handleTableSelect = (tableId: string) => {
    setSelectedTable(tableId);
    setCurrentStep('form');
  };

  const handleReservationSubmit = (reservationData: Reservation) => {
    setReservation(reservationData);
    setCurrentStep('confirmation');
  };

  const handleNewReservation = () => {
    setSelectedTable(null);
    setReservation(null);
    setCurrentStep('selection');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <RestaurantHeader />
      
      <main className="container mx-auto px-4 py-8">
        {currentStep === 'selection' && (
          <TableSelection onTableSelect={handleTableSelect} />
        )}
        
        {currentStep === 'form' && selectedTable && (
          <ReservationForm 
            tableId={selectedTable} 
            onSubmit={handleReservationSubmit}
            onBack={() => setCurrentStep('selection')}
          />
        )}
        
        {currentStep === 'confirmation' && reservation && (
          <ReservationConfirmation 
            reservation={reservation}
            onNewReservation={handleNewReservation}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
