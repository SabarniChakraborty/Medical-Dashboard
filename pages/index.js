import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <main className={styles.main}>
        {/* Fullscreen Photo */}
        <div className={styles.photoContainer}>
          <Image
            src="/doctor_home.jpg" // Add your image path here
            alt="Fullpage Background"
            layout="fill" // Makes the image cover the full area of its container
            objectFit="cover" // Ensures the image covers the area without distortion
            objectPosition="center" // Centers the image
            priority // Optionally, you can prioritize loading this image
          />
        </div>
      </main>
    </>
  );
}
