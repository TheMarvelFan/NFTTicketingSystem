import { Button } from "@/components/ui/button";
import { QrCode, ShieldCheck, Ticket } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const navigate = useRouter();

  const handleSignup = () => {
    // Navigate to tickets-buy page after signup
    navigate.push("/tickets-buy");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            BlockTix
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">About</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">Features</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">Contact</Link></li>
            </ul>
          </nav>
          <div className="space-x-4">
            <Button onClick={() => navigate.push("/login")} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Login</Button>
            <Button onClick={handleSignup} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">Signup</Button>
          </div>
        </div>
      </header>

      <main>
        <section className="bg-gray-900 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Secure Your Event Tickets with Blockchain
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              Experience the future of ticketing with unparalleled security and convenience.
            </p>
            <Button
              onClick={() => navigate.push("/verify-tickets")}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg"
            >
              Get Started
            </Button>
          </div>
        </section>

        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose BlockTix?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Ticket className="w-12 h-12 text-blue-600" />}
                title="Easy Ticket Purchase"
                description="Buy tickets securely with just a few clicks. No more waiting in long queues."
              />
              <FeatureCard
                icon={<QrCode className="w-12 h-12 text-blue-600" />}
                title="Quick Verification"
                description="Instant ticket verification using QR codes. Fast and hassle-free entry to events."
              />
              <FeatureCard
                icon={<ShieldCheck className="w-12 h-12 text-blue-600" />}
                title="Tamper-Proof Security"
                description="Blockchain technology ensures your tickets are authentic and cannot be duplicated."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 BlockTix. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
