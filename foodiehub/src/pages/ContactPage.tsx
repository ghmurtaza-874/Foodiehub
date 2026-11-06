import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  User,
} from 'lucide-react';
import { Input, Textarea } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useToast } from '../context/ToastContext';
import {
  validateEmail,
  validateFullName,
  validateMessage,
  validatePhone,
  validateSubject,
} from '../utils/validation';

interface ContactValues {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const initial: ContactValues = {
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

export const ContactPage = () => {
  const { showToast } = useToast();
  const [values, setValues] = useState<ContactValues>(initial);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const setField = <K extends keyof ContactValues>(key: K, value: ContactValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const validateField = (key: keyof ContactValues, value: string): string | null => {
    switch (key) {
      case 'fullName':
        return validateFullName(value);
      case 'email':
        return validateEmail(value);
      case 'phone':
        return value ? validatePhone(value) : null;
      case 'subject':
        return validateSubject(value);
      case 'message':
        return validateMessage(value);
      default:
        return null;
    }
  };

  const handleBlur = (key: keyof ContactValues) => {
    const err = validateField(key, values[key]);
    setErrors((prev) => ({ ...prev, [key]: err ?? undefined }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: ContactErrors = {};
    (Object.keys(values) as (keyof ContactValues)[]).forEach((key) => {
      const err = validateField(key, values[key]);
      if (err) next[key] = err;
    });
    setErrors(next);
    if (Object.keys(next).length > 0) {
      // Focus first invalid field
      const firstKey = Object.keys(next)[0] as keyof ContactValues;
      const el = formRef.current?.querySelector(`[name="${firstKey}"]`) as HTMLElement | null;
      el?.focus();
      return;
    }
    setSubmitted(true);
    showToast('success', 'Thanks! Your message has been received (demo).');
    setValues(initial);
  };

  return (
    <>
      <div className="fh-page-header">
        <div className="fh-container">
          <nav className="fh-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link> / Contact
          </nav>
          <h1 className="fh-page-title">Get in Touch</h1>
          <p className="fh-text-muted">We'd love to hear from you — questions, feedback or just to say hello.</p>
        </div>
      </div>

      <div className="fh-container fh-section">
        <div className="row g-4">
          <div className="col-lg-7">
            <div className="fh-card">
              {submitted ? (
                <div className="fh-text-center" style={{ padding: '2rem 0' }}>
                  <div className="fh-order-success-icon" style={{ background: 'rgba(22,163,74,0.12)', color: 'var(--fh-success)' }}>
                    <CheckCircle2 size={44} />
                  </div>
                  <h2 className="fh-feature-title">Message Received!</h2>
                  <p className="fh-text-muted" style={{ maxWidth: 420, margin: '0.5rem auto 1.5rem' }}>
                    Thanks for reaching out. This is a frontend demo so your message wasn't actually
                    transmitted — but in a real app, our team would reply within 24 hours.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="fh-feature-title" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MessageSquare size={18} /> Send a Message
                  </h2>
                  <form ref={formRef} onSubmit={handleSubmit} noValidate>
                    <Input
                      label="Full Name"
                      required
                      name="fullName"
                      value={values.fullName}
                      onChange={(e) => setField('fullName', e.target.value)}
                      onBlur={() => handleBlur('fullName')}
                      error={errors.fullName ?? null}
                      placeholder="e.g. Ahmed Raza"
                      icon={<User size={16} />}
                    />
                    <div className="fh-form-row">
                      <Input
                        label="Email"
                        required
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={(e) => setField('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        error={errors.email ?? null}
                        placeholder="you@example.com"
                        icon={<Mail size={16} />}
                      />
                      <Input
                        label="Phone (optional)"
                        type="tel"
                        name="phone"
                        value={values.phone}
                        onChange={(e) => setField('phone', e.target.value)}
                        onBlur={() => handleBlur('phone')}
                        error={errors.phone ?? null}
                        placeholder="03XXXXXXXXX"
                        icon={<Phone size={16} />}
                      />
                    </div>
                    <Input
                      label="Subject"
                      required
                      name="subject"
                      value={values.subject}
                      onChange={(e) => setField('subject', e.target.value)}
                      onBlur={() => handleBlur('subject')}
                      error={errors.subject ?? null}
                      placeholder="What's this about?"
                    />
                    <Textarea
                      label="Message"
                      required
                      name="message"
                      value={values.message}
                      onChange={(e) => setField('message', e.target.value)}
                      onBlur={() => handleBlur('message')}
                      error={errors.message ?? null}
                      placeholder="Write your message here (min 10 characters)…"
                      rows={5}
                      maxLength={1000}
                      hint="Minimum 10 characters, maximum 1000."
                    />
                    <Button type="submit" variant="primary" size="lg">
                      <Send size={16} /> Send Message
                    </Button>
                  </form>
                  <div className="fh-demo-note" style={{ marginTop: '1rem' }}>
                    Frontend demo — messages are not transmitted. Prefer email? Reach us at{' '}
                    <a href="mailto:hello@foodiehub.demo">hello@foodiehub.demo</a>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="col-lg-5">
            <div className="fh-card" style={{ marginBottom: '1rem' }}>
              <h3 className="fh-feature-title" style={{ marginBottom: '1rem' }}>Contact Information</h3>
              <div className="fh-order-row">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <MapPin size={16} /> Address
                </span>
                <b style={{ textAlign: 'right' }}>123 Main Boulevard,<br />Lahore, Pakistan</b>
              </div>
              <div className="fh-order-row">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <Phone size={16} /> Phone
                </span>
                <b>+92 300 1234567</b>
              </div>
              <div className="fh-order-row">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <Mail size={16} /> Email
                </span>
                <b>hello@foodiehub.demo</b>
              </div>
              <div className="fh-order-row">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <Clock size={16} /> Hours
                </span>
                <b>10:00 AM – 1:00 AM Daily</b>
              </div>
            </div>
            <div className="fh-card" style={{ background: 'var(--fh-gradient-soft)' }}>
              <h3 className="fh-feature-title">Quick FAQ</h3>
              <p className="fh-feature-desc" style={{ marginBottom: '0.75rem' }}>
                <strong>Delivery areas:</strong> Lahore (Gulberg, DHA, Johar Town, Model Town & more).
              </p>
              <p className="fh-feature-desc" style={{ marginBottom: '0.75rem' }}>
                <strong>Min order:</strong> PKR 500. Free delivery over PKR 3,000.
              </p>
              <p className="fh-feature-desc">
                <strong>Payment:</strong> Cash on Delivery, Card (demo), Wallet (demo).
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
