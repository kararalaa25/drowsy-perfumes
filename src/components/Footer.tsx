const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-border bg-cream-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="font-serif text-4xl mb-4 tracking-wide">Dropsy</h3>
          <p className="text-sm tracking-[0.25em] uppercase text-muted-foreground font-light">
            عطور فاخرة
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-border">
          <p className="text-sm text-muted-foreground font-light tracking-wide">
            © 2026 Dropsy. All rights reserved.
          </p>
          <div className="flex gap-10 text-sm text-muted-foreground font-light tracking-wide">
            <span className="hover:text-foreground transition-colors cursor-pointer">Shipping & Returns</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Contact</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
