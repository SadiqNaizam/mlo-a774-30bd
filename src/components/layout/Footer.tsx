import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Twitter, Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'About Us', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ];

  const socialLinks = [
    { icon: <Twitter className="h-5 w-5" />, href: '#', label: 'Twitter' },
    { icon: <Facebook className="h-5 w-5" />, href: '#', label: 'Facebook' },
    { icon: <Instagram className="h-5 w-5" />, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-start space-y-4">
                <Link to="/" className="flex items-center gap-2">
                    <UtensilsCrossed className="h-7 w-7 text-orange-500" />
                    <span className="text-xl font-bold">Delish Delivery</span>
                </Link>
                <p className="text-sm text-muted-foreground">
                    Your favorite food, delivered fast to your door.
                </p>
                <div className="flex space-x-2">
                    {socialLinks.map((social) => (
                        <Button variant="ghost" size="icon" asChild key={social.label}>
                            <a
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="text-muted-foreground hover:text-orange-500"
                            >
                                {social.icon}
                            </a>
                        </Button>
                    ))}
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:col-span-2">
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold tracking-wider uppercase">Company</h3>
                    <ul className="space-y-3">
                        {footerLinks.slice(0, 2).map(link => (
                            <li key={link.label}>
                                <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary">{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold tracking-wider uppercase">Legal</h3>
                    <ul className="space-y-3">
                        {footerLinks.slice(2, 4).map(link => (
                            <li key={link.label}>
                                <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary">{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        
        <div className="mt-12 border-t pt-8">
            <p className="text-sm text-center text-muted-foreground">
                &copy; {currentYear} Delish Delivery. All Rights Reserved.
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;