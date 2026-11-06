import { Star } from 'lucide-react';

interface TestimonialData {
  name: string;
  role: string;
  rating: number;
  quote: string;
  initials: string;
}

const testimonials: TestimonialData[] = [
  {
    name: 'Ayesha Khan',
    role: 'Loyal customer',
    rating: 5,
    initials: 'AK',
    quote:
      'FoodieHub has completely changed my dinner routine. The chicken dum biryani is the best in Lahore and it always arrives hot and fresh!',
  },
  {
    name: 'Bilal Ahmed',
    role: 'Food blogger',
    rating: 5,
    initials: 'BA',
    quote:
      "I've ordered from a lot of places and FoodieHub stands out. Fast delivery, beautiful packaging and the chocolate lava cake is to die for.",
  },
  {
    name: 'Sana Malik',
    role: 'Working professional',
    rating: 4,
    initials: 'SM',
    quote:
      'Perfect for busy weekdays. The quinoa power bowl keeps me full through long meetings. Easy ordering and reliable delivery every time.',
  },
];

export const Testimonials = () => (
  <section className="fh-section" style={{ background: 'var(--fh-gradient-soft)' }}>
    <div className="fh-container">
      <div className="fh-section-head" style={{ justifyContent: 'center', textAlign: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <h2 className="fh-section-title">What Our Customers Say</h2>
        <p className="fh-section-subtitle">
          Sample testimonials shown for demo purposes. Real customer stories power our growth.
        </p>
      </div>
      <div className="fh-grid-3">
        {testimonials.map((t) => (
          <figure className="fh-testimonial" key={t.name}>
            <div className="fh-testimonial-stars" aria-label={`Rated ${t.rating} out of 5`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < t.rating ? 'currentColor' : 'none'}
                  strokeWidth={1.5}
                />
              ))}
            </div>
            <blockquote className="fh-testimonial-quote">"{t.quote}"</blockquote>
            <figcaption className="fh-testimonial-author">
              <div className="fh-avatar" aria-hidden="true">{t.initials}</div>
              <div>
                <div className="fh-testimonial-name">{t.name}</div>
                <div className="fh-testimonial-role">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);
