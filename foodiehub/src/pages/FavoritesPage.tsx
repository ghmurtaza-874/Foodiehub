import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { formatPKR } from '../utils/formatCurrency';

export const FavoritesPage = () => {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const { addItem } = useCart();

  if (favorites.length === 0) {
    return (
      <>
        <div className="fh-page-header">
          <div className="fh-container">
            <nav className="fh-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link> / Favorites
            </nav>
            <h1 className="fh-page-title">Your Favorites</h1>
          </div>
        </div>
        <div className="fh-container fh-section">
          <EmptyState
            icon={<Heart size={40} />}
            title="No favorites yet"
            description="Tap the heart icon on any dish to save it here for quick access next time."
            actionLabel="Browse Menu"
            actionTo="/menu"
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="fh-page-header">
        <div className="fh-container">
          <nav className="fh-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link> / Favorites
          </nav>
          <h1 className="fh-page-title">Your Favorites</h1>
          <p className="fh-text-muted">{favorites.length} saved dish{favorites.length === 1 ? '' : 'es'}</p>
        </div>
      </div>

      <div className="fh-container fh-section">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <Button variant="ghost" size="sm" onClick={clearFavorites}>
            <Trash2 size={15} /> Clear All
          </Button>
        </div>
        <div className="fh-grid-3">
          {favorites.map(({ product }) => (
            <article key={product.id} className="fh-product-card">
              <Link to={`/product/${product.id}`} className="fh-product-media">
                <img src={product.image} alt={product.name} loading="lazy" />
              </Link>
              <div className="fh-product-body">
                <span className="fh-product-cat">{product.category}</span>
                <h3 className="fh-product-name">
                  <Link to={`/product/${product.id}`} style={{ color: 'inherit' }}>
                    {product.name}
                  </Link>
                </h3>
                <div className="fh-product-price-row">
                  <span className="fh-price">{formatPKR(product.price)}</span>
                </div>
                <div className="fh-product-actions">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => addItem(product)}
                    disabled={!product.available}
                  >
                    <ShoppingCart size={15} />
                    {product.available ? 'Add to Cart' : 'Unavailable'}
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeFavorite(product.id)}
                    aria-label={`Remove ${product.name} from favorites`}
                  >
                    <Trash2 size={15} />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
};
