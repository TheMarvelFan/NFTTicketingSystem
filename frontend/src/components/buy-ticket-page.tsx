import { useState } from 'react';

const BuyTicketPage = () => {
  const [step, setStep] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('fiat');

  interface Event {
    id: number;
    name: string;
    date: string;
    location: string;
    type: string;
  }

  const events: Event[] = [
    { id: 1, name: 'Summer Music Festival', date: '2023-07-15', location: 'New York', type: 'Music' },
    { id: 2, name: 'Tech Conference 2023', date: '2023-08-22', location: 'San Francisco', type: 'Technology' },
    { id: 3, name: 'Food & Wine Expo', date: '2023-09-10', location: 'Chicago', type: 'Culinary' },
  ];

  const handlePurchase = () => {
    if (selectedEvent === null) {
      alert('Please select an event before purchasing.');
      return;
    }
    setStep(4);
  };

  return (
    <div className="p-6">
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Select an Event</h2>
          <div className="grid grid-cols-1 gap-4">
            {events.map((event) => (
              <div
                key={event.id}
                className={`p-4 rounded-lg cursor-pointer ${
                  selectedEvent === event.id ? 'bg-[#3B82F6] text-white' : 'bg-[#F3F4F6]'
                }`}
                onClick={() => setSelectedEvent(event.id)}
              >
                <h3 className="text-lg font-semibold">{event.name}</h3>
                <p>{event.date}</p>
                <p>{event.location}</p>
                <p>Type: {event.type}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => setStep(2)}
            disabled={selectedEvent === null}
            className={`mt-4 px-6 py-2 rounded ${selectedEvent === null ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Enter Your Details</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <button onClick={() => setStep(3)} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded">
            Next
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Choose Payment Method</h2>
          <label className="block mb-2">
            <input
              type="radio"
              name="payment"
              value="fiat"
              checked={paymentMethod === 'fiat'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Fiat (Credit Card, Debit Card)
          </label>
          <label className="block mb-4">
            <input
              type="radio"
              name="payment"
              value="crypto"
              checked={paymentMethod === 'crypto'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Crypto (Bitcoin, Ethereum)
          </label>
          <button onClick={handlePurchase} className="px-6 py-2 bg-blue-500 text-white rounded">
            Complete Purchase
          </button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Purchase Complete</h2>
          <p>Thank you for purchasing a ticket to {events.find(event => event.id === selectedEvent)?.name}!</p>
        </div>
      )}
    </div>
  );
};

export default BuyTicketPage;
