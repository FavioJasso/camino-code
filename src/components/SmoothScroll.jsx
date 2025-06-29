"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function SmoothScroll({ children }) {
  const pathname = usePathname();
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      // Import GSAP dynamically
      import('gsap').then(({ default: gsap }) => {
        import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger);

          // Smooth scroll to top on route change
          const scrollToTop = () => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          };
          scrollToTop();

          // Update ScrollTrigger on route change
          ScrollTrigger.refresh();

          // Add parallax effect to elements with data-speed attribute
          const parallaxElements = document.querySelectorAll('[data-speed]');
          parallaxElements.forEach((element) => {
            const speed = parseFloat(element.getAttribute('data-speed'));
            gsap.to(element, {
              y: (i, el) => -ScrollTrigger.maxScroll(window) * speed,
              ease: "none",
              scrollTrigger: {
                start: 0,
                end: "max",
                invalidateOnRefresh: true,
                scrub: true
              }
            });
          });

          // Add fade in animation to elements with data-fade attribute
          const fadeElements = document.querySelectorAll('[data-fade]');
          fadeElements.forEach((element) => {
            gsap.fromTo(element, 
              {
                opacity: 0,
                y: 50,
              },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 80%",
                  end: "bottom 20%",
                  toggleActions: "play none none reverse"
                }
              }
            );
          });

          // Add scale animation to elements with data-scale attribute
          const scaleElements = document.querySelectorAll('[data-scale]');
          scaleElements.forEach((element) => {
            gsap.fromTo(element, 
              {
                scale: 0.8,
                opacity: 0,
              },
              {
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 80%",
                  toggleActions: "play none none reverse"
                }
              }
            );
          });

          // Add text reveal animation
          const textRevealElements = document.querySelectorAll('[data-text-reveal]');
          textRevealElements.forEach((element) => {
            const text = element.textContent;
            element.innerHTML = '';
            
            // Split text into spans
            text.split('').forEach((char, index) => {
              const span = document.createElement('span');
              span.textContent = char === ' ' ? '\u00A0' : char;
              span.style.display = 'inline-block';
              span.style.opacity = '0';
              span.style.transform = 'translateY(100%)';
              element.appendChild(span);
            });

            // Animate spans
            gsap.to(element.children, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.02,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            });
          });

          // Cleanup function
          return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
          };
        });
      });

      // Add smooth scroll behavior to all anchor links
      const handleAnchorClick = (e) => {
        const target = e.target.closest('a[href^="#"]');
        if (target) {
          e.preventDefault();
          const id = target.getAttribute('href');
          const element = document.querySelector(id);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      };

      document.addEventListener('click', handleAnchorClick);
      return () => document.removeEventListener('click', handleAnchorClick);
    }
  }, [pathname]);

  // Add smooth scrollbar styles
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Add custom scrollbar behavior
      let isScrolling;
      const handleScroll = () => {
        document.body.classList.add('is-scrolling');
        
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
          document.body.classList.remove('is-scrolling');
        }, 100);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div ref={scrollContainerRef} className="smooth-scroll-container">
      {children}
      
      {/* Scroll progress indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-amber-400 to-red-600 transition-all duration-300"
          style={{
            width: '0%',
            transition: 'none'
          }}
          ref={(el) => {
            if (el && typeof window !== 'undefined') {
              const updateProgress = () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = (scrollTop / scrollHeight) * 100;
                el.style.width = `${progress}%`;
              };
              
              window.addEventListener('scroll', updateProgress, { passive: true });
              updateProgress();
            }
          }}
        />
      </div>
    </div>
  );
}
