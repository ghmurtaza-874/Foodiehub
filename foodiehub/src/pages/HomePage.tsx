import { Hero } from '../components/home/Hero';
import { CategorySection } from '../components/home/CategorySection';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { About } from '../components/home/About';
import { Testimonials } from '../components/home/Testimonials';

export const HomePage = () => (
  <>
    <Hero />
    <CategorySection />
    <FeaturedProducts />
    <About />
    <Testimonials />
  </>
);
