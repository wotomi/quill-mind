import { useState } from "react";
import { FilePanel } from "../panels/FilePanel";
import { EditorPanel } from "../panels/EditorPanel"; 
import { ChatPanel } from "../panels/ChatPanel";
import { TopBar } from "./TopBar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export const IDELayout = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>("");

  return (
    <div className="h-screen flex flex-col bg-background">
      <TopBar />
      
      <div className="flex-1 flex">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* File Management Panel */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <FilePanel 
              selectedFile={selectedFile}
              onFileSelect={(filename) => {
                setSelectedFile(filename);
                // In real implementation, fetch file content here
                setFileContent(`# ${filename}\n\nContent of ${filename}...`);
              }}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Editor Panel */}
          <ResizablePanel defaultSize={55} minSize={30}>
            <EditorPanel 
              selectedFile={selectedFile}
              content={fileContent}
              onContentChange={setFileContent}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* AI Chat Panel */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
            <ChatPanel selectedFile={selectedFile} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};