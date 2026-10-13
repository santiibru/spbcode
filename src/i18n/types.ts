export type NeedValue = "appointments" | "portfolio" | "landing" | "other";
export type ContactStatus = "ok" | "invalid" | "rate" | "error";

interface Block {
  title: string;
  text: string;
}

export interface Dict {
  meta: {
    title: string;
    description: string;
    jobTitle: string;
  };
  nav: {
    skip: string;
    langLabel: string;
    menu: string;
    menuOpen: string;
    menuClose: string;
    services: string;
    works: string;
    method: string;
    about: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    // el título se arma como before + <em>em</em> + after
    titleBefore: string;
    titleEm: string;
    titleAfter: string;
    sub: string;
    cta: string;
    note: string;
  };
  services: {
    kicker: string;
    title: string;
    lead: string;
    featuredTag: string;
    items: [Block, Block, Block];
    note: string;
    demo: { day: string; confirmed: string };
  };
  works: {
    kicker: string;
    title: string;
    lead: string;
    items: [Block & { tags: string[] }, Block & { tags: string[] }, Block & { tags: string[] }];
  };
  method: {
    kicker: string;
    title: string;
    steps: [Block, Block, Block, Block];
  };
  about: {
    kicker: string;
    title: string;
    paragraphs: string[];
    photoAlt: string;
  };
  contact: {
    kicker: string;
    title: string;
    lead: string;
    expectation: string;
    altEmail: string;
    fields: { name: string; email: string; need: string; message: string };
    needPlaceholder: string;
    needs: Record<NeedValue, string>;
    honeypot: string;
    submit: string;
    sending: string;
    status: Record<ContactStatus, string>;
  };
  footer: {
    rights: string;
  };
}
