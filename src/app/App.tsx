import { useState } from "react";
import { Login } from "./components/login";
import { Dashboard } from "./components/dashboard";
import { DriversManagement, Driver } from "./components/drivers-management";
import { VehiclesManagement, Vehicle } from "./components/vehicles-management";
import { ParkingSpots, ParkingSpot } from "./components/parking-spots";
import { UserProfileComponent, UserProfile } from "./components/user-profile";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/sonner";
import {
  LayoutDashboard,
  Users,
  Car,
  ParkingSquare,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { toast } from "sonner";

type View = "dashboard" | "drivers" | "vehicles" | "parking" | "profile";

// Mock data
const initialDrivers: Driver[] = [
  {
    id: "1",
    firstName: "Juan",
    lastName: "Pérez García",
    identification: "1234567890",
    email: "juan.perez@universidad.edu",
    phone: "3001234567",
    status: "active",
  },
  {
    id: "2",
    firstName: "María",
    lastName: "González López",
    identification: "0987654321",
    email: "maria.gonzalez@universidad.edu",
    phone: "3009876543",
    status: "active",
  },
  {
    id: "3",
    firstName: "Carlos",
    lastName: "Rodríguez Martínez",
    identification: "1122334455",
    email: "carlos.rodriguez@universidad.edu",
    phone: "3001122334",
    status: "inactive",
  },
];

const initialVehicles: Vehicle[] = [
  {
    id: "1",
    plate: "ABC123",
    brand: "Toyota",
    model: "Corolla",
    color: "Blanco",
    year: "2022",
    driverId: "1",
  },
  {
    id: "2",
    plate: "XYZ789",
    brand: "Mazda",
    model: "3",
    color: "Rojo",
    year: "2023",
    driverId: "2",
  },
  {
    id: "3",
    plate: "DEF456",
    brand: "Chevrolet",
    model: "Spark",
    color: "Azul",
    year: "2021",
    driverId: "1",
  },
];

// Generate 50 parking spots
const generateParkingSpots = (): ParkingSpot[] => {
  const spots: ParkingSpot[] = [];
  for (let i = 1; i <= 50; i++) {
    const spotNumber = i.toString().padStart(3, "0");
    let status: ParkingSpot["status"] = "available";
    let vehicleId: string | undefined;

    // Set some spots as occupied or reserved
    if (i <= 5) {
      status = "occupied";
      vehicleId = initialVehicles[i % initialVehicles.length]?.id;
    } else if (i > 45) {
      status = "reserved";
    }

    spots.push({
      id: `spot-${i}`,
      number: spotNumber,
      status,
      vehicleId,
    });
  }
  return spots;
};

const initialSpots = generateParkingSpots();

// Mock users
const mockUsers = {
  admin: {
    id: "admin-1",
    firstName: "Admin",
    lastName: "Sistema",
    email: "admin@universidad.edu",
    phone: "3000000000",
    role: "admin" as const,
    password: "admin123",
  },
  user: {
    id: "user-1",
    firstName: "Usuario",
    lastName: "Regular",
    email: "usuario@universidad.edu",
    phone: "3001111111",
    role: "user" as const,
    password: "user123",
  },
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State for data
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [spots, setSpots] = useState<ParkingSpot[]>(initialSpots);

  const handleLogin = (email: string, password: string) => {
    const user = Object.values(mockUsers).find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      setIsLoggedIn(true);
      toast.success(`Bienvenido, ${user.firstName}!`);
    } else {
      toast.error("Credenciales incorrectas");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentView("dashboard");
    toast.success("Sesión cerrada exitosamente");
  };

  // Driver handlers
  const handleAddDriver = (driver: Omit<Driver, "id">) => {
    const newDriver = { ...driver, id: `driver-${Date.now()}` };
    setDrivers([...drivers, newDriver]);
  };

  const handleUpdateDriver = (id: string, updates: Partial<Driver>) => {
    setDrivers(drivers.map((d) => (d.id === id ? { ...d, ...updates } : d)));
  };

  const handleDeleteDriver = (id: string) => {
    setDrivers(drivers.filter((d) => d.id !== id));
  };

  // Vehicle handlers
  const handleAddVehicle = (vehicle: Omit<Vehicle, "id">) => {
    const newVehicle = { ...vehicle, id: `vehicle-${Date.now()}` };
    setVehicles([...vehicles, newVehicle]);
  };

  const handleUpdateVehicle = (id: string, updates: Partial<Vehicle>) => {
    setVehicles(vehicles.map((v) => (v.id === id ? { ...v, ...updates } : v)));
  };

  const handleDeleteVehicle = (id: string) => {
    setVehicles(vehicles.filter((v) => v.id !== id));
  };

  // Parking spot handlers
  const handleUpdateSpot = (
    id: string,
    status: ParkingSpot["status"],
    vehicleId?: string
  ) => {
    setSpots(
      spots.map((s) =>
        s.id === id ? { ...s, status, vehicleId: vehicleId || undefined } : s
      )
    );
  };

  // Profile handler
  const handleUpdateProfile = (updates: Partial<UserProfile>) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...updates });
    }
  };

  // Calculate dashboard stats
  const totalVehicles = vehicles.length;
  const totalDrivers = drivers.length;
  const availableSpots = spots.filter((s) => s.status === "available").length;
  const occupiedSpots = spots.filter((s) => s.status === "occupied").length;
  const reservedSpots = spots.filter((s) => s.status === "reserved").length;
  const activeDrivers = drivers.filter((d) => d.status === "active").length;
  const inactiveDrivers = drivers.filter((d) => d.status === "inactive").length;

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const menuItems = [
    { id: "dashboard" as View, label: "Dashboard", icon: LayoutDashboard },
    { id: "drivers" as View, label: "Conductores", icon: Users },
    { id: "vehicles" as View, label: "Vehículos", icon: Car },
    { id: "parking" as View, label: "Celdas", icon: ParkingSquare },
    { id: "profile" as View, label: "Mi Perfil", icon: User },
  ];

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <Dashboard
            totalVehicles={totalVehicles}
            totalDrivers={totalDrivers}
            availableSpots={availableSpots}
            occupiedSpots={occupiedSpots}
            reservedSpots={reservedSpots}
            activeDrivers={activeDrivers}
            inactiveDrivers={inactiveDrivers}
          />
        );
      case "drivers":
        return (
          <DriversManagement
            drivers={drivers}
            onAddDriver={handleAddDriver}
            onUpdateDriver={handleUpdateDriver}
            onDeleteDriver={handleDeleteDriver}
          />
        );
      case "vehicles":
        return (
          <VehiclesManagement
            vehicles={vehicles}
            drivers={drivers}
            onAddVehicle={handleAddVehicle}
            onUpdateVehicle={handleUpdateVehicle}
            onDeleteVehicle={handleDeleteVehicle}
          />
        );
      case "parking":
        return (
          <ParkingSpots
            spots={spots}
            vehicles={vehicles}
            onUpdateSpot={handleUpdateSpot}
          />
        );
      case "profile":
        return currentUser ? (
          <UserProfileComponent
            user={currentUser}
            onUpdateProfile={handleUpdateProfile}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Toaster />

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <ParkingSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-medium">ParkU</h2>
                <p className="text-xs text-gray-600 capitalize">{currentUser?.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-1">
              {menuItems.map((item) => {
                // Hide certain views for regular users
                if (
                  currentUser?.role === "user" &&
                  (item.id === "drivers" || item.id === "vehicles")
                ) {
                  return null;
                }

                const Icon = item.icon;
                const isActive = currentView === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-green-50 text-green-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-gray-200">
            <div className="mb-3 px-4 py-2 bg-gray-50 rounded-lg">
              <p className="text-sm">{currentUser?.firstName} {currentUser?.lastName}</p>
              <p className="text-xs text-gray-600">{currentUser?.email}</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6 lg:p-8">{renderView()}</div>
      </main>
    </div>
  );
}
