
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  FileText,
  Download,
  Upload,
  Search,
  Filter,
  Plus,
  File,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { documents } from "@/utils/documentData";
import { useToast } from "@/hooks/use-toast";

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const fileId = `upload-${Date.now()}`;
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(prev => ({ ...prev, [fileId]: progress }));
        
        if (progress >= 100) {
          clearInterval(interval);
          toast({
            title: "Upload Complete",
            description: `${file.name} has been uploaded successfully.`,
          });
          setUploadProgress(prev => {
            const newProgress = { ...prev };
            delete newProgress[fileId];
            return newProgress;
          });
        }
      }, 500);
    });
  };

  const handleDownload = (doc: typeof documents[0]) => {
    toast({
      title: "Download Started",
      description: `Downloading ${doc.title}...`,
    });
    // Simulate download - in real app, use actual file download logic
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `${doc.title} has been downloaded.`,
      });
    }, 2000);
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="text-destructive" />;
      case 'xlsx':
        return <FileText className="text-success-green" />;
      default:
        return <File />;
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6 animate-fade-in">
        <h1 className="text-3xl font-bold font-montserrat text-oxford-blue">Document Library</h1>
        <p className="text-charcoal">
          Access and manage safety training documents
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-charcoal" />
          <Input
            type="search"
            placeholder="Search documents..."
            className="pl-9 bg-white border-cambridge-blue/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Input
            type="file"
            id="file-upload"
            className="hidden"
            multiple
            onChange={handleFileUpload}
          />
          <Button variant="outline" className="glass-button">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button 
            variant="creative"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Files
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {Object.entries(uploadProgress).map(([fileId, progress]) => (
          <Card key={fileId} className="bg-white/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Upload className="h-4 w-4 text-success-green" />
                  <span className="text-sm font-medium">Uploading...</span>
                </div>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </CardContent>
          </Card>
        ))}

        {documents
          .filter(doc => 
            doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.category.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((doc) => (
            <HoverCard key={doc.id}>
              <HoverCardTrigger asChild>
                <Card className="hover:shadow-md transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          {getFileIcon(doc.type)}
                        </div>
                        <div>
                          <h3 className="font-medium text-oxford-blue">{doc.title}</h3>
                          <Badge 
                            variant="outline" 
                            className={
                              doc.category === "Fire Safety" 
                                ? "bg-destructive/10 text-destructive border-destructive/30"
                                : doc.category === "Road Safety"
                                ? "bg-oxford-blue/10 text-oxford-blue border-oxford-blue/30"
                                : "bg-success-green/10 text-success-green border-success-green/30"
                            }
                          >
                            {doc.category}
                          </Badge>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDownload(doc)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      Uploaded on {doc.uploadDate}
                      <span className="mx-2">•</span>
                      {doc.fileSize}
                    </div>
                  </CardContent>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getFileIcon(doc.type)}
                    <h4 className="font-semibold">{doc.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This document contains important safety information and guidelines.
                    Click to download or view details.
                  </p>
                  <div className="pt-2 space-y-1 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Latest version
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Required reading
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
      </div>
    </DashboardLayout>
  );
};

export default Documents;
