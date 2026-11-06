import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, Phone, User } from 'lucide-react';
import { Input } from '../common/Input';
import { PasswordInput } from '../common/PasswordInput';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import {
  validateEmail,
  validateFullName,
  validatePassword,
  validatePasswordConfirm,
  validatePhone,
} from '../../utils/validation';

interface RegisterFormProps {
  onSuccess?: () => void;
}

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    const nameErr = validateFullName(fullName);
    if (nameErr) next.fullName = nameErr;
    const emailErr = validateEmail(email);
    if (emailErr) next.email = emailErr;
    const phoneErr = phone ? validatePhone(phone) : null;
    if (phoneErr) next.phone = phoneErr;
    const passErr = validatePassword(password);
    if (passErr) next.password = passErr;
    const confirmErr = validatePasswordConfirm(confirm, password);
    if (confirmErr) next.confirm = confirmErr;

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    register(fullName, email, phone || undefined);
    if (onSuccess) onSuccess();
    else navigate('/profile');
  };

  return (
    <div className="fh-auth-card">
      <h1 className="fh-auth-title">Create Account</h1>
      <p className="fh-auth-subtitle">Join FoodieHub and start ordering your favourite meals today.</p>
      <form onSubmit={handleSubmit} noValidate>
        <Input
          label="Full Name"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          onBlur={() => setErrors((p) => ({ ...p, fullName: validateFullName(fullName) ?? undefined }))}
          error={errors.fullName ?? null}
          placeholder="e.g. Ahmed Raza"
          icon={<User size={16} />}
          autoComplete="name"
        />
        <Input
          label="Email"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setErrors((p) => ({ ...p, email: validateEmail(email) ?? undefined }))}
          error={errors.email ?? null}
          placeholder="you@example.com"
          icon={<Mail size={16} />}
          autoComplete="email"
        />
        <Input
          label="Phone (optional)"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onBlur={() => setErrors((p) => ({ ...p, phone: phone ? validatePhone(phone) ?? undefined : undefined }))}
          error={errors.phone ?? null}
          placeholder="03XXXXXXXXX"
          icon={<Phone size={16} />}
          autoComplete="tel"
        />
        <PasswordInput
          label="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setErrors((p) => ({ ...p, password: validatePassword(password) ?? undefined }))}
          error={errors.password ?? null}
          placeholder="At least 6 characters"
          icon={<Lock size={16} />}
          hint="Minimum 6 characters."
          autoComplete="new-password"
        />
        <PasswordInput
          label="Confirm Password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          onBlur={() => setErrors((p) => ({ ...p, confirm: validatePasswordConfirm(confirm, password) ?? undefined }))}
          error={errors.confirm ?? null}
          placeholder="Re-enter your password"
          icon={<Lock size={16} />}
          autoComplete="new-password"
        />
        <Button type="submit" variant="primary" block size="lg">
          Create Account
        </Button>
      </form>
      <div className="fh-demo-note" style={{ marginTop: '1rem' }}>
        <Lock size={14} /> Frontend demo only. We never store real passwords. Do not reuse a real password.
      </div>
      <p className="fh-auth-switch">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};
