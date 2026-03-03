import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { User, Mail, Phone, Key } from "lucide-react";
import { toast } from "sonner";

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "admin" | "user";
}

interface UserProfileProps {
  user: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export function UserProfileComponent({ user, onUpdateProfile }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSaveProfile = () => {
    onUpdateProfile(formData);
    setIsEditing(false);
    toast.success("Perfil actualizado exitosamente");
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    toast.success("Contraseña actualizada exitosamente");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const getInitials = () => {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Mi Perfil</h1>
        <p className="text-gray-600">Administra tu información personal</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="p-6 bg-white border border-gray-200">
          <div className="flex flex-col items-center text-center">
            <Avatar className="w-24 h-24 bg-green-600 text-white">
              <AvatarFallback className="text-2xl bg-green-600 text-white">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <h3 className="mt-4">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-sm text-gray-600 mt-1 capitalize">{user.role === "admin" ? "Administrador" : "Usuario"}</p>
            <div className="mt-4 w-full space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{user.phone}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Profile Information */}
        <Card className="p-6 bg-white border border-gray-200 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3>Información Personal</h3>
            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                size="sm"
              >
                Editar
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Nombres</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Apellidos</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>

            <div>
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>

            {isEditing && (
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={handleSaveProfile}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Guardar Cambios
                </Button>
                <Button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      firstName: user.firstName,
                      lastName: user.lastName,
                      email: user.email,
                      phone: user.phone,
                    });
                  }}
                  variant="outline"
                >
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Change Password */}
      <Card className="p-6 bg-white border border-gray-200">
        <div className="flex items-center gap-2 mb-6">
          <Key className="w-5 h-5" />
          <h3>Cambiar Contraseña</h3>
        </div>

        <div className="max-w-md space-y-4">
          <div>
            <Label htmlFor="currentPassword">Contraseña Actual</Label>
            <Input
              id="currentPassword"
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, currentPassword: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="newPassword">Nueva Contraseña</Label>
            <Input
              id="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, newPassword: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, confirmPassword: e.target.value })
              }
            />
          </div>

          <Button
            onClick={handleChangePassword}
            className="bg-green-600 hover:bg-green-700"
          >
            Actualizar Contraseña
          </Button>
        </div>
      </Card>
    </div>
  );
}
