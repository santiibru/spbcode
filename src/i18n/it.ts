import type { Dict } from "./types";

const it: Dict = {
  meta: {
    title: "Spbcode — Sviluppo web",
    description:
      "Sviluppatore web: siti web su misura, portfolio, landing page e gestione appuntamenti online per professionisti e piccole attività.",
    jobTitle: "Sviluppatore web",
  },
  nav: {
    skip: "Vai al contenuto",
    langLabel: "Lingua / Idioma",
    menu: "Menu principale",
    menuOpen: "Apri il menu",
    menuClose: "Chiudi il menu",
    services: "Servizi",
    works: "Lavori",
    method: "Metodo",
    about: "Chi sono",
    contact: "Contatto",
  },
  hero: {
    eyebrow: "Sviluppatore web",
    titleBefore: "Siti e applicazioni web ",
    titleEm: "su misura",
    titleAfter: " per professionisti e piccole attività.",
    sub: "Dall'idea alla pubblicazione: sviluppo e design nelle mani di una sola persona, con la stessa cura sia per il codice che per l'aspetto.",
    cta: "Parliamone",
    note: "Risposta entro 24–48 ore",
  },
  services: {
    kicker: "// Servizi",
    title: "Cosa faccio",
    lead: "Siti web dinamici, pensati per chi lavora da solo o guida una piccola attività.",
    featuredTag: "Servizio principale",
    items: [
      {
        title: "Webapp per la gestione di appuntamenti e prenotazioni",
        text: "Calendario online, disponibilità in tempo reale, conferme automatiche e un pannello per gestire l'agenda in autonomia.",
      },
      {
        title: "Portfolio e siti vetrina",
        text: "Un sito che racconta il tuo lavoro o la tua passione con un'identità propria, in maniera veloce ed efficace anche da smartphone.",
      },
      {
        title: "Landing page",
        text: "Una pagina chiara e mirata per presentare un servizio o una campagna e trasformare le visite in contatti. Il modo migliore per atrarre nuovi clienti.",
      },
    ],
    note: "Tutto su misura, senza template generici, e disponibile in più lingue.",
    demo: { day: "mar 14", confirmed: "Prenotazione confermata" },
  },
  works: {
    kicker: "// Lavori",
    title: "Lavori recenti",
    lead: "Alcuni progetti realizzati.",
    items: [
      {
        title: "Studio di fisioterapia",
        text: "Un sistema di prenotazione online che sostituisce lo scambio di chiamate e messaggi: i pazienti scelgono uno slot libero e lo studio gestisce l'agenda da un pannello. I professionisti controllano gli appuntamenti direttamente dal loro calendario in tempo reale.",
        tags: ["Prenotazioni online", "Area riservata", "Conferme automatiche"],
      },
      {
        title: "Portfolio per un'artista",
        text: "Un sito personale con un'identità visiva propria, pensato per presentare il suo lavoro con cura. Galleria di immagini, biografia e un modulo di contatto per ricevere richieste di collaborazione e lavori.",
        tags: ["Identità visiva", "Galleria", "Formulario di contatto"],
      },
      {
        title: "Sito per un evento",
        text: "Un sito bilingue con conferma di partecipazione online (RSVP) per un evento privato e un pannello di gestione per permettere agli organizzatori di gestire tutti i dettagli.",
        tags: ["Bilingue", "RSVP online", "Pannello admin"],
      },
    ],
  },
  method: {
    kicker: "// Metodo",
    title: "Come lavoro",
    steps: [
      { title: "Chiacchierata", text: "Ascolto di cosa hai bisogno e come lavori." },
      { title: "Proposta", text: "Ti invio una proposta chiara, con tempi e preventivo su misura." },
      { title: "Sviluppo", text: "Costruisco il progetto e ti mostro gli avanzamenti, così puoi decidere e scegliere ciò che meglio si adatta alle tue esigenze." },
      { title: "Consegna e supporto", text: "Pubblico tutto e resto a disposizione per modifiche e dubbi." },
    ],
  },
  about: {
    kicker: "// Chi sono",
    title: "Chi sono",
    paragraphs: [
      "Sono Santiago, sviluppatore web a Milano. Lavoro in sviluppo fullstack e design e mi occupo di ogni fase del progetto, dall'idea alla pubblicazione.",
      "Parlo italiano, spagnolo e inglese e realizzo siti in tutte e tre le lingue.",
    ],
    photoAlt: "Ritratto di Santiago",
  },
  contact: {
    kicker: "// Contatto",
    title: "Parliamo del tuo progetto",
    lead: "Raccontami in poche righe cosa ti serve: il resto lo vediamo insieme.",
    expectation: "Ti rispondo entro 24–48 ore.",
    altEmail: "Preferisci l'email? Scrivimi a",
    fields: { name: "Nome", email: "Email", need: "Di cosa hai bisogno?", message: "Messaggio" },
    needPlaceholder: "Scegli un'opzione",
    needs: {
      appointments: "Gestione appuntamenti",
      portfolio: "Portfolio",
      landing: "Landing page",
      other: "Altro",
    },
    honeypot: "Non compilare questo campo",
    submit: "Invia messaggio",
    sending: "Invio in corso…",
    status: {
      ok: "Grazie! Messaggio ricevuto: ti rispondo entro 24–48 ore.",
      invalid: "Controlla i campi evidenziati e riprova.",
      rate: "Hai inviato troppi messaggi. Riprova tra qualche minuto.",
      error: "Qualcosa è andato storto. Riprova o scrivimi direttamente via email.",
    },
  },
  footer: {
    rights: "Sviluppo web su misura",
  },
};

export default it;
