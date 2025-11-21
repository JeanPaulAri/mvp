'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionType {
  id: number;
  name: string;
  description: string;
  price: number;
}

export function Register() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState<SubscriptionType[]>([]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    dni: '',
    nickname: '',
    subscriptionId: '',
  });

  // Obtener tipos de suscripción
  const fetchSubscriptions = async () => {
    try {
      const query = `
        query {
          subscriptionTypes {
            id
            name
            description
            price
          }
        }
      `;

      const response = await fetch('http://127.0.0.1:8000/graphql/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      if (data.data?.subscriptionTypes) {
        setSubscriptions(data.data.subscriptionTypes);
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los tipos de suscripción',
        variant: 'destructive',
      });
    }
  };

  // Cargar suscripciones al montar el componente
  useState(() => {
    fetchSubscriptions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Las contraseñas no coinciden',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.subscriptionId) {
      toast({
        title: 'Error',
        description: 'Debe seleccionar un tipo de suscripción',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const mutation = `
        mutation {
          register(
            email: "${formData.email}"
            password: "${formData.password}"
            firstName: "${formData.firstName}"
            lastName: "${formData.lastName}"
            phone: "${formData.phone}"
            dni: "${formData.dni}"
            nickname: "${formData.nickname}"
            subscriptionId: ${formData.subscriptionId}
          ) {
            user {
              id
              username
              email
              nickname
            }
            success
            message
          }
        }
      `;

      const response = await fetch('http://127.0.0.1:8000/graphql/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: mutation }),
      });

      const data = await response.json();

      if (data.errors) {
        toast({
          title: 'Error',
          description: data.errors[0]?.message || 'Error en el registro',
          variant: 'destructive',
        });
        return;
      }

      if (data.data?.register?.success) {
        toast({
          title: 'Éxito',
          description: 'Registro completado. Redirigiendo a login...',
        });

        // Redirigir a login después de 2 segundos
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        toast({
          title: 'Error',
          description: data.data?.register?.message || 'Error en el registro',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Ocurrió un error durante el registro',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Registro</CardTitle>
        <CardDescription>Crea tu cuenta para acceder a la plataforma</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Nombre */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Juan"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Pérez"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Teléfono y DNI */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="+34 612 345 678"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dni">DNI</Label>
              <Input
                id="dni"
                name="dni"
                placeholder="12345678X"
                value={formData.dni}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Nickname */}
          <div className="space-y-2">
            <Label htmlFor="nickname">Nickname</Label>
            <Input
              id="nickname"
              name="nickname"
              placeholder="tu_nickname"
              value={formData.nickname}
              onChange={handleChange}
              required
            />
          </div>

          {/* Tipo de Suscripción */}
          <div className="space-y-2">
            <Label htmlFor="subscription">Tipo de Suscripción</Label>
            <Select value={formData.subscriptionId} onValueChange={(value) => setFormData(prev => ({ ...prev, subscriptionId: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un tipo de suscripción" />
              </SelectTrigger>
              <SelectContent>
                {subscriptions.map((sub) => (
                  <SelectItem key={sub.id} value={sub.id.toString()}>
                    {sub.name} - ${sub.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Contraseña */}
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirmar Contraseña */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Botón Submit */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </Button>

          {/* Link a Login */}
          <p className="text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Inicia sesión
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
