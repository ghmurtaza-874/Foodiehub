import { useRef, useState, type FormEvent } from 'react';
import { CreditCard, Mail, MapPin, Phone, User, Lock, Wallet } from 'lucide-react';
import type { CheckoutFormValues, FormErrors, PaymentMethod } from '../../types';
import {
  validateCheckout,
  validateFullName,
  validateEmail,
  validatePhone,
  validateAddress,
  validateCity,
  validateArea,
  validatePostalCode,
  validateDeliveryInstructions,
} from '../../utils/validation';
import { Input, Textarea } from '../common/Input';
import { Button } from '../common/Button';
import { PaymentMethods } from './PaymentMethods';

interface CheckoutFormProps {
  onSubmit: (values: CheckoutFormValues) => void;
  submitting?: boolean;
}

const initialValues: CheckoutFormValues = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  area: '',
  postalCode: '',
  deliveryInstructions: '',
  deliveryOption: 'standard',
  paymentMethod: 'cod',
  cardName: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
  walletNumber: '',
};

type FieldName = keyof CheckoutFormValues;

const fieldValidators: Partial<Record<FieldName, (v: string, all: CheckoutFormValues) => string | null>> = {
  fullName: (v) => validateFullName(v),
  email: (v) => validateEmail(v),
  phone: (v) => validatePhone(v),
  address: (v) => validateAddress(v),
  city: (v) => validateCity(v),
  area: (v) => validateArea(v),
  postalCode: (v) => validatePostalCode(v, false),
  deliveryInstructions: (v) => validateDeliveryInstructions(v),
};

