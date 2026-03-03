import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ParkingSquare } from "lucide-react";

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <Card className="w-full max-w-md p-8 bg-white">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
            <ParkingSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl">ParkU</h1>
          <p className="text-gray-600 text-center mt-2">
            Gestión de Parqueadero Academico
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@universidad.edu"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Iniciar Sesión
          </Button>
        </form>

        <div className="mt-6 p-4 bg-green-50 rounded-lg text-sm">
          <p className="mb-2">Credenciales de prueba:</p>
          <p><strong>Admin:</strong> admin@universidad.edu / admin123</p>
          <p><strong>Usuario:</strong> usuario@universidad.edu / user123</p>
        </div>
      </Card>
    </div>
  );
}
