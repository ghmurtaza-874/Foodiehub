import { useNavigate } from 'react-router-dom';
import { categories } from '../../data/categories';
import { products } from '../../data/products';
import type { CategoryId } from '../../types';

interface CategorySectionProps {
  active?: CategoryId;
  onSelect?: (id: CategoryId) => void;
}

export const CategorySection = ({ active, onSelect }: CategorySectionProps) => {
  const navigate = useNavigate();
  const countFor = (id: CategoryId) =>
    id === 'all'
      ? products.length
      : products.filter((p) => p.category === id).length;

  const handleClick = (id: CategoryId) => {
    if (onSelect) {
      onSelect(id);
    } else {
      navigate(`/menu?category=${id}`);
    }
  };

  return (
    <section className="fh-section" id="categories">
      <div className="fh-container">
        <div className="fh-section-head">
          <div>
            <h2 className="fh-section-title">Browse by Category</h2>
            <p className="fh-section-subtitle" style={{ marginBottom: 0 }}>
              From wood-fired pizzas to healthy bowls — find exactly what you're craving.
            </p>
          </div>
        </div>
        <div className="fh-category-row">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`fh-category-card ${active === c.id ? 'is-active' : ''}`}
              onClick={() => handleClick(c.id)}
              aria-pressed={active === c.id}
            >
              <div className="fh-category-icon" aria-hidden="true">
                <span style={{ fontSize: '1.6rem' }}>{c.icon}</span>
              </div>
              <div className="fh-category-name">{c.name}</div>
              <div className="fh-category-count">{countFor(c.id)} items</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
