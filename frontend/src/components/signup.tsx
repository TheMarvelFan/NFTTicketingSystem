'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Role = 'buyer' | 'verifier' | 'seller'

interface FormData {
  email: string
  password: string
  role: Role
  walletAddress?: string
  phoneNumber: string
}

export default function SignUpPage() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    role: 'buyer',
    walletAddress: '',
    phoneNumber: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRoleChange = (value: Role) => {
    setFormData({ ...formData, role: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the sign-up request to your backend
    console.log('Sign-up attempt', formData)
  }

  useEffect(() => {
    if (formData.role === 'verifier') {
      setFormData(prev => ({ ...prev, walletAddress: undefined }))
    } else if (!formData.walletAddress) {
      setFormData(prev => ({ ...prev, walletAddress: '' }))
    }
  }, [formData.role])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="user@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
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
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">Role</label>
              <Select onValueChange={handleRoleChange} value={formData.role}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buyer">Buyer</SelectItem>
                  <SelectItem value="verifier">Verifier</SelectItem>
                  <SelectItem value="seller">Seller</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.role !== 'verifier' && (
              <div className="space-y-2">
                <label htmlFor="walletAddress" className="text-sm font-medium">Wallet Address</label>
                <Input
                  id="walletAddress"
                  name="walletAddress"
                  type="text"
                  placeholder="0x123456789abcdef"
                  value={formData.walletAddress}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="phoneNumber" className="text-sm font-medium">Phone Number</label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="+1234567890"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">Sign Up</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}