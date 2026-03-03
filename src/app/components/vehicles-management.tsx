import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "sonner";
import { Driver } from "./drivers-management";

export interface Vehicle {
  id: string;
  plate: string;
  brand: string;
  model: string;
  color: string;
  year: string;
  driverId: string;
}

interface VehiclesManagementProps {
  vehicles: Vehicle[];
  drivers: Driver[];
  onAddVehicle: (vehicle: Omit<Vehicle, "id">) => void;
  onUpdateVehicle: (id: string, vehicle: Partial<Vehicle>) => void;
  onDeleteVehicle: (id: string) => void;
}

export function VehiclesManagement({
  vehicles,
  drivers,
  onAddVehicle,
  onUpdateVehicle,
  onDeleteVehicle,
}: VehiclesManagementProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    plate: "",
    brand: "",
    model: "",
    color: "",
    year: "",
    driverId: "",
  });

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDriverName = (driverId: string) => {
    const driver = drivers.find((d) => d.id === driverId);
    return driver ? `${driver.firstName} ${driver.lastName}` : "Sin asignar";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddVehicle(formData);
    setFormData({
      plate: "",
      brand: "",
      model: "",
      color: "",
      year: "",
      driverId: "",
    });
    setIsAddDialogOpen(false);
    toast.success("Vehículo agregado exitosamente");
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      plate: vehicle.plate,
      brand: vehicle.brand,
      model: vehicle.model,
      color: vehicle.color,
      year: vehicle.year,
      driverId: vehicle.driverId,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingVehicle) {
      onUpdateVehicle(editingVehicle.id, formData);
      setIsEditDialogOpen(false);
      setEditingVehicle(null);
      toast.success("Vehículo actualizado exitosamente");
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Está seguro de eliminar este vehículo?")) {
      onDeleteVehicle(id);
      toast.success("Vehículo eliminado exitosamente");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Gestión de Vehículos</h1>
          <p className="text-gray-600">Administra los vehículos registrados</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Vehículo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-white">
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Vehículo</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="plate">Placa</Label>
                <Input
                  id="plate"
                  value={formData.plate}
                  onChange={(e) =>
                    setFormData({ ...formData, plate: e.target.value.toUpperCase() })
                  }
                  placeholder="ABC123"
                  required
                />
              </div>
              <div>
                <Label htmlFor="brand">Marca</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="model">Modelo</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) =>
                    setFormData({ ...formData, model: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="year">Año</Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                  placeholder="2024"
                  required
                />
              </div>
              <div>
                <Label htmlFor="driver">Conductor</Label>
                <Select
                  value={formData.driverId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, driverId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar conductor" />
                  </SelectTrigger>
                  <SelectContent>
                    {drivers
                      .filter((d) => d.status === "active")
                      .map((driver) => (
                        <SelectItem key={driver.id} value={driver.id}>
                          {driver.firstName} {driver.lastName}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Guardar
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar por placa, marca o modelo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Vehicles Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Placa</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Modelo</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Año</TableHead>
              <TableHead>Conductor</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVehicles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500">
                  No se encontraron vehículos
                </TableCell>
              </TableRow>
            ) : (
              filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell>{vehicle.plate}</TableCell>
                  <TableCell>{vehicle.brand}</TableCell>
                  <TableCell>{vehicle.model}</TableCell>
                  <TableCell>{vehicle.color}</TableCell>
                  <TableCell>{vehicle.year}</TableCell>
                  <TableCell>{getDriverName(vehicle.driverId)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(vehicle)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(vehicle.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Editar Vehículo</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <Label htmlFor="edit-plate">Placa</Label>
              <Input
                id="edit-plate"
                value={formData.plate}
                onChange={(e) =>
                  setFormData({ ...formData, plate: e.target.value.toUpperCase() })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-brand">Marca</Label>
              <Input
                id="edit-brand"
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-model">Modelo</Label>
              <Input
                id="edit-model"
                value={formData.model}
                onChange={(e) =>
                  setFormData({ ...formData, model: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-color">Color</Label>
              <Input
                id="edit-color"
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-year">Año</Label>
              <Input
                id="edit-year"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-driver">Conductor</Label>
              <Select
                value={formData.driverId}
                onValueChange={(value) =>
                  setFormData({ ...formData, driverId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar conductor" />
                </SelectTrigger>
                <SelectContent>
                  {drivers
                    .filter((d) => d.status === "active")
                    .map((driver) => (
                      <SelectItem key={driver.id} value={driver.id}>
                        {driver.firstName} {driver.lastName}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Actualizar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
