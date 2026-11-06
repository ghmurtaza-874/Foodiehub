import { Link } from 'react-router-dom';
import { ArrowRight, Bike, Clock, Star } from 'lucide-react';

export const Hero = () => (
  <section className="fh-hero">
    <div className="fh-container">
      <div className="fh-hero-grid">
        <div className="fh-hero-copy">
          <span className="fh-hero-eyebrow">
            <Bike size={15} /> #1 Food Delivery in Town
          </span>
          <h1 className="fh-hero-title">
            Delicious Food, <br />
            Delivered Right to <b>Your Door.</b>
          </h1>
          <p className="fh-hero-subtitle">
            Discover your favorites, explore fresh flavors and enjoy delicious meals
            delivered with care. From sizzling biryani to wood-fired pizza — order in
            minutes, feast in no time.
          </p>
          <div className="fh-hero-actions">
            <Link to="/menu" className="fh-btn fh-btn-primary fh-btn-lg">
              Order Now <ArrowRight size={18} />
            </Link>
            <Link to="/menu" className="fh-btn fh-btn-outline fh-btn-lg">
              Explore Menu
            </Link>
          </div>
          <div className="fh-hero-stats">
            <div>
              <div className="fh-hero-stat-value">25min</div>
              <div className="fh-hero-stat-label">Avg. delivery</div>
            </div>
            <div>
              <div className="fh-hero-stat-value">4.8★</div>
              <div className="fh-hero-stat-label">Customer rating</div>
            </div>
            <div>
              <div className="fh-hero-stat-value">50K+</div>
              <div className="fh-hero-stat-label">Orders delivered</div>
            </div>
          </div>
        </div>

        <div className="fh-hero-visual">
          <div className="fh-hero-image">
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&q=80&auto=format&fit=crop"
              alt="Freshly prepared gourmet burger with melted cheese"
            />
          </div>
          <div className="fh-hero-card top-left">
            <div className="fh-hero-card-icon">
              <Clock size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--fh-text-muted)' }}>Delivery in</div>
              <div>25 minutes</div>
            </div>
          </div>
          <div className="fh-hero-card bottom-right">
            <div className="fh-hero-card-icon">
              <Star size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--fh-text-muted)' }}>Rated</div>
              <div>4.8 / 5.0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
