import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Vehicle } from "./vehicles-management";
import { toast } from "sonner";

export interface ParkingSpot {
  id: string;
  number: string;
  status: "available" | "occupied" | "reserved";
  vehicleId?: string;
}

interface ParkingSpotsProps {
  spots: ParkingSpot[];
  vehicles: Vehicle[];
  onUpdateSpot: (id: string, status: ParkingSpot["status"], vehicleId?: string) => void;
}

export function ParkingSpots({ spots, vehicles, onUpdateSpot }: ParkingSpotsProps) {
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<ParkingSpot["status"]>("available");
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("");

  const handleSpotClick = (spot: ParkingSpot) => {
    setSelectedSpot(spot);
    setNewStatus(spot.status);
    setSelectedVehicleId(spot.vehicleId || "");
    setIsDialogOpen(true);
  };

  const handleUpdateSpot = () => {
    if (selectedSpot) {
      if (newStatus === "occupied" && !selectedVehicleId) {
        toast.error("Debe seleccionar un vehículo para ocupar la celda");
        return;
      }
      onUpdateSpot(
        selectedSpot.id,
        newStatus,
        newStatus === "occupied" ? selectedVehicleId : undefined
      );
      setIsDialogOpen(false);
      toast.success("Celda actualizada exitosamente");
    }
  };

  const getVehicleInfo = (vehicleId?: string) => {
    if (!vehicleId) return null;
    return vehicles.find((v) => v.id === vehicleId);
  };

  const getStatusColor = (status: ParkingSpot["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-100 border-green-300 hover:border-green-400";
      case "occupied":
        return "bg-red-100 border-red-300 hover:border-red-400";
      case "reserved":
        return "bg-yellow-100 border-yellow-300 hover:border-yellow-400";
    }
  };

  const getStatusText = (status: ParkingSpot["status"]) => {
    switch (status) {
      case "available":
        return "Disponible";
      case "occupied":
        return "Ocupada";
      case "reserved":
        return "Reservada";
    }
  };

  const availableCount = spots.filter((s) => s.status === "available").length;
  const occupiedCount = spots.filter((s) => s.status === "occupied").length;
  const reservedCount = spots.filter((s) => s.status === "reserved").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Gestión de Celdas</h1>
        <p className="text-gray-600">Administra el estado de las celdas del parqueadero</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Disponibles</p>
              <p className="text-2xl mt-1">{availableCount}</p>
            </div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </Card>
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ocupadas</p>
              <p className="text-2xl mt-1">{occupiedCount}</p>
            </div>
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
          </div>
        </Card>
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Reservadas</p>
              <p className="text-2xl mt-1">{reservedCount}</p>
            </div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          </div>
        </Card>
      </div>

      {/* Parking Grid */}
      <div>
        <h3 className="mb-4">Mapa de Celdas</h3>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
          {spots.map((spot) => {
            const vehicle = getVehicleInfo(spot.vehicleId);
            return (
              <Card
                key={spot.id}
                className={`p-4 cursor-pointer transition-all ${getStatusColor(
                  spot.status
                )} border-2`}
                onClick={() => handleSpotClick(spot)}
              >
                <div className="text-center">
                  <p className="text-xs text-gray-600 mb-1">Celda</p>
                  <p className="font-medium">{spot.number}</p>
                  {vehicle && (
                    <p className="text-xs text-gray-600 mt-1 truncate">
                      {vehicle.plate}
                    </p>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <Card className="p-4 bg-white">
        <h4 className="mb-3">Leyenda</h4>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-200 border-2 border-green-300"></div>
            <span className="text-sm">Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-200 border-2 border-red-300"></div>
            <span className="text-sm">Ocupada</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-200 border-2 border-yellow-300"></div>
            <span className="text-sm">Reservada</span>
          </div>
        </div>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>
              Celda {selectedSpot?.number}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Estado Actual</Label>
              <div className="mt-2">
                <Badge
                  className={
                    selectedSpot?.status === "available"
                      ? "bg-green-100 text-green-800"
                      : selectedSpot?.status === "occupied"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {selectedSpot && getStatusText(selectedSpot.status)}
                </Badge>
              </div>
            </div>

            <div>
              <Label htmlFor="status">Nuevo Estado</Label>
              <Select value={newStatus} onValueChange={(value) => setNewStatus(value as ParkingSpot["status"])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Disponible</SelectItem>
                  <SelectItem value="occupied">Ocupada</SelectItem>
                  <SelectItem value="reserved">Reservada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {newStatus === "occupied" && (
              <div>
                <Label htmlFor="vehicle">Vehículo</Label>
                <Select value={selectedVehicleId} onValueChange={setSelectedVehicleId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar vehículo" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicles.map((vehicle) => (
                      <SelectItem key={vehicle.id} value={vehicle.id}>
                        {vehicle.plate} - {vehicle.brand} {vehicle.model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={handleUpdateSpot}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Actualizar
              </Button>
              <Button
                onClick={() => setIsDialogOpen(false)}
                variant="outline"
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
