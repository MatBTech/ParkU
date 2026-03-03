import { Card } from "./ui/card";
import { Car, Users, ParkingSquare, CheckCircle, XCircle, Clock } from "lucide-react";

interface DashboardProps {
  totalVehicles: number;
  totalDrivers: number;
  availableSpots: number;
  occupiedSpots: number;
  reservedSpots: number;
  activeDrivers: number;
  inactiveDrivers: number;
}

export function Dashboard({
  totalVehicles,
  totalDrivers,
  availableSpots,
  occupiedSpots,
  reservedSpots,
  activeDrivers,
  inactiveDrivers,
}: DashboardProps) {
  const totalSpots = availableSpots + occupiedSpots + reservedSpots;
  const occupancyRate = totalSpots > 0 ? ((occupiedSpots / totalSpots) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Dashboard</h1>
        <p className="text-gray-600">Estadísticas generales del parqueadero</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Vehículos</p>
              <p className="text-3xl mt-2">{totalVehicles}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Car className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Conductores</p>
              <p className="text-3xl mt-2">{totalDrivers}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Celdas</p>
              <p className="text-3xl mt-2">{totalSpots}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <ParkingSquare className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ocupación</p>
              <p className="text-3xl mt-2">{occupancyRate}%</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6 bg-white border border-gray-200">
          <h3 className="mb-4">Estado de Celdas</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm">Disponibles</span>
              </div>
              <span className="font-medium">{availableSpots}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm">Ocupadas</span>
              </div>
              <span className="font-medium">{occupiedSpots}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm">Reservadas</span>
              </div>
              <span className="font-medium">{reservedSpots}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-gray-200">
          <h3 className="mb-4">Estado de Conductores</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm">Activos</span>
              </div>
              <span className="font-medium">{activeDrivers}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <span className="text-sm">Inactivos</span>
              </div>
              <span className="font-medium">{inactiveDrivers}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
