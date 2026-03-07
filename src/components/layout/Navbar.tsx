"use client";

import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/config/navigation";
import Container from "./Container";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50 w-full">
      <Container className="flex items-center justify-between h-16 sm:h-18 md:h-20 px-4">

        {/* Logo */}
        <Link href="/" className="ml-0 md:-ml-12">
          <Image
            src="/images/logo/logo.png"
            width={200}
            height={120}
            alt="Gresham Global Logo"
            className="h-10 sm:h-12 md:h-14 w-auto"
            priority
          />
        </Link>

        {/* DESKTOP NAV  */}
        <nav className="hidden md:flex items-center">

          <div className="flex items-center divide-x divide-gray-800">
            {navigation.map((item) => (
              <div key={item.label} className="relative px-4 lg:px-7 group">

                <div className="-ml-2 flex items-center gap-1 text-sm lg:text-lg font-medium text-gray-800 hover:text-red-600 transition-colors duration-200 cursor-pointer">

                  {item.href ? (
                    <Link href={item.href}>{item.label}</Link>
                  ) : (
                    <span>{item.label}</span>
                  )}

                  {item.children && (
                    <ChevronDown
                      size={16}
                      className="mt-[2px] transition-transform duration-200 group-hover:rotate-180"
                    />
                  )}
                </div>

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

          <div className="pl-4 lg:pl-8 relative lg:left-8">
            <Image
              src="/images/home/linkedinRound.webp"
              alt="Extra"
              width={40}
              height={40}
              className="h-6 lg:h-8 w-auto cursor-pointer"
            />
          </div>

        </nav>

        {/*  MOBILE MENU BUTTON  */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden cursor-pointer"
        >
          <Menu size={28} />
        </button>

      </Container>

      {/* MOBILE SIDEBAR  */}

      {/* overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[85%] sm:w-[320px] bg-white z-50 shadow-xl transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        {/* sidebar header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b">

          <Image
            src="/images/logo/logo.png"
            width={160}
            height={80}
            alt="logo"
            className="h-10 w-auto"
          />

          <button
            className="cursor-pointer"
            onClick={() => setMenuOpen(false)}
          >
            <X size={24} />
          </button>

        </div>

        {/* menu items */}
        <div className="flex flex-col p-5 sm:p-6 space-y-4">

          {navigation.map((item) => (
            <div key={item.label}>

              {/* main item */}
              <div
                onClick={() => item.children && toggleDropdown(item.label)}
                className="flex items-center justify-between text-base sm:text-lg font-medium cursor-pointer"
              >

                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}

                {item.children && (
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      openDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                )}

              </div>

              {/* dropdown */}
              {item.children && (
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openDropdown === item.label
                      ? "max-h-40 mt-2"
                      : "max-h-0"
                  }`}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href!}
                      onClick={() => setMenuOpen(false)}
                      className="block pl-4 py-2 text-sm sm:text-base text-gray-600"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}

            </div>
          ))}

        </div>

      </div>
    </header>
  );
}