import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MapPin, Clock, Users, Star, Check, Minus, Plus } from "lucide-react";
import { experiences } from "@/data/experiences";
import { useState } from "react";
import { toast } from "sonner";

export default function Experience() {
  const { id } = useParams();
  const navigate = useNavigate();
  const experience = experiences.find((e) => e.id === id);

  const [selectedDate, setSelectedDate] = useState("Oct 22");
  const [selectedTime, setSelectedTime] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!experience) {
    return <div>Experience not found</div>;
  }

  const dates = ["Oct 22", "Oct 23", "Oct 24", "Oct 25", "Oct 26"];

  const handleConfirm = () => {
    if (!selectedTime) {
      toast.error("Please select a time slot");
      return;
    }
    
    const slot = experience.timeSlots.find(s => s.time === selectedTime);
    if (slot && slot.bookedSeats >= slot.availableSeats) {
      toast.error("This slot is sold out");
      return;
    }

    const subtotal = experience.price * quantity;
    const taxes = Math.round(subtotal * 0.06);
    const total = subtotal + taxes;

    navigate("/checkout", {
      state: {
        experience: {
          id: experience.id,
          title: experience.title,
          date: selectedDate,
          time: selectedTime,
          quantity,
          subtotal,
          taxes,
          total,
        },
      },
    });
  };

  const subtotal = experience.price * quantity;
  const taxes = Math.round(subtotal * 0.06);
  const total = subtotal + taxes;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Details
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="rounded-xl overflow-hidden">
              <img
                src={experience.images[0]}
                alt={experience.title}
                className="w-full h-[400px] object-cover"
              />
            </div>

            {/* Title and Description */}
            <Card className="p-6 border-2">
              <h1 className="text-3xl font-bold mb-4">{experience.title}</h1>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{experience.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{experience.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>Max {experience.maxGuests} guests</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="font-semibold">{experience.rating}</span>
                <span className="text-muted-foreground">({experience.reviewCount} reviews)</span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {experience.description}
              </p>

              {/* Date Selection */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Choose date</h3>
                <div className="flex gap-2 flex-wrap">
                  {dates.map((date) => (
                    <Badge
                      key={date}
                      variant={selectedDate === date ? "default" : "outline"}
                      className="cursor-pointer px-4 py-2"
                      onClick={() => setSelectedDate(date)}
                    >
                      {date}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Choose time</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {experience.timeSlots.map((slot) => {
                    const isSoldOut = slot.bookedSeats >= slot.availableSeats;
                    const seatsLeft = slot.availableSeats - slot.bookedSeats;
                    
                    return (
                      <Button
                        key={slot.time}
                        variant={selectedTime === slot.time ? "default" : "outline"}
                        className="flex flex-col h-auto py-3"
                        onClick={() => !isSoldOut && setSelectedTime(slot.time)}
                        disabled={isSoldOut}
                      >
                        <span className="font-semibold">{slot.time}</span>
                        <span className="text-xs mt-1">
                          {isSoldOut ? (
                            <span className="text-destructive">Sold out</span>
                          ) : (
                            <span className="text-success">{seatsLeft} left</span>
                          )}
                        </span>
                      </Button>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  All times are in IST (GMT +5:30)
                </p>
              </div>

              {/* About */}
              <div>
                <h3 className="font-semibold mb-3">About</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Highlights</h4>
                    <ul className="space-y-1">
                      {experience.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Inclusions</h4>
                    <ul className="space-y-1">
                      {experience.inclusions.map((inclusion, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                          <span>{inclusion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-2 sticky top-24">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Starts at</span>
                  <span className="text-2xl font-bold">₹{experience.price}</span>
                </div>

                <Separator />

                <div>
                  <span className="text-sm font-medium mb-2 block">Quantity</span>
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.min(experience.maxGuests, quantity + 1))}
                      disabled={quantity >= experience.maxGuests}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxes</span>
                    <span className="font-medium">₹{taxes}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold">₹{total}</span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleConfirm}
                  disabled={!selectedTime}
                >
                  Confirm
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
