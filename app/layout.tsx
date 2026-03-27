import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ze-Solution – Unlock Your Natural Potential',
  description: 'Ernährungsberatung für Schwangerschaft, Sport, Stillzeit und mehr.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link rel="icon" href="/favicon.ico?v=3" sizes="any" />
        <link rel="icon" href="/icon.png?v=3" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png?v=3" />
      </head>
<body className={inter.className}>
        {children}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var touchHandled = false;

            function closeNav() {
              var nav = document.getElementById('mobile-nav');
              var iconMenu = document.getElementById('icon-menu');
              var iconClose = document.getElementById('icon-close');
              if (nav) nav.style.display = 'none';
              if (iconMenu) iconMenu.style.display = '';
              if (iconClose) iconClose.style.display = 'none';
            }

            function closeAllModals() {
              var modals = document.querySelectorAll('.ze-modal');
              for (var i = 0; i < modals.length; i++) {
                modals[i].style.display = 'none';
              }
            }

            function handleAction(el) {
              var action = el.getAttribute('data-action');
              var val = el.getAttribute('data-value');

              if (action === 'locale') {
                window.location.href = '/' + val;
              }

              if (action === 'toggle-nav') {
                var nav = document.getElementById('mobile-nav');
                var iconMenu = document.getElementById('icon-menu');
                var iconClose = document.getElementById('icon-close');
                if (!nav) return;
                var isOpen = nav.style.display === 'flex';
                nav.style.display = isOpen ? 'none' : 'flex';
                if (iconMenu) iconMenu.style.display = isOpen ? '' : 'none';
                if (iconClose) iconClose.style.display = isOpen ? 'none' : '';
              }

              if (action === 'close-nav') {
                closeNav();
                var href = el.getAttribute('href');
                if (href && href !== '#') {
                  window.location.href = href;
                }
              }

              if (action === 'open-modal') {
                var modalId = el.getAttribute('data-modal');
                var modal = document.getElementById(modalId);
                if (modal) modal.style.display = 'flex';
              }

              if (action === 'close-modal') {
                closeAllModals();
              }
            }

            // Touch handler for iOS/Android — prevents ghost click
            document.addEventListener('touchend', function(e) {
              var el = e.target.closest('[data-action]');
              if (!el) return;
              e.preventDefault();
              touchHandled = true;
              handleAction(el);
              setTimeout(function() { touchHandled = false; }, 600);
            }, { passive: false });

            // Click handler for desktop only (skipped if touch already handled)
            document.addEventListener('click', function(e) {
              if (touchHandled) return;
              var el = e.target.closest('[data-action]');
              if (!el) return;
              e.preventDefault();
              handleAction(el);
            });
          })();
        ` }} />
      </body>
    </html>
  )
}
