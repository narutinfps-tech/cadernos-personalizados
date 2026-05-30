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
  const startX = useRef(0);
  const scrollStartX = useRef(0);

  // Triple the images list to guarantee seamless infinite wrapping under all screen widths
  const tripledImages = [...images, ...images, ...images];

  // Mouse Drag Events
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    isDragging.current = true;
    startX.current = e.pageX - container.offsetLeft;
    scrollStartX.current = container.scrollLeft;
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
    isDragging.current = false;
  };

  // Touch/Mobile Events
  const handleTouchStart = (e: React.TouchEvent) => {
    const container = containerRef.current;
    if (!container || e.touches.length === 0) return;
    isDragging.current = true;
    startX.current = e.touches[0].pageX - container.offsetLeft;
    scrollStartX.current = container.scrollLeft;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || e.touches.length === 0) return;
    const container = containerRef.current;
    if (!container) return;

    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    container.scrollLeft = scrollStartX.current - walk;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Cache the single section width to prevent forced reflows (reading scrollWidth) inside requestAnimationFrame every single frame
    const widthRef = { current: container.scrollWidth / 3 };

    const handleResize = () => {
      if (container) {
        widthRef.current = container.scrollWidth / 3;
      }
    };

    window.addEventListener('resize', handleResize);

    // Set initial custom scroll center to support right-to-left seamless wraps
    if (direction === 'right') {
      container.scrollLeft = widthRef.current;
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

      const activeSectionWidth = widthRef.current;

      // Only scroll automatically if the user is not actively dragging/swiping
      if (!isDragging.current && activeSectionWidth > 0) {
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

    // Efficiently watch for size changes without polling or continuous measurements
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(container);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
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
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={{ willChange: 'scroll-position' }}
      className="w-full flex gap-4 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none py-2"
    >
      {tripledImages.map((imgUrl, i) => (
        <img
          key={`row-${direction}-${i}`}
          src={imgUrl}
          alt="Capa de Caderno"
          referrerPolicy="no-referrer"
          draggable="false"
          loading="lazy"
          decoding="async"
          className={`${heightClass} w-auto object-contain rounded-xl select-none shrink-0 transition-transform duration-200 hover:scale-[1.02] transform-gpu`}
        />
      ))}
    </div>
  );
};
