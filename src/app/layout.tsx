import Image from "next/image";
import "./globals.css"
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <header className=" text-white py-4">
          <div className="container mx-auto flex justify-center items-center">
            <Image
              width={200}
              height={200}
              src="/images/shared/emblem.png"
              alt="Dead by Daylight Logo"
            />
          </div>
        </header>
        <main className="max-w-[1440px] mx-auto py-8">{children}</main>
      </body>
    </html>
  );
}
