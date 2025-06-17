
import { Utensils } from "lucide-react";

export const RestaurantHeader = () => {
  return (
    <header className="bg-gradient-to-r from-amber-900 via-orange-800 to-red-900 text-white shadow-2xl">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center space-x-4">
          <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm">
            <Utensils className="h-8 w-8" />
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
              Savory Haven
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 mt-2 font-light">
              Fine Dining Experience
            </p>
          </div>
        </div>
        <div className="text-center mt-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-orange-100">
            Table Reservations
          </h2>
          <p className="text-amber-200 mt-2 text-lg">
            Reserve your perfect dining experience
          </p>
        </div>
      </div>
    </header>
  );
};
