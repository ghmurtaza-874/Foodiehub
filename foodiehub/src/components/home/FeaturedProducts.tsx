import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProducts } from '../../data/products';
import { ProductGrid } from '../products/ProductGrid';

export const FeaturedProducts = () => {
  const featured = getFeaturedProducts().slice(0, 8);
  return (
    <section className="fh-section" style={{ background: '#fff' }}>
      <div className="fh-container">
        <div className="fh-section-head">
          <div>
            <h2 className="fh-section-title">Featured Dishes</h2>
            <p className="fh-section-subtitle" style={{ marginBottom: 0 }}>
              Handpicked favourites our customers keep coming back for.
            </p>
          </div>
          <Link to="/menu" className="fh-btn fh-btn-outline">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <ProductGrid products={featured} />
      </div>
    </section>
  );
};
