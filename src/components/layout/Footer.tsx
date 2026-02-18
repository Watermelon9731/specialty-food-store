import { Scale } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container px-4 md:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link href="/" className="flex items-center space-x-2">
            <Scale className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Specialty Dried Store</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Premium dried fruits, nuts, and spices sourced from the finest
            origins.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link
                href="/products?category=fruits"
                className="hover:text-foreground"
              >
                Fruits
              </Link>
            </li>
            <li>
              <Link
                href="/products?category=nuts"
                className="hover:text-foreground"
              >
                Nuts
              </Link>
            </li>
            <li>
              <Link
                href="/products?category=spices"
                className="hover:text-foreground"
              >
                Spices
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/about" className="hover:text-foreground">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/terms" className="hover:text-foreground">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-foreground">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container px-4 md:px-6 py-6 border-t text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Specialty Dried Store. All rights
        reserved.
      </div>
    </footer>
  );
}
