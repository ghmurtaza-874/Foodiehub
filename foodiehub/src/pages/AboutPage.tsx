import { Link } from 'react-router-dom';
import { Heart, Smile, UtensilsCrossed } from 'lucide-react';
import { About } from '../components/home/About';
import { Testimonials } from '../components/home/Testimonials';

export const AboutPage = () => (
  <>
    <div className="fh-page-header">
      <div className="fh-container">
        <nav className="fh-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link> / About
        </nav>
        <h1 className="fh-page-title">About FoodieHub</h1>
        <p className="fh-text-muted">Good Food. Great Mood. Delivered Fresh.</p>
      </div>
    </div>

    <div className="fh-container fh-section">
      <div className="row g-5 align-items-center">
        <div className="col-lg-6">
          <span className="fh-hero-eyebrow">
            <Heart size={15} /> Our Story
          </span>
          <h2 className="fh-section-title">Bringing Local Kitchens to Your Doorstep</h2>
          <p className="fh-text-muted" style={{ marginBottom: '1rem' }}>
            FoodieHub started with a simple idea: great food should be easy to get. We partner with
            local kitchens, chefs and home-style cooks across Pakistan to bring authentic, freshly
            prepared meals straight to your home or office — fast, hot and full of flavour.
          </p>
          <p className="fh-text-muted" style={{ marginBottom: '1rem' }}>
            From sizzling chicken biryani and wood-fired pizzas to healthy quinoa bowls and rich
            chocolate lava cake, our menu is curated to satisfy every craving, every mood and every
            dietary preference. Every dish is made to order with ingredients we'd be proud to serve
            our own families.
          </p>
          <p className="fh-text-muted">
            We're a team of food lovers, riders and engineers obsessed with one thing — making your
            next meal the best part of your day.
          </p>
        </div>
        <div className="col-lg-6">
          <div className="fh-product-detail-img" style={{ aspectRatio: '4 / 3' }}>
            <img
              src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&q=80&auto=format&fit=crop"
              alt="Chef preparing a fresh meal"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="fh-card mt-3" style={{ background: 'var(--fh-gradient-soft)' }}>
        <h3 className="fh-feature-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Smile size={20} /> Our Mission
        </h3>
        <p style={{ margin: 0, color: 'var(--fh-text)' }}>
          To make every meal a moment of joy by delivering fresh, high-quality food with care,
          speed and a personal touch — while supporting local culinary talent and building a
          community of happy, well-fed customers.
        </p>
      </div>
    </div>

    <About />
    <Testimonials />

    <div className="fh-container fh-section fh-text-center">
      <h2 className="fh-section-title">Hungry yet?</h2>
      <p className="fh-section-subtitle" style={{ marginInline: 'auto' }}>
        Explore our menu and treat yourself to something delicious today.
      </p>
      <Link to="/menu" className="fh-btn fh-btn-primary fh-btn-lg">
        <UtensilsCrossed size={18} /> Browse Menu
      </Link>
    </div>
  </>
);
