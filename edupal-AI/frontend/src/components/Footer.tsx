import type React from "react";
import { DiscIcon as Discord, Github, Linkedin, Twitter } from "lucide-react";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
  <a
    href={href}
    className="text-gray-300 hover:text-white transition-colors duration-200 py-1"
  >
    {children}
  </a>
);

interface FooterColumnProps {
  title: string;
  links: { label: string; href: string }[];
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => (
  <div className="flex flex-col space-y-4">
    <h3 className="font-medium text-white text-center sm:text-left">{title}</h3>
    <div className="flex flex-col space-y-2 items-center sm:items-start">
      {links.map((link) => (
        <FooterLink key={link.label} href={link.href}>
          {link.label}
        </FooterLink>
      ))}
    </div>
  </div>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#030303] text-white w-full py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 md:px-8 lg:px-12  ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          <div className="flex flex-col items-center sm:items-start space-y-4 col-span-1 sm:col-span-2 lg:col-span-1 mb-4 sm:mb-0">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <span className="text-2xl font-semibold text-center">
                EduPal AI
              </span>
            </div>
            <h1 className="text-gray-300 text-md text-center sm:text-left">
              Your personal guide to smarter learning.
            </h1>

            <div className="flex space-x-4 pt-2 justify-center sm:justify-start">
              <a
                href="https://discord.com"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Discord size={20} />
                <span className="sr-only">Discord</span>
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://linkdin.com"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://github.com"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 pt-4 sm:pt-6 md:pt-8 border-t border-gray-800 text-gray-400 text-sm text-center">
          Copyright © {currentYear} EduPal AI. All Rights Reserved.
        </div>
        <FooterColumn
  title=""
  links={[
    { label: "", href: "" },
  ]}
/>
      </div>
    </footer>
  );
}
