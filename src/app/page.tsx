export const dynamic = "force-static"

// import Image from "next/image";
import { Button } from "@/components/ui/Button"

export default function Home() {
  return (
    <div>
      {/* <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        /> */}
      <Button className="btn btn--loading active">
        button
        <svg width="24" height="24" viewBox="0 0 24 24" fill="gold" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
        </svg>
      </Button>
    </div>
  )
}
