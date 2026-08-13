import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuthStatus } from '@/hooks/useDashboard';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User, Mail, CreditCard, Shield, LogOut } from 'lucide-react';

export const Route = createFileRoute('/dashboard/profile')({
  component: ProfilePage,
  head: () => ({
    meta: [{ title: 'Meu Perfil | Norte Concurso' }],
  })
});

function ProfilePage() {
  const { user, isLoading } = useAuthStatus();
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: ''
  });

  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        email: formData.email,
        data: { full_name: formData.name }
      });

      if (error) throw error;
      toast.success('Perfil atualizado com sucesso!');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao atualizar perfil');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (isLoading) return <div className="p-8">Carregando...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
        <p className="text-muted-foreground">Gerencie suas informações pessoais e plano.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Informações Pessoais
            </CardTitle>
            <CardDescription>
              Mantenha seus dados de contato atualizados.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email"
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="pl-9"
                  />
                </div>
              </div>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-secondary" />
              Plano Atual
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg border-2 border-secondary/20">
              <Badge variant="secondary" className="mb-2 uppercase font-bold text-xs">
                {user?.role || 'Plus'}
              </Badge>
              <span className="text-2xl font-bold text-primary">R$ 29,90/mês</span>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Acesso ilimitado a todas as ferramentas do Norte Concurso.
              </p>
            </div>
            
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Shield className="h-4 w-4" /> Gerenciar Assinatura
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleLogout}>
                <LogOut className="h-4 w-4" /> Sair da Conta
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
