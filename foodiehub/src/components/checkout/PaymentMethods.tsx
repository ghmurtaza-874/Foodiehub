import { Banknote, CreditCard, Wallet } from 'lucide-react';
import type { PaymentMethod } from '../../types';

interface PaymentMethodsProps {
  value: PaymentMethod;
  onChange: (m: PaymentMethod) => void;
}

const methods: { id: PaymentMethod; title: string; desc: string; icon: React.ReactNode }[] = [
  { id: 'cod', title: 'Cash on Delivery', desc: 'Pay with cash when your order arrives.', icon: <Banknote size={18} /> },
  { id: 'card', title: 'Card Payment', desc: 'Demo card UI — no real card is charged.', icon: <CreditCard size={18} /> },
  { id: 'wallet', title: 'Wallet Payment', desc: 'Demo mobile wallet (e.g. JazzCash / Easypaisa).', icon: <Wallet size={18} /> },
];

export const PaymentMethods = ({ value, onChange }: PaymentMethodsProps) => (
  <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
    <legend className="fh-filter-label">Payment Method</legend>
    {methods.map((m) => (
      <label
        key={m.id}
        className={`fh-radio-card ${value === m.id ? 'is-selected' : ''}`}
      >
        <input
          type="radio"
          name="payment"
          value={m.id}
          checked={value === m.id}
          onChange={() => onChange(m.id)}
        />
        <div className="fh-radio-card-content">
          <div className="fh-radio-card-title">
            <span style={{ color: 'var(--fh-primary)' }}>{m.icon}</span>
            {m.title}
          </div>
          <div className="fh-radio-card-desc">{m.desc}</div>
        </div>
      </label>
    ))}
  </fieldset>
);
