import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Upload, 
  File, 
  Folder, 
  Search, 
  Plus,
  MoreHorizontal,
  Trash2,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FilePanelProps {
  selectedFile: string | null;
  onFileSelect: (filename: string) => void;
}

export const FilePanel = ({ selectedFile, onFileSelect }: FilePanelProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock file data
  const files = [
    { name: "README.md", type: "file", size: "2.1 KB" },
    { name: "project-notes.md", type: "file", size: "5.3 KB" },
    { name: "docs", type: "folder", size: "" },
    { name: "api-spec.md", type: "file", size: "12.8 KB" },
    { name: "meeting-notes.md", type: "file", size: "3.2 KB" },
    { name: "draft-article.md", type: "file", size: "8.7 KB" },
  ];

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full bg-file-tree border-r border-panel-border flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-panel-border bg-panel-header">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-foreground">Files</h2>
          <div className="flex gap-1">
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
              <Plus className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
              <Upload className="w-3 h-3" />
            </Button>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-7 h-8 text-xs bg-background border-border"
          />
        </div>
      </div>

      {/* File List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredFiles.map((file) => (
            <div
              key={file.name}
              onClick={() => file.type === "file" && onFileSelect(file.name)}
              className={cn(
                "flex items-center gap-2 p-2 rounded cursor-pointer group transition-colors",
                "hover:bg-secondary/50",
                selectedFile === file.name && file.type === "file" 
                  ? "bg-primary/20 text-primary border border-primary/30" 
                  : "text-foreground"
              )}
            >
              {file.type === "folder" ? (
                <Folder className="w-4 h-4 text-muted-foreground" />
              ) : (
                <FileText className="w-4 h-4 text-muted-foreground" />
              )}
              
              <div className="flex-1 min-w-0">
                <div className="text-sm truncate">{file.name}</div>
                {file.size && (
                  <div className="text-xs text-muted-foreground">{file.size}</div>
                )}
              </div>

              {file.type === "file" && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle delete
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};