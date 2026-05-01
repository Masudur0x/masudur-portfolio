import {
  FaYoutube,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaFacebookF,
  FaWhatsapp,
  FaPeopleGroup,
} from "react-icons/fa6";
import type { IconType } from "react-icons";
import { PERSONA, type PersonaSocial } from "./persona";

const ICONS: Record<PersonaSocial["icon"], IconType> = {
  FaYoutube,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaFacebookF,
  FaWhatsapp,
  FaPeopleGroup,
};

export interface SocialLink {
  href: string;
  icon: IconType;
  label: string;
}

export const socialLinks: SocialLink[] = PERSONA.socials.map((s) => ({
  href: s.href,
  icon: ICONS[s.icon],
  label: s.label,
}));
