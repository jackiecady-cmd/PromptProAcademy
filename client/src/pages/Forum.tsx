import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, Eye, Search } from "lucide-react";

const forumTopics = [
  {
    id: 1,
    title: "Understanding DNAgenics vs GEDmatch results",
    author: "GenealogyFan99",
    replies: 24,
    views: 1205,
    tag: "Help",
    time: "2 hours ago"
  },
  {
    id: 2,
    title: "Found a connection to the Romanov family!",
    author: "HistoryBuff_UK",
    replies: 156,
    views: 8900,
    tag: "Discovery",
    time: "4 hours ago"
  },
  {
    id: 3,
    title: "Best calculator for Ashkenazi Jewish heritage?",
    author: "SarahJ",
    replies: 8,
    views: 340,
    tag: "Question",
    time: "1 day ago"
  },
  {
    id: 4,
    title: "How to export raw data from 23andMe (Updated 2025)",
    author: "Admin",
    replies: 0,
    views: 4500,
    tag: "Guide",
    time: "2 days ago"
  },
];

export default function Forum() {
  return (
    <div className="min-h-screen bg-muted/10 py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Community Forum</h1>
            <p className="text-muted-foreground">Share discoveries, ask questions, and help others on their journey.</p>
          </div>
          <Button className="bg-primary text-white">Start New Topic</Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-4">
             <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search discussions..." className="pl-10 bg-background" />
            </div>

            {forumTopics.map((topic) => (
              <Card key={topic.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={topic.tag === "Guide" ? "default" : "secondary"}>
                          {topic.tag}
                        </Badge>
                        <span className="text-xs text-muted-foreground">Posted by {topic.author} • {topic.time}</span>
                      </div>
                      <h3 className="text-lg font-bold hover:text-primary transition-colors">{topic.title}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground text-sm">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{topic.replies}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{topic.views}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-80 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['Help', 'Discovery', 'Technical', 'General', 'Success Stories', 'Review'].map(tag => (
                    <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-muted">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

             <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg text-primary">Need Expert Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Our genealogists can help you break through brick walls in your research.
                </p>
                <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary/10">Get Expert Advice</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
