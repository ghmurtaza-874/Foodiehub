import { Award, Bike, Leaf, Clock, Smile, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: <Leaf size={22} />,
    title: 'Fresh Ingredients',
    desc: 'We source produce daily from local suppliers so every dish is made with crisp, fresh ingredients.',
  },
  {
    icon: <Award size={22} />,
    title: 'Quality Food',
    desc: 'Every recipe is crafted by experienced chefs who care about taste, texture and presentation.',
  },
  {
    icon: <Bike size={22} />,
    title: 'Fast Delivery',
    desc: 'Hot, fresh meals at your door in an average of 25 minutes — tracked every step of the way.',
  },
  {
    icon: <Smile size={22} />,
    title: 'Customer Satisfaction',
    desc: 'Rated 4.8/5 by 50,000+ happy customers. Your smile is the metric we measure ourselves by.',
  },
  {
    icon: <ShieldCheck size={22} />,
    title: 'Hygienic Packaging',
    desc: 'Tamper-proof, food-safe packaging keeps your order fresh, secure and spill-free.',
  },
  {
    icon: <Clock size={22} />,
    title: 'Open Late',
    desc: 'Cravings don\u2019t keep office hours. Order from 10am to 1am, every day of the week.',
  },
];

export const About = () => (
  <section className="fh-section" id="about">
    <div className="fh-container">
      <div className="fh-section-head" style={{ justifyContent: 'center', textAlign: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <h2 className="fh-section-title">Why Choose FoodieHub?</h2>
        <p className="fh-section-subtitle">
          We're on a mission to make every meal a moment of joy — fresh, fast and full of flavour.
        </p>
      </div>
      <div className="fh-grid-3">
        {features.map((f) => (
          <div className="fh-card" key={f.title}>
            <div className="fh-feature-icon" aria-hidden="true">{f.icon}</div>
            <h3 className="fh-feature-title">{f.title}</h3>
            <p className="fh-feature-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
