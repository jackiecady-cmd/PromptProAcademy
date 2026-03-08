import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
  Calendar,
  ArrowRight,
  ChevronDown,
  FileText,
  ExternalLink,
} from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

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
  familyMemberId?: string;
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

function PersonCard({
  member,
  findings,
  onDelete,
  onAddFinding,
  onDeleteFinding,
  getRelationshipLabel,
  getCategoryLabel,
}: {
  member: FamilyMember;
  findings: DnaFinding[];
  onDelete: (id: string) => void;
  onAddFinding: (memberId: string) => void;
  onDeleteFinding: (id: string) => void;
  getRelationshipLabel: (v: string) => string;
  getCategoryLabel: (v: string) => string;
}) {
  const [expanded, setExpanded] = useState(false);
  const memberFindings = findings.filter(f => f.familyMemberId === member.id);

  return (
    <Card className="bg-white overflow-hidden" data-testid={`card-member-${member.id}`}>
      <div
        className="cursor-pointer hover:bg-amber-50/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
        data-testid={`toggle-member-${member.id}`}
      >
        <CardContent className="py-4 px-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#7D0A24]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-6 w-6 text-[#7D0A24]" />
              </div>
              <div>
                <h3 className="font-bold text-[#7D0A24] text-lg" data-testid={`text-member-name-${member.id}`}>{member.name}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">
                    {getRelationshipLabel(member.relationship)}
                  </Badge>
                  {member.birthYear && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {member.birthYear}{member.deathYear ? ` – ${member.deathYear}` : ""}
                    </span>
                  )}
                  {member.birthPlace && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {member.birthPlace}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {memberFindings.length > 0 && (
                <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                  {memberFindings.length} finding{memberFindings.length !== 1 ? "s" : ""}
                </Badge>
              )}
              <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`} />
            </div>
          </div>
        </CardContent>
      </div>

      {expanded && (
        <div className="border-t bg-amber-50/30 px-5 py-4 space-y-4" data-testid={`panel-member-${member.id}`}>
          {member.notes && (
            <div className="bg-white rounded-lg p-3 border">
              <p className="text-sm text-muted-foreground">{member.notes}</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#7D0A24]" />
              DNA Results & Findings for {member.name.split(" ")[0]}
            </h4>
            <Button
              size="sm"
              onClick={(e) => { e.stopPropagation(); onAddFinding(member.id); }}
              className="bg-[#FA4616] hover:bg-[#FA4616]/90 text-white"
              data-testid={`button-add-finding-${member.id}`}
            >
              <Plus className="h-3 w-3 mr-1" /> Add Finding
            </Button>
          </div>

          {memberFindings.length === 0 ? (
            <div className="text-center py-4 bg-white rounded-lg border border-dashed">
              <Sparkles className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
              <p className="text-sm text-muted-foreground">No findings saved for {member.name.split(" ")[0]} yet</p>
              <p className="text-xs text-muted-foreground mt-1">Add DNA results, ethnicity info, or discoveries from GEDmatch, DNAGenics, etc.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {memberFindings.map((finding) => (
                <div key={finding.id} className="bg-white rounded-lg border p-3" data-testid={`card-finding-${finding.id}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h5 className="font-semibold text-sm text-[#7D0A24]">{finding.title}</h5>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-[#FA4616]/10 text-[#FA4616] border-[#FA4616]/20 text-xs">
                          {getCategoryLabel(finding.category)}
                        </Badge>
                        {finding.source && (
                          <Badge variant="outline" className="text-xs">{finding.source}</Badge>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{finding.content}</p>
                      <p className="mt-1 text-xs text-muted-foreground/70">
                        Saved {new Date(finding.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => { e.stopPropagation(); onDeleteFinding(finding.id); }}
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 h-7 w-7"
                      data-testid={`button-delete-finding-${finding.id}`}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end pt-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => { e.stopPropagation(); onDelete(member.id); }}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 text-xs"
              data-testid={`button-delete-member-${member.id}`}
            >
              <Trash2 className="h-3 w-3 mr-1" /> Remove {member.name.split(" ")[0]}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

export default function MyResearch() {
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [findings, setFindings] = useState<DnaFinding[]>([]);
  const [loading, setLoading] = useState(false);
  const [memberDialogOpen, setMemberDialogOpen] = useState(false);
  const [findingDialogOpen, setFindingDialogOpen] = useState(false);
  const [findingForMemberId, setFindingForMemberId] = useState<string | null>(null);
  const [generalFindingsOpen, setGeneralFindingsOpen] = useState(false);
  const { toast } = useToast();

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

  const loadData = async () => {
    if (!email) return;
    setLoading(true);
    try {
      const [membersRes, findingsRes] = await Promise.all([
        fetch(`/api/family/${encodeURIComponent(email)}`),
        fetch(`/api/findings/${encodeURIComponent(email)}`)
      ]);
      if (membersRes.ok) setFamilyMembers(await membersRes.json());
      if (findingsRes.ok) setFindings(await findingsRes.json());
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
    if (isLoggedIn && email) loadData();
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
        toast({ title: "Family member added!", description: `${member.name} has been saved to your tree.` });
      }
    } catch (error) {
      console.error("Failed to add member:", error);
    }
  };

  const deleteFamilyMember = async (id: string) => {
    try {
      await fetch(`/api/family/${id}`, { method: "DELETE" });
      setFamilyMembers(familyMembers.filter(m => m.id !== id));
      setFindings(findings.map(f => f.familyMemberId === id ? { ...f, familyMemberId: undefined } : f));
      toast({ title: "Removed", description: "Family member removed. Their findings have been moved to General Findings." });
    } catch (error) {
      console.error("Failed to delete member:", error);
    }
  };

  const openAddFinding = (memberId: string) => {
    setFindingForMemberId(memberId);
    setNewFinding({ title: "", category: "", content: "", source: "" });
    setFindingDialogOpen(true);
  };

  const addFinding = async () => {
    if (!newFinding.title || !newFinding.category || !newFinding.content) return;
    try {
      const body: any = { ...newFinding, email };
      if (findingForMemberId) body.familyMemberId = findingForMemberId;
      const res = await fetch("/api/findings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const finding = await res.json();
        setFindings([finding, ...findings]);
        setNewFinding({ title: "", category: "", content: "", source: "" });
        setFindingDialogOpen(false);
        setFindingForMemberId(null);
        const memberName = findingForMemberId
          ? familyMembers.find(m => m.id === findingForMemberId)?.name
          : null;
        toast({
          title: "Finding saved!",
          description: memberName
            ? `Saved under ${memberName}`
            : "Saved as a general finding"
        });
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

  const getRelationshipLabel = (value: string) =>
    relationshipOptions.find(r => r.value === value)?.label || value;

  const getCategoryLabel = (value: string) =>
    findingCategories.find(c => c.value === value)?.label || value;

  const unlinkedFindings = findings.filter(f => !f.familyMemberId);

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
      <div className="bg-gradient-to-r from-[#7D0A24] to-[#9B1B30] text-white py-8">
        <div className="container px-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Dna className="h-8 w-8" />
                <h1 className="text-3xl font-serif font-bold" data-testid="text-research-title">My Research</h1>
              </div>
              <p className="text-amber-200">Your family tree with DNA results stored under each person</p>
              <Link href="/dna-hub">
                <Button variant="outline" size="sm" className="border-white/50 text-white hover:bg-white/20 mt-3" data-testid="link-research-hub">
                  <ArrowRight className="mr-1 h-3 w-3 rotate-180" />
                  Back to DNA Tools Hub
                </Button>
              </Link>
            </div>
            <div className="text-right">
              <p className="text-sm text-amber-200">Logged in as</p>
              <p className="font-medium">{email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-6 max-w-4xl space-y-6">
        <div className="flex items-center justify-between bg-white rounded-xl p-4 border shadow-sm">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#7D0A24]" data-testid="text-member-count">{familyMembers.length}</p>
              <p className="text-xs text-muted-foreground">Family Members</p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div className="text-center">
              <p className="text-2xl font-bold text-[#FA4616]" data-testid="text-finding-count">{findings.length}</p>
              <p className="text-xs text-muted-foreground">Total Findings</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Dialog open={memberDialogOpen} onOpenChange={setMemberDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#7D0A24] hover:bg-[#9B1B30]" data-testid="button-add-member">
                  <Plus className="h-4 w-4 mr-2" /> Add Person
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Family Member</DialogTitle>
                  <DialogDescription>
                    Found someone on FamilySearch, Ancestry, or through DNA? Save them here.
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
                      placeholder="Anything you know — stories, nicknames, clues..."
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
                    <Save className="h-4 w-4 mr-2" /> Save to Family Tree
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-serif font-bold text-[#7D0A24] flex items-center gap-2">
              <TreeDeciduous className="h-5 w-5" />
              Your Family Tree
            </h2>
            <p className="text-sm text-muted-foreground">Click a person to see their DNA results</p>
          </div>

          {familyMembers.length === 0 ? (
            <Card className="bg-white/50 border-dashed">
              <CardContent className="py-12 text-center">
                <TreeDeciduous className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="font-bold mb-2 text-lg">Start Your Family Tree</h3>
                <p className="text-sm text-muted-foreground mb-2 max-w-md mx-auto">
                  Add family members as you discover them on FamilySearch, Ancestry, or through DNA matches. Then attach their DNA results and findings right to their profile.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                  <Button onClick={() => setMemberDialogOpen(true)} className="bg-[#7D0A24] hover:bg-[#9B1B30]">
                    <Plus className="h-4 w-4 mr-2" /> Add Your First Family Member
                  </Button>
                  <a href="https://www.familysearch.org" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" /> Search FamilySearch
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {familyMembers.map((member) => (
                <PersonCard
                  key={member.id}
                  member={member}
                  findings={findings}
                  onDelete={deleteFamilyMember}
                  onAddFinding={openAddFinding}
                  onDeleteFinding={deleteFinding}
                  getRelationshipLabel={getRelationshipLabel}
                  getCategoryLabel={getCategoryLabel}
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-serif font-bold text-[#7D0A24] flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              General Findings
            </h2>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setFindingForMemberId(null);
                setNewFinding({ title: "", category: "", content: "", source: "" });
                setFindingDialogOpen(true);
              }}
              data-testid="button-add-general-finding"
            >
              <Plus className="h-3 w-3 mr-1" /> Add Finding
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Findings not linked to a specific person — general discoveries, overall ethnicity results, etc.
          </p>

          {unlinkedFindings.length === 0 ? (
            <Card className="bg-white/50 border-dashed">
              <CardContent className="py-8 text-center">
                <Sparkles className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
                <p className="text-sm text-muted-foreground">No general findings yet. You can save them here or attach them to specific family members above.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {unlinkedFindings.map((finding) => (
                <Card key={finding.id} className="bg-white" data-testid={`card-finding-${finding.id}`}>
                  <CardContent className="py-3 px-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h5 className="font-semibold text-sm text-[#7D0A24]">{finding.title}</h5>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-[#FA4616]/10 text-[#FA4616] border-[#FA4616]/20 text-xs">
                            {getCategoryLabel(finding.category)}
                          </Badge>
                          {finding.source && (
                            <Badge variant="outline" className="text-xs">{finding.source}</Badge>
                          )}
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{finding.content}</p>
                        <p className="mt-1 text-xs text-muted-foreground/70">
                          Saved {new Date(finding.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => deleteFinding(finding.id)}
                        className="text-red-400 hover:text-red-600 hover:bg-red-50 h-7 w-7"
                        data-testid={`button-delete-finding-${finding.id}`}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border p-5">
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
            <ExternalLink className="h-4 w-4 text-[#7D0A24]" />
            Quick Links — Find More Family
          </h3>
          <p className="text-xs mb-3">
            <strong className="text-red-600">WhoamI does not charge for these.</strong>{" "}
            <span className="text-red-700">Some external sites are free; others may have their own fees.</span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { name: "FamilySearch", url: "https://www.familysearch.org" },
              { name: "GEDmatch", url: "https://www.gedmatch.com" },
              { name: "DNAGenics", url: "https://www.dnagenics.com" },
              { name: "Ancestry", url: "https://www.ancestry.com" },
            ].map((site) => (
              <a
                key={site.name}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 text-sm font-medium text-[#7D0A24] bg-amber-50 hover:bg-amber-100 rounded-lg py-2.5 px-3 transition-colors border border-amber-200"
                data-testid={`quicklink-${site.name.toLowerCase().replace(/[^a-z]/g, '')}`}
              >
                {site.name}
                <ExternalLink className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>

        <Card className="bg-gradient-to-r from-[#7D0A24] to-[#9B1B30] text-white border-0">
          <CardContent className="py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <BookOpen className="h-12 w-12 text-amber-300" />
                <div>
                  <h3 className="text-xl font-bold">Ready to Create Your Heritage Book?</h3>
                  <p className="text-amber-200">
                    Turn your {familyMembers.length} family member{familyMembers.length !== 1 ? "s" : ""} and {findings.length} finding{findings.length !== 1 ? "s" : ""} into a beautiful printed keepsake
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

      <Dialog open={findingDialogOpen} onOpenChange={(open) => {
        setFindingDialogOpen(open);
        if (!open) setFindingForMemberId(null);
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save a Finding</DialogTitle>
            <DialogDescription>
              {findingForMemberId
                ? `This will be saved under ${familyMembers.find(m => m.id === findingForMemberId)?.name || "this person"}`
                : "Save a general discovery (not linked to a specific person)"
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {findingForMemberId && familyMembers.length > 0 && (
              <div className="bg-amber-50 rounded-lg p-3 flex items-center gap-2 border border-amber-200">
                <User className="h-4 w-4 text-[#7D0A24]" />
                <span className="text-sm font-medium">
                  Saving under: {familyMembers.find(m => m.id === findingForMemberId)?.name}
                </span>
              </div>
            )}
            <div>
              <Label>What did you find? *</Label>
              <Input
                placeholder="e.g., 'Ashkenazi Jewish heritage confirmed' or '3rd cousin match found'"
                value={newFinding.title}
                onChange={(e) => setNewFinding({ ...newFinding, title: e.target.value })}
                data-testid="input-finding-title"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category *</Label>
                <Select
                  value={newFinding.category}
                  onValueChange={(v) => setNewFinding({ ...newFinding, category: v })}
                >
                  <SelectTrigger data-testid="select-category">
                    <SelectValue placeholder="Select type" />
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
                  <SelectTrigger data-testid="select-source">
                    <SelectValue placeholder="Where found?" />
                  </SelectTrigger>
                  <SelectContent>
                    {sourceOptions.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Details *</Label>
              <Textarea
                placeholder="Describe what you found — ethnicity percentages, match names, document details, family stories..."
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
              <Save className="h-4 w-4 mr-2" /> Save Finding
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
