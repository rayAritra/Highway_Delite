import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Download, Share2 } from "lucide-react";
import { toast } from "sonner";

export default function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};

  if (!booking) {
    navigate("/");
    return null;
  }

  const handleDownload = () => {
    toast.success("Booking details downloaded!");
  };

  const handleShare = () => {
    toast.success("Booking link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-success/10 rounded-full mb-4 animate-in zoom-in duration-500">
            <CheckCircle2 className="w-12 h-12 text-success" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">
            Your adventure awaits. We've sent a confirmation email to{" "}
            <span className="font-medium">{booking.email}</span>
          </p>
        </div>

        <Card className="p-6 border-2 mb-6">
          <div className="space-y-4">
            <div>
              <span className="text-sm text-muted-foreground">Booking Reference</span>
              <p className="text-2xl font-bold text-primary">{booking.reference}</p>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground block mb-1">Experience</span>
                <span className="font-medium">{booking.title}</span>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1">Date</span>
                <span className="font-medium">{booking.date}</span>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1">Time</span>
                <span className="font-medium">{booking.time}</span>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1">Guests</span>
                <span className="font-medium">{booking.quantity}</span>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1">Name</span>
                <span className="font-medium">{booking.fullName}</span>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1">Email</span>
                <span className="font-medium">{booking.email}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">₹{booking.subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Taxes</span>
                <span className="font-medium">₹{booking.taxes}</span>
              </div>
              {booking.discount > 0 && (
                <div className="flex justify-between text-sm text-success">
                  <span>Discount</span>
                  <span className="font-medium">-₹{booking.discount}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between">
                <span className="font-semibold">Total Paid</span>
                <span className="text-xl font-bold">₹{booking.finalTotal}</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleDownload}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Booking
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleShare}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>

        <div className="text-center mt-8">
          <Button onClick={() => navigate("/")} size="lg">
            Book Another Experience
          </Button>
        </div>
      </div>
    </div>
  );
}
