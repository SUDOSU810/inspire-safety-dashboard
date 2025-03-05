
import { useState } from "react";
import { FileText, UploadCloud, Search, Filter, FileArchive, Download, Trash, Eye, Clock, Calendar, ChevronDown, Info, Plus, ExternalLink } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileUpload } from "@/components/ui/FileUpload";

// Sample documents data
const documents = [
  {
    id: 1,
    name: "Fire Safety Protocol 2023",
    type: "PDF",
    size: "4.2 MB",
    created: "2023-12-10T14:30:00",
    category: "fire",
    tags: ["protocol", "safety", "2023"],
    author: "Raj Kumar",
    authorAvatar: "/placeholder.svg",
    authorInitials: "RK",
    preview: "This document outlines the standard operating procedures for fire safety across all regional centers...",
  },
  {
    id: 2,
    name: "Traffic Analysis Report Q4",
    type: "Excel",
    size: "3.7 MB",
    created: "2023-12-05T09:15:00",
    category: "road",
    tags: ["report", "analysis", "Q4"],
    author: "Priya Singh",
    authorAvatar: "/placeholder.svg",
    authorInitials: "PS",
    preview: "Comprehensive analysis of traffic patterns and accident data for the Chennai region during Q4 2023...",
  },
  {
    id: 3,
    name: "Industrial Safety Training Manual",
    type: "Word",
    size: "8.5 MB",
    created: "2023-11-28T11:45:00",
    category: "industrial",
    tags: ["manual", "training", "safety"],
    author: "Vikram Mehta",
    authorAvatar: "/placeholder.svg",
    authorInitials: "VM",
    preview: "Complete training manual for industrial safety procedures including machine operation protocols...",
  },
  {
    id: 4,
    name: "School Safety Campaign Presentation",
    type: "PowerPoint",
    size: "12.3 MB",
    created: "2023-11-20T16:00:00",
    category: "road",
    tags: ["presentation", "campaign", "school"],
    author: "Ananya Desai",
    authorAvatar: "/placeholder.svg",
    authorInitials: "AD",
    preview: "Educational presentation designed for school campaigns focusing on road safety awareness...",
  },
  {
    id: 5,
    name: "Chemical Handling Guidelines 2023",
    type: "PDF",
    size: "5.1 MB",
    created: "2023-11-15T10:30:00",
    category: "industrial",
    tags: ["guidelines", "chemical", "handling"],
    author: "Karthik Nair",
    authorAvatar: "/placeholder.svg",
    authorInitials: "KN",
    preview: "Updated guidelines for proper handling, storage, and disposal of hazardous chemicals in industrial settings...",
  },
  {
    id: 6,
    name: "Emergency Response Plan - Chennai",
    type: "PDF",
    size: "7.8 MB",
    created: "2023-11-10T13:20:00",
    category: "fire",
    tags: ["emergency", "response", "plan"],
    author: "Sunita Patel",
    authorAvatar: "/placeholder.svg",
    authorInitials: "SP",
    preview: "Comprehensive emergency response plan for fire incidents in the Chennai regional office...",
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "fire":
      return "bg-[#FF7F00]/10 text-[#FF7F00] border-[#FF7F00]/30";
    case "road":
      return "bg-oxford-blue/10 text-oxford-blue border-oxford-blue/30";
    case "industrial":
      return "bg-cambridge-blue/10 text-cambridge-blue border-cambridge-blue/30";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getDocumentIcon = (type: string) => {
  switch (type) {
    case "PDF":
      return "bg-red-500/10 text-red-500";
    case "Excel":
      return "bg-green-500/10 text-green-500";
    case "Word":
      return "bg-blue-500/10 text-blue-500";
    case "PowerPoint":
      return "bg-orange-500/10 text-orange-500";
    default:
      return "bg-gray-500/10 text-gray-500";
  }
};

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([]);
  const [fileUploading, setFileUploading] = useState(false);
  const { toast } = useToast();

  // Handle document selection
  const handleSelect = (id: number) => {
    if (selectedDocuments.includes(id)) {
      setSelectedDocuments(selectedDocuments.filter((docId) => docId !== id));
    } else {
      setSelectedDocuments([...selectedDocuments, id]);
    }
  };

  // Handle document selection
  const handleSelectAll = () => {
    if (selectedDocuments.length === documents.length) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(documents.map((doc) => doc.id));
    }
  };

  // Handle file upload
  const handleFileUpload = (files: File[]) => {
    setFileUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setFileUploading(false);
      toast({
        title: "Files Uploaded",
        description: `Successfully uploaded ${files.length} file(s).`,
      });
    }, 1500);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  return (
    <DashboardLayout>
      <div className="mb-8 animate-fade-in">
        <h1 className="page-title mb-2">Documents Library</h1>
        <p className="page-subtitle">
          Manage and access all safety training documents
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 mb-8">
        <div className="lg:w-1/4">
          <div className="glass-panel p-5 h-full">
            <h2 className="text-lg font-poppins font-medium text-oxford-blue mb-4 flex items-center">
              <FileArchive size={20} className="mr-2 text-cambridge-blue" />
              Categories
            </h2>
            
            <div className="space-y-2">
              {['All Documents', 'Fire Safety', 'Road Safety', 'Industrial Safety'].map((category, index) => (
                <Button 
                  key={index}
                  variant="ghost" 
                  className={`w-full justify-start font-raleway ${index === 0 ? 'bg-success-green/10 text-success-green font-medium' : ''}`}
                >
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    index === 1 ? 'bg-[#FF7F00]' : 
                    index === 2 ? 'bg-oxford-blue' : 
                    index === 3 ? 'bg-cambridge-blue' : 
                    'bg-success-green'
                  }`}></div>
                  {category}
                </Button>
              ))}
            </div>
            
            <div className="mt-8">
              <h2 className="text-lg font-poppins font-medium text-oxford-blue mb-4 flex items-center">
                <Clock size={20} className="mr-2 text-cambridge-blue" />
                Recent Activity
              </h2>
              
              <div className="space-y-3">
                {['Uploaded Fire Safety Protocol', 'Downloaded Traffic Analysis', 'Updated Training Manual'].map((activity, index) => (
                  <div key={index} className="flex items-center text-sm border-l-2 border-cambridge-blue pl-3 py-1 font-raleway">
                    <span className="text-xs text-muted-foreground block font-open-sans">
                      {index === 0 ? '2 hours ago' : index === 1 ? 'Yesterday' : '3 days ago'}
                    </span>
                    <span className="text-charcoal">{activity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:w-3/4">
          <Card className="glass-panel shadow-md border-cambridge-blue/20">
            <CardHeader className="bg-white/50 rounded-t-xl border-b border-cambridge-blue/20 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div>
                <CardTitle className="text-lg font-poppins font-semibold text-oxford-blue flex items-center gap-2">
                  <FileText size={20} className="text-cambridge-blue" />
                  Documents Library
                </CardTitle>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search documents..."
                    className="pl-8 w-full sm:w-auto border-cambridge-blue/30 font-raleway"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-success-green to-light-green text-white">
                      <UploadCloud size={18} className="mr-2" />
                      <span className="font-poppins">Upload</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-panel-darker border-cambridge-blue/30 sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="font-poppins text-xl text-oxford-blue">Upload Documents</DialogTitle>
                      <DialogDescription className="font-raleway text-charcoal/80">
                        Drag and drop your files below or click to browse
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <FileUpload 
                        onUpload={handleFileUpload}
                        isUploading={fileUploading}
                        maxSize={10}
                        allowedTypes={['.pdf', '.docx', '.xlsx', '.pptx']}
                        className="border-cambridge-blue/30 hover:border-cambridge-blue/50"
                      />
                    </div>
                    <DialogFooter>
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="border-cambridge-blue/30 text-charcoal font-raleway"
                        onClick={() => document.getElementById('dialog-close')?.click()}
                      >
                        Cancel
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            
            <CardContent className="p-0 border-b border-cambridge-blue/20">
              <Tabs defaultValue="grid">
                <div className="flex items-center justify-between px-6 py-3 bg-white/30">
                  <div className="flex items-center">
                    <Checkbox 
                      id="select-all" 
                      checked={selectedDocuments.length === documents.length && documents.length > 0}
                      onCheckedChange={handleSelectAll}
                      className="mr-3 border-cambridge-blue/50"
                    />
                    <label htmlFor="select-all" className="text-sm font-medium text-charcoal cursor-pointer font-raleway">
                      {selectedDocuments.length > 0 ? `${selectedDocuments.length} selected` : "Select all"}
                    </label>
                    
                    {selectedDocuments.length > 0 && (
                      <div className="flex ml-4 gap-1">
                        <Button variant="outline" size="sm" className="h-8 border-cambridge-blue/30 text-cambridge-blue">
                          <Download size={16} className="mr-1" />
                          <span className="font-raleway">Download</span>
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 border-red-300 text-red-500 hover:bg-red-50">
                          <Trash size={16} className="mr-1" />
                          <span className="font-raleway">Delete</span>
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 border-cambridge-blue/30">
                          <Filter size={16} className="mr-1" />
                          <span className="font-raleway">Filter</span>
                          <ChevronDown size={16} className="ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="border-cambridge-blue/30 bg-white/90 backdrop-blur-md">
                        <DropdownMenuItem className="font-raleway">PDF Documents</DropdownMenuItem>
                        <DropdownMenuItem className="font-raleway">Excel Files</DropdownMenuItem>
                        <DropdownMenuItem className="font-raleway">Word Documents</DropdownMenuItem>
                        <DropdownMenuItem className="font-raleway">Recent Files</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <TabsList className="border border-cambridge-blue/30">
                      <TabsTrigger value="grid" className="data-[state=active]:bg-cambridge-blue data-[state=active]:text-white">
                        <Filter size={14} className="sm:mr-1" />
                        <span className="hidden sm:inline font-raleway">Grid</span>
                      </TabsTrigger>
                      <TabsTrigger value="list" className="data-[state=active]:bg-cambridge-blue data-[state=active]:text-white">
                        <Filter size={14} className="sm:mr-1" />
                        <span className="hidden sm:inline font-raleway">List</span>
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </div>

                <TabsContent value="grid" className="m-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-6">
                    {documents.map((doc) => (
                      <div key={doc.id} className="glass-card relative group">
                        <div className="absolute top-3 left-3 z-10">
                          <Checkbox 
                            checked={selectedDocuments.includes(doc.id)}
                            onCheckedChange={() => handleSelect(doc.id)}
                            className="border-cambridge-blue/50"
                          />
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-start mb-3">
                            <div className={`p-3 rounded-xl mr-3 ${getDocumentIcon(doc.type)}`}>
                              <FileText size={24} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <HoverCard>
                                <HoverCardTrigger asChild>
                                  <h3 className="font-poppins font-medium text-oxford-blue truncate hover:text-cambridge-blue cursor-pointer">
                                    {doc.name}
                                  </h3>
                                </HoverCardTrigger>
                                <HoverCardContent className="document-hover-card w-80">
                                  <div className="flex justify-between items-start">
                                    <div className="flex items-center">
                                      <div className={`p-2 rounded-lg mr-2 ${getDocumentIcon(doc.type)}`}>
                                        <FileText size={16} />
                                      </div>
                                      <div>
                                        <h4 className="font-poppins font-medium text-oxford-blue">{doc.name}</h4>
                                        <p className="text-xs text-muted-foreground font-open-sans">{doc.type} • {doc.size}</p>
                                      </div>
                                    </div>
                                    <Badge className={getCategoryColor(doc.category)}>
                                      {doc.category === "fire" ? "Fire Safety" : 
                                       doc.category === "road" ? "Road Safety" : "Industrial"}
                                    </Badge>
                                  </div>
                                  <div className="mt-3">
                                    <p className="text-sm text-charcoal font-raleway">{doc.preview}</p>
                                  </div>
                                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-cambridge-blue/20">
                                    <div className="flex items-center">
                                      <Avatar className="h-6 w-6 mr-2">
                                        <AvatarImage src={doc.authorAvatar} />
                                        <AvatarFallback className="bg-oxford-blue text-white text-xs">
                                          {doc.authorInitials}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span className="text-xs font-raleway">{doc.author}</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground font-open-sans">
                                      {formatDate(doc.created)}
                                    </div>
                                  </div>
                                </HoverCardContent>
                              </HoverCard>
                              
                              <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <span className="font-open-sans">{doc.type} • {doc.size}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Badge className={getCategoryColor(doc.category)}>
                              {doc.category === "fire" ? "Fire Safety" : 
                               doc.category === "road" ? "Road Safety" : "Industrial"}
                            </Badge>
                            <span className="text-xs text-muted-foreground font-open-sans">{formatDate(doc.created)}</span>
                          </div>
                          
                          <div className="flex items-center mt-4 justify-between">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarImage src={doc.authorAvatar} />
                                <AvatarFallback className="bg-oxford-blue text-white text-xs">
                                  {doc.authorInitials}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs font-medium font-raleway">{doc.author}</span>
                            </div>
                            
                            <div className="flex items-center space-x-1 invisible group-hover:visible">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-charcoal hover:text-cambridge-blue">
                                <Eye size={16} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-charcoal hover:text-cambridge-blue">
                                <Download size={16} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="list" className="m-0">
                  <div className="p-6">
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg overflow-hidden">
                      <div className="min-w-full overflow-auto">
                        <table className="min-w-full divide-y divide-cambridge-blue/20">
                          <thead className="bg-cambridge-blue/10">
                            <tr>
                              <th scope="col" className="w-10 px-3 py-3.5 text-left">
                                <Checkbox 
                                  checked={selectedDocuments.length === documents.length && documents.length > 0}
                                  onCheckedChange={handleSelectAll}
                                  className="border-cambridge-blue/50"
                                />
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-medium text-oxford-blue font-poppins">
                                Document
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-medium text-oxford-blue font-poppins">
                                Category
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-medium text-oxford-blue font-poppins">
                                Size
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-medium text-oxford-blue font-poppins">
                                Author
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-medium text-oxford-blue font-poppins">
                                Date
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-right text-sm font-medium text-oxford-blue font-poppins">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-cambridge-blue/20 bg-white/40">
                            {documents.map((doc) => (
                              <tr key={doc.id} className="hover:bg-cambridge-blue/5">
                                <td className="whitespace-nowrap px-3 py-4">
                                  <Checkbox 
                                    checked={selectedDocuments.includes(doc.id)}
                                    onCheckedChange={() => handleSelect(doc.id)}
                                    className="border-cambridge-blue/50"
                                  />
                                </td>
                                <td className="whitespace-nowrap px-3 py-4">
                                  <div className="flex items-center">
                                    <div className={`p-2 rounded-lg mr-3 ${getDocumentIcon(doc.type)}`}>
                                      <FileText size={18} />
                                    </div>
                                    <div>
                                      <HoverCard>
                                        <HoverCardTrigger asChild>
                                          <div className="font-medium text-oxford-blue hover:text-cambridge-blue cursor-pointer font-raleway">
                                            {doc.name}
                                          </div>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="document-hover-card w-80">
                                          <div className="flex justify-between">
                                            <div className="flex items-center">
                                              <div className={`p-2 rounded-lg mr-2 ${getDocumentIcon(doc.type)}`}>
                                                <FileText size={16} />
                                              </div>
                                              <div>
                                                <h4 className="font-medium text-oxford-blue font-poppins">{doc.name}</h4>
                                                <p className="text-xs text-muted-foreground font-open-sans">{doc.type} • {doc.size}</p>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="mt-2">
                                            <p className="text-sm text-charcoal font-raleway">{doc.preview}</p>
                                          </div>
                                        </HoverCardContent>
                                      </HoverCard>
                                      <div className="text-xs text-muted-foreground font-open-sans">
                                        {doc.type}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4">
                                  <Badge className={getCategoryColor(doc.category)}>
                                    {doc.category === "fire" ? "Fire Safety" : 
                                    doc.category === "road" ? "Road Safety" : "Industrial"}
                                  </Badge>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-charcoal font-open-sans">
                                  {doc.size}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4">
                                  <div className="flex items-center">
                                    <Avatar className="h-6 w-6 mr-2">
                                      <AvatarImage src={doc.authorAvatar} />
                                      <AvatarFallback className="bg-oxford-blue text-white text-xs">
                                        {doc.authorInitials}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm font-raleway">{doc.author}</span>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-charcoal font-open-sans">
                                  {formatDate(doc.created)}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-right">
                                  <div className="flex justify-end space-x-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-charcoal hover:text-cambridge-blue">
                                      <Eye size={16} />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-charcoal hover:text-cambridge-blue">
                                      <Download size={16} />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-charcoal hover:text-red-500">
                                      <Trash size={16} />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <div className="p-4 flex items-center justify-between bg-white/30 rounded-b-xl">
              <div className="text-sm text-muted-foreground font-raleway">
                Showing <span className="font-medium text-oxford-blue">{documents.length}</span> documents
              </div>
              <Button variant="outline" className="border-cambridge-blue/30 text-cambridge-blue">
                <Plus size={16} className="mr-1" />
                <span className="font-raleway">Add More</span>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Documents;
