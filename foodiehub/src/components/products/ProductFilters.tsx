import { Search } from 'lucide-react';
import type { CategoryId, DietaryType } from '../../types';
import { categories } from '../../data/categories';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

interface ProductFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  category: CategoryId;
  onCategoryChange: (c: CategoryId) => void;
  dietary: DietaryType | 'all';
  onDietaryChange: (d: DietaryType | 'all') => void;
  sort: SortOption;
  onSortChange: (s: SortOption) => void;
  featuredOnly: boolean;
  onFeaturedChange: (v: boolean) => void;
  availableOnly: boolean;
  onAvailableChange: (v: boolean) => void;
}

export const ProductFilters = (props: ProductFiltersProps) => {
  const {
    search,
    onSearchChange,
    category,
    onCategoryChange,
    dietary,
    onDietaryChange,
    sort,
    onSortChange,
    featuredOnly,
    onFeaturedChange,
    availableOnly,
    onAvailableChange,
  } = props;

  return (
    <aside className="fh-filters">
      <div className="fh-filter-group">
        <label className="fh-filter-label" htmlFor="menu-search">Search</label>
        <div className="fh-search-box">
          <Search size={18} />
          <input
            id="menu-search"
            type="search"
            className="fh-search-input"
            placeholder="Search dishes…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search dishes"
          />
        </div>
      </div>

      <div className="fh-filter-group">
        <span className="fh-filter-label">Category</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {categories.map((c) => (
            <label key={c.id} className="fh-filter-option">
              <input
                type="radio"
                name="category"
                value={c.id}
                checked={category === c.id}
                onChange={() => onCategoryChange(c.id)}
                style={{ accentColor: 'var(--fh-primary)' }}
              />
              <span>{c.icon} {c.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="fh-filter-group">
        <span className="fh-filter-label">Dietary</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {(['all', 'veg', 'non-veg'] as const).map((d) => (
            <label key={d} className="fh-filter-option">
              <input
                type="radio"
                name="dietary"
                value={d}
                checked={dietary === d}
                onChange={() => onDietaryChange(d)}
                style={{ accentColor: 'var(--fh-primary)' }}
              />
              <span>
                {d === 'all' ? 'All' : d === 'veg' ? '🟢 Vegetarian' : '🔴 Non-Vegetarian'}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="fh-filter-group">
        <label className="fh-filter-label" htmlFor="sort-select">Sort by</label>
        <select
          id="sort-select"
          className="fh-select"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
        >
          <option value="featured">Featured first</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <div className="fh-filter-group">
        <span className="fh-filter-label">Show only</span>
        <label className="fh-filter-option">
          <input
            type="checkbox"
            checked={featuredOnly}
            onChange={(e) => onFeaturedChange(e.target.checked)}
            style={{ accentColor: 'var(--fh-primary)' }}
          />
          <span>Featured dishes</span>
        </label>
        <label className="fh-filter-option">
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={(e) => onAvailableChange(e.target.checked)}
            style={{ accentColor: 'var(--fh-primary)' }}
          />
          <span>Available now</span>
        </label>
      </div>
    </aside>
  );
};
