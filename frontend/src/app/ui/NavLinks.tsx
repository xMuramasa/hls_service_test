import Link from "next/link";

import { montserrat } from "./fonts";
import { Grid } from "@mui/material";

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
    <Grid container>
      {links.map((link) => {
        return (
          <Grid item xs key={link.name}>
            <Link
              key={link.name}
              href={link.href}
            >
              <p className={`${montserrat.className}`}>{link.name}</p>
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
}