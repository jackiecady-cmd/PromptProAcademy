import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Bot, Clock, Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const faqItems = [
  {
    question: "How do I upload my DNA data?",
    answer: "After purchasing, you'll receive instructions to download your raw DNA file from Ancestry, 23andMe, or other providers. Then upload it through your dashboard."
  },
  {
    question: "How long does the analysis take?",
    answer: "Base analysis typically takes 24-48 hours. Deep heritage add-ons may take 3-5 business days for thorough research."
  },
  {
    question: "Can I get a refund?",
    answer: "Yes! We offer a 30-day satisfaction guarantee. If you're not happy with your report, contact us for a full refund."
  },
  {
    question: "What DNA providers do you support?",
    answer: "We accept raw DNA files from Ancestry, 23andMe, FamilyTreeDNA, MyHeritage, and most other major providers."
  },
  {
    question: "Is my DNA data secure?",
    answer: "Absolutely. We use industry-standard encryption and never sell or share your genetic data. You can request deletion at any time."
  }
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setName("");
    setEmail("");
    setMessage("");
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-muted/10 py-12">
      <div className="container px-4 md:px-6 max-w-5xl">
        <div className="text-center mb-12">
          <Badge className="mb-4">Beta</Badge>
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground">
            Questions about your ancestry journey? We're here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Send a Message
                </CardTitle>
                <CardDescription>We typically respond within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help you?"
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="py-4 text-center">
                  <Clock className="h-6 w-6 mx-auto text-primary mb-2" />
                  <p className="font-bold">24hr Response</p>
                  <p className="text-xs text-muted-foreground">Average reply time</p>
                </CardContent>
              </Card>
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="py-4 text-center">
                  <MessageSquare className="h-6 w-6 mx-auto text-primary mb-2" />
                  <p className="font-bold">Forum Help</p>
                  <p className="text-xs text-muted-foreground">Community support</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-accent" />
                  Quick Answers
                </CardTitle>
                <CardDescription>Common questions answered instantly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqItems.map((item, idx) => (
                  <div key={idx} className="border-b pb-4 last:border-0 last:pb-0">
                    <h4 className="font-medium text-sm mb-1">{item.question}</h4>
                    <p className="text-sm text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Consultation Upsell */}
            <Card className="mt-6 border-2 border-primary/30">
              <CardContent className="py-6 text-center">
                <h3 className="font-bold mb-2">Need Personalized Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Book a 1-on-1 consultation for complex research questions.
                </p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Book Consultation - $99/hr
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
