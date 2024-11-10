import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CalendarDays, Wallet, Mail, User, Settings, ChevronRight, Info } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function EnhancedMyAccount() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const tickets = [
    { id: 1, event: "Summer Music Festival", date: "2024-07-15", location: "Central Park", status: "Confirmed" },
    { id: 2, event: "Tech Conference 2024", date: "2024-09-22", location: "Convention Center", status: "Pending" },
  ]

  const upcomingEvents = [
    { id: 1, name: "Art Exhibition", date: "2024-08-05", location: "City Gallery", ticketsAvailable: true },
    { id: 2, name: "Food & Wine Tasting", date: "2024-10-10", location: "Riverside Venue", ticketsAvailable: false },
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
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
                    <p className="mb-2">{ticket.location}</p>
                    <p className={`font-semibold ${ticket.status === 'Confirmed' ? 'text-green-600' : 'text-yellow-600'}`}>
                      Status: {ticket.status}
                    </p>
                  </CardContent>
                  <CardFooter className="justify-between">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">View Details</Button>
                    <Button variant="outline" className="text-blue-500 border-blue-500">
                      Transfer <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
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
                    <Button 
                      className={`${event.ticketsAvailable ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'} text-white`}
                      disabled={!event.ticketsAvailable}
                    >
                      {event.ticketsAvailable ? 'Get Tickets' : 'Sold Out'}
                    </Button>
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
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="personal-info">
                  <AccordionTrigger>Personal Information</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700">Name</Label>
                        <Input id="name" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" />
                      </div>
                      <Button className="bg-green-500 hover:bg-green-600 text-white">Update Personal Info</Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="wallet">
                  <AccordionTrigger>Linked Wallet</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="wallet" className="text-gray-700 flex items-center">
                          Wallet Address
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="ml-2 h-4 w-4 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Your Ethereum wallet address for receiving NFT tickets</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Input id="wallet" placeholder="0x1234...5678" disabled />
                          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                            <Wallet className="mr-2 h-4 w-4" /> Link Wallet
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        To link your wallet, click the "Link Wallet" button and follow the prompts in your wallet application.
                        Make sure you're using a secure connection and never share your private keys.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="notifications">
                  <AccordionTrigger>Notification Preferences</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="email-notifications" className="rounded text-green-500 focus:ring-green-500" />
                        <Label htmlFor="email-notifications" className="text-gray-700">Receive email notifications</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="sms-notifications" className="rounded text-green-500 focus:ring-green-500" />
                        <Label htmlFor="sms-notifications" className="text-gray-700">Receive SMS notifications</Label>
                      </div>
                      <Button className="bg-green-500 hover:bg-green-600 text-white">Update Preferences</Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}