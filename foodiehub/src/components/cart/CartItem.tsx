import { Link } from 'react-router-dom';
import { Heart, Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { formatPKR } from '../../utils/formatCurrency';

interface CartItemRowProps {
  item: CartItemType;
}

export const CartItemRow = ({ item }: CartItemRowProps) => {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { product, quantity } = item;
  const lineTotal = product.price * quantity;
  const fav = isFavorite(product.id);

  return (
    <div className="fh-cart-item">
      <Link to={`/product/${product.id}`} className="fh-cart-item-img">
        <img src={product.image} alt={product.name} loading="lazy" />
      </Link>
      <div>
        <h3 className="fh-cart-item-name">
          <Link to={`/product/${product.id}`} style={{ color: 'inherit' }}>
            {product.name}
          </Link>
        </h3>
        <div className="fh-cart-item-meta">
          {formatPKR(product.price)} · {product.dietary === 'veg' ? 'Veg' : 'Non-Veg'}
        </div>
        <div className="fh-qty-control" aria-label={`Quantity for ${product.name}`}>
          <button
            type="button"
            className="fh-qty-btn"
            onClick={() => decreaseQuantity(product.id)}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="fh-qty-value" aria-live="polite">{quantity}</span>
          <button
            type="button"
            className="fh-qty-btn"
            onClick={() => increaseQuantity(product.id)}
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      <div className="fh-cart-item-actions">
        <button
          type="button"
          className="fh-icon-btn"
          onClick={() => toggleFavorite(product)}
          aria-label={fav ? 'Remove from favorites' : 'Save to favorites'}
          style={{ width: 38, height: 38, color: fav ? 'var(--fh-error)' : undefined, borderColor: fav ? 'rgba(220,38,38,0.4)' : undefined }}
        >
          <Heart size={16} fill={fav ? 'currentColor' : 'none'} />
        </button>
        <button
          type="button"
          className="fh-icon-btn"
          onClick={() => removeItem(product.id)}
          aria-label={`Remove ${product.name} from cart`}
          style={{ width: 38, height: 38, color: 'var(--fh-error)' }}
        >
          <Trash2 size={16} />
        </button>
        <span className="fh-cart-item-price">{formatPKR(lineTotal)}</span>
      </div>
    </div>
  );
};
