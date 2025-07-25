import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Save, 
  Eye, 
  Code, 
  GitCompare, 
  Check, 
  X,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EditorPanelProps {
  selectedFile: string | null;
  content: string;
  onContentChange: (content: string) => void;
}

export const EditorPanel = ({ selectedFile, content, onContentChange }: EditorPanelProps) => {
  const [activeTab, setActiveTab] = useState("edit");
  const [hasChanges, setHasChanges] = useState(false);

  const handleContentChange = (newContent: string) => {
    onContentChange(newContent);
    setHasChanges(true);
  };

  const handleSave = () => {
    // In real implementation, save to backend
    setHasChanges(false);
  };

  // Mock diff data
  const diffSections = [
    {
      type: "added",
      content: "+ This is a new line added by AI",
      lineNumber: 15
    },
    {
      type: "removed", 
      content: "- This line was removed",
      lineNumber: 18
    },
    {
      type: "modified",
      content: "~ This line was modified by AI assistant",
      lineNumber: 22
    }
  ];

  if (!selectedFile) {
    return (
      <div className="h-full bg-editor border-r border-panel-border flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No File Selected</h3>
          <p className="text-muted-foreground">Choose a file from the panel to start editing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-editor border-r border-panel-border flex flex-col">
      {/* Header */}
      <div className="h-12 border-b border-panel-border bg-panel-header flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{selectedFile}</span>
            {hasChanges && (
              <div className="w-2 h-2 rounded-full bg-primary" />
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            variant="ghost"
            onClick={handleSave}
            disabled={!hasChanges}
            className="text-xs"
          >
            <Save className="w-3 h-3 mr-1" />
            Save
          </Button>
        </div>
      </div>

      {/* Editor Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="h-10 bg-panel-header border-b border-panel-border rounded-none justify-start px-4">
          <TabsTrigger value="edit" className="data-[state=active]:bg-active-tab/20 data-[state=active]:text-primary">
            <Code className="w-3 h-3 mr-1" />
            Edit
          </TabsTrigger>
          <TabsTrigger value="preview" className="data-[state=active]:bg-active-tab/20 data-[state=active]:text-primary">
            <Eye className="w-3 h-3 mr-1" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="diff" className="data-[state=active]:bg-active-tab/20 data-[state=active]:text-primary">
            <GitCompare className="w-3 h-3 mr-1" />
            Diff
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="flex-1 m-0">
          <Textarea
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Start writing your markdown..."
            className="h-full resize-none border-0 rounded-none bg-transparent font-mono text-sm leading-relaxed focus-visible:ring-0"
          />
        </TabsContent>

        <TabsContent value="preview" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="p-6 prose prose-invert max-w-none">
              {/* Mock markdown preview */}
              <h1>Preview of {selectedFile}</h1>
              <p>This would show the rendered markdown content...</p>
              <pre className="bg-muted p-4 rounded">{content}</pre>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="diff" className="flex-1 m-0">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-panel-border bg-panel-header">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">AI Changes</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-7 text-xs bg-diff-added/20 border-diff-added/50 hover:bg-diff-added/30">
                    <Check className="w-3 h-3 mr-1" />
                    Accept All
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs bg-diff-removed/20 border-diff-removed/50 hover:bg-diff-removed/30">
                    <X className="w-3 h-3 mr-1" />
                    Reject All
                  </Button>
                </div>
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-4">
                {diffSections.map((diff, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "p-3 rounded mb-2 font-mono text-sm flex items-center justify-between group",
                      diff.type === "added" && "bg-diff-added/10 border border-diff-added/30",
                      diff.type === "removed" && "bg-diff-removed/10 border border-diff-removed/30",
                      diff.type === "modified" && "bg-primary/10 border border-primary/30"
                    )}
                  >
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">Line {diff.lineNumber}</div>
                      <div className={cn(
                        diff.type === "added" && "text-diff-added",
                        diff.type === "removed" && "text-diff-removed", 
                        diff.type === "modified" && "text-primary"
                      )}>
                        {diff.content}
                      </div>
                    </div>
                    
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-diff-added hover:bg-diff-added/20">
                        <Check className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-diff-removed hover:bg-diff-removed/20">
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};