"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/config/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const isItemActive = (item: (typeof navigation)[number]) => {
    if (item.href === "/" && pathname === "/") return true;
    if (item.href && item.href !== "/" && pathname.startsWith(item.href)) return true;
    if (item.children?.some((child) => pathname === child.href || pathname.startsWith(child.href ?? "___"))) return true;
    return false;
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50 w-full">
      <div className="w-full flex items-center justify-between h-16 sm:h-18 md:h-20 px-4 sm:px-6 lg:px-10 xl:px-16">

        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo/logo.png"
            width={200}
            height={120}
            alt="Gresham Global Logo"
            className="h-10 sm:h-12 md:h-14 w-auto"
            priority
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-0">

          <div className="flex items-center divide-x divide-gray-900">
            {navigation.map((item) => {
              const active = isItemActive(item);

              return (
                <div key={item.label} className="relative px-4 lg:px-6 xl:px-7 group">
                  <div
                    className={`
                      flex items-center gap-1 text-sm lg:text-lg font-medium transition-colors duration-200 cursor-pointer
                      pb-1
                      ${active
                        ? "text-red-600 border-b-2 border-red-600"
                        : "text-gray-800 hover:text-red-600 border-b-2 border-transparent"
                      }
                    `}
                  >
                    {item.href && !item.children ? (
                      <Link href={item.href}>{item.label}</Link>
                    ) : item.href && item.children ? (
                      <Link href={item.href}>{item.label}</Link>
                    ) : (
                      <span>{item.label}</span>
                    )}

                    {item.children && (
                      <ChevronDown
                        size={20}
                        className="mt-0.5 shrink-0 transition-transform duration-200 group-hover:rotate-180"
                      />
                    )}
                  </div>

                  {/* Dropdown */}
                  {item.children && (
                    <div className="absolute left-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="w-56 bg-white shadow-lg rounded-md border border-gray-200 py-2">
                        {item.children.map((child) => {
                          const childActive = pathname === child.href || pathname.startsWith(child.href ?? "___");
                          return (
                            <Link
                              key={child.label}
                              href={child.href!}
                              className={`block px-4 py-2.5 text-sm transition-colors ${
                                childActive
                                  ? "text-red-600 font-semibold bg-gray-50"
                                  : "text-gray-700 hover:bg-gray-100 hover:text-red-600"
                              }`}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* LinkedIn Icon */}
          <div className="pl-5 lg:pl-7 shrink-0">
            <Link href="" target="_blank" rel="noopener noreferrer">
              <Image
                src="/images/home/linkedinRound.webp"
                alt="LinkedIn"
                width={40}
                height={40}
                className="h-8 lg:h-9 w-auto cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden cursor-pointer p-1"
          aria-label="Open menu"
        >
          <Menu size={28} />
        </button>

      </div>

      {/* MOBILE OVERLAY */}
      <div
        onClick={() => { setMenuOpen(false); setOpenDropdown(null); }}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      />

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-[85%] sm:w-[320px] bg-white z-50 shadow-xl transform transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b">
          <Image
            src="/images/logo/logo.png"
            width={160}
            height={80}
            alt="logo"
            className="h-10 w-auto"
          />
          <button
            className="cursor-pointer p-1"
            onClick={() => { setMenuOpen(false); setOpenDropdown(null); }}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col p-5 sm:p-6 space-y-1 overflow-y-auto h-[calc(100%-73px)]">
          {navigation.map((item) => {
            const active = isItemActive(item);
            const isOpen = openDropdown === item.label;
            const childCount = item.children?.length ?? 0;
            // Each child is ~44px tall
            const dropdownHeight = childCount * 44;

            return (
              <div key={item.label} className="border-b border-gray-100 last:border-0 pb-1">

                {/* Main Item Row */}
                <div
                  className={`flex items-center justify-between py-3 cursor-pointer ${
                    active ? "text-red-600" : "text-gray-800"
                  }`}
                  onClick={() => {
                    if (item.children) {
                      toggleDropdown(item.label);
                    } else if (item.href) {
                      setMenuOpen(false);
                    }
                  }}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        if (item.children) e.preventDefault();
                        else setMenuOpen(false);
                      }}
                      className={`text-base sm:text-lg font-medium ${
                        active ? "text-red-600" : "text-gray-800"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className={`text-base sm:text-lg font-medium ${
                      active ? "text-red-600" : "text-gray-800"
                    }`}>
                      {item.label}
                    </span>
                  )}

                  {item.children && (
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180 text-red-600" : "text-gray-500"
                      }`}
                    />
                  )}
                </div>

                {/* Dropdown Children — height-based animation so all items show */}
                {item.children && (
                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ maxHeight: isOpen ? `${dropdownHeight + 16}px` : "0px" }}
                  >
                    <div className="pl-4 pb-2 flex flex-col">
                      {item.children.map((child) => {
                        const childActive = pathname === child.href || pathname.startsWith(child.href ?? "___");
                        return (
                          <Link
                            key={child.label}
                            href={child.href!}
                            onClick={() => { setMenuOpen(false); setOpenDropdown(null); }}
                            className={`py-2.5 text-sm sm:text-base border-b border-gray-50 last:border-0 transition-colors ${
                              childActive
                                ? "text-red-600 font-semibold"
                                : "text-gray-600 hover:text-red-600"
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            );
          })}

          {/* LinkedIn in mobile sidebar */}
          <div className="pt-4">
            <Link href="" target="_blank" rel="noopener noreferrer" className="inline-block">
              <Image
                src="/images/home/linkedinRound.webp"
                alt="LinkedIn"
                width={40}
                height={40}
                className="h-9 w-auto"
              />
            </Link>
          </div>
        </div>

      </div>
    </header>
  );
}
