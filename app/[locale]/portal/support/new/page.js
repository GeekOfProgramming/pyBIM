import NewTicketClient from "@/components/portal/new-ticket-client";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = {
    en: "Open Security Escalation Ticket",
    it: "Apri Ticket di Assistenza",
    de: "Neues Support-Ticket eröffnen"
  };
  
  return {
    title: titles[locale] || titles.en
  };
}

export default function NewSupportTicketPage() {
  return <NewTicketClient />;
}
