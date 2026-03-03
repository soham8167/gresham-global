"use client";

import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/config/navigation";
import Container from "./Container";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  return (
    <header className="border-b bg-white sticky top-0 z-50 ">
      <Container className="flex items-center justify-between h-20  ">
        
        {/* Logo */}
        <Link href="/" className="-ml-12">
          <Image
            src="/images/logo/logo.png"
            width={200}
            height={120}
            alt="Gresham Global Logo"
            className="h-14 w-auto "
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className=" hidden md:flex items-center ">
          
          {/* Wrapper ONLY for nav items (keeps divider here) */}
          <div className="flex items-center divide-x divide-gray-800">
            {navigation.map((item) => (
              <div
                key={item.label}
                className="relative px-7 group"
              >
                {/* Nav Item */}
                <div className="  -ml-2 flex items-center gap-1 text-lg font-medium text-gray-800 hover:text-red-600 transition-colors duration-200 cursor-pointer">
                  
                  {item.href ? (
                    <Link href={item.href}>{item.label}</Link>
                  ) : (
                    <span>{item.label}</span>
                  )}

                  {/* Dropdown Icon */}
                  {item.children && (
                    <ChevronDown
                      size={14}
                      className="mt-[2px] transition-transform duration-200 group-hover:rotate-180"
                    />
                  )}
                </div>

                {/* Dropdown */}
                {item.children && (
                  <div className="absolute left-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    
                    <div className="w-56 bg-white shadow-lg rounded-md border border-gray-200 py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href!}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>

                  </div>
                )}
              </div>
            ))}
          </div>

         
          <div className="pl-8 relative left-8">
            <Image
              src="/images/home/linkedinRound.webp"
              alt="Extra"
              width={40}
              height={40}
              className="h-8 w-auto cursor-pointer"
            />
          </div>

        </nav>

        {/* Mobile Placeholder */}
        <div className="md:hidden">
          <button className="text-2xl">☰</button>
        </div>

      </Container>
    </header>
  );
}