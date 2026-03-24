import { TocItem } from '../lib/markdown';
import { Menu, X } from 'lucide-react';

interface TocSidebarProps {
  toc: TocItem[];
  activeId: string;
  isOpen: boolean;
  onClose: () => void;
  onItemClick: (id: string) => void;
}

export function TocSidebar({ toc, activeId, isOpen, onClose, onItemClick }: TocSidebarProps) {
  if (toc.length === 0) return null;

  return (
    <>
      {/* Sidebar - controlled by isOpen state on both desktop and mobile */}
      <aside className={`
        toc-sidebar-champagne
        fixed lg:sticky top-0 left-0
        h-screen overflow-y-auto
        w-[280px] transition-transform duration-300
        z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="p-6">
          {/* Close button (visible on both mobile and desktop) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-card-warm-beige rounded-lg transition-colors"
            aria-label="Close table of contents"
          >
            <X size={20} />
          </button>

          <h3 className="toc-title-champagne mb-6 flex items-center gap-2">
            <Menu size={20} />
            CHAPTER
          </h3>

          <TocList items={toc} activeId={activeId} onItemClick={onItemClick} />
        </div>
      </aside>

      {/* Overlay backdrop - visible when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}

// TocList component - renders nested TOC items
function TocList({ items, activeId, onItemClick }: {
  items: TocItem[];
  activeId: string;
  onItemClick: (id: string) => void;
}) {
  return (
    <nav className="space-y-1">
      {items.map((item) => (
        <div key={item.id}>
          {/* H2 Heading */}
          <button
            onClick={() => onItemClick(item.id)}
            className={`
              w-full text-left toc-item-h2
              ${activeId === item.id ? 'active' : ''}
            `}
          >
            {item.text}
          </button>

          {/* Nested H3 Headings */}
          {item.children && item.children.length > 0 && (
            <div className="space-y-1 mt-1">
              {item.children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => onItemClick(child.id)}
                  className={`
                    w-full text-left toc-item-h3
                    ${activeId === child.id ? 'active' : ''}
                  `}
                >
                  {child.text}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
