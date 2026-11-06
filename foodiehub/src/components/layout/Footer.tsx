import { Link } from 'react-router-dom';
import {
  ArrowUp,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Share2,
  UtensilsCrossed,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { categories } from '../../data/categories';

export const Footer = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <footer className="fh-footer">
        <div className="fh-container">
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <Link to="/" className="fh-brand fh-footer-brand mb-3" style={{ display: 'inline-flex' }}>
                <span className="fh-brand-logo" aria-hidden="true">
                  <UtensilsCrossed size={22} />
                </span>
                <span className="fh-brand-name" style={{ color: '#fff' }}>
                  Foodie<span style={{ color: 'var(--fh-primary)' }}>Hub</span>
                </span>
              </Link>
              <p style={{ fontSize: '0.9rem', maxWidth: 320 }}>
                Good Food. Great Mood. Delivered Fresh. FoodieHub brings your favourite meals
                from local kitchens straight to your door — fast, fresh and full of flavour.
              </p>
              <div className="mt-3">
                <a href="#" className="fh-social-btn" aria-label="Visit our website">
                  <Globe size={18} />
                </a>
                <a href="#" className="fh-social-btn" aria-label="Share FoodieHub">
                  <Share2 size={18} />
                </a>
                <a href="#" className="fh-social-btn" aria-label="Message us">
                  <MessageCircle size={18} />
                </a>
                <a href="#" className="fh-social-btn" aria-label="Send us a message">
                  <Send size={18} />
                </a>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 col-6">
              <h5>Quick Links</h5>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/cart">Cart</Link></li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 col-6">
              <h5>Categories</h5>
              <ul>
                {categories.slice(1, 7).map((c) => (
                  <li key={c.id}>
                    <Link to={`/menu?category=${c.id}`}>
                      {c.icon} {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-lg-3 col-md-6">
              <h5>Get in Touch</h5>
              <ul>
                <li style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <MapPin size={16} style={{ flexShrink: 0, marginTop: 3 }} />
                  <span>123 Main Boulevard, Lahore, Pakistan</span>
                </li>
                <li style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Phone size={16} style={{ flexShrink: 0 }} />
                  <span>+92 300 1234567</span>
                </li>
                <li style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Mail size={16} style={{ flexShrink: 0 }} />
                  <span>hello@foodiehub.demo</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="fh-footer-bottom">
          <div className="fh-container d-flex flex-wrap justify-content-between gap-2">
            <span>© {new Date().getFullYear()} FoodieHub. Frontend demo — no real orders are processed.</span>
            <span>Built with React, TypeScript & Bootstrap.</span>
          </div>
        </div>
      </footer>

      <button
        type="button"
        className={`fh-back-to-top ${showTop ? 'is-visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
};
