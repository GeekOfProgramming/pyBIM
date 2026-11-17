import PortalLayoutClient from "@/components/layout/portal-layout-client";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: null,
    languages: {},
  },
};

export default function PortalLayout({ children }) {
  return <PortalLayoutClient>{children}</PortalLayoutClient>;
}
