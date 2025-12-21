import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Printer, 
  Download,
  TreeDeciduous,
  Dna,
  MapPin,
  Calendar,
  Sparkles,
  User,
  Heart,
  FileText
} from "lucide-react";

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  birthYear?: string;
  birthPlace?: string;
  deathYear?: string;
  notes?: string;
}

interface DnaFinding {
  id: string;
  title: string;
  category: string;
  content: string;
  source?: string;
  createdAt: string;
}

const relationshipLabels: Record<string, string> = {
  self: "Self",
  mother: "Mother",
  father: "Father",
  grandmother_maternal: "Maternal Grandmother",
  grandfather_maternal: "Maternal Grandfather",
  grandmother_paternal: "Paternal Grandmother",
  grandfather_paternal: "Paternal Grandfather",
  great_grandmother_mm: "Great-Grandmother (Mother's Mother)",
  great_grandfather_mm: "Great-Grandfather (Mother's Mother)",
  great_grandmother_mf: "Great-Grandmother (Mother's Father)",
  great_grandfather_mf: "Great-Grandfather (Mother's Father)",
  great_grandmother_fm: "Great-Grandmother (Father's Mother)",
  great_grandfather_fm: "Great-Grandfather (Father's Mother)",
  great_grandmother_ff: "Great-Grandmother (Father's Father)",
  great_grandfather_ff: "Great-Grandfather (Father's Father)",
  sibling: "Sibling",
  spouse: "Spouse",
  child: "Child",
  aunt_uncle: "Aunt/Uncle",
  cousin: "Cousin",
  other: "Other Relative",
};

const categoryLabels: Record<string, string> = {
  ethnicity: "Heritage & Ethnicity",
  match: "DNA Connections",
  discovery: "Discoveries",
  document: "Historical Documents",
  story: "Family Stories",
  location: "Ancestral Locations",
};

