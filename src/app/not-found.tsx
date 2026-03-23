import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#E82020] flex flex-col items-center justify-center px-6 text-center">

      {/* Eye GIF only */}
      <div className="mb-15">
        <Image
          src="/images/home/404-eye-animation.gif"
          alt="404 eye animation"
          width={400}
          height={200}
          className="w-auto mx-auto"
          style={{ height: "clamp(120px, 20vw, 320px)" }}
          unoptimized
        />
      </div>

      {/* Subtitle */}
      <p className="text-white text-base sm:text-lg max-w-md mb-8 font-medium">
        Your curiosity led you to an undiscovered page.
      </p>

      {/* Button */}
      <Link
        href="/"
        className="inline-block bg-white text-black text-sm font-bold px-8 py-3 rounded-lg hover:text-red-700 transition-colors duration-300"
      >
        Homepage
      </Link>

    </main>
  );
}
