import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Upload,
  FileArchive,
  Trash2,
  CheckCircle,
  Loader2,
  Dna,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { Link } from "wouter";

interface DnaUploadRecord {
  id: string;
  originalFilename: string;
  fileSize: number;
  source: string;
  status: string;
  uploadedAt: string;
}

export default function UploadDNA() {
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploads, setUploads] = useState<DnaUploadRecord[]>([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const loadUploads = async (email: string) => {
    try {
      const res = await fetch(`/api/dna-uploads/${encodeURIComponent(email)}`);
      if (res.ok) {
        setUploads(await res.json());
      }
    } catch {}
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!email) {
      toast({ title: "Email Required", description: "Please enter your email before uploading.", variant: "destructive" });
      return;
    }
    if (!source) {
      toast({ title: "Source Required", description: "Please select where your DNA data came from.", variant: "destructive" });
      return;
    }

    setIsUploading(true);
    setUploadSuccess(false);

    const formData = new FormData();
    formData.append("dnaFile", file);
    formData.append("email", email);
    formData.append("source", source);

    try {
      const res = await fetch("/api/dna-upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setUploadSuccess(true);
      toast({ title: "Upload Successful!", description: `${file.name} has been uploaded securely.` });
      loadUploads(email);
    } catch (err: any) {
      toast({ title: "Upload Failed", description: err.message, variant: "destructive" });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const deleteUpload = async (id: string) => {
    try {
      await fetch(`/api/dna-uploads/${id}`, { method: "DELETE" });
      setUploads((prev) => prev.filter((u) => u.id !== id));
      toast({ title: "Deleted", description: "Upload removed." });
    } catch {}
  };

  useEffect(() => {
    if (email && email.includes("@")) loadUploads(email);
  }, [email]);

  const sourceLabels: Record<string, string> = {
    ancestry: "Ancestry.com",
    "23andme": "23andMe",
    myheritage: "MyHeritage",
    familytreedna: "FamilyTreeDNA",
    other: "Other",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="bg-gradient-to-r from-[#7D0A24] to-[#9B1B30] text-white py-12">
        <div className="container px-4 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 rounded-full p-3">
              <Upload className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold" data-testid="text-upload-title">Upload Your Raw DNA</h1>
              <p className="text-amber-200 text-lg mt-1">Upload your .zip file from any DNA testing provider</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 max-w-4xl py-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card className="border-2 border-[#7D0A24]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <FileArchive className="h-6 w-6 text-[#7D0A24]" />
                  Upload Your Raw DNA File
                </CardTitle>
                <CardDescription>
                  Already have your raw DNA data? Upload the .zip file directly — no need to go to another site.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Your Email</label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      data-testid="input-upload-email"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Where is this DNA from?</label>
                    <Select value={source} onValueChange={setSource}>
                      <SelectTrigger data-testid="select-dna-source">
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ancestry">Ancestry.com</SelectItem>
                        <SelectItem value="23andme">23andMe</SelectItem>
                        <SelectItem value="myheritage">MyHeritage</SelectItem>
                        <SelectItem value="familytreedna">FamilyTreeDNA</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".zip"
                    onChange={handleUpload}
                    className="hidden"
                    data-testid="input-dna-file"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading || !email || !source}
                    className="w-full h-32 bg-white hover:bg-amber-50 border-2 border-dashed border-[#7D0A24]/40 text-[#7D0A24] hover:border-[#7D0A24]/60 flex flex-col items-center justify-center gap-3"
                    variant="outline"
                    data-testid="button-upload-dna"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="h-10 w-10 animate-spin" />
                        <span className="text-lg">Uploading your DNA file...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-10 w-10" />
                        <span className="text-lg font-medium">Click here to select your .zip DNA file</span>
                        <span className="text-sm text-muted-foreground">Accepts .zip files up to 50MB</span>
                      </>
                    )}
                  </Button>
                </div>

                {uploadSuccess && (
                  <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl" data-testid="text-upload-success">
                    <CheckCircle className="h-6 w-6 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Upload Complete!</p>
                      <p className="text-sm text-emerald-600">Your raw DNA data has been stored securely. You can now use it for analysis.</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {uploads.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Uploaded DNA Files</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {uploads.map((u) => (
                    <div key={u.id} className="flex items-center justify-between bg-amber-50 p-4 rounded-lg border" data-testid={`upload-item-${u.id}`}>
                      <div className="flex items-center gap-3">
                        <FileArchive className="h-6 w-6 text-[#7D0A24]" />
                        <div>
                          <p className="font-medium">{u.originalFilename}</p>
                          <p className="text-sm text-muted-foreground">
                            {sourceLabels[u.source] || u.source} · {(u.fileSize / 1024 / 1024).toFixed(1)} MB · {new Date(u.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">
                          {u.status}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteUpload(u.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          data-testid={`button-delete-upload-${u.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {uploadSuccess && (
              <Card className="bg-gradient-to-r from-[#7D0A24] to-[#9B1B30] text-white border-0">
                <CardContent className="py-8 text-center">
                  <Dna className="h-10 w-10 mx-auto mb-4 text-amber-300" />
                  <h3 className="text-2xl font-serif font-bold mb-2">Ready to Explore Your Heritage?</h3>
                  <p className="text-amber-100 mb-6">
                    Your DNA is uploaded. Continue your journey to discover your ancestry.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/journey">
                      <Button className="bg-white text-[#7D0A24] hover:bg-amber-100 font-bold" data-testid="button-go-journey">
                        Start DNA Journey <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/my-research">
                      <Button variant="outline" className="border-white text-white hover:bg-white/20" data-testid="button-go-research">
                        Go to My Research
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="bg-amber-50 border-amber-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-[#7D0A24]" />
                  How to Get Your Raw DNA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-[#7D0A24] mb-1">From Ancestry.com:</p>
                  <ol className="list-decimal pl-4 space-y-0.5 text-muted-foreground">
                    <li>Log in to Ancestry.com</li>
                    <li>Click "DNA" at the top</li>
                    <li>Click "Settings"</li>
                    <li>Scroll to "Download your DNA"</li>
                    <li>Save the .zip file</li>
                  </ol>
                </div>
                <div>
                  <p className="font-semibold text-[#7D0A24] mb-1">From 23andMe:</p>
                  <ol className="list-decimal pl-4 space-y-0.5 text-muted-foreground">
                    <li>Log in to 23andMe</li>
                    <li>Go to Settings</li>
                    <li>Scroll to "Download raw data"</li>
                    <li>Save the .zip file</li>
                  </ol>
                </div>
                <div>
                  <p className="font-semibold text-[#7D0A24] mb-1">From MyHeritage / FamilyTreeDNA:</p>
                  <p className="text-muted-foreground">Look in your account settings for "Download raw DNA" or "Export data".</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="py-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm mb-1">Your Data Is Safe</p>
                    <p className="text-xs text-muted-foreground">
                      Your raw DNA file is stored securely and is only accessible to you. We never share your genetic data with anyone.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-100 to-orange-100 border-amber-300">
              <CardContent className="py-5 text-center">
                <Dna className="h-8 w-8 mx-auto mb-2 text-[#7D0A24]" />
                <h3 className="font-bold text-sm mb-1 text-[#7D0A24]">Don't have raw DNA yet?</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Start with a DNA test from Ancestry, 23andMe, or MyHeritage, then come back with your results.
                </p>
                <Link href="/journey">
                  <Button variant="outline" size="sm" className="w-full border-[#7D0A24] text-[#7D0A24]" data-testid="button-start-journey">
                    See DNA Testing Guide
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
