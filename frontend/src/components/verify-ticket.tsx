'use client'
import { useState } from 'react'
import { QrCode, Check, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function VerifyTicket() {
  const [ticketId, setTicketId] = useState('')
  const [verificationResult, setVerificationResult] = useState<'valid' | 'invalid' | null>(null)
  const [showOtp, setShowOtp] = useState(false)
  const [otp, setOtp] = useState('')

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulating verification process
    setVerificationResult(Math.random() > 0.5 ? 'valid' : 'invalid')
    setShowOtp(true)
  }


  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Verify Ticket</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ticketId">Ticket ID</Label>
              <div className="flex space-x-2">
                <Input
                  id="ticketId"
                  type="text"
                  placeholder="Enter Ticket ID"
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value)}
                  className="flex-grow bg-gray-200"
                />
                <Button type="button" variant="outline" className="bg-gray-200 p-2 h-auto aspect-square">
                  <QrCode className="h-6 w-6" />
                  <span className="sr-only">Scan QR Code</span>
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Verify Ticket
            </Button>
          </form>

          {verificationResult && (
            <Card className={`mt-4 ${verificationResult === 'valid' ? 'bg-green-100' : 'bg-orange-100'}`}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">
                    {verificationResult === 'valid' ? 'Valid Ticket' : 'Invalid Ticket'}
                  </span>
                  {verificationResult === 'valid' ? (
                    <Check className="h-6 w-6 text-green-600" />
                  ) : (
                    <X className="h-6 w-6 text-orange-600" />
                  )}
                </div>
                <div className="mt-2 text-gray-700">
                  <p><strong>Event:</strong> Summer Music Festival</p>
                  <p><strong>Date:</strong> July 15, 2023</p>
                  <p><strong>Time:</strong> 7:00 PM</p>
                  <p><strong>Seat:</strong> A-123</p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}