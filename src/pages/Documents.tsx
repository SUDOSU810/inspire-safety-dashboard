
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  FileText,
  MoreVertical,
  Filter,
  Search,
  Plus,
  Download,
  Eye,
  Trash2,
  Edit,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import FileUpload from "@/components/ui/FileUpload";
import { useToast } from "@/components/ui/use-toast";

// Mock data
const documentsData = [
  {
    id: 1,
    title: "Project Proposal",
    category: "Proposals",
    status: "In Review",
    lastModified: "2024-01-20",
    size: "2.2 MB",
    owner: "John Doe",
  },
  {
    id: 2,
    title: "Marketing Strategy",
    category: "Marketing",
    status: "Approved",
    lastModified: "2024-01-15",
    size: "1.8 MB",
    owner: "Jane Smith",
  },
  {
    id: 3,
    title: "Financial Report Q4",
    category: "Finance",
    status: "Completed",
    lastModified: "2024-01-10",
    size: "3.5 MB",
    owner: "Alice Johnson",
  },
  {
    id: 4,
    title: "HR Policy Update",
    category: "HR",
    status: "Draft",
    lastModified: "2024-01-05",
    size: "1.5 MB",
    owner: "Bob Williams",
  },
  {
    id: 5,
    title: "Sales Presentation",
    category: "Sales",
    status: "In Progress",
    lastModified: "2023-12-30",
    size: "2.0 MB",
    owner: "Charlie Brown",
  },
];

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isHovering, setIsHovering] = useState<number | null>(null);
  const { toast } = useToast();

  const filteredDocuments = documentsData.filter((document) => {
    const searchMatch = document.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const categoryMatch =
      categoryFilter === "All" || document.category === categoryFilter;
    return searchMatch && categoryMatch;
  });

  const handleDownload = (document: any) => {
    toast({
      title: "Download started",
      description: `Downloading ${document.title}...`,
      variant: "default",
    });
  };

  const handleAddDocument = () => {
    toast({
      title: "Add Document",
      description: "Document upload dialog opened",
      variant: "default",
    });
  };

  const handleUploadSuccess = (fileName: string) => {
    toast({
      title: "Upload Successful",
      description: `${fileName} has been uploaded successfully!`,
      variant: "success",
    });
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-success-green/20 text-success-green border-success-green/30";
      case "In Review":
        return "bg-chart-blue/20 text-chart-blue border-chart-blue/30";
      case "Completed":
        return "bg-vibrant-green/20 text-vibrant-green border-vibrant-green/30";
      case "Draft":
        return "bg-charcoal/20 text-charcoal border-charcoal/30";
      case "In Progress":
        return "bg-chart-orange/20 text-chart-orange border-chart-orange/30";
      default:
        return "bg-accent/20 text-accent border-accent/30";
    }
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="page-title">Document Library</h1>
            <p className="text-charcoal font-raleway mt-1">
              Manage and organize your training documents
            </p>
          </div>
          <div className="space-x-2">
            <Button variant="outline" className="glass-button">
              <Download className="w-4 h-4 mr-2" />
              Download All
            </Button>
            <Button variant="creative" onClick={handleAddDocument}>
              <Plus className="w-4 h-4 mr-2" />
              Add Document
            </Button>
          </div>
        </div>

        <div className="glass-panel p-4 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center w-full md:w-auto">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search documents..."
                  className="pl-10 border-accent/20 focus:border-accent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-2 glass-button">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 glass-panel">
                  <DropdownMenuItem onClick={() => setCategoryFilter("All")}>
                    All Categories
                  </DropdownMenuItem>
                  <Separator />
                  <DropdownMenuItem onClick={() => setCategoryFilter("Proposals")}>
                    Proposals
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter("Marketing")}>
                    Marketing
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter("Finance")}>
                    Finance
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter("HR")}>
                    HR
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter("Sales")}>
                    Sales
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <FileUpload onUploadSuccess={handleUploadSuccess} />
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((document) => (
            <HoverCard key={document.id} openDelay={200} closeDelay={100}>
              <HoverCardTrigger asChild>
                <Card 
                  className="glass-card overflow-visible transition-all duration-300"
                  onMouseEnter={() => setIsHovering(document.id)}
                  onMouseLeave={() => setIsHovering(null)}
                >
                  <CardHeader className="bg-gradient-to-r from-white to-accent/5 pb-2">
                    <CardTitle className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center mr-3">
                          <FileText className="h-4 w-4 text-accent" />
                        </div>
                        <span className="font-raleway tracking-tight text-oxford-blue">
                          {document.title}
                        </span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="glass-panel">
                          <DropdownMenuItem onClick={() => handleDownload(document)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <Separator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardTitle>
                    <CardDescription className="font-raleway">
                      {document.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="text-sm text-muted-foreground font-raleway space-y-1">
                      <div className="flex justify-between">
                        <span className="text-charcoal/70">Modified:</span>
                        <span className="font-medium text-charcoal">{document.lastModified}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-charcoal/70">Size:</span>
                        <span className="font-medium text-charcoal">{document.size}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center pt-2 pb-3">
                    <Badge className={getBadgeVariant(document.status)}>
                      {document.status}
                    </Badge>
                    <div className="text-xs text-muted-foreground font-raleway">
                      By: {document.owner}
                    </div>
                  </CardFooter>
                  {isHovering === document.id && (
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 animate-fade-in">
                      <Button variant="secondary" size="sm" className="h-7 rounded-full shadow-md" onClick={() => handleDownload(document)}>
                        <Download className="h-3.5 w-3.5" />
                        <span className="text-xs">Download</span>
                      </Button>
                    </div>
                  )}
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 glass-panel">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">{document.title}</h4>
                      <p className="text-xs text-muted-foreground">{document.category}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge className={getBadgeVariant(document.status)}>
                      {document.status}
                    </Badge>
                    <span className="text-muted-foreground">Modified:</span>
                    <span>{document.lastModified}</span>
                    <span className="text-muted-foreground">Size:</span>
                    <span>{document.size}</span>
                    <span className="text-muted-foreground">Owner:</span>
                    <span>{document.owner}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between pt-2">
                    <Button variant="outline" size="sm" className="glass-button">
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      Preview
                    </Button>
                    <Button variant="accent" size="sm">
                      <Download className="h-3.5 w-3.5 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Documents;
