import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
}

export const VideoModal = ({ isOpen, onClose, videoUrl }: VideoModalProps) => {
  // Default placeholder video - HomeHealthHero introduction or placeholder
  const defaultVideoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";
  const embedUrl = videoUrl || defaultVideoUrl;

  // Extract video ID and construct proper embed URL for YouTube and Vimeo
  const getEmbedUrl = (url: string): string => {
    // YouTube patterns
    const youtubePatterns = [/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/, /youtube\.com\/embed\/([^&\s]+)/];

    // Vimeo patterns
    const vimeoPattern = /vimeo\.com\/(\d+)/;

    // Check YouTube
    for (const pattern of youtubePatterns) {
      const match = url.match(pattern);
      if (match) {
        return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
      }
    }

    // Check Vimeo
    const vimeoMatch = url.match(vimeoPattern);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
    }

    // If already an embed URL or unknown format, return as is
    return url;
  };

  const finalEmbedUrl = getEmbedUrl(embedUrl);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] p-0 overflow-hidden bg-black border-0 rounded-lg sm:rounded-xl">
        {/* Accessible labels for screen readers */}
        <DialogTitle className="sr-only">Video Player</DialogTitle>
        <DialogDescription className="sr-only">HomeHealthHero introduction video</DialogDescription>

        {/* Close Button */}
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 rounded-full bg-black/50 hover:bg-black/70 text-white hover:text-white w-9 h-9 sm:w-10 sm:h-10 transition-all duration-200 touch-manipulation active:scale-95">
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>

        {/* Video Container */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={finalEmbedUrl}
            title="HomeHealthHero Video"
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
