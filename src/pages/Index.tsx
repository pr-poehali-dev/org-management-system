import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Данные для дашборда
  const stats = [
    { title: 'Всего организаций', value: '247', change: '+12%', icon: 'Building2' },
    { title: 'Активных пользователей', value: '1,834', change: '+8%', icon: 'Users' },
    { title: 'Заблокированных', value: '3', change: '-2', icon: 'ShieldX' },
    { title: 'Доходы за месяц', value: '₽2.4M', change: '+15%', icon: 'TrendingUp' }
  ];

  // Данные организаций
  const organizations = [
    {
      id: 1,
      name: 'ООО "ТехноСфера"',
      inn: '7707083893',
      registrationDate: '2024-01-15',
      userCount: 45,
      status: 'active',
      plan: 'Professional',
      lastLogin: '2024-07-16 14:30'
    },
    {
      id: 2,
      name: 'АО "ИнноваТех"',
      inn: '7719402047',
      registrationDate: '2024-02-03',
      userCount: 128,
      status: 'active',
      plan: 'Enterprise',
      lastLogin: '2024-07-16 09:15'
    },
    {
      id: 3,
      name: 'ИП Петров А.В.',
      inn: '771906123456',
      registrationDate: '2024-03-20',
      userCount: 5,
      status: 'trial',
      plan: 'Basic',
      lastLogin: '2024-07-15 18:45'
    },
    {
      id: 4,
      name: 'ООО "СтройПроект"',
      inn: '7707123456',
      registrationDate: '2024-01-08',
      userCount: 0,
      status: 'blocked',
      plan: 'Professional',
      lastLogin: '2024-06-30 12:00'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Активна', variant: 'default' as const },
      blocked: { label: 'Заблокирована', variant: 'destructive' as const },
      trial: { label: 'Тестовая', variant: 'secondary' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.inn.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || org.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Icon name="Shield" size={32} className="text-blue-600" />
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">CPQ Admin</h1>
              <p className="text-sm text-gray-500">Управление организациями</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Суперадмин</span>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Icon name={stat.icon as any} size={24} className="text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Organizations Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Список организаций</CardTitle>
              <Button>
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить организацию
              </Button>
            </div>
            
            {/* Filters */}
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex-1 max-w-sm">
                <Input
                  placeholder="Поиск по названию или ИНН..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="active">Активные</SelectItem>
                  <SelectItem value="blocked">Заблокированные</SelectItem>
                  <SelectItem value="trial">Тестовые</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Icon name="Download" size={16} className="mr-2" />
                Экспорт
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название организации</TableHead>
                  <TableHead>ИНН/ID</TableHead>
                  <TableHead>Дата регистрации</TableHead>
                  <TableHead>Пользователи</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Тарифный план</TableHead>
                  <TableHead>Последний вход</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrganizations.map((org) => (
                  <TableRow key={org.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{org.name}</TableCell>
                    <TableCell className="font-mono text-sm">{org.inn}</TableCell>
                    <TableCell>{new Date(org.registrationDate).toLocaleDateString('ru-RU')}</TableCell>
                    <TableCell>{org.userCount}</TableCell>
                    <TableCell>{getStatusBadge(org.status)}</TableCell>
                    <TableCell>{org.plan}</TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(org.lastLogin).toLocaleString('ru-RU')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Icon name="Eye" size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Icon name="Edit" size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Icon name="MoreHorizontal" size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;