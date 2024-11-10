'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, CreditCard, QrCodeIcon, Wallet } from 'lucide-react'

export default function BuyTicketPage() {
  const [step, setStep] = useState(1)
  const [selectedEvent, setSelectedEvent] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('fiat')

  const events = [
    { id: '1', name: 'Summer Music Festival', date: '2023-07-15', location: 'New York', type: 'Music' },
    { id: '2', name: 'Tech Conference 2023', date: '2023-08-22', location: 'San Francisco', type: 'Technology' },
    { id: '3', name: 'Food & Wine Expo', date: '2023-09-10', location: 'Chicago', type: 'Culinary' },
  ]

  const handlePurchase = () => {
    setStep(4)
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-[#1F2937]">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Buy Ticket</h1>

        {step === 1 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Event Selection</h2>
            <div className="flex space-x-4 mb-4">
              <Select>
                <SelectTrigger className="w-[180px] bg-[#F3F4F6]">
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023-07-15">July 15, 2023</SelectItem>
                  <SelectItem value="2023-08-22">August 22, 2023</SelectItem>
                  <SelectItem value="2023-09-10">September 10, 2023</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px] bg-[#F3F4F6]">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new-york">New York</SelectItem>
                  <SelectItem value="san-francisco">San Francisco</SelectItem>
                  <SelectItem value="chicago">Chicago</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px] bg-[#F3F4F6]">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="culinary">Culinary</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className={`p-4 rounded-lg cursor-pointer ${
                    selectedEvent === event.id ? 'bg-[#3B82F6] text-white' : 'bg-[#F3F4F6]'
                  }`}
                  onClick={() => setSelectedEvent(event.id)}
                >
                  <h3 className="font-semibold">{event.name}</h3>
                  <p>{event.date} | {event.location} | {event.type}</p>
                </div>
              ))}
            </div>
            <Button className="mt-6 bg-[#3B82F6]" onClick={() => setStep(2)}>Next</Button>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Ticket Details</h2>
            <div className="space-y-4">
              {/* Name field */}
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`border ${name ? 'border-[#10B981]' : 'border-red-500'}`}
                />
                {!name && (
                  <p className="text-red-500 text-sm mt-1">Name is required</p>
                )}
              </div>

              {/* Email field */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`border ${email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'border-[#10B981]' : 'border-red-500'}`}
                />
                {!email && (
                  <p className="text-red-500 text-sm mt-1">Email is required</p>
                )}
                {email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                  <p className="text-red-500 text-sm mt-1">Please enter a valid email</p>
                )}
              </div>
            </div>

            {/* Next button with validation check */}
            <Button
              className="mt-6 bg-[#3B82F6]"
              onClick={() => {
                if (name && email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                  setStep(3);
                }
              }}
              disabled={!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
            >
              Next
            </Button>
          </div>
        )}


        {step === 3 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Payment</h2>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fiat" id="fiat" />
                <Label htmlFor="fiat">Fiat Currency</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="crypto" id="crypto" />
                <Label htmlFor="crypto">Cryptocurrency</Label>
              </div>
            </RadioGroup>
            <div className="mt-4 p-4 bg-[#F3F4F6] rounded-lg">
              <h3 className="font-semibold mb-2">Payment Details</h3>
              {paymentMethod === 'fiat' ? (
                <div className="flex items-center space-x-2">
                  <CreditCard className="text-[#3B82F6]" />
                  <span>$100 USD</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Wallet className="text-[#3B82F6]" />
                  <span>0.0027 BTC (≈ $100 USD)</span>
                </div>
              )}
            </div>
            <Button className="mt-6 bg-[#3B82F6]" onClick={handlePurchase}>Purchase Ticket</Button>
          </div>
        )}

        {step === 4 && (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-semibold mb-4 text-[#10B981]">Purchase Successful!</h2>
            <div className="mb-4">
              <Calendar className="mx-auto text-[#3B82F6]" size={64} />
            </div>
            <p className="text-lg mb-2">Your ticket has been confirmed.</p>
            <p className="font-semibold mb-4">Ticket ID: TKT-12345-6789</p>
            <div className="bg-[#F3F4F6] p-4 rounded-lg inline-block">
              <QrCodeIcon />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}