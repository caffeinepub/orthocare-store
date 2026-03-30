import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", message: "" });
  };

  const INFO_CARDS = [
    {
      icon: Mail,
      title: "Email Us",
      value: "support@orthocare.com",
      desc: "We reply within 24 hours",
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+91 98765 43210",
      desc: "Mon–Sat, 9 AM – 6 PM",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      value: "Available on website",
      desc: "Instant support during business hours",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Mumbai, India",
      desc: "Serving pan-India",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Contact Us
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          We're here to help. Reach out through any channel below.
        </p>
      </motion.div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
        {INFO_CARDS.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-border rounded-xl p-5 shadow-xs text-center"
              data-ocid="contact.card"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{card.title}</h3>
              <p className="font-medium text-sm text-foreground">
                {card.value}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{card.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            data-ocid="contact.panel"
          >
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                required
                className="mt-1"
                data-ocid="contact.input"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
                required
                className="mt-1"
                data-ocid="contact.input"
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="How can we help you?"
                value={form.message}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, message: e.target.value }))
                }
                required
                rows={5}
                className="mt-1"
                data-ocid="contact.textarea"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground"
              data-ocid="contact.submit_button"
            >
              Send Message
            </Button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold">Business Hours</h2>
          <div className="bg-light-section rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-semibold">Working Hours</span>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Monday – Friday</span>
                <span className="font-medium">9:00 AM – 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Saturday</span>
                <span className="font-medium">9:00 AM – 4:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Sunday</span>
                <span className="text-muted-foreground">Closed</span>
              </li>
            </ul>
          </div>
          <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
            <h3 className="font-semibold mb-2 text-primary">
              Medical Emergency?
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              For medical emergencies, please contact a licensed healthcare
              professional or call emergency services. Our products are for
              support and relief — please consult a doctor for serious
              conditions.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
