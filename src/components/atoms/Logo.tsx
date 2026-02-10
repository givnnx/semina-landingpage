import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="navbar-brand">
      <img src="/images/logo.svg" alt="semina" />
    </Link>
  );
}
