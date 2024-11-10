import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, CreditCard, Wallet } from 'lucide-react'

export default function BuyTicketPage() {
  const [step, setStep] = useState(1)
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null) // updated to number or null
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('fiat')

  const events = [
    { id: 1, name: 'Summer Music Festival', date: '2023-07-15', location: 'New York', type: 'Music' },
    { id: 2, name: 'Tech Conference 2023', date: '2023-08-22', location: 'San Francisco', type: 'Technology' },
    { id: 3, name: 'Food & Wine Expo', date: '2023-09-10', location: 'Chicago', type: 'Culinary' },
  ]

  const handlePurchase = () => {
    // Simulate purchase process
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
                  onClick={() => setSelectedEvent(event.id)} // no changes needed here
                >
                  <h3 className="font-semibold">{event.name}</h3>
                  <p>{event.date} | {event.location} | {event.type}</p>
                </div>
              ))}
            </div>
            <Button className="mt-6 bg-[#3B82F6]" onClick={() => setStep(2)}>Next</Button>
          </div>
        )}

        {/* Remaining steps here */}
      </div>
    </div>
  )
}
