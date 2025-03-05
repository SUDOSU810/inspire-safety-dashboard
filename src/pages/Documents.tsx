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
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import FileUpload from "@/components/ui/FileUpload"; // Correct import statement

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

  const filteredDocuments = documentsData.filter((document) => {
    const searchMatch = document.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const categoryMatch =
      categoryFilter === "All" || document.category === categoryFilter;
    return searchMatch && categoryMatch;
  });

  return (
    <DashboardLayout>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="page-title">Documents</h1>
          <div className="space-x-2">
            <Button variant="outline" className="glass-button">
              <Download className="w-4 h-4 mr-2" />
              Download All
            </Button>
            <Button className="btn-creative">
              <Plus className="w-4 h-4 mr-2" />
              Add Document
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Input
              type="text"
              placeholder="Search documents..."
              className="mr-3"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="glass-button">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter by Category
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
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
          <div>
            <FileUpload />
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((document) => (
            <HoverCard key={document.id}>
              <HoverCardTrigger asChild>
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      {document.title}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardTitle>
                    <CardDescription>{document.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      Last Modified: {document.lastModified}
                      <br />
                      Size: {document.size}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div>
                      Status: <Badge>{document.status}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Owner: {document.owner}
                    </div>
                  </CardFooter>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="w-[360px] glass-panel document-hover-card">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">
                    {document.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Category: {document.category}
                    <br />
                    Status: {document.status}
                    <br />
                    Last Modified: {document.lastModified}
                    <br />
                    Size: {document.size}
                    <br />
                    Owner: {document.owner}
                  </p>
                  <Separator />
                  <Button variant="outline" className="w-full glass-button">
                    <FileText className="h-4 w-4 mr-2" />
                    View Document
                  </Button>
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
