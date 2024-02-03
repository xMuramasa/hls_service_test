import Link from "next/link";

import { montserrat } from "./fonts";

const links = [
  { name: 'Home', href: '/', icon: 'HomeIcon' },
  {
    name: 'Servicios',
    href: '',
    icon: 'DocumentDuplicateIcon',
  },
    {
        name: 'Ayuda',
        href: '',
        icon: 'QuestionMarkCircleIcon',
    },
    {
        name: 'Contacto',
        href: '',
        icon: 'MailIcon',
    },
];


export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
          >
            <p className={`${montserrat.className}`}>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}