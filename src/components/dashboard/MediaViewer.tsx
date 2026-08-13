import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Video, 
  ExternalLink, 
  Image as ImageIcon,
  Maximize2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MediaViewerProps {
  type: 'video' | 'pdf' | 'image' | 'link';
  url: string;
  title: string;
  triggerLabel?: string;
  className?: string;
}

export function MediaViewer({ type, url, title, triggerLabel, className }: MediaViewerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const getIcon = () => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'pdf': return <FileText className="h-4 w-4" />;
      case 'image': return <ImageIcon className="h-4 w-4" />;
      default: return <ExternalLink className="h-4 w-4" />;
    }
  };

  const renderContent = () => {
    if (type === 'video') {
      // Handle YouTube and other embeds if needed, for now simple iframe
      const embedUrl = url.includes('youtube.com') || url.includes('youtu.be') 
        ? url.replace('watch?v=', 'embed/').split('&')[0]
        : url;
      
      return (
        <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
          <iframe 
            src={embedUrl} 
            className="w-full h-full" 
            allowFullScreen 
            title={title}
          />
        </div>
      );
    }

    if (type === 'pdf') {
      return (
        <div className="w-full h-[70vh] bg-muted rounded-lg overflow-hidden">
          <iframe 
            src={`${url}#toolbar=0`} 
            className="w-full h-full" 
            title={title}
          />
          <div className="p-4 flex justify-center border-t bg-card">
            <Button asChild variant="outline">
              <a href={url} target="_blank" rel="noopener noreferrer" className="gap-2">
                <Maximize2 className="h-4 w-4" /> Abrir em nova aba
              </a>
            </Button>
          </div>
        </div>
      );
    }

    if (type === 'image') {
      return (
        <div className="flex items-center justify-center bg-black/5 rounded-lg overflow-hidden p-4">
          <img 
            src={url} 
            alt={title} 
            className="max-w-full max-h-[70vh] object-contain shadow-lg" 
          />
        </div>
      );
    }

    return (
      <div className="p-8 text-center">
        <p className="mb-4 text-muted-foreground">Este link abrirá em uma nova aba.</p>
        <Button asChild>
          <a href={url} target="_blank" rel="noopener noreferrer" className="gap-2">
            Acessar {title} <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={cn("gap-2 text-xs", className)}
        >
          {getIcon()}
          {triggerLabel || title}
        </Button>
      </DialogTrigger>
      <DialogContent className={cn(
        "sm:max-w-[800px]", 
        type === 'pdf' || type === 'video' ? "max-w-[95vw]" : ""
      )}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getIcon()}
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
