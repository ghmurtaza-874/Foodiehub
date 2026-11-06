import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Tag,
  Utensils,
} from 'lucide-react';
import { getProductById, getRelatedProducts } from '../../data/products';
import { categoryName } from '../../data/categories';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { Button } from '../common/Button';
import { EmptyState } from '../common/EmptyState';
import { Rating } from '../common/Rating';
import { ProductGrid } from './ProductGrid';
import { formatPKR } from '../../utils/formatCurrency';
import { discountPercent } from '../../utils/pricing';

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [quantity, setQuantity] = useState(1);

  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <div className="fh-container fh-section">
        <EmptyState
          icon={<Utensils size={40} />}
          title="Product not found"
          description="The product you're looking for doesn't exist or may have been removed."
          actionLabel="Back to Menu"
          actionTo="/menu"
        />
      </div>
    );
  }

  const fav = isFavorite(product.id);
  const discount = discountPercent(product.price, product.originalPrice);
  const related = getRelatedProducts(product, 4);

  const handleAddToCart = () => {
    if (quantity < 1) {
      setQuantity(1);
      return;
    }
    addItem(product, quantity);
  };

  return (
    <div className="fh-container fh-section">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="fh-btn fh-btn-ghost fh-btn-sm"
        style={{ marginBottom: '1.5rem' }}
        aria-label="Go back"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="fh-product-detail">
        <div className="fh-product-detail-img">
          <img src={product.image} alt={product.name} />
          {discount && (
            <span
              className="fh-product-badge discount"
              style={{ position: 'absolute', top: '1rem', left: '1rem', fontSize: '0.85rem' }}
            >
              -{discount}% OFF
            </span>
          )}
        </div>

        <div>
          <span className="fh-product-detail-cat">{categoryName(product.category)}</span>
          <h1 className="fh-product-detail-name">{product.name}</h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            <Rating value={product.rating} />
            <span className={`fh-pill ${product.dietary === 'veg' ? 'fh-pill-veg' : 'fh-pill-nonveg'}`}>
              {product.dietary === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
            </span>
            {!product.available && (
              <span className="fh-pill" style={{ background: 'rgba(36,36,36,0.1)', color: 'var(--fh-charcoal)' }}>
                Currently Unavailable
              </span>
            )}
          </div>

          <p className="fh-product-detail-desc">{product.description}</p>

          <div className="fh-product-detail-info-row">
            <span className="fh-info-item">
              <Clock size={16} /> Prep: <b>{product.prepTime}</b>
            </span>
            <span className="fh-info-item">
              <Tag size={16} /> Category: <b>{categoryName(product.category)}</b>
            </span>
            <span className="fh-info-item">
              <Star size={16} /> Rating: <b>{product.rating.toFixed(1)} / 5</b>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ fontFamily: 'var(--fh-font-heading)', fontWeight: 800, fontSize: '2rem', color: 'var(--fh-text)' }}>
              {formatPKR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="fh-price-old" style={{ fontSize: '1.1rem' }}>
                {formatPKR(product.originalPrice)}
              </span>
            )}
            {discount && (
              <span className="fh-pill fh-pill-accent">Save {discount}%</span>
            )}
          </div>

          <div className="fh-product-detail-buy">
            <div className="fh-qty-control" aria-label="Quantity selector">
              <button
                type="button"
                className="fh-qty-btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="fh-qty-value" aria-live="polite">{quantity}</span>
              <button
                type="button"
                className="fh-qty-btn"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={handleAddToCart}
              disabled={!product.available}
            >
              <ShoppingBag size={18} />
              {product.available ? 'Add to Cart' : 'Unavailable'}
            </Button>
            <Button
              variant={fav ? 'danger' : 'outline'}
              size="lg"
              onClick={() => toggleFavorite(product)}
              aria-pressed={fav}
            >
              <Heart size={18} fill={fav ? 'currentColor' : 'none'} />
              {fav ? 'Saved' : 'Save'}
            </Button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section style={{ marginTop: '4rem' }}>
          <div className="fh-section-head">
            <h2 className="fh-section-title" style={{ fontSize: '1.6rem' }}>
              You may also like
            </h2>
            <Link to="/menu" className="fh-btn fh-btn-outline fh-btn-sm">
              View All
            </Link>
          </div>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
};
