
import { useState } from "react";
import { Search, Filter, FolderOpen, File, Download } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import FileUpload from "@/components/ui/FileUpload";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Sample documents data
const documents = [
  {
    id: 1,
    name: "Fire Safety Protocol v2.3",
    type: "PDF",
    size: "1.4 MB",
    uploaded: "Oct 12, 2023",
    category: "fire",
    uploader: "Raj Kumar",
  },
  {
    id: 2,
    name: "Road Safety Guidelines 2023",
    type: "Word",
    size: "850 KB",
    uploaded: "Sep 28, 2023",
    category: "road",
    uploader: "Priya Singh",
  },
  {
    id: 3,
    name: "Monthly Training Report",
    type: "Excel",
    size: "1.2 MB",
    uploaded: "Oct 05, 2023",
    category: "admin",
    uploader: "Admin",
  },
  {
    id: 4,
    name: "Industrial Safety Checklist",
    type: "PDF",
    size: "620 KB",
    uploaded: "Oct 10, 2023",
    category: "industrial",
    uploader: "Vikram Mehta",
  },
  {
    id: 5,
    name: "Emergency Response Plan",
    type: "Word",
    size: "1.1 MB",
    uploaded: "Oct 08, 2023",
    category: "fire",
    uploader: "Raj Kumar",
  },
  {
    id: 6,
    name: "Traffic Management Plan",
    type: "PowerPoint",
    size: "3.2 MB",
    uploaded: "Sep 15, 2023",
    category: "road",
    uploader: "Priya Singh",
  },
  {
    id: 7,
    name: "Equipment Safety Manual",
    type: "PDF",
    size: "2.8 MB",
    uploaded: "Oct 01, 2023",
    category: "industrial",
    uploader: "Vikram Mehta",
  },
  {
    id: 8,
    name: "Quarterly Performance Report",
    type: "Excel",
    size: "980 KB",
    uploaded: "Sep 30, 2023",
    category: "admin",
    uploader: "Admin",
  },
];

// Folders data
const folders = [
  { id: 1, name: "Fire Safety", count: 24, category: "fire" },
  { id: 2, name: "Road Safety", count: 18, category: "road" },
  { id: 3, name: "Industrial Safety", count: 32, category: "industrial" },
  { id: 4, name: "Administrative", count: 15, category: "admin" },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "fire":
      return "bg-safety-orange/10 text-safety-orange border-safety-orange/30";
    case "road":
      return "bg-deep-blue/10 text-deep-blue border-deep-blue/30";
    case "industrial":
      return "bg-success-green/10 text-success-green border-success-green/30";
    case "admin":
      return "bg-gray-200 text-gray-700 border-gray-300";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const getDocumentIcon = (type: string) => {
  return <File className="h-5 w-5" />;
};

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleUpload = () => {
    // Handle upload logic here
    setUploadDialogOpen(false);
    setSelectedFiles([]);
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? doc.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold font-montserrat">Document Repository</h1>
        <p className="text-muted-foreground">
          Manage and organize all your safety documents
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <Select onValueChange={(value) => setSelectedCategory(value === "all" ? null : value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="fire">Fire Safety</SelectItem>
              <SelectItem value="road">Road Safety</SelectItem>
              <SelectItem value="industrial">Industrial Safety</SelectItem>
              <SelectItem value="admin">Administrative</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>Upload Document</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Upload Documents</DialogTitle>
                <DialogDescription>
                  Add new documents to the repository. Supported formats include PDF, Word, Excel, and PowerPoint.
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <FileUpload
                  onFilesSelected={handleFilesSelected}
                  acceptedFileTypes=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                />
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpload} disabled={selectedFiles.length === 0}>
                  Upload {selectedFiles.length > 0 ? `(${selectedFiles.length})` : ""}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all" className="animate-fade-in">
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="folders">Folders</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="document-card overflow-hidden animate-scale-in">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          getCategoryColor(doc.category).split(" ")[0]
                        }`}>
                          {getDocumentIcon(doc.type)}
                        </div>
                        <div className="ml-3">
                          <h3 className="font-medium text-sm">{doc.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {doc.type} • {doc.size}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className={getCategoryColor(doc.category)}>
                        {doc.category === "fire" 
                          ? "Fire" 
                          : doc.category === "road" 
                            ? "Road" 
                            : doc.category === "industrial" 
                              ? "Industrial" 
                              : "Admin"}
                      </Badge>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Uploaded on {doc.uploaded}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        By {doc.uploader}
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-t flex divide-x">
                    <Button variant="ghost" size="sm" className="flex-1 rounded-none h-10">
                      Preview
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 rounded-none h-10">
                      <Download className="h-4 w-4 mr-1" /> Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="folders" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {folders.map((folder) => (
              <Card key={folder.id} className="cursor-pointer hover:shadow-md transition-all">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                    getCategoryColor(folder.category).split(" ")[0]
                  }`}>
                    <FolderOpen size={32} className={getCategoryColor(folder.category).split(" ")[1]} />
                  </div>
                  <h3 className="font-semibold">{folder.name}</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {folder.count} documents
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recently Accessed</CardTitle>
              <CardDescription>Documents you've recently viewed or edited</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.slice(0, 5).map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        getCategoryColor(doc.category).split(" ")[0]
                      }`}>
                        {getDocumentIcon(doc.type)}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium text-sm">{doc.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {doc.type} • Accessed yesterday
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Documents;