export default function HeritageBookPreview() {
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [findings, setFindings] = useState<DnaFinding[]>([]);
  const [loading, setLoading] = useState(false);
  const [ownerName, setOwnerName] = useState("");
  const bookRef = useRef<HTMLDivElement>(null);

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

  const loadData = async () => {
    setLoading(true);
    try {
      const [membersRes, findingsRes] = await Promise.all([
        fetch(`/api/family/${encodeURIComponent(email)}`),
        fetch(`/api/findings/${encodeURIComponent(email)}`)
      ]);
      
      if (membersRes.ok) {
        const members = await membersRes.json();
        setFamilyMembers(members);
        const self = members.find((m: FamilyMember) => m.relationship === "self");
        if (self) setOwnerName(self.name);
      }
      
      if (findingsRes.ok) {
        const f = await findingsRes.json();
        setFindings(f);
      }
    } catch (error) {
      console.error("Failed to load data:", error);
    }
    setLoading(false);
  };

  const handleLogin = () => {
    if (email.includes("@")) {
      localStorage.setItem("research_email", email);
      setIsLoggedIn(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const groupedFindings = findings.reduce((acc, f) => {
    if (!acc[f.category]) acc[f.category] = [];
    acc[f.category].push(f);
    return acc;
  }, {} as Record<string, DnaFinding[]>);

  const selfMember = familyMembers.find(m => m.relationship === "self");
  const parents = familyMembers.filter(m => ["mother", "father"].includes(m.relationship));
  const grandparents = familyMembers.filter(m => m.relationship.includes("grand") && !m.relationship.includes("great"));
  const greatGrandparents = familyMembers.filter(m => m.relationship.includes("great_grand"));
  const otherFamily = familyMembers.filter(m => 
    !["self", "mother", "father"].includes(m.relationship) && 
    !m.relationship.includes("grand")
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-[#7D0A24] rounded-full flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Heritage Book Preview</CardTitle>
            <CardDescription>
              Enter your email to preview your Heritage Book
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            />
            <Button 
              onClick={handleLogin} 
              className="w-full bg-[#7D0A24] hover:bg-[#9B1B30]"
              disabled={!email.includes("@")}
            >
              View My Book
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 mx-auto animate-pulse text-[#7D0A24]" />
          <p className="mt-4 text-muted-foreground">Loading your heritage...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Control Bar - Hidden in print */}
      <div className="print:hidden bg-[#7D0A24] text-white py-4 sticky top-0 z-50">
        <div className="container px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6" />
            <div>
              <h1 className="font-bold">Heritage Book Preview</h1>
              <p className="text-xs text-amber-200">{email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handlePrint} variant="secondary" size="sm">
              <Printer className="h-4 w-4 mr-2" /> Print / Save PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Book Content */}
      <div ref={bookRef} className="max-w-4xl mx-auto bg-white shadow-2xl print:shadow-none my-8 print:my-0">
        
        {/* Cover Page */}
        <div className="min-h-[11in] bg-gradient-to-br from-[#7D0A24] via-[#9B1B30] to-[#7D0A24] text-white flex flex-col items-center justify-center p-12 print:break-after-page">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto border-4 border-amber-300 rounded-full flex items-center justify-center mb-8">
              <TreeDeciduous className="h-16 w-16 text-amber-300" />
            </div>
            <h1 className="text-5xl font-serif font-bold mb-4">
              {ownerName || "Our Family"}
            </h1>
            <div className="w-24 h-1 bg-amber-300 mx-auto mb-4"></div>
            <p className="text-2xl text-amber-200 font-serif italic">
              A Heritage Book
            </p>
            <p className="mt-8 text-amber-100">
              Tracing Our Roots Through DNA & Discovery
            </p>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="min-h-[11in] p-12 print:break-after-page">
          <h2 className="text-3xl font-serif font-bold text-[#7D0A24] mb-8 text-center">
            Table of Contents
          </h2>
          <div className="max-w-md mx-auto space-y-4 text-lg">
            <div className="flex justify-between border-b border-dotted pb-2">
              <span>Our Family Tree</span>
              <span className="text-muted-foreground">3</span>
            </div>
            {Object.keys(groupedFindings).map((cat, idx) => (
              <div key={cat} className="flex justify-between border-b border-dotted pb-2">
                <span>{categoryLabels[cat] || cat}</span>
                <span className="text-muted-foreground">{4 + idx}</span>
              </div>
            ))}
            <div className="flex justify-between border-b border-dotted pb-2">
              <span>Acknowledgments</span>
              <span className="text-muted-foreground">{4 + Object.keys(groupedFindings).length}</span>
            </div>
          </div>
        </div>

        {/* Family Tree Section */}
        <div className="min-h-[11in] p-12 print:break-after-page">
          <div className="flex items-center gap-3 mb-8">
            <TreeDeciduous className="h-8 w-8 text-[#7D0A24]" />
            <h2 className="text-3xl font-serif font-bold text-[#7D0A24]">
              Our Family Tree
            </h2>
          </div>

          {familyMembers.length === 0 ? (
            <p className="text-muted-foreground italic">No family members recorded yet.</p>
          ) : (
            <div className="space-y-8">
              {/* Self */}
              {selfMember && (
                <div className="text-center mb-8">
                  <div className="inline-block bg-[#7D0A24] text-white px-8 py-4 rounded-lg">
                    <p className="font-bold text-xl">{selfMember.name}</p>
                    {selfMember.birthYear && (
                      <p className="text-amber-200 text-sm">Born {selfMember.birthYear}</p>
                    )}
                    {selfMember.birthPlace && (
                      <p className="text-amber-200 text-sm">{selfMember.birthPlace}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Parents */}
              {parents.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-[#7D0A24] mb-4 border-b pb-2">Parents</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {parents.map(member => (
                      <div key={member.id} className="bg-amber-50 p-4 rounded-lg border-l-4 border-[#7D0A24]">
                        <p className="font-bold">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{relationshipLabels[member.relationship]}</p>
                        {member.birthYear && <p className="text-sm"><Calendar className="h-3 w-3 inline mr-1" />{member.birthYear}{member.deathYear ? ` - ${member.deathYear}` : ""}</p>}
                        {member.birthPlace && <p className="text-sm"><MapPin className="h-3 w-3 inline mr-1" />{member.birthPlace}</p>}
                        {member.notes && <p className="text-sm mt-2 italic text-muted-foreground">{member.notes}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Grandparents */}
              {grandparents.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-[#7D0A24] mb-4 border-b pb-2">Grandparents</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {grandparents.map(member => (
                      <div key={member.id} className="bg-amber-50 p-4 rounded-lg border-l-4 border-[#FA4616]">
                        <p className="font-bold">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{relationshipLabels[member.relationship]}</p>
                        {member.birthYear && <p className="text-sm"><Calendar className="h-3 w-3 inline mr-1" />{member.birthYear}{member.deathYear ? ` - ${member.deathYear}` : ""}</p>}
                        {member.birthPlace && <p className="text-sm"><MapPin className="h-3 w-3 inline mr-1" />{member.birthPlace}</p>}
                        {member.notes && <p className="text-sm mt-2 italic text-muted-foreground">{member.notes}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Great-Grandparents */}
              {greatGrandparents.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-[#7D0A24] mb-4 border-b pb-2">Great-Grandparents</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {greatGrandparents.map(member => (
                      <div key={member.id} className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                        <p className="font-bold">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{relationshipLabels[member.relationship]}</p>
                        {member.birthYear && <p className="text-sm"><Calendar className="h-3 w-3 inline mr-1" />{member.birthYear}{member.deathYear ? ` - ${member.deathYear}` : ""}</p>}
                        {member.birthPlace && <p className="text-sm"><MapPin className="h-3 w-3 inline mr-1" />{member.birthPlace}</p>}
                        {member.notes && <p className="text-sm mt-2 italic text-muted-foreground">{member.notes}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Family */}
              {otherFamily.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-[#7D0A24] mb-4 border-b pb-2">Extended Family</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {otherFamily.map(member => (
                      <div key={member.id} className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
                        <p className="font-bold">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{relationshipLabels[member.relationship]}</p>
                        {member.birthYear && <p className="text-sm"><Calendar className="h-3 w-3 inline mr-1" />{member.birthYear}{member.deathYear ? ` - ${member.deathYear}` : ""}</p>}
                        {member.birthPlace && <p className="text-sm"><MapPin className="h-3 w-3 inline mr-1" />{member.birthPlace}</p>}
                        {member.notes && <p className="text-sm mt-2 italic text-muted-foreground">{member.notes}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* DNA Findings Sections */}
        {Object.entries(groupedFindings).map(([category, items]) => (
          <div key={category} className="min-h-[11in] p-12 print:break-after-page">
            <div className="flex items-center gap-3 mb-8">
              <Dna className="h-8 w-8 text-[#7D0A24]" />
              <h2 className="text-3xl font-serif font-bold text-[#7D0A24]">
                {categoryLabels[category] || category}
              </h2>
            </div>

            <div className="space-y-6">
              {items.map(finding => (
                <div key={finding.id} className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg border-l-4 border-[#FA4616]">
                  <h3 className="font-bold text-lg text-[#7D0A24] mb-2">{finding.title}</h3>
                  {finding.source && (
                    <Badge variant="outline" className="mb-3">{finding.source}</Badge>
                  )}
                  <p className="text-gray-700 whitespace-pre-wrap">{finding.content}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Acknowledgments Page */}
        <div className="min-h-[11in] p-12 flex flex-col justify-center print:break-after-page">
          <div className="text-center max-w-2xl mx-auto">
            <Heart className="h-12 w-12 mx-auto text-[#7D0A24] mb-6" />
            <h2 className="text-3xl font-serif font-bold text-[#7D0A24] mb-6">
              Acknowledgments
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              This book represents a journey of discovery, connecting the threads of our past 
              to understand who we are today. Every name, every place, every story in these 
              pages is a testament to those who came before us.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Thank you to the family members who shared their memories, the DNA services 
              that helped unlock our genetic heritage, and the historical records that 
              preserved our ancestors' stories.
            </p>
            <div className="w-24 h-1 bg-[#7D0A24] mx-auto mb-6"></div>
            <p className="text-sm text-muted-foreground">
              Created with WhoamI Heritage Books
            </p>
          </div>
        </div>

        {/* Back Cover */}
        <div className="min-h-[11in] bg-gradient-to-br from-[#7D0A24] via-[#9B1B30] to-[#7D0A24] text-white flex flex-col items-center justify-center p-12">
          <div className="text-center">
            <TreeDeciduous className="h-16 w-16 mx-auto text-amber-300 mb-6" />
            <p className="text-xl text-amber-200 font-serif italic mb-4">
              "Know your roots, understand your branches."
            </p>
            <div className="w-24 h-1 bg-amber-300 mx-auto mb-8"></div>
            <p className="text-amber-100">
              WhoamI Heritage Books
            </p>
            <p className="text-amber-200/70 text-sm mt-2">
              www.whoami-dna.com
            </p>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
          .print\\:break-after-page { break-after: page; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:my-0 { margin-top: 0 !important; margin-bottom: 0 !important; }
        }
      `}</style>
    </div>
  );
}
