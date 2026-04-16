import type { ReactElement, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = "h-5 w-5";

function Icon({ children, className, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? base}
      {...rest}
    >
      {children}
    </svg>
  );
}

export const HeartIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
  </Icon>
);

export const CheckCircleIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="M22 4 12 14.01l-3-3" />
  </Icon>
);

export const HomeIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1Z" />
  </Icon>
);

export const SparklesIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9.94 14.34 12 21l2.06-6.66L20 12.28l-5.94-2.06L12 3.56l-2.06 6.66L4 12.28Z" />
    <path d="M18 4v4M20 6h-4M5 18v2M6 19H4" />
  </Icon>
);

export const ShirtIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23Z" />
  </Icon>
);

export const ChefHatIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 13a4 4 0 0 1-2-7.5A4 4 0 0 1 12 4a4 4 0 0 1 8 1.5A4 4 0 0 1 18 13v6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Z" />
    <path d="M6 17h12" />
  </Icon>
);

export const ShoppingBagIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </Icon>
);

export const CarIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M19 17h2v-5l-2-4H5l-2 4v5h2" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
  </Icon>
);

export const UsersIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Icon>
);

export const MessageIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
  </Icon>
);

export const ShieldIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);

export const ClockIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </Icon>
);

export const MapPinIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" />
    <circle cx="12" cy="10" r="3" />
  </Icon>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </Icon>
);

export const StarIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01Z" />
  </Icon>
);

export const serviceIconMap: Record<string, (p: IconProps) => ReactElement> = {
  "Companion visits": HeartIcon,
  "Check-in visits": CheckCircleIcon,
  "Respite sitting": HomeIcon,
  "Light housekeeping": SparklesIcon,
  "Laundry help": ShirtIcon,
  "Simple meal prep": ChefHatIcon,
  "Errands and shopping": ShoppingBagIcon,
  "Transportation accompaniment": CarIcon,
  "Social engagement": UsersIcon,
  "Family updates": MessageIcon
};
