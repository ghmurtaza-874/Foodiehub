import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { Input } from '../common/Input';
import { PasswordInput } from '../common/PasswordInput';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { validateEmail, validatePassword } from '../../utils/validation';

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    const emailErr = validateEmail(email);
    if (emailErr) next.email = emailErr;
    const passErr = validatePassword(password);
    if (passErr) next.password = passErr;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    login(email);
    if (onSuccess) onSuccess();
    else navigate('/profile');
  };

  return (
    <div className="fh-auth-card">
      <h1 className="fh-auth-title">Welcome Back</h1>
      <p className="fh-auth-subtitle">Sign in to your FoodieHub account to continue ordering.</p>
      <form onSubmit={handleSubmit} noValidate>
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
        <PasswordInput
          label="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setErrors((p) => ({ ...p, password: validatePassword(password) ?? undefined }))}
          error={errors.password ?? null}
          placeholder="Enter your password"
          icon={<Lock size={16} />}
          autoComplete="current-password"
        />
        <Button type="submit" variant="primary" block size="lg">
          Sign In
        </Button>
      </form>
      <div className="fh-demo-note" style={{ marginTop: '1rem' }}>
        <Lock size={14} /> Frontend demo only — no real authentication. Any valid-format email and a 6+ char password will sign you in.
      </div>
      <p className="fh-auth-switch">
        Don't have an account? <Link to="/register">Create one</Link>
      </p>
    </div>
  );
};
