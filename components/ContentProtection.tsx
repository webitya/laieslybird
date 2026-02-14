'use client';

import { useEffect } from 'react';

interface ContentProtectionProps {
    children: React.ReactNode;
}

export default function ContentProtection({ children }: ContentProtectionProps) {
    useEffect(() => {
        // Disable right-click
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            return false;
        };

        // Disable keyboard shortcuts
        const handleKeyDown = (e: KeyboardEvent) => {
            // Disable Ctrl+C, Ctrl+S, Ctrl+U, Ctrl+P, F12
            if (
                (e.ctrlKey && (e.key === 'c' || e.key === 's' || e.key === 'u' || e.key === 'p')) ||
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.shiftKey && e.key === 'J') ||
                (e.ctrlKey && e.shiftKey && e.key === 'C')
            ) {
                e.preventDefault();
                return false;
            }
        };

        // Disable text selection
        const handleSelectStart = (e: Event) => {
            e.preventDefault();
            return false;
        };

        // Disable drag
        const handleDragStart = (e: DragEvent) => {
            e.preventDefault();
            return false;
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('selectstart', handleSelectStart);
        document.addEventListener('dragstart', handleDragStart);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('selectstart', handleSelectStart);
            document.removeEventListener('dragstart', handleDragStart);
        };
    }, []);

    return (
        <div className="select-none">
            <style jsx global>{`
        * {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        img {
          pointer-events: none;
          -webkit-user-drag: none;
          -khtml-user-drag: none;
          -moz-user-drag: none;
          -o-user-drag: none;
          user-drag: none;
        }
      `}</style>
            {children}
        </div>
    );
}
