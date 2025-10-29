import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { experience } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    promoCode: "",
    agreedToTerms: false,
  });

  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  if (!experience) {
    navigate("/");
    return null;
  }

  const promoCodes: Record<string, number> = {
    SAVE10: 0.1,
    FLAT100: 100,
    FIRST20: 0.2,
  };

  const handleApplyPromo = () => {
    const code = formData.promoCode.toUpperCase();
    if (promoCodes[code]) {
      const discountValue = typeof promoCodes[code] === "number" && promoCodes[code] < 1
        ? Math.round(experience.subtotal * promoCodes[code])
        : promoCodes[code];
      
      setDiscount(discountValue);
      setPromoApplied(true);
      toast.success(`Promo code applied! You saved ₹${discountValue}`);
    } else {
      toast.error("Invalid promo code");
      setDiscount(0);
      setPromoApplied(false);
    }
  };

  const finalTotal = experience.total - discount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!formData.agreedToTerms) {
      toast.error("Please agree to terms and conditions");
      return;
    }

    // Generate booking reference
    const bookingRef = Math.random().toString(36).substring(2, 10).toUpperCase();

    navigate("/confirmation", {
      state: {
        booking: {
          reference: bookingRef,
          ...experience,
          ...formData,
          discount,
          finalTotal,
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Checkout
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="p-6 border-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Full name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      placeholder="Your name"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Promo code</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Promo code"
                      value={formData.promoCode}
                      onChange={(e) =>
                        setFormData({ ...formData, promoCode: e.target.value })
                      }
                      disabled={promoApplied}
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleApplyPromo}
                      disabled={promoApplied || !formData.promoCode}
                    >
                      Apply
                    </Button>
                  </div>
                  {promoApplied && (
                    <p className="text-xs text-success mt-1">
                      ✓ Promo code applied successfully
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreedToTerms}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, agreedToTerms: checked as boolean })
                    }
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground">
                    I agree to the terms and safety policy
                  </label>
                </div>
              </form>
            </Card>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-2 sticky top-24">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Booking Summary</h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Experience</span>
                      <span className="font-medium text-right">{experience.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium">{experience.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time</span>
                      <span className="font-medium">{experience.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Qty</span>
                      <span className="font-medium">{experience.quantity}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{experience.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes</span>
                    <span className="font-medium">₹{experience.taxes}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Discount</span>
                      <span className="font-medium">-₹{discount}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold">₹{finalTotal}</span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleSubmit}
                >
                  Pay and Confirm
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
