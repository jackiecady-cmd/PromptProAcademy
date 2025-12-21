import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  TreeDeciduous, 
  Dna, 
  Plus, 
  Trash2, 
  Save,
  User,
  BookOpen,
  Sparkles,
  MapPin,
  Calendar
} from "lucide-react";
import { Link } from "wouter";

interface FamilyMember {
  id: string;
  email: string;
  name: string;
  relationship: string;
  birthYear?: string;
  birthPlace?: string;
  deathYear?: string;
  notes?: string;
  createdAt: string;
}

interface DnaFinding {
  id: string;
  email: string;
  title: string;
  category: string;
  content: string;
  source?: string;
  createdAt: string;
}

const relationshipOptions = [
  { value: "self", label: "Me (Self)" },
  { value: "mother", label: "Mother" },
  { value: "father", label: "Father" },
  { value: "grandmother_maternal", label: "Grandmother (Mother's side)" },
  { value: "grandfather_maternal", label: "Grandfather (Mother's side)" },
  { value: "grandmother_paternal", label: "Grandmother (Father's side)" },
  { value: "grandfather_paternal", label: "Grandfather (Father's side)" },
  { value: "great_grandmother_mm", label: "Great-Grandmother (Mother's Mother)" },
  { value: "great_grandfather_mm", label: "Great-Grandfather (Mother's Mother)" },
  { value: "great_grandmother_mf", label: "Great-Grandmother (Mother's Father)" },
  { value: "great_grandfather_mf", label: "Great-Grandfather (Mother's Father)" },
  { value: "great_grandmother_fm", label: "Great-Grandmother (Father's Mother)" },
  { value: "great_grandfather_fm", label: "Great-Grandfather (Father's Mother)" },
  { value: "great_grandmother_ff", label: "Great-Grandmother (Father's Father)" },
  { value: "great_grandfather_ff", label: "Great-Grandfather (Father's Father)" },
  { value: "sibling", label: "Sibling" },
  { value: "spouse", label: "Spouse" },
  { value: "child", label: "Child" },
  { value: "aunt_uncle", label: "Aunt/Uncle" },
  { value: "cousin", label: "Cousin" },
  { value: "other", label: "Other Relative" },
];

const findingCategories = [
  { value: "ethnicity", label: "Ethnicity/Heritage" },
  { value: "match", label: "DNA Match" },
  { value: "discovery", label: "Discovery" },
  { value: "document", label: "Document Found" },
  { value: "story", label: "Family Story" },
  { value: "location", label: "Location/Place" },
];

const sourceOptions = [
  "FamilySearch",
  "Ancestry.com",
  "23andMe",
  "MyHeritage",
  "GEDmatch",
  "DNAGenics",
  "FamilyTreeDNA",
  "Family Member",
  "Historical Records",
  "Other",
];

