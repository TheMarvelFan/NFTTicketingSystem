import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarDays, Wallet, Mail, User, Settings } from 'lucide-react'

export default function MyAccount() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const tickets = [
    { id: 1, event: "Summer Music Festival", date: "2024-07-15", location: "Central Park" },
    { id: 2, event: "Tech Conference 2024", date: "2024-09-22", location: "Convention Center" },
  ]

  const upcomingEvents = [
    { id: 1, name: "Art Exhibition", date: "2024-08-05", location: "City Gallery" },
    { id: 2, name: "Food & Wine Tasting", date: "2024-10-10", location: "Riverside Venue" },
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Purchased Tickets</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {tickets.map((ticket) => (
                <Card key={ticket.id} className="bg-gray-100">
                  <CardHeader>
                    <CardTitle>{ticket.event}</CardTitle>
                    <CardDescription>
                      <CalendarDays className="inline-block mr-2" />
                      {ticket.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{ticket.location}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">View Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="bg-gray-100">
                  <CardHeader>
                    <CardTitle>{event.name}</CardTitle>
                    <CardDescription>
                      <CalendarDays className="inline-block mr-2" />
                      {event.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{event.location}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">Get Tickets</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wallet" className="text-gray-700">Linked Wallet</Label>
                <div className="flex items-center space-x-2">
                  <Input id="wallet" placeholder="0x1234...5678" disabled />
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    <Wallet className="mr-2 h-4 w-4" /> Link Wallet
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notifications" className="text-gray-700">Notification Preferences</Label>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="email-notifications" className="rounded text-green-500 focus:ring-green-500" />
                  <Label htmlFor="email-notifications" className="text-gray-700">Receive email notifications</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-green-500 hover:bg-green-600 text-white">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}