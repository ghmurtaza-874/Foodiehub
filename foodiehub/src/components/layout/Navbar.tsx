import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Heart,
  Home,
  Info,
  Menu as MenuIcon,
  Phone,
  Search,
  ShoppingBag,
  ShoppingCart,
  UtensilsCrossed,
  User as UserIcon,
  X,
  LogOut,
  LayoutDashboard,
  ChevronDown,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/', label: 'Home', icon: <Home size={16} /> },
  { to: '/menu', label: 'Menu', icon: <UtensilsCrossed size={16} /> },
  { to: '/about', label: 'About', icon: <Info size={16} /> },
  { to: '/contact', label: 'Contact', icon: <Phone size={16} /> },
];

export const Navbar = () => {
  const { itemCount } = useCart();
  const { count: favCount } = useFavorites();
  const { user, isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchValue.trim())}`);
      setSearchOpen(false);
      setSearchValue('');
    }
  };

  const initials = user
    ? user.fullName
        .split(' ')
        .map((p) => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '';

  return (
    <>
      <header className={`fh-navbar ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="fh-container fh-navbar-inner">
          <Link to="/" className="fh-brand" aria-label="FoodieHub home">
            <span className="fh-brand-logo" aria-hidden="true">
              <UtensilsCrossed size={22} />
            </span>
            <span className="fh-brand-name">
              Foodie<b>Hub</b>
            </span>
          </Link>

          <nav aria-label="Primary">
            <ul className="fh-nav-links">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `fh-nav-link ${isActive ? 'is-active' : ''}`
                    }
                  >
                    {item.icon}
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="fh-nav-actions">
            <button
              type="button"
              className="fh-icon-btn"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search products"
              aria-expanded={searchOpen}
            >
              <Search size={20} />
            </button>

            <Link
              to="/favorites"
              className="fh-icon-btn"
              aria-label={`Favorites, ${favCount} items`}
            >
              <Heart size={20} />
              {favCount > 0 && <span className="fh-badge">{favCount}</span>}
            </Link>

            <Link
              to="/cart"
              className="fh-icon-btn"
              aria-label={`Shopping cart, ${itemCount} items`}
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && <span className="fh-badge">{itemCount}</span>}
            </Link>

            <div className="fh-account-menu" ref={accountRef}>
              <button
                type="button"
                className="fh-icon-btn"
                onClick={() => setAccountOpen((v) => !v)}
                aria-label="Account menu"
                aria-expanded={accountOpen}
              >
                {isAuthenticated && initials ? (
                  <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{initials}</span>
                ) : (
                  <UserIcon size={20} />
                )}
              </button>
              {accountOpen && (
                <div className="fh-account-dropdown" role="menu">
                  {isAuthenticated ? (
                    <>
                      <div className="fh-account-dropdown-header">
                        <div className="fh-account-dropdown-name">{user!.fullName}</div>
                        <div className="fh-account-dropdown-email">{user!.email}</div>
                      </div>
                      <Link
                        to="/profile"
                        className="fh-dropdown-item"
                        onClick={() => setAccountOpen(false)}
                        role="menuitem"
                      >
                        <LayoutDashboard size={16} /> My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="fh-dropdown-item"
                        onClick={() => setAccountOpen(false)}
                        role="menuitem"
                      >
                        <ShoppingBag size={16} /> Order History
                      </Link>
                      <button
                        type="button"
                        className="fh-dropdown-item danger"
                        onClick={() => {
                          logout();
                          setAccountOpen(false);
                          navigate('/');
                        }}
                        role="menuitem"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="fh-dropdown-item"
                        onClick={() => setAccountOpen(false)}
                        role="menuitem"
                      >
                        <UserIcon size={16} /> Login
                      </Link>
                      <Link
                        to="/register"
                        className="fh-dropdown-item"
                        onClick={() => setAccountOpen(false)}
                        role="menuitem"
                      >
                        <UserIcon size={16} /> Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              className="fh-menu-toggle"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon size={22} />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="fh-container" style={{ paddingBottom: '0.75rem' }}>
            <form className="fh-search-box" onSubmit={handleSearchSubmit}>
              <Search size={18} />
              <input
                type="search"
                className="fh-search-input"
                placeholder="Search for pizza, burger, biryani…"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                autoFocus
                aria-label="Search products"
              />
            </form>
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      <div className={`fh-mobile-drawer ${drawerOpen ? 'is-open' : ''}`}>
        <div className="fh-mobile-overlay" onClick={() => setDrawerOpen(false)} />
        <div className="fh-mobile-panel" role="dialog" aria-label="Mobile menu">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
            }}
          >
            <Link to="/" className="fh-brand" onClick={() => setDrawerOpen(false)}>
              <span className="fh-brand-logo" aria-hidden="true">
                <UtensilsCrossed size={22} />
              </span>
              <span className="fh-brand-name">
                Foodie<b>Hub</b>
              </span>
            </Link>
            <button
              type="button"
              className="fh-icon-btn"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `fh-mobile-link ${isActive ? 'is-active' : ''}`
              }
              onClick={() => setDrawerOpen(false)}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}

          <div style={{ height: 1, background: 'var(--fh-border)', margin: '0.75rem 0' }} />

          <NavLink
            to="/favorites"
            className="fh-mobile-link"
            onClick={() => setDrawerOpen(false)}
          >
            <Heart size={18} /> Favorites
            {favCount > 0 && <span className="fh-badge" style={{ marginLeft: 'auto' }}>{favCount}</span>}
          </NavLink>
          <NavLink
            to="/cart"
            className="fh-mobile-link"
            onClick={() => setDrawerOpen(false)}
          >
            <ShoppingCart size={18} /> Cart
            {itemCount > 0 && <span className="fh-badge" style={{ marginLeft: 'auto' }}>{itemCount}</span>}
          </NavLink>

          <div style={{ height: 1, background: 'var(--fh-border)', margin: '0.75rem 0' }} />

          {isAuthenticated ? (
            <>
              <NavLink
                to="/profile"
                className="fh-mobile-link"
                onClick={() => setDrawerOpen(false)}
              >
                <UserIcon size={18} /> Profile
              </NavLink>
              <NavLink
                to="/orders"
                className="fh-mobile-link"
                onClick={() => setDrawerOpen(false)}
              >
                <ShoppingBag size={18} /> Orders
              </NavLink>
              <button
                type="button"
                className="fh-mobile-link"
                style={{ background: 'transparent', border: 'none', width: '100%', color: 'var(--fh-error)' }}
                onClick={() => {
                  logout();
                  setDrawerOpen(false);
                  navigate('/');
                }}
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="fh-mobile-link"
                onClick={() => setDrawerOpen(false)}
              >
                <UserIcon size={18} /> Login
              </NavLink>
              <NavLink
                to="/register"
                className="fh-mobile-link"
                onClick={() => setDrawerOpen(false)}
              >
                <ChevronDown size={18} style={{ visibility: 'hidden' }} /> Create Account
              </NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
};