export default function MyResearch() {
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [findings, setFindings] = useState<DnaFinding[]>([]);
  const [loading, setLoading] = useState(false);

  const [newMember, setNewMember] = useState({
    name: "",
    relationship: "",
    birthYear: "",
    birthPlace: "",
    deathYear: "",
    notes: "",
  });

  const [newFinding, setNewFinding] = useState({
    title: "",
    category: "",
    content: "",
    source: "",
  });

  const [memberDialogOpen, setMemberDialogOpen] = useState(false);
  const [findingDialogOpen, setFindingDialogOpen] = useState(false);

  const loadData = async () => {
    if (!email) return;
    setLoading(true);
    try {
      const [membersRes, findingsRes] = await Promise.all([
        fetch(`/api/family/${encodeURIComponent(email)}`),
        fetch(`/api/findings/${encodeURIComponent(email)}`)
      ]);
      
      if (membersRes.ok) {
        const members = await membersRes.json();
        setFamilyMembers(members);
      }
      
      if (findingsRes.ok) {
        const findings = await findingsRes.json();
        setFindings(findings);
      }
    } catch (error) {
      console.error("Failed to load data:", error);
    }
    setLoading(false);
  };

  const handleLogin = () => {
    if (email.includes("@")) {
      setIsLoggedIn(true);
      localStorage.setItem("research_email", email);
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("research_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && email) {
      loadData();
    }
  }, [isLoggedIn, email]);

  const addFamilyMember = async () => {
    if (!newMember.name || !newMember.relationship) return;
    
    try {
      const res = await fetch("/api/family", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newMember, email }),
      });
      
      if (res.ok) {
        const member = await res.json();
        setFamilyMembers([...familyMembers, member]);
        setNewMember({ name: "", relationship: "", birthYear: "", birthPlace: "", deathYear: "", notes: "" });
        setMemberDialogOpen(false);
      }
    } catch (error) {
      console.error("Failed to add member:", error);
    }
  };

  const deleteFamilyMember = async (id: string) => {
    try {
      await fetch(`/api/family/${id}`, { method: "DELETE" });
      setFamilyMembers(familyMembers.filter(m => m.id !== id));
    } catch (error) {
      console.error("Failed to delete member:", error);
    }
  };

  const addFinding = async () => {
    if (!newFinding.title || !newFinding.category || !newFinding.content) return;
    
    try {
      const res = await fetch("/api/findings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newFinding, email }),
      });
      
      if (res.ok) {
        const finding = await res.json();
        setFindings([finding, ...findings]);
        setNewFinding({ title: "", category: "", content: "", source: "" });
        setFindingDialogOpen(false);
      }
    } catch (error) {
      console.error("Failed to add finding:", error);
    }
  };

  const deleteFinding = async (id: string) => {
    try {
      await fetch(`/api/findings/${id}`, { method: "DELETE" });
      setFindings(findings.filter(f => f.id !== id));
    } catch (error) {
      console.error("Failed to delete finding:", error);
    }
  };

  const getRelationshipLabel = (value: string) => {
    return relationshipOptions.find(r => r.value === value)?.label || value;
  };

  const getCategoryLabel = (value: string) => {
    return findingCategories.find(c => c.value === value)?.label || value;
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-[#7D0A24] rounded-full flex items-center justify-center mb-4">
              <Dna className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">My Research</CardTitle>
            <CardDescription>
              Enter your email to save and access your family tree and DNA discoveries
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                data-testid="input-email"
              />
            </div>
            <Button 
              onClick={handleLogin} 
              className="w-full bg-[#7D0A24] hover:bg-[#9B1B30]"
              disabled={!email.includes("@")}
              data-testid="button-login"
            >
              Access My Research
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Your research is saved and will become part of your Heritage Book
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7D0A24] to-[#9B1B30] text-white py-8">
        <div className="container px-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Dna className="h-8 w-8" />
                <h1 className="text-3xl font-serif font-bold">My Research</h1>
              </div>
              <p className="text-amber-200">Family Tree & DNA Discoveries</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-amber-200">Logged in as</p>
              <p className="font-medium">{email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-6">
        <Tabs defaultValue="family" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="family" className="flex items-center gap-2">
              <TreeDeciduous className="h-4 w-4" />
              Family Tree ({familyMembers.length})
            </TabsTrigger>
            <TabsTrigger value="findings" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              DNA Findings ({findings.length})
            </TabsTrigger>
          </TabsList>

          {/* Family Tree Tab */}
          <TabsContent value="family" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Your Family Tree</h2>
                <p className="text-sm text-muted-foreground">Add family members as you discover them</p>
              </div>
              <Dialog open={memberDialogOpen} onOpenChange={setMemberDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#7D0A24] hover:bg-[#9B1B30]" data-testid="button-add-member">
                    <Plus className="h-4 w-4 mr-2" /> Add Family Member
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Family Member</DialogTitle>
                    <DialogDescription>
                      Record a family member you've discovered
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label>Full Name *</Label>
                      <Input
                        placeholder="e.g., Mary Elizabeth Smith"
                        value={newMember.name}
                        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                        data-testid="input-member-name"
                      />
                    </div>
                    <div>
                      <Label>Relationship to You *</Label>
                      <Select
                        value={newMember.relationship}
                        onValueChange={(v) => setNewMember({ ...newMember, relationship: v })}
                      >
                        <SelectTrigger data-testid="select-relationship">
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          {relationshipOptions.map((r) => (
                            <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Birth Year</Label>
                        <Input
                          placeholder="e.g., 1895"
                          value={newMember.birthYear}
                          onChange={(e) => setNewMember({ ...newMember, birthYear: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Death Year</Label>
                        <Input
                          placeholder="e.g., 1972"
                          value={newMember.deathYear}
                          onChange={(e) => setNewMember({ ...newMember, deathYear: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Birth Place</Label>
                      <Input
                        placeholder="e.g., Dublin, Ireland"
                        value={newMember.birthPlace}
                        onChange={(e) => setNewMember({ ...newMember, birthPlace: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Notes</Label>
                      <Textarea
                        placeholder="Any other details you've found..."
                        value={newMember.notes}
                        onChange={(e) => setNewMember({ ...newMember, notes: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <Button 
                      onClick={addFamilyMember} 
                      className="w-full bg-[#7D0A24] hover:bg-[#9B1B30]"
                      disabled={!newMember.name || !newMember.relationship}
                      data-testid="button-save-member"
                    >
                      <Save className="h-4 w-4 mr-2" /> Save Family Member
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {familyMembers.length === 0 ? (
              <Card className="bg-white/50 border-dashed">
                <CardContent className="py-12 text-center">
                  <TreeDeciduous className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-bold mb-2">No family members yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Start adding people as you discover them on FamilySearch, Ancestry, or through DNA matches
                  </p>
                  <Button onClick={() => setMemberDialogOpen(true)} variant="outline">
                    <Plus className="h-4 w-4 mr-2" /> Add Your First Family Member
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {familyMembers.map((member) => (
                  <Card key={member.id} className="bg-white" data-testid={`card-member-${member.id}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#7D0A24]/10 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-[#7D0A24]" />
                          </div>
                          <div>
                            <h3 className="font-bold text-[#7D0A24]">{member.name}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {getRelationshipLabel(member.relationship)}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteFamilyMember(member.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      {(member.birthYear || member.birthPlace) && (
                        <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                          {member.birthYear && (
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3 w-3" />
                              <span>{member.birthYear}{member.deathYear ? ` - ${member.deathYear}` : ""}</span>
                            </div>
                          )}
                          {member.birthPlace && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3 w-3" />
                              <span>{member.birthPlace}</span>
                            </div>
                          )}
                        </div>
                      )}
                      {member.notes && (
                        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{member.notes}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* DNA Findings Tab */}
          <TabsContent value="findings" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">DNA Discoveries</h2>
                <p className="text-sm text-muted-foreground">Save what you find from calculators, matches, and research</p>
              </div>
              <Dialog open={findingDialogOpen} onOpenChange={setFindingDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#FA4616] hover:bg-[#FA4616]/90" data-testid="button-add-finding">
                    <Plus className="h-4 w-4 mr-2" /> Add Discovery
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Save a Discovery</DialogTitle>
                    <DialogDescription>
                      Record something you found from DNA analysis or research
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label>Title *</Label>
                      <Input
                        placeholder="e.g., 'Ashkenazi Jewish heritage confirmed'"
                        value={newFinding.title}
                        onChange={(e) => setNewFinding({ ...newFinding, title: e.target.value })}
                        data-testid="input-finding-title"
                      />
                    </div>
                    <div>
                      <Label>Category *</Label>
                      <Select
                        value={newFinding.category}
                        onValueChange={(v) => setNewFinding({ ...newFinding, category: v })}
                      >
                        <SelectTrigger data-testid="select-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {findingCategories.map((c) => (
                            <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Source</Label>
                      <Select
                        value={newFinding.source}
                        onValueChange={(v) => setNewFinding({ ...newFinding, source: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Where did you find this?" />
                        </SelectTrigger>
                        <SelectContent>
                          {sourceOptions.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Details *</Label>
                      <Textarea
                        placeholder="Describe what you discovered..."
                        value={newFinding.content}
                        onChange={(e) => setNewFinding({ ...newFinding, content: e.target.value })}
                        rows={4}
                        data-testid="input-finding-content"
                      />
                    </div>
                    <Button 
                      onClick={addFinding} 
                      className="w-full bg-[#FA4616] hover:bg-[#FA4616]/90"
                      disabled={!newFinding.title || !newFinding.category || !newFinding.content}
                      data-testid="button-save-finding"
                    >
                      <Save className="h-4 w-4 mr-2" /> Save Discovery
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {findings.length === 0 ? (
              <Card className="bg-white/50 border-dashed">
                <CardContent className="py-12 text-center">
                  <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-bold mb-2">No discoveries saved yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    As you research on GEDmatch, DNAGenics, and other sites, save your findings here
                  </p>
                  <Button onClick={() => setFindingDialogOpen(true)} variant="outline">
                    <Plus className="h-4 w-4 mr-2" /> Save Your First Discovery
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {findings.map((finding) => (
                  <Card key={finding.id} className="bg-white" data-testid={`card-finding-${finding.id}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-[#7D0A24] text-lg">{finding.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className="bg-[#FA4616]/10 text-[#FA4616] border-[#FA4616]/20">
                              {getCategoryLabel(finding.category)}
                            </Badge>
                            {finding.source && (
                              <Badge variant="outline">{finding.source}</Badge>
                            )}
                          </div>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteFinding(finding.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="mt-3 text-muted-foreground">{finding.content}</p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Saved: {new Date(finding.createdAt).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Heritage Book CTA */}
        <Card className="mt-8 bg-gradient-to-r from-[#7D0A24] to-[#9B1B30] text-white">
          <CardContent className="py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <BookOpen className="h-12 w-12 text-amber-300" />
                <div>
                  <h3 className="text-xl font-bold">Ready to Create Your Heritage Book?</h3>
                  <p className="text-amber-200">
                    Turn your {familyMembers.length} family members and {findings.length} discoveries into a beautiful printed keepsake
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Link href="/my-book">
                  <Button variant="outline" className="border-white text-white hover:bg-white/20">
                    Preview Book
                  </Button>
                </Link>
                <Link href="/checkout/heritage-book">
                  <Button className="bg-white text-[#7D0A24] hover:bg-amber-100 font-bold px-8">
                    Order Heritage Book
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
