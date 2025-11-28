import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, User, Mail, Phone, CalendarCheck } from 'lucide-react';
import { BookingDetails, CartItem } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onSubmit: (details: BookingDetails) => void;
  totalAmount: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, cart, onSubmit, totalAmount }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BookingDetails>({
    name: '',
    email: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    notes: ''
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 w-full max-w-2xl rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-950">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              {step === 1 ? 'Schedule Service' : 'Contact Details'}
            </h2>
            <p className="text-slate-400 text-sm">Step {step} of 2</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <form id="booking-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-electric-400 uppercase tracking-wider flex items-center gap-2">
                        <Calendar size={16} /> Date
                    </label>
                    <input 
                        required
                        type="date" 
                        name="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-electric-500 focus:outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-electric-400 uppercase tracking-wider flex items-center gap-2">
                        <Clock size={16} /> Time
                    </label>
                    <select 
                        required
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-electric-500 focus:outline-none"
                    >
                        <option value="">Select Slot</option>
                        <option value="09:00 - 11:00">09:00 AM - 11:00 AM</option>
                        <option value="11:00 - 13:00">11:00 AM - 01:00 PM</option>
                        <option value="14:00 - 16:00">02:00 PM - 04:00 PM</option>
                        <option value="16:00 - 18:00">04:00 PM - 06:00 PM</option>
                    </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-electric-400 uppercase tracking-wider flex items-center gap-2">
                    <MapPin size={16} /> Service Address
                </label>
                <textarea 
                    required
                    name="address"
                    rows={3}
                    placeholder="House No, Street, Landmark in HSR Layout..."
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-electric-500 focus:outline-none resize-none"
                />
              </div>
            </div>
          )}

          {step === 2 && (
             <div className="space-y-6 animate-fadeIn">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-electric-400 uppercase tracking-wider flex items-center gap-2">
                        <User size={16} /> Full Name
                    </label>
                    <input 
                        required
                        type="text" 
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-electric-500 focus:outline-none"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-electric-400 uppercase tracking-wider flex items-center gap-2">
                            <Phone size={16} /> Phone Number
                        </label>
                        <input 
                            required
                            type="tel" 
                            name="phone"
                            placeholder="+91 98765 43210"
                            pattern="[0-9]{10}"
                            title="Please enter a valid 10 digit number"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-electric-500 focus:outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-electric-400 uppercase tracking-wider flex items-center gap-2">
                            <Mail size={16} /> Email Address
                        </label>
                        <input 
                            required
                            type="email" 
                            name="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-electric-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-electric-400 uppercase tracking-wider">
                         Special Instructions (Optional)
                    </label>
                    <textarea 
                        name="notes"
                        rows={2}
                        placeholder="Any gate codes or pet warnings..."
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-electric-500 focus:outline-none resize-none"
                    />
                </div>
             </div>
          )}
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-slate-700 bg-slate-950 flex justify-between items-center">
            {step === 2 ? (
                <>
                    <button 
                        type="button" 
                        onClick={() => setStep(1)}
                        className="text-slate-400 hover:text-white font-semibold transition"
                    >
                        Back
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <span className="block text-xs text-slate-500 uppercase tracking-wider">Estimated Total</span>
                            <span className="block text-xl font-black text-white">₹{totalAmount}</span>
                        </div>
                        <button 
                            type="submit"
                            form="booking-form"
                            className="bg-neon-green hover:bg-[#a3e635] text-black px-8 py-3 rounded-xl font-bold transition shadow-[0_0_20px_rgba(132,204,22,0.3)] hover:shadow-[0_0_30px_rgba(132,204,22,0.5)] transform active:scale-95 flex items-center gap-2"
                        >
                            <CalendarCheck size={18} /> Confirm Booking
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="text-slate-400 text-sm">
                        Total: <span className="text-white font-bold">₹{totalAmount}</span>
                    </div>
                    <button 
                        type="button" 
                        onClick={() => {
                            // Simple validation for step 1
                            if (formData.date && formData.time && formData.address) {
                                setStep(2);
                            } else {
                                alert("Please fill in all fields.");
                            }
                        }}
                        className="bg-electric-600 hover:bg-electric-500 text-white px-8 py-3 rounded-xl font-bold transition flex items-center gap-2 ml-auto"
                    >
                        Next Step
                    </button>
                </>
            )}
        </div>
      </div>
    </div>
  );
};