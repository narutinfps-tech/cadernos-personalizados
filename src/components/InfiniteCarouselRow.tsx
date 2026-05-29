import React, { useRef, useEffect } from 'react';

interface InfiniteCarouselRowProps {
  images: string[];
  speed?: number;
  direction?: 'left' | 'right';
  heightClass?: string;
}

export const InfiniteCarouselRow: React.FC<InfiniteCarouselRowProps> = ({
  images,
  speed = 0.8,
  direction = 'left',
  heightClass = "h-44 sm:h-56 md:h-64",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const isInteracting = useRef(false);
  const startX = useRef(0);
  const scrollStartX = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  // Triple the images list to guarantee seamless infinite wrapping under all screen widths
  const tripledImages = [...images, ...images, ...images];

  const resumeAutoScrollAfterDelay = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      isInteracting.current = false;
    }, 2000); // Resume automated scroll 2 seconds after user stops dragging or swiping
  };

  // Mouse Drag Events
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    isDragging.current = true;
    isInteracting.current = true;
    startX.current = e.pageX - container.offsetLeft;
    scrollStartX.current = container.scrollLeft;

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const container = containerRef.current;
    if (!container) return;

    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Drag speed multiplier
    container.scrollLeft = scrollStartX.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
      resumeAutoScrollAfterDelay();
    }
  };

  // Touch/Mobile Events
  const handleTouchStart = () => {
    isInteracting.current = true;
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
  };

  const handleTouchEnd = () => {
    resumeAutoScrollAfterDelay();
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial custom scroll center to support right-to-left seamless wraps
    const singleSectionWidth = container.scrollWidth / 3;
    if (direction === 'right') {
      container.scrollLeft = singleSectionWidth;
    } else {
      container.scrollLeft = 0;
    }

    let animationFrameId: number;

    const tick = () => {
      const el = containerRef.current;
      if (!el) {
        animationFrameId = requestAnimationFrame(tick);
        return;
      }

      const activeSectionWidth = el.scrollWidth / 3;

      if (!isInteracting.current && activeSectionWidth > 0) {
        if (direction === 'left') {
          el.scrollLeft += speed;
          if (el.scrollLeft >= activeSectionWidth * 2) {
            el.scrollLeft -= activeSectionWidth;
          }
        } else {
          el.scrollLeft -= speed;
          if (el.scrollLeft <= activeSectionWidth) {
            el.scrollLeft += activeSectionWidth;
          }
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className="w-full flex gap-4 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none py-2"
    >
      {tripledImages.map((imgUrl, i) => (
        <img
          key={`row-${direction}-${i}`}
          src={imgUrl}
          alt="Capa de Caderno"
          referrerPolicy="no-referrer"
          draggable="false"
          className={`${heightClass} w-auto object-contain rounded-xl select-none shrink-0 transition-transform duration-200 hover:scale-[1.02]`}
        />
      ))}
    </div>
  );
};
