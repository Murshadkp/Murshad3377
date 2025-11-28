import React, { useState, useMemo } from 'react';
import { ShoppingCart, Search, Zap, CheckCircle, X, Star, ChevronRight, Thermometer, Droplets, Wrench, Home, Tv, ArrowRight, Minus, Plus } from 'lucide-react';
import { CATEGORIES, SERVICES } from './constants';
import { CartItem, Service, BookingDetails } from './types';
import { BookingModal } from './components/BookingModal';
import { AIChat } from './components/AIChat';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [bookingComplete, setBookingComplete] = useState<BookingDetails | null>(null);

  // Filter Logic
  const filteredServices = useMemo(() => {
    return SERVICES.filter(service => {
      const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
      const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            service.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Group services by category for "All" view
  const groupedServices = useMemo(() => {
    if (selectedCategory !== 'All' || searchQuery) return null;
    
    const groups: Record<string, Service[]> = {};
    CATEGORIES.filter(c => c !== 'All').forEach(cat => {
      groups[cat] = SERVICES.filter(s => s.category === cat);
    });
    return groups;
  }, [selectedCategory, searchQuery]);

  // Cart Logic
  const addToCart = (service: Service) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === service.id);
      if (existing) {
        return prev.map(item => item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      setIsCartOpen(true); // Auto open cart on first add for "Aggressive" UX
      return [...prev, { ...service, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleBookingSubmit = (details: BookingDetails) => {
    setTimeout(() => {
      setBookingComplete(details);
      setCart([]);
      setIsBookingModalOpen(false);
      setIsCartOpen(false);
    }, 1000);
  };

  // Category Icon Mapping
  const getCategoryIcon = (cat: string) => {
    switch(cat) {
        case 'AC Services': return <Thermometer size={28} />;
        case 'Plumbing': return <Droplets size={28} />;
        case 'Electrical': return <Zap size={28} />;
        case 'Smart Home': return <Home size={28} />;
        case 'Appliances': return <Tv size={28} />;
        default: return <Zap size={28} />;
    }
  };

  // --------------------------------------------------------------------------
  // RENDER HELPERS
  // --------------------------------------------------------------------------
  const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
    <div className="group bg-slate-900 rounded-2xl overflow-hidden hover:shadow-[0_10px_40px_-10px_rgba(14,165,233,0.3)] transition-all duration-300 border border-slate-800 flex flex-col h-full relative">
      <div className="h-48 overflow-hidden relative">
          <img 
              src={service.imageUrl} 
              alt={service.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-slate-900/90 to-transparent"></div>
          {service.bestseller && (
              <div className="absolute top-3 left-3 bg-neon-yellow text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg">
                  Bestseller
              </div>
          )}
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-white text-xs font-bold flex items-center gap-1 border border-white/10">
              <Star size={10} className="text-yellow-400 fill-current" /> {service.rating}
          </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-white group-hover:text-electric-400 transition leading-tight mb-2">{service.name}</h3>
          <p className="text-slate-400 text-xs mb-4 line-clamp-2 flex-1">{service.description}</p>
          
          <div className="flex items-center justify-between mt-auto">
              <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase">{service.duration}</span>
                  <span className="text-xl font-black text-white">₹{service.price}</span>
              </div>
              
              {cart.find(c => c.id === service.id) ? (
                  <div className="flex items-center gap-3 bg-electric-900/50 rounded-lg p-1 border border-electric-500/30">
                     <button onClick={() => updateQuantity(service.id, -1)} className="w-8 h-8 flex items-center justify-center text-white bg-electric-600 rounded hover:bg-electric-500"><Minus size={14}/></button>
                     <span className="text-white font-bold">{cart.find(c => c.id === service.id)?.quantity}</span>
                     <button onClick={() => updateQuantity(service.id, 1)} className="w-8 h-8 flex items-center justify-center text-white bg-electric-600 rounded hover:bg-electric-500"><Plus size={14}/></button>
                  </div>
              ) : (
                  <button 
                      onClick={() => addToCart(service)}
                      className="bg-white hover:bg-neon-yellow hover:text-black text-slate-900 px-6 py-2 rounded-xl font-bold text-sm transition shadow-lg transform active:scale-95 border-2 border-transparent hover:border-neon-yellow"
                  >
                      ADD
                  </button>
              )}
          </div>
      </div>
    </div>
  );

  // --------------------------------------------------------------------------
  // SUCCESS SCREEN
  // --------------------------------------------------------------------------
  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900 p-8 rounded-3xl max-w-lg w-full text-center border border-electric-500 shadow-[0_0_50px_rgba(14,165,233,0.2)] animate-fadeIn relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-electric-500 to-neon-green"></div>
          <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
            <CheckCircle className="text-green-500 w-12 h-12" />
          </div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Booking Confirmed!</h1>
          <p className="text-slate-400 mb-6 text-sm">
            We have sent the booking details to <br/>
            <span className="text-electric-400 font-bold font-mono bg-electric-900/30 px-2 py-1 rounded mt-1 inline-block">help.electranow@gmail.com</span>
          </p>
          <div className="bg-slate-800 rounded-xl p-4 mb-8 text-left space-y-2 border border-slate-700">
             <div className="flex justify-between">
                <span className="text-slate-500 text-xs uppercase">Service Date</span>
                <span className="text-white font-bold text-sm">{bookingComplete.date}</span>
             </div>
             <div className="flex justify-between">
                <span className="text-slate-500 text-xs uppercase">Arrival Time</span>
                <span className="text-white font-bold text-sm">{bookingComplete.time}</span>
             </div>
             <div className="flex justify-between">
                <span className="text-slate-500 text-xs uppercase">Contact</span>
                <span className="text-white font-bold text-sm">{bookingComplete.phone}</span>
             </div>
          </div>
          <button 
            onClick={() => setBookingComplete(null)}
            className="w-full bg-electric-600 hover:bg-electric-500 text-white font-bold py-4 rounded-xl transition uppercase tracking-widest text-sm"
          >
            Book Another Service
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-20 font-sans selection:bg-electric-500 selection:text-white">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Custom Logo */}
            <div className="flex items-center gap-1 cursor-pointer group" onClick={() => {window.scrollTo(0,0); setSelectedCategory('All'); setSearchQuery('');}}>
              <div className="flex items-center tracking-tighter text-3xl font-black select-none">
                <span className="text-white">Electran</span>
                <div className="relative flex items-center justify-center w-7 h-7 mx-0.5 mt-0.5">
                    {/* Power Button Icon */}
                    <div className="w-6 h-6 rounded-full border-[3px] border-neon-green border-t-transparent -rotate-45 relative shadow-[0_0_10px_rgba(132,204,22,0.6)]"></div>
                    <div className="absolute w-[3px] h-3 bg-neon-green -top-[1px] shadow-[0_0_5px_rgba(132,204,22,0.8)]"></div>
                </div>
                <span className="text-white">w</span>
              </div>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-xl mx-12 relative group">
              <input 
                type="text"
                placeholder="Search for 'AC Service', 'Leaking Tap'..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-neon-green focus:bg-slate-900 transition-all placeholder:text-slate-500 focus:shadow-[0_0_20px_rgba(132,204,22,0.1)]"
              />
              <Search className="absolute left-4 top-3.5 text-slate-500 h-5 w-5 group-focus-within:text-neon-green transition" />
            </div>

            {/* Cart Button */}
            <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-3 rounded-2xl transition hover:bg-slate-800 group"
            >
                <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 group-hover:border-electric-500 transition">
                    <ShoppingCart className="text-white h-5 w-5 group-hover:scale-110 transition" />
                </div>
                {cartCount > 0 && (
                    <span className="absolute top-1 right-1 bg-neon-green text-black text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-slate-950 animate-bounce">
                        {cartCount}
                    </span>
                )}
            </button>
          </div>
          
          {/* Mobile Search */}
          <div className="md:hidden pb-4">
             <div className="relative">
              <input 
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-neon-green focus:shadow-[0_0_15px_rgba(132,204,22,0.1)] transition"
              />
              <Search className="absolute left-3 top-3.5 text-slate-500 h-5 w-5" />
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* HERO - Only show on Home */}
        {!searchQuery && selectedCategory === 'All' && (
            <div className="mb-12 animate-fadeIn">
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 border border-slate-800 relative overflow-hidden flex items-center">
                    <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 bg-[url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center [mask-image:linear-gradient(to_left,black,transparent)] pointer-events-none"></div>
                    <div className="relative z-10 max-w-2xl">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-neon-green font-bold tracking-widest uppercase text-xs">Premium Home Services</span>
                            <span className="bg-electric-600/30 text-electric-400 text-[10px] font-black px-2 py-0.5 rounded border border-electric-500/50">BEST IN HSR LAYOUT</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                            Quality Repairs. <br/>
                            <span className="text-electric-400">Instant Solutions.</span>
                        </h1>
                        <p className="text-slate-400 text-lg mb-8 max-w-md">
                            Book expert technicians for AC, Plumbing, and Electrical needs. 100% verified professionals serving all of HSR Layout.
                        </p>
                        <div className="flex gap-4">
                             <button onClick={() => setSelectedCategory('AC Services')} className="bg-white hover:bg-neon-green hover:text-black text-slate-900 px-6 py-3 rounded-xl font-bold transition shadow-lg">
                                Book AC Service
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* CATEGORY GRID - Sticky or Prominent */}
        <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">What are you looking for?</h2>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-6">
                {CATEGORIES.filter(c => c !== 'All').map(cat => (
                    <button 
                        key={cat}
                        onClick={() => {
                            setSelectedCategory(cat);
                            setSearchQuery('');
                            // Smooth scroll to list
                            document.getElementById('services-list')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-300 group
                            ${selectedCategory === cat 
                                ? 'bg-electric-900/30 border-electric-500 shadow-[0_0_20px_rgba(14,165,233,0.2)]' 
                                : 'bg-slate-900 border-slate-800 hover:border-slate-600 hover:bg-slate-800'
                            }`}
                    >
                        <div className={`
                            w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110
                            ${selectedCategory === cat ? 'text-electric-400' : 'text-slate-400 group-hover:text-white'}
                        `}>
                            {getCategoryIcon(cat)}
                        </div>
                        <span className={`text-xs md:text-sm font-bold text-center leading-tight ${selectedCategory === cat ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                            {cat}
                        </span>
                    </button>
                ))}
            </div>
        </div>

        {/* SERVICE LISTING */}
        <div id="services-list" className="min-h-[400px]">
            {searchQuery || selectedCategory !== 'All' ? (
                // Filtered List View
                <div>
                     <div className="flex items-center gap-2 mb-6">
                        {selectedCategory !== 'All' && (
                            <button onClick={() => setSelectedCategory('All')} className="text-slate-500 hover:text-white flex items-center gap-1 text-sm font-bold">
                                Home <ChevronRight size={14}/>
                            </button>
                        )}
                        <h2 className="text-2xl font-black text-white">
                            {searchQuery ? `Results for "${searchQuery}"` : selectedCategory}
                        </h2>
                     </div>
                     
                     {filteredServices.length === 0 ? (
                        <div className="text-center py-20 bg-slate-900 rounded-3xl border border-slate-800 border-dashed">
                            <Search className="text-slate-700 w-16 h-16 mx-auto mb-4" />
                            <h3 className="text-white text-xl font-bold">No services found</h3>
                            <button onClick={() => {setSearchQuery(''); setSelectedCategory('All');}} className="mt-4 text-electric-400 font-bold hover:underline">
                                View All Services
                            </button>
                        </div>
                     ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredServices.map(service => (
                                <ServiceCard key={service.id} service={service} />
                            ))}
                        </div>
                     )}
                </div>
            ) : (
                // Grouped View (Urban Club Style)
                <div className="space-y-12">
                    {Object.entries((groupedServices || {}) as Record<string, Service[]>).map(([category, services]) => (
                        <div key={category}>
                             <div className="flex justify-between items-end mb-6 border-b border-slate-800 pb-2">
                                <h3 className="text-2xl font-black text-white flex items-center gap-2">
                                    {getCategoryIcon(category)} {category}
                                </h3>
                                <button 
                                    onClick={() => setSelectedCategory(category)}
                                    className="text-electric-400 text-sm font-bold hover:text-white flex items-center gap-1 transition"
                                >
                                    See All <ArrowRight size={14}/>
                                </button>
                             </div>
                             {/* Horizontal Scroll on Mobile, Grid on Desktop */}
                             <div className="flex md:grid md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-x-auto pb-6 md:pb-0 snap-x snap-mandatory hide-scrollbar">
                                {services.slice(0, 4).map(service => (
                                    <div key={service.id} className="min-w-[280px] md:min-w-0 snap-center">
                                        <ServiceCard service={service} />
                                    </div>
                                ))}
                             </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>

      {/* FLOATING ACTION BUTTON (CHAT) */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 z-40 bg-electric-600 hover:bg-electric-500 text-white p-4 rounded-full shadow-[0_0_30px_rgba(14,165,233,0.4)] transition-all hover:scale-110 active:scale-95 group border-2 border-electric-400"
      >
        {isChatOpen ? <X size={24} /> : <Zap size={24} className="fill-current group-hover:animate-pulse-fast" />}
      </button>

      {/* CHAT COMPONENT */}
      <AIChat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        onAddService={(id) => {
            const svc = SERVICES.find(s => s.id === id);
            if (svc) addToCart(svc);
        }}
      />

      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
            <div className="relative w-full max-w-md bg-slate-900 h-full shadow-2xl flex flex-col animate-slideLeft border-l border-slate-700">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                    <h2 className="text-2xl font-black text-white flex items-center gap-2">
                        <ShoppingCart className="text-neon-green" /> Cart
                    </h2>
                    <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-white bg-slate-800 p-2 rounded-lg">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {cart.length === 0 ? (
                        <div className="text-center text-slate-500 mt-20">
                            <div className="bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
                                <ShoppingCart size={32} className="opacity-50" />
                            </div>
                            <p className="font-medium">Your cart is empty.</p>
                            <button onClick={() => setIsCartOpen(false)} className="mt-4 text-electric-400 font-bold hover:underline">Start Booking</button>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex gap-4 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-electric-500"></div>
                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-700 flex-shrink-0">
                                    <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-0.5">
                                    <div>
                                        <h4 className="font-bold text-white text-sm mb-1 line-clamp-1">{item.name}</h4>
                                        <p className="text-electric-400 font-black text-sm">₹{item.price * item.quantity}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-3 bg-slate-900 rounded-lg p-1 border border-slate-700">
                                            <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded transition">-</button>
                                            <span className="text-white text-xs font-bold w-4 text-center">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded transition">+</button>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="absolute top-2 right-2 text-slate-600 hover:text-red-400 p-1">
                                    <X size={14} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-6 bg-slate-950 border-t border-slate-800">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-slate-400 font-medium">Estimated Total</span>
                            <span className="text-3xl font-black text-white tracking-tighter">₹{cartTotal}</span>
                        </div>
                        <button 
                            onClick={() => setIsBookingModalOpen(true)}
                            className="w-full bg-neon-green hover:bg-[#a3e635] text-black py-4 rounded-xl font-black text-lg transition flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(132,204,22,0.3)] hover:shadow-[0_0_30px_rgba(132,204,22,0.5)] transform active:scale-95"
                        >
                            PROCEED TO BOOK
                        </button>
                    </div>
                )}
            </div>
        </div>
      )}

      {/* BOOKING MODAL */}
      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        cart={cart}
        totalAmount={cartTotal}
        onSubmit={handleBookingSubmit}
      />
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        @keyframes slideLeft {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
        .animate-slideLeft {
            animation: slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
            animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}