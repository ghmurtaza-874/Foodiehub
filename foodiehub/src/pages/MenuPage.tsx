import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchX, SlidersHorizontal } from 'lucide-react';
import { products } from '../data/products';
import { categories } from '../data/categories';
import type { CategoryId, DietaryType } from '../types';
import { ProductGrid } from '../components/products/ProductGrid';
import {
  ProductFilters,
  type SortOption,
} from '../components/products/ProductFilters';
import { EmptyState } from '../components/common/EmptyState';
import { categoryName } from '../data/categories';

const isCategory = (v: string | null): v is CategoryId =>
  !!v && categories.some((c) => c.id === v);

export const MenuPage = () => {
  const [params, setParams] = useSearchParams();
  const initialCategory = params.get('category');
  const initialSearch = params.get('search') ?? '';

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState<CategoryId>(
    isCategory(initialCategory) ? initialCategory : 'all',
  );
  const [dietary, setDietary] = useState<DietaryType | 'all'>('all');
  const [sort, setSort] = useState<SortOption>('featured');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Sync query param updates (e.g. user clicks a category in navbar while on menu).
  useEffect(() => {
    const c = params.get('category');
    const s = params.get('search') ?? '';
    if (isCategory(c)) setCategory(c);
    if (s !== search) setSearch(s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const handleCategoryChange = (c: CategoryId) => {
    setCategory(c);
    const next = new URLSearchParams(params);
    if (c === 'all') next.delete('category');
    else next.set('category', c);
    setParams(next, { replace: true });
  };

  const handleSearchChange = (v: string) => {
    setSearch(v);
    const next = new URLSearchParams(params);
    if (v) next.set('search', v);
    else next.delete('search');
    setParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    let list = products.slice();
    if (category !== 'all') list = list.filter((p) => p.category === category);
    if (dietary !== 'all') list = list.filter((p) => p.dietary === dietary);
    if (featuredOnly) list = list.filter((p) => p.featured);
    if (availableOnly) list = list.filter((p) => p.available);

    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          categoryName(p.category).toLowerCase().includes(q),
      );
    }

    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        list.sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating);
        break;
    }
    return list;
  }, [category, dietary, sort, featuredOnly, availableOnly, search]);

  const filterProps = {
    search,
    onSearchChange: handleSearchChange,
    category,
    onCategoryChange: handleCategoryChange,
    dietary,
    onDietaryChange: setDietary,
    sort,
    onSortChange: setSort,
    featuredOnly,
    onFeaturedChange: setFeaturedOnly,
    availableOnly,
    onAvailableChange: setAvailableOnly,
  };

  return (
    <>
      <div className="fh-page-header">
        <div className="fh-container">
          <nav className="fh-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a> / Menu
          </nav>
          <h1 className="fh-page-title">Our Menu</h1>
          <p className="fh-text-muted">
            {filtered.length} {filtered.length === 1 ? 'dish' : 'dishes'} available
            {category !== 'all' && ` in ${categoryName(category)}`}
          </p>
        </div>
      </div>

      <div className="fh-container fh-section">
        <div className="row g-4">
          <div className="col-lg-3 d-none d-lg-block">
            <div style={{ position: 'sticky', top: 'calc(var(--fh-header-height) + 1rem)' }}>
              <ProductFilters {...filterProps} />
            </div>
          </div>

          <div className="col-lg-9">
            {/* Mobile filter toggle */}
            <button
              type="button"
              className="fh-btn fh-btn-ghost fh-btn-sm d-lg-none"
              style={{ marginBottom: '1rem' }}
              onClick={() => setShowFiltersMobile((v) => !v)}
              aria-expanded={showFiltersMobile}
            >
              <SlidersHorizontal size={15} /> Filters & Sort
            </button>
            {showFiltersMobile && (
              <div className="d-lg-none" style={{ marginBottom: '1rem' }}>
                <ProductFilters {...filterProps} />
              </div>
            )}

            {filtered.length === 0 ? (
              <EmptyState
                icon={<SearchX size={40} />}
                title="No dishes found"
                description="Try adjusting your search or filters to find what you're craving."
                actionLabel="Reset filters"
                onAction={() => {
                  setSearch('');
                  setCategory('all');
                  setDietary('all');
                  setSort('featured');
                  setFeaturedOnly(false);
                  setAvailableOnly(false);
                  setParams({}, { replace: true });
                }}
              />
            ) : (
              <ProductGrid products={filtered} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
