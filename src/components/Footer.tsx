const Footer = () => {
  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="font-serif text-3xl mb-4">L'Essence</h3>
          <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground">
            Maison de Parfum • Paris
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} L'Essence. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <span>Shipping & Returns</span>
            <span>Contact</span>
            <span>Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
