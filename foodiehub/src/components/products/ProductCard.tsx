import { Link } from 'react-router-dom';
import { Heart, Plus, Clock, Star } from 'lucide-react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { formatPKR } from '../../utils/formatCurrency';
import { discountPercent } from '../../utils/pricing';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(product.id);
  const discount = discountPercent(product.price, product.originalPrice);

  return (
    <article className="fh-product-card">
      <Link
        to={`/product/${product.id}`}
        className="fh-product-media"
        aria-label={`View ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.opacity = '0';
          }}
        />
        <div className="fh-product-badges">
          {discount && <span className="fh-product-badge discount">-{discount}%</span>}
          {product.featured && product.available && (
            <span className="fh-product-badge featured">★ Featured</span>
          )}
          {!product.available && (
            <span className="fh-product-badge unavailable">Unavailable</span>
          )}
        </div>
      </Link>

      <button
        type="button"
        className={`fh-product-fav ${fav ? 'is-fav' : ''}`}
        onClick={() => toggleFavorite(product)}
        aria-label={fav ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
        aria-pressed={fav}
      >
        <Heart size={18} fill={fav ? 'currentColor' : 'none'} />
      </button>

      <div className="fh-product-body">
        <span className="fh-product-cat">{product.category}</span>
        <Link
          to={`/product/${product.id}`}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          <h3 className="fh-product-name">{product.name}</h3>
        </Link>
        <p className="fh-product-desc">{product.description}</p>

        <div className="fh-product-meta">
          <span className="fh-rating">
            <Star size={13} aria-hidden="true" />
            {product.rating.toFixed(1)}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Clock size={13} aria-hidden="true" />
            {product.prepTime}
          </span>
          <span className={`fh-pill ${product.dietary === 'veg' ? 'fh-pill-veg' : 'fh-pill-nonveg'}`}>
            {product.dietary === 'veg' ? 'Veg' : 'Non-Veg'}
          </span>
        </div>

        <div className="fh-product-price-row">
          <span className="fh-price">{formatPKR(product.price)}</span>
          {product.originalPrice && (
            <span className="fh-price-old">{formatPKR(product.originalPrice)}</span>
          )}
        </div>

        <div className="fh-product-actions">
          <button
            type="button"
            className="fh-btn fh-btn-primary fh-btn-sm"
            onClick={() => addItem(product)}
            disabled={!product.available}
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus size={16} />
            {product.available ? 'Add to Cart' : 'Unavailable'}
          </button>
        </div>
      </div>
    </article>
  );
};