export const CheckoutForm = ({ onSubmit, submitting = false }: CheckoutFormProps) => {
  const [values, setValues] = useState<CheckoutFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors<CheckoutFormValues>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const fieldRefs = useRef<Partial<Record<FieldName, HTMLElement | null>>>({});

  const setField = <K extends FieldName>(name: K, value: CheckoutFormValues[K]) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Re-validate on change if the field was already touched/errored.
    if (touched[name] || errors[name]) {
      const validator = fieldValidators[name];
      const error = validator ? validator(value as string, values) : null;
      setErrors((prev) => ({ ...prev, [name]: error ?? undefined }));
    }
  };

  const handleBlur = (name: FieldName) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const validator = fieldValidators[name];
    if (validator) {
      const error = validator(values[name] as string, values);
      setErrors((prev) => ({ ...prev, [name]: error ?? undefined }));
    }
  };

  const registerRef = (name: FieldName) => (el: HTMLElement | null) => {
    fieldRefs.current[name] = el;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const allErrors = validateCheckout(values);
    setErrors(allErrors);
    // Mark all as touched
    setTouched(
      Object.keys(values).reduce((acc, key) => {
        acc[key as FieldName] = true;
        return acc;
      }, {} as Partial<Record<FieldName, boolean>>),
    );

    if (Object.keys(allErrors).length > 0) {
      // Focus / scroll to first invalid field.
      const first = Object.keys(allErrors)[0] as FieldName;
      const el = fieldRefs.current[first];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Try focus
        const input = el.querySelector('input, textarea, select') as HTMLElement | null;
        if (input) input.focus();
      }
      return;
    }
    onSubmit(values);
  };

  const handlePaymentChange = (m: PaymentMethod) => {
    setValues((prev) => ({ ...prev, paymentMethod: m }));
    setErrors((prev) => ({ ...prev, paymentMethod: undefined }));
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Customer Information */}
      <fieldset className="fh-card" style={{ marginBottom: '1.25rem', border: '1px solid var(--fh-border)' }}>
        <legend style={{ fontFamily: 'var(--fh-font-heading)', fontWeight: 700, fontSize: '1.05rem', padding: '0 0.5rem' }}>
          Customer Information
        </legend>
        <div ref={registerRef('fullName')}>
          <Input
            label="Full Name"
            required
            value={values.fullName}
            onChange={(e) => setField('fullName', e.target.value)}
            onBlur={() => handleBlur('fullName')}
            error={errors.fullName ?? null}
            placeholder="e.g. Ahmed Raza"
            icon={<User size={16} />}
            autoComplete="name"
          />
        </div>
        <div ref={registerRef('email')}>
          <Input
            label="Email"
            required
            type="email"
            value={values.email}
            onChange={(e) => setField('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            error={errors.email ?? null}
            placeholder="you@example.com"
            icon={<Mail size={16} />}
            autoComplete="email"
          />
        </div>
        <div ref={registerRef('phone')}>
          <Input
            label="Phone Number"
            required
            type="tel"
            value={values.phone}
            onChange={(e) => setField('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            error={errors.phone ?? null}
            placeholder="03XXXXXXXXX"
            icon={<Phone size={16} />}
            hint="Pakistani format: 03XXXXXXXXX, +923XXXXXXXXX or 923XXXXXXXXX."
            autoComplete="tel"
          />
        </div>
      </fieldset>

      {/* Delivery Information */}
      <fieldset className="fh-card" style={{ marginBottom: '1.25rem', border: '1px solid var(--fh-border)' }}>
        <legend style={{ fontFamily: 'var(--fh-font-heading)', fontWeight: 700, fontSize: '1.05rem', padding: '0 0.5rem' }}>
          Delivery Information
        </legend>
        <div ref={registerRef('address')}>
          <Textarea
            label="Delivery Address"
            required
            value={values.address}
            onChange={(e) => setField('address', e.target.value)}
            onBlur={() => handleBlur('address')}
            error={errors.address ?? null}
            placeholder="House #, street, area, landmark…"
            rows={3}
          />
        </div>
        <div className="fh-form-row">
          <div ref={registerRef('city')}>
            <Input
              label="City"
              required
              value={values.city}
              onChange={(e) => setField('city', e.target.value)}
              onBlur={() => handleBlur('city')}
              error={errors.city ?? null}
              placeholder="e.g. Lahore"
              icon={<MapPin size={16} />}
            />
          </div>
          <div ref={registerRef('area')}>
            <Input
              label="Area"
              required
              value={values.area}
              onChange={(e) => setField('area', e.target.value)}
              onBlur={() => handleBlur('area')}
              error={errors.area ?? null}
              placeholder="e.g. Gulberg III"
            />
          </div>
        </div>
        <div className="fh-form-row">
          <div ref={registerRef('postalCode')}>
            <Input
              label="Postal Code"
              value={values.postalCode}
              onChange={(e) => setField('postalCode', e.target.value)}
              onBlur={() => handleBlur('postalCode')}
              error={errors.postalCode ?? null}
              placeholder="54000"
              hint="Optional. 5 digits if provided."
              inputMode="numeric"
            />
          </div>
          <div ref={registerRef('deliveryInstructions')}>
            <Input
              label="Delivery Instructions"
              value={values.deliveryInstructions}
              onChange={(e) => setField('deliveryInstructions', e.target.value)}
              onBlur={() => handleBlur('deliveryInstructions')}
              error={errors.deliveryInstructions ?? null}
              placeholder="e.g. ring the bell, leave at gate"
              hint="Optional. Max 250 characters."
              maxLength={250}
            />
          </div>
        </div>
      </fieldset>

      {/* Payment */}
      <fieldset className="fh-card" style={{ marginBottom: '1.25rem', border: '1px solid var(--fh-border)' }}>
        <legend style={{ fontFamily: 'var(--fh-font-heading)', fontWeight: 700, fontSize: '1.05rem', padding: '0 0.5rem' }}>
          Payment Method
        </legend>
        <div ref={registerRef('paymentMethod')}>
          <PaymentMethods value={values.paymentMethod} onChange={handlePaymentChange} />
          {errors.paymentMethod && (
            <p className="fh-error-msg" role="alert" style={{ marginTop: '0.5rem' }}>
              {errors.paymentMethod}
            </p>
          )}
        </div>

        {/* Demo card fields */}
        {values.paymentMethod === 'card' && (
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed var(--fh-border)' }}>
            <div className="fh-demo-note" style={{ marginBottom: '1rem' }}>
              <Lock size={15} /> Demo only — do not enter real card details. No payment is processed.
            </div>
            <div ref={registerRef('cardName')}>
              <Input
                label="Name on Card"
                required
                value={values.cardName}
                onChange={(e) => setField('cardName', e.target.value)}
                error={errors.cardName ?? null}
                placeholder="AHMED RAZA"
                icon={<User size={16} />}
              />
            </div>
            <div ref={registerRef('cardNumber')}>
              <Input
                label="Card Number"
                required
                value={values.cardNumber}
                onChange={(e) => setField('cardNumber', e.target.value)}
                error={errors.cardNumber ?? null}
                placeholder="4111 1111 1111 1111"
                icon={<CreditCard size={16} />}
                inputMode="numeric"
                hint="Use any 12-16 digit demo number."
              />
            </div>
            <div className="fh-form-row">
              <div ref={registerRef('cardExpiry')}>
                <Input
                  label="Expiry (MM/YY)"
                  required
                  value={values.cardExpiry}
                  onChange={(e) => setField('cardExpiry', e.target.value)}
                  error={errors.cardExpiry ?? null}
                  placeholder="12/27"
                />
              </div>
              <div ref={registerRef('cardCvc')}>
                <Input
                  label="CVC"
                  required
                  value={values.cardCvc}
                  onChange={(e) => setField('cardCvc', e.target.value)}
                  error={errors.cardCvc ?? null}
                  placeholder="123"
                  inputMode="numeric"
                  maxLength={4}
                />
              </div>
            </div>
          </div>
        )}

        {/* Demo wallet fields */}
        {values.paymentMethod === 'wallet' && (
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed var(--fh-border)' }}>
            <div className="fh-demo-note" style={{ marginBottom: '1rem' }}>
              <Wallet size={15} /> Demo only — enter any registered mobile number. No real wallet is debited.
            </div>
            <div ref={registerRef('walletNumber')}>
              <Input
                label="Wallet Number"
                required
                type="tel"
                value={values.walletNumber}
                onChange={(e) => setField('walletNumber', e.target.value)}
                error={errors.walletNumber ?? null}
                placeholder="03XXXXXXXXX"
                icon={<Phone size={16} />}
              />
            </div>
          </div>
        )}
      </fieldset>

      <Button type="submit" variant="primary" block size="lg" disabled={submitting}>
        {submitting ? 'Placing Order…' : 'Place Order'}
      </Button>
      <p className="fh-text-muted fh-text-center" style={{ fontSize: '0.8rem', marginTop: '0.75rem' }}>
        This is a frontend demo. No real order or payment will be processed.
      </p>
    </form>
  );
};
