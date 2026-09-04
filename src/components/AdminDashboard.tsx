import React, { useState } from 'react';
import { Product, User, Follower, CustomPieceRequest, AppNotification, SiteConfig } from '../types';
import { storage } from '../utils/storage';
import {
  ShieldCheck,
  Package,
  Users,
  UserCheck,
  FileText,
  Bell,
  Settings,
  Plus,
  Trash2,
  Edit,
  Search,
  CheckCircle2,
  Clock,
  MessageCircle,
  Eye,
  TrendingUp,
  X,
  Send,
  Sparkles,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

interface AdminDashboardProps {
  onClose: () => void;
  onRefreshData?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose, onRefreshData }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'followers' | 'users' | 'requests' | 'notifications' | 'settings'>('overview');

  // Local state mirrored from storage
  const [products, setProducts] = useState<Product[]>(storage.getProducts());
  const [users, setUsers] = useState<User[]>(storage.getUsers());
  const [followers, setFollowers] = useState<Follower[]>(storage.getFollowers());
  const [requests, setRequests] = useState<CustomPieceRequest[]>(storage.getRequests());
  const [notifications, setNotifications] = useState<AppNotification[]>(storage.getNotifications());
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(storage.getSiteConfig());

  // Product Add / Edit Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleteConfirmUser, setDeleteConfirmUser] = useState<User | null>(null);

  // Broadcast Message to Followers State
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  // Search in tabs
  const [productSearch, setProductSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [requestFilter, setRequestFilter] = useState<string>('todos');

  // Helper refresh
  const syncStorage = () => {
    setProducts(storage.getProducts());
    setUsers(storage.getUsers());
    setFollowers(storage.getFollowers());
    setRequests(storage.getRequests());
    setNotifications(storage.getNotifications());
    setSiteConfig(storage.getSiteConfig());
    onRefreshData?.();
  };

  // Stats Calculations
  const totalViews = products.reduce((acc, p) => acc + (p.viewsCount || 0), 0);
  const newRequestsCount = requests.filter(r => r.status === 'novo').length;

  const chartDataViews = products
    .filter(p => (p.viewsCount || 0) > 0)
    .map(p => ({ name: p.name.length > 15 ? p.name.substring(0, 15) + '...' : p.name, views: p.viewsCount || 0 }));

  const chartFollowersGrowth = React.useMemo(() => {
    if (followers.length === 0) return [];
    const grouped: Record<string, number> = {};
    followers.forEach(f => {
      const d = new Date(f.followedAt);
      const key = d.toLocaleDateString('pt-BR', { month: 'short' });
      grouped[key] = (grouped[key] || 0) + 1;
    });
    return Object.entries(grouped).map(([month, count]) => ({
      month,
      followers: count
    }));
  }, [followers]);

  // Request Status Update
  const handleUpdateRequestStatus = (requestId: string, newStatus: any) => {
    storage.updateRequestStatus(requestId, newStatus);
    syncStorage();
  };

  // Delete Product
  const handleDeleteProduct = (productId: string) => {
    storage.deleteProduct(productId);
    setDeleteConfirmId(null);
    syncStorage();
  };

  // Delete User
  const handleDeleteUser = (userId: string) => {
    storage.deleteUser(userId);
    setDeleteConfirmUser(null);
    syncStorage();
  };

  // Save Product (Create or Update)
  const handleSaveProductForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const productPayload: Product = {
      id: editingProduct?.id || `prod_${Date.now()}`,
      name: formData.get('name') as string,
      slug: (formData.get('name') as string).toLowerCase().replace(/ /g, '-'),
      category: formData.get('category') as any,
      shortDescription: formData.get('shortDescription') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')) || 1000,
      formattedPrice: `R$ ${Number(formData.get('price') || 1000).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      steel: formData.get('steel') as string,
      hardness: formData.get('hardness') as string,
      bladeLength: formData.get('bladeLength') as string,
      spineThickness: formData.get('spineThickness') as string,
      handleMaterial: formData.get('handleMaterial') as string,
      sheath: formData.get('sheath') as string,
      finish: formData.get('finish') as string || 'Acetinado manual',
      availability: formData.get('availability') as any,
      isExclusive: formData.get('isExclusive') === 'on',
      isFeatured: formData.get('isFeatured') === 'on',
      images: [formData.get('image1') as string || 'https://images.unsplash.com/photo-1593618998160-e34014e67546?q=80&w=1000'],
      specs: {},
      viewsCount: editingProduct?.viewsCount || 1,
      createdAt: editingProduct?.createdAt || new Date().toISOString(),
      serialNumber: formData.get('serialNumber') as string || 'FC-2026'
    };

    storage.saveProduct(productPayload);
    setIsProductModalOpen(false);
    setEditingProduct(null);
    syncStorage();
  };

  // Broadcast Message to Followers
  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMsg) return;

    storage.addNotification({
      title: `[COMUNICADO] ${broadcastTitle}`,
      message: `Enviado para ${followers.length} seguidores: ${broadcastMsg}`,
      type: 'follower'
    });

    setBroadcastSuccess(true);
    setBroadcastTitle('');
    setBroadcastMsg('');
    setTimeout(() => setBroadcastSuccess(false), 3000);
    syncStorage();
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    storage.saveSiteConfig(siteConfig);
    syncStorage();
    alert('Configurações da empresa salvas com sucesso!');
  };

  return (
    <div className="fixed inset-0 z-[120] bg-white text-slate-800 flex flex-col overflow-hidden animate-in fade-in duration-150">
      {/* Top Admin Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-orange-200 flex-shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#EA580C] flex items-center justify-center text-white font-bold shadow-md">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold font-display tracking-wider uppercase text-slate-900">
                FRONTEIRA CUTELARIA
              </h1>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-orange-100 text-[#EA580C] border border-orange-300 font-bold">
                ADMINISTRAÇÃO
              </span>
            </div>
            <span className="text-xs font-mono text-slate-500">
              Gestão de Acervo, Seguidores, Usuários e Pedidos
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#EA580C] border border-orange-200 text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <X className="w-4 h-4" />
          <span>Voltar ao Site</span>
        </button>
      </div>

      {/* Main Container with Sidebar + View Stage */}
      <div className="flex flex-grow overflow-hidden bg-white">
        {/* Admin Sidebar Navigation */}
        <aside className="w-64 bg-orange-50/40 border-r border-orange-200 flex-shrink-0 flex flex-col justify-between p-4 hidden md:flex">
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-white text-[#EA580C] shadow-sm border border-orange-200'
                  : 'text-slate-600 hover:bg-white hover:text-[#EA580C]'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Visão Geral</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-white text-[#EA580C] shadow-sm border border-orange-200'
                  : 'text-slate-600 hover:bg-white hover:text-[#EA580C]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>Produtos & Acervo</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-100 text-[#EA580C] font-bold">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('followers')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'followers'
                  ? 'bg-white text-[#EA580C] shadow-sm border border-orange-200'
                  : 'text-slate-600 hover:bg-white hover:text-[#EA580C]'
              }`}
            >
              <div className="flex items-center gap-3">
                <UserCheck className="w-4 h-4" />
                <span>Seguidores</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-100 text-[#EA580C] font-bold">
                {followers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'users'
                  ? 'bg-white text-[#EA580C] shadow-sm border border-orange-200'
                  : 'text-slate-600 hover:bg-white hover:text-[#EA580C]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Usuários</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
                {users.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('requests')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'requests'
                  ? 'bg-white text-[#EA580C] shadow-sm border border-orange-200'
                  : 'text-slate-600 hover:bg-white hover:text-[#EA580C]'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>Solicitações</span>
              </div>
              {newRequestsCount > 0 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EA580C] text-white font-bold animate-pulse">
                  {newRequestsCount} novas
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'notifications'
                  ? 'bg-white text-[#EA580C] shadow-sm border border-orange-200'
                  : 'text-slate-600 hover:bg-white hover:text-[#EA580C]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4" />
                <span>Notificações</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-100 text-[#EA580C] font-bold">
                {notifications.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-white text-[#EA580C] shadow-sm border border-orange-200'
                  : 'text-slate-600 hover:bg-white hover:text-[#EA580C]'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Configurações</span>
            </button>
          </div>

          <div className="p-3 bg-white border border-orange-200 rounded-2xl text-center space-y-1">
            <span className="text-[10px] font-mono text-slate-400 block">Banco de Dados Ativo</span>
            <span className="text-xs font-bold text-[#EA580C]">Fronteira Store Engine</span>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-grow overflow-y-auto p-6 sm:p-8 bg-white">
          {/* TAB 1: VISÃO GERAL */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-6xl">
              {/* Stat Cards in White + Orange */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-3xl bg-white border border-orange-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                    <span>Total Usuários</span>
                    <Users className="w-4 h-4 text-[#EA580C]" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                    {users.length}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 block">
                    {users.filter(u => u.role !== 'admin').length} {users.filter(u => u.role !== 'admin').length === 1 ? 'Cliente' : 'Clientes'}
                  </span>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-orange-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                    <span>Seguidores Oficiais</span>
                    <UserCheck className="w-4 h-4 text-[#EA580C]" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#EA580C] font-mono">
                    {followers.length}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 block">
                    Inscritos no Radar de Peças
                  </span>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-orange-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                    <span>Acervo Cadastrado</span>
                    <Package className="w-4 h-4 text-[#EA580C]" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                    {products.length}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 block">
                    {products.filter(p => p.availability === 'available').length} Pronta Entrega
                  </span>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-orange-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                    <span>Solicitações / Pedidos</span>
                    <FileText className="w-4 h-4 text-[#EA580C]" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                    {requests.length}
                  </div>
                  <span className="text-[10px] font-mono text-[#EA580C] font-bold block">
                    {newRequestsCount} Pendentes de Análise
                  </span>
                </div>
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-white border border-orange-200 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold font-mono uppercase text-slate-900 flex items-center justify-between">
                    <span>🔪 Lâminas Mais Visualizadas</span>
                    <Eye className="w-4 h-4 text-[#EA580C]" />
                  </h3>
                  <div className="h-64">
                    {chartDataViews.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartDataViews}>
                          <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} />
                          <YAxis stroke="#94A3B8" fontSize={11} />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#FDBA74', borderRadius: '12px', color: '#1E293B' }}
                          />
                          <Bar dataKey="views" fill="#EA580C" radius={[6, 6, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center p-6 border border-dashed border-orange-200 rounded-2xl bg-orange-50/20">
                        <Eye className="w-8 h-8 text-orange-300 mb-2" />
                        <p className="text-xs font-mono text-slate-500 font-medium">Ainda não existem dados suficientes para gerar este gráfico.</p>
                        <span className="text-[10px] text-slate-400 mt-1">As visualizações aparecerão conforme os visitantes acessarem o acervo.</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-orange-200 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold font-mono uppercase text-slate-900 flex items-center justify-between">
                    <span>🔪 Crescimento de Seguidores</span>
                    <TrendingUp className="w-4 h-4 text-[#EA580C]" />
                  </h3>
                  <div className="h-64">
                    {chartFollowersGrowth.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartFollowersGrowth}>
                          <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                          <YAxis stroke="#94A3B8" fontSize={11} />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#FDBA74', borderRadius: '12px', color: '#1E293B' }}
                          />
                          <Area type="monotone" dataKey="followers" stroke="#EA580C" fill="#FFEDD5" strokeWidth={2.5} />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center p-6 border border-dashed border-orange-200 rounded-2xl bg-orange-50/20">
                        <TrendingUp className="w-8 h-8 text-orange-300 mb-2" />
                        <p className="text-xs font-mono text-slate-500 font-medium">Ainda não existem dados suficientes para gerar este gráfico.</p>
                        <span className="text-[10px] text-slate-400 mt-1">O histórico de crescimento será traçado conforme novos seguidores entrarem.</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GERENCIAMENTO DE PRODUTOS */}
          {activeTab === 'products' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Filtrar por nome ou liga de aço..."
                    className="w-full pl-10 pr-4 py-2.5 bg-orange-50/40 border border-orange-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#EA580C]"
                  />
                </div>

                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setIsProductModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-mono font-bold uppercase flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Novo Produto</span>
                </button>
              </div>

              {/* Products Table in White + Orange */}
              <div className="rounded-3xl border border-orange-200 overflow-hidden shadow-sm bg-white">
                {products.length === 0 ? (
                  <div className="p-12 text-center space-y-3 bg-white">
                    <Package className="w-10 h-10 text-orange-300 mx-auto" />
                    <h4 className="text-sm font-bold font-mono text-slate-800 uppercase">Nenhuma lâmina cadastrada no acervo</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Cadastre os produtos forjados para exibi-los no site e permitir pedidos e encomendas.
                    </p>
                    <button
                      onClick={() => {
                        setEditingProduct(null);
                        setIsProductModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-mono font-bold uppercase transition-all inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Cadastrar Primeira Lâmina</span>
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-orange-50/70 border-b border-orange-200 text-[#EA580C] uppercase tracking-wider font-bold">
                        <tr>
                          <th className="p-4">Peça / Foto</th>
                          <th className="p-4">Categoria</th>
                          <th className="p-4">Aço / Dureza</th>
                          <th className="p-4">Valor</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-orange-100">
                        {products
                          .filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.steel.toLowerCase().includes(productSearch.toLowerCase()))
                          .map((p) => (
                            <tr key={p.id} className="hover:bg-orange-50/30 transition-colors">
                              <td className="p-4 flex items-center gap-3">
                                <img src={p.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover border border-orange-100 bg-white" />
                                <div>
                                  <span className="font-bold text-slate-900 block">{p.name}</span>
                                  <span className="text-[10px] text-slate-400">Ref: #{p.serialNumber || p.id}</span>
                                </div>
                              </td>
                              <td className="p-4 font-semibold text-slate-700">{p.category}</td>
                              <td className="p-4">
                                <span className="font-bold text-[#EA580C]">{p.steel}</span>
                                <span className="text-slate-400 block text-[10px]">{p.hardness}</span>
                              </td>
                              <td className="p-4 font-bold text-slate-900">{p.formattedPrice}</td>
                              <td className="p-4">
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                  p.availability === 'available'
                                    ? 'bg-orange-100 text-[#EA580C]'
                                    : 'bg-slate-100 text-slate-700'
                                }`}>
                                  {p.availability}
                                </span>
                              </td>
                              <td className="p-4 text-right space-x-2">
                                <button
                                  onClick={() => {
                                    setEditingProduct(p);
                                    setIsProductModalOpen(true);
                                  }}
                                  className="p-2 rounded-xl text-slate-600 hover:text-[#EA580C] hover:bg-orange-50 border border-slate-200"
                                  title="Editar"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmId(p.id)}
                                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200"
                                  title="Excluir"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: SEGUIDORES */}
          {activeTab === 'followers' && (
            <div className="space-y-6 max-w-6xl">
              {/* Broadcast Announcement Form */}
              <div className="p-6 rounded-3xl bg-orange-50/50 border border-orange-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold font-display text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#EA580C]" />
                  <span>Disparo de Notificação para Seguidores ({followers.length})</span>
                </h3>

                {broadcastSuccess && (
                  <div className="p-3 rounded-xl bg-orange-100 text-[#EA580C] text-xs font-mono font-bold">
                    ✓ Notificação disparada com sucesso para toda a base de seguidores!
                  </div>
                )}

                <form onSubmit={handleSendBroadcast} className="space-y-3">
                  <input
                    type="text"
                    required
                    value={broadcastTitle}
                    onChange={(e) => setBroadcastTitle(e.target.value)}
                    placeholder="Título do Alerta (Ex: Nova Lâmina em Aço Damasco Liberada)"
                    className="w-full px-4 py-2.5 bg-white border border-orange-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#EA580C]"
                  />
                  <textarea
                    rows={2}
                    required
                    value={broadcastMsg}
                    onChange={(e) => setBroadcastMsg(e.target.value)}
                    placeholder="Mensagem detalhada sobre novas peças ou lotes..."
                    className="w-full px-4 py-2.5 bg-white border border-orange-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#EA580C] resize-none"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-mono font-bold uppercase flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Disparar Alerta</span>
                  </button>
                </form>
              </div>

              {/* Followers List */}
              <div className="rounded-3xl border border-orange-200 overflow-hidden shadow-sm bg-white">
                {followers.length === 0 ? (
                  <div className="p-12 text-center space-y-3 bg-white">
                    <UserCheck className="w-10 h-10 text-orange-300 mx-auto" />
                    <h4 className="text-sm font-bold font-mono text-slate-800 uppercase">Nenhum seguidor registrado ainda</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Quando visitantes e clientes clicarem no botão de seguir na plataforma, eles aparecerão listados aqui.
                    </p>
                  </div>
                ) : (
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-orange-50/70 border-b border-orange-200 text-[#EA580C] uppercase tracking-wider font-bold">
                      <tr>
                        <th className="p-4">Nome do Seguidor</th>
                        <th className="p-4">E-mail</th>
                        <th className="p-4">Data em que começou a seguir</th>
                        <th className="p-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-orange-100">
                      {followers.map((f) => (
                        <tr key={f.id} className="hover:bg-orange-50/30">
                          <td className="p-4 font-bold text-slate-900">{f.userName}</td>
                          <td className="p-4 text-slate-600">{f.userEmail}</td>
                          <td className="p-4 text-slate-500">
                            {new Date(f.followedAt).toLocaleDateString('pt-BR')}
                          </td>
                          <td className="p-4 text-right">
                            <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-[#EA580C] font-bold text-[10px]">
                              ✓ SEGUINDO
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: USUÁRIOS */}
          {activeTab === 'users' && (
            <div className="space-y-6 max-w-6xl">
              <div className="rounded-3xl border border-orange-200 overflow-hidden shadow-sm bg-white">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-orange-50/70 border-b border-orange-200 text-[#EA580C] uppercase tracking-wider font-bold">
                    <tr>
                      <th className="p-4">Nome</th>
                      <th className="p-4">E-mail</th>
                      <th className="p-4">Data de Cadastro</th>
                      <th className="p-4">Perfil / Seguidor</th>
                      <th className="p-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-100">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-orange-50/30">
                        <td className="p-4 font-bold text-slate-900">
                          {u.name} {u.role === 'admin' && <span className="text-[10px] text-[#EA580C] font-normal">(Administrador)</span>}
                        </td>
                        <td className="p-4 text-slate-600">{u.email}</td>
                        <td className="p-4 text-slate-500">
                          {new Date(u.createdAt).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            u.isFollower ? 'bg-orange-100 text-[#EA580C]' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {u.isFollower ? '✓ Seguidor' : 'Cadastrado'}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          {u.role !== 'admin' && (
                            <button
                              onClick={() => setDeleteConfirmUser(u)}
                              className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200"
                              title="Remover Usuário"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: SOLICITAÇÕES */}
          {activeTab === 'requests' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center gap-2">
                {['todos', 'novo', 'em_analise', 'em_contato', 'concluido'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setRequestFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
                      requestFilter === st
                        ? 'bg-[#EA580C] text-white shadow-sm'
                        : 'bg-orange-50 text-[#EA580C] border border-orange-200 hover:bg-orange-100'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>

              {requests.filter(r => requestFilter === 'todos' || r.status === requestFilter).length === 0 ? (
                <div className="p-12 text-center space-y-3 bg-white border border-orange-200 rounded-3xl shadow-sm">
                  <FileText className="w-10 h-10 text-orange-300 mx-auto" />
                  <h4 className="text-sm font-bold font-mono text-slate-800 uppercase">Nenhuma solicitação encontrada</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    As solicitações de personalização enviadas pelos clientes aparecerão listadas aqui.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {requests
                    .filter(r => requestFilter === 'todos' || r.status === requestFilter)
                    .map((req) => (
                      <div
                        key={req.id}
                        className="p-6 rounded-3xl bg-white border border-orange-200 shadow-sm space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-orange-100 pb-3">
                          <div>
                            <h4 className="font-bold text-base text-slate-900">{req.pieceType}</h4>
                            <span className="text-xs font-mono text-slate-500">
                              Cliente: {req.customerName} ({req.email} • {req.whatsapp})
                            </span>
                          </div>

                          {/* Status Switcher */}
                          <div className="flex items-center gap-2">
                            <select
                              value={req.status}
                              onChange={(e) => handleUpdateRequestStatus(req.id, e.target.value)}
                              className="px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-xs font-mono font-bold text-[#EA580C] focus:outline-none"
                            >
                              <option value="novo">Novo</option>
                              <option value="em_analise">Em Análise</option>
                              <option value="em_contato">Em Contato</option>
                              <option value="concluido">Concluído</option>
                            </select>

                            <a
                              href={`https://wa.me/${req.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá ${req.customerName}! Recebemos seu pedido de ${req.pieceType} na Fronteira Cutelaria.`)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white transition-colors"
                              title="Responder no WhatsApp"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                          <div className="p-2.5 rounded-xl bg-orange-50/40">
                            <span className="text-slate-400 block text-[10px]">Aço</span>
                            <span className="font-bold text-slate-800">{req.steelChoice}</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-orange-50/40">
                            <span className="text-slate-400 block text-[10px]">Cabo</span>
                            <span className="font-bold text-slate-800">{req.handleChoice}</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-orange-50/40">
                            <span className="text-slate-400 block text-[10px]">Bainha</span>
                            <span className="font-bold text-slate-800">{req.sheathChoice}</span>
                          </div>
                        </div>

                        {req.details && (
                          <p className="text-xs text-slate-600 bg-orange-50/30 p-3 rounded-2xl border border-orange-100">
                            "{req.details}"
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: NOTIFICAÇÕES */}
          {activeTab === 'notifications' && (
            <div className="space-y-4 max-w-4xl">
              {notifications.length === 0 ? (
                <div className="p-12 text-center space-y-3 bg-white border border-orange-200 rounded-3xl shadow-sm">
                  <Bell className="w-10 h-10 text-orange-300 mx-auto" />
                  <h4 className="text-sm font-bold font-mono text-slate-800 uppercase">Nenhuma notificação no momento</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Novos cadastros, pedidos de personalização e novos seguidores gerarão avisos aqui.
                  </p>
                </div>
              ) : (
                notifications.map((n) => (
                  <div key={n.id} className="p-4 rounded-2xl bg-white border border-orange-200 shadow-sm flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center shrink-0">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-900">{n.title}</h5>
                      <p className="text-xs text-slate-600 mt-0.5">{n.message}</p>
                      <span className="text-[10px] font-mono text-slate-400 block mt-1">
                        {new Date(n.date).toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 7: CONFIGURAÇÕES */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-6 max-w-3xl bg-white p-6 rounded-3xl border border-orange-200 shadow-sm">
              <h3 className="text-base font-bold font-display text-slate-900">
                Configurações da Empresa
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                    WhatsApp (Apenas Dígitos)
                  </label>
                  <input
                    type="text"
                    value={siteConfig.whatsappNumber}
                    onChange={(e) => setSiteConfig({ ...siteConfig, whatsappNumber: e.target.value })}
                    className="w-full px-4 py-2.5 bg-orange-50/30 border border-orange-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#EA580C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                    WhatsApp Formatado
                  </label>
                  <input
                    type="text"
                    value={siteConfig.whatsappFormatted}
                    onChange={(e) => setSiteConfig({ ...siteConfig, whatsappFormatted: e.target.value })}
                    className="w-full px-4 py-2.5 bg-orange-50/30 border border-orange-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#EA580C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                    URL do Instagram Oficial
                  </label>
                  <input
                    type="text"
                    value={siteConfig.instagramUrl}
                    onChange={(e) => setSiteConfig({ ...siteConfig, instagramUrl: e.target.value })}
                    className="w-full px-4 py-2.5 bg-orange-50/30 border border-orange-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#EA580C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                    Arroba do Instagram
                  </label>
                  <input
                    type="text"
                    value={siteConfig.instagramHandle}
                    onChange={(e) => setSiteConfig({ ...siteConfig, instagramHandle: e.target.value })}
                    className="w-full px-4 py-2.5 bg-orange-50/30 border border-orange-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#EA580C]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-8 py-3 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-mono font-bold uppercase shadow-sm cursor-pointer"
              >
                Salvar Configurações
              </button>
            </form>
          )}
        </main>
      </div>

      {/* Product Add / Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white border border-orange-200 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold font-display text-slate-900 mb-6">
              {editingProduct ? 'Editar Lâmina' : 'Cadastrar Nova Lâmina'}
            </h3>

            <form onSubmit={handleSaveProductForm} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                    Nome da Peça *
                  </label>
                  <input
                    name="name"
                    required
                    defaultValue={editingProduct?.name || ''}
                    placeholder="Ex: Faca Gaúcha Damasco 9 polegadas"
                    className="w-full px-4 py-2.5 bg-orange-50/30 border border-orange-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#EA580C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                    Categoria *
                  </label>
                  <select
                    name="category"
                    defaultValue={editingProduct?.category || 'Artesanais'}
                    className="w-full px-4 py-2.5 bg-orange-50/30 border border-orange-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#EA580C]"
                  >
                    <option value="Artesanais">Artesanais</option>
                    <option value="Coleções">Coleções</option>
                    <option value="Exclusivas">Exclusivas</option>
                    <option value="Personalizadas">Personalizadas</option>
                    <option value="Gastronomia">Gastronomia</option>
                    <option value="Bushcraft">Bushcraft</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                    Valor (R$) *
                  </label>
                  <input
                    name="price"
                    type="number"
                    required
                    defaultValue={editingProduct?.price || ''}
                    placeholder="Ex: 1450"
                    className="w-full px-4 py-2.5 bg-orange-50/30 border border-orange-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#EA580C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                    Liga de Aço *
                  </label>
                  <input
                    name="steel"
                    required
                    defaultValue={editingProduct?.steel || ''}
                    placeholder="Ex: Aço Damasco 380 Camadas ou 52100"
                    className="w-full px-4 py-2.5 bg-orange-50/30 border border-orange-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#EA580C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                    Dureza Rockwell
                  </label>
                  <input
                    name="hardness"
                    defaultValue={editingProduct?.hardness || ''}
                    placeholder="Ex: 59-60 HRC"
                    className="w-full px-4 py-2.5 bg-orange-50/30 border border-orange-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#EA580C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                    Comprimento da Lâmina
                  </label>
                  <input
                    name="bladeLength"
                    defaultValue={editingProduct?.bladeLength || ''}
                    placeholder="Ex: 22 cm (8.6 pol)"
                    className="w-full px-4 py-2.5 bg-orange-50/30 border border-orange-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#EA580C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                    Espessura do Dorso
                  </label>
                  <input
                    name="spineThickness"
                    defaultValue={editingProduct?.spineThickness || ''}
                    placeholder="Ex: 5.0 mm"
                    className="w-full px-4 py-2.5 bg-orange-50/30 border border-orange-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#EA580C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                    Empunhadura
                  </label>
                  <input
                    name="handleMaterial"
                    defaultValue={editingProduct?.handleMaterial || ''}
                    placeholder="Ex: Jacarandá da Bahia"
                    className="w-full px-4 py-2.5 bg-orange-50/30 border border-orange-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#EA580C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                    Bainha
                  </label>
                  <input
                    name="sheath"
                    defaultValue={editingProduct?.sheath || ''}
                    placeholder="Ex: Couro bovino costurado à mão"
                    className="w-full px-4 py-2.5 bg-orange-50/30 border border-orange-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#EA580C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                    Disponibilidade
                  </label>
                  <select
                    name="availability"
                    defaultValue={editingProduct?.availability || 'available'}
                    className="w-full px-4 py-2.5 bg-orange-50/30 border border-orange-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#EA580C]"
                  >
                    <option value="available">Pronta Entrega</option>
                    <option value="made_to_order">Sob Encomenda</option>
                    <option value="reserved">Reservada</option>
                    <option value="out_of_stock">Esgotada</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                  URL da Imagem
                </label>
                <input
                  name="image1"
                  defaultValue={editingProduct?.images[0] || ''}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 bg-orange-50/30 border border-orange-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#EA580C]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                  Descrição Curta
                </label>
                <input
                  name="shortDescription"
                  defaultValue={editingProduct?.shortDescription || ''}
                  placeholder="Ex: Forjada artesanalmente com têmpera seletiva."
                  className="w-full px-4 py-2.5 bg-orange-50/30 border border-orange-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#EA580C]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                  Descrição Completa
                </label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={editingProduct?.description || ''}
                  placeholder="Descreva os detalhes da forja, acabamento e especificações..."
                  className="w-full px-4 py-2.5 bg-orange-50/30 border border-orange-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#EA580C] resize-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-mono text-slate-700 cursor-pointer">
                  <input
                    name="isExclusive"
                    type="checkbox"
                    defaultChecked={editingProduct?.isExclusive || false}
                    className="rounded text-[#EA580C] focus:ring-[#EA580C]"
                  />
                  <span>🔪 Peça Única / Exclusiva</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-mono text-slate-700 cursor-pointer">
                  <input
                    name="isFeatured"
                    type="checkbox"
                    defaultChecked={editingProduct?.isFeatured || false}
                    className="rounded text-[#EA580C] focus:ring-[#EA580C]"
                  />
                  <span>Destaque na Vitrine</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-orange-100">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-2xl border border-orange-200 text-slate-600 text-xs font-mono uppercase"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-mono font-bold uppercase shadow-sm"
                >
                  Salvar Lâmina
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Product Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border border-orange-200 p-6 rounded-3xl max-w-sm w-full text-center space-y-4 shadow-xl">
            <h4 className="font-bold text-base text-slate-900">Confirmar Exclusão de Peça?</h4>
            <p className="text-xs text-slate-600">
              Esta ação removerá a lâmina permanentemente do catálogo da forja.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-xs font-mono uppercase"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeleteProduct(deleteConfirmId)}
                className="w-1/2 py-2.5 rounded-xl bg-red-600 text-white text-xs font-mono font-bold uppercase"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete User Confirmation Modal */}
      {deleteConfirmUser && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border border-orange-200 p-6 rounded-3xl max-w-sm w-full text-center space-y-4 shadow-xl">
            <h4 className="font-bold text-base text-slate-900">Remover Usuário {deleteConfirmUser.name}?</h4>
            <p className="text-xs text-slate-600">
              Esta ação cancelará o acesso do usuário à plataforma.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirmUser(null)}
                className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-xs font-mono uppercase"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeleteUser(deleteConfirmUser.id)}
                className="w-1/2 py-2.5 rounded-xl bg-red-600 text-white text-xs font-mono font-bold uppercase"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
