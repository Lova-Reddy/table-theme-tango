
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { users, clock } from "lucide-react";

interface Table {
  id: string;
  number: number;
  capacity: number;
  type: 'window' | 'private' | 'center' | 'bar';
  available: boolean;
  x: number;
  y: number;
}

const tables: Table[] = [
  { id: '1', number: 1, capacity: 2, type: 'window', available: true, x: 20, y: 20 },
  { id: '2', number: 2, capacity: 4, type: 'window', available: true, x: 60, y: 20 },
  { id: '3', number: 3, capacity: 2, type: 'center', available: false, x: 20, y: 40 },
  { id: '4', number: 4, capacity: 6, type: 'center', available: true, x: 60, y: 40 },
  { id: '5', number: 5, capacity: 4, type: 'private', available: true, x: 20, y: 60 },
  { id: '6', number: 6, capacity: 8, type: 'private', available: true, x: 60, y: 60 },
  { id: '7', number: 7, capacity: 2, type: 'bar', available: true, x: 40, y: 80 },
  { id: '8', number: 8, capacity: 2, type: 'bar', available: false, x: 50, y: 80 },
];

interface TableSelectionProps {
  onTableSelect: (tableId: string) => void;
}

export const TableSelection = ({ onTableSelect }: TableSelectionProps) => {
  const [hoveredTable, setHoveredTable] = useState<string | null>(null);

  const getTableTypeColor = (type: Table['type']) => {
    switch (type) {
      case 'window': return 'bg-blue-100 border-blue-300';
      case 'private': return 'bg-purple-100 border-purple-300';
      case 'center': return 'bg-green-100 border-green-300';
      case 'bar': return 'bg-orange-100 border-orange-300';
    }
  };

  const getTableTypeLabel = (type: Table['type']) => {
    switch (type) {
      case 'window': return 'Window View';
      case 'private': return 'Private Dining';
      case 'center': return 'Main Floor';
      case 'bar': return 'Bar Seating';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-amber-900 mb-4">Select Your Table</h2>
        <p className="text-lg text-amber-700">Choose from our available tables for your dining experience</p>
      </div>

      {/* Floor Plan */}
      <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-amber-200">
        <CardHeader>
          <CardTitle className="text-2xl text-amber-900 flex items-center gap-2">
            Restaurant Floor Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gradient-to-br from-amber-50 to-orange-100 rounded-lg p-8 min-h-[400px] border-2 border-amber-200">
            {tables.map((table) => (
              <div
                key={table.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                  table.available 
                    ? `${getTableTypeColor(table.type)} hover:scale-110 hover:shadow-lg` 
                    : 'bg-gray-200 border-gray-400 opacity-50 cursor-not-allowed'
                }`}
                style={{ left: `${table.x}%`, top: `${table.y}%` }}
                onClick={() => table.available && onTableSelect(table.id)}
                onMouseEnter={() => setHoveredTable(table.id)}
                onMouseLeave={() => setHoveredTable(null)}
              >
                <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center font-bold text-amber-900">
                  {table.number}
                </div>
                {hoveredTable === table.id && (
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-amber-900 text-white p-2 rounded-lg text-sm whitespace-nowrap z-10">
                    <div className="font-semibold">Table {table.number}</div>
                    <div className="flex items-center gap-1">
                      <users className="h-3 w-3" />
                      {table.capacity} guests
                    </div>
                    <div>{getTableTypeLabel(table.type)}</div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white/90 p-4 rounded-lg shadow-lg">
              <h4 className="font-semibold text-amber-900 mb-2">Table Types</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-blue-100 border border-blue-300"></div>
                  <span>Window View</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-purple-100 border border-purple-300"></div>
                  <span>Private Dining</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-100 border border-green-300"></div>
                  <span>Main Floor</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-orange-100 border border-orange-300"></div>
                  <span>Bar Seating</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tables.filter(table => table.available).map((table) => (
          <Card key={table.id} className="bg-white/90 backdrop-blur-sm shadow-lg border-amber-200 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-amber-900">
                <span>Table {table.number}</span>
                <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                  {getTableTypeLabel(table.type)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-amber-700">
                <users className="h-4 w-4" />
                <span>Up to {table.capacity} guests</span>
              </div>
              <Button 
                onClick={() => onTableSelect(table.id)}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
              >
                Reserve This Table
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
