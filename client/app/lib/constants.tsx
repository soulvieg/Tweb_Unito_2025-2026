import type { CommentType, NewsType, PostType, UserType } from "./types";

export const BASE_URL = "http://172.31.69.96:8080";

export const palestinianNews: NewsType[] = [
	{
		id: 1,
		title: "Le tempeste invernali aggravano la crisi umanitaria a Gaza",
		description:
			"Temperature gelide e inondazioni minacciano 55.000 famiglie nei campi sfollati mentre le infrastrutture collassano.",
		content:
			"Forti tempeste invernali e piogge torrenziali hanno causato inondazioni diffuse nei campi per sfollati in tutta Gaza, colpendo quasi 55.000 famiglie. Le agenzie umanitarie riferiscono che le condizioni dei rifugi stanno peggiorando rapidamente, con temperature gelide che rappresentano un grave rischio per bambini e anziani. Le squadre di emergenza faticano ad accedere alle aree allagate a causa delle strade danneggiate.",
		img: "https://plus.unsplash.com/premium_photo-1695566086196-1cdadbaa1988?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		published_at: new Date("2026-01-02T10:30:00"),
		src: "UN OCHA / ReliefWeb",
		location: "Striscia di Gaza",
		// author: 0,
	},
	{
		id: 2,
		title: "Spinta diplomatica per la 'Fase 2' del piano di pace",
		description:
			"I diplomatici accelerano per lanciare la fase successiva del piano, concentrandosi su governance e sicurezza nonostante le tensioni.",
		content:
			"I diplomatici stanno intensificando gli sforzi per lanciare la seconda fase del piano di pace globale previsto per metà gennaio 2026. Mentre il cessate il fuoco concordato alla fine del 2025 regge a fatica, le tensioni rimangono alte. La nuova fase mira ad affrontare la governance a lungo termine e la ricostruzione, sebbene i disaccordi sugli accordi di sicurezza nel settore settentrionale minaccino di bloccare i progressi.",
		img: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&q=80&w=1000",
		published_at: new Date("2026-01-01T14:15:00"),
		src: "Global Diplomatic Wire",
		location: "Doha / Gerusalemme",
		// author: 0,
	},
	{
		id: 3,
		title: "Nuovi ordini di sgombero nel campo di Nur Shams",
		description:
			"Nuovi ordini di demolizione a Tulkarem costringono i residenti all'evacuazione, scatenando proteste e critiche internazionali.",
		content:
			"Le autorità israeliane hanno emesso nuovi ordini di demolizione ed evacuazione per diversi edifici nel campo profughi di Nur Shams, in Cisgiordania. Fonti locali riferiscono che ai residenti è stato concesso un tempo limitato per recuperare i propri beni. La mossa ha scatenato proteste e attirato aspre critiche dalle organizzazioni internazionali per i diritti umani che monitorano la Cisgiordania.",
		img: "https://images.unsplash.com/photo-1620990943104-e9e26b7d2442?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		published_at: new Date("2025-12-30T09:00:00"),
		src: "West Bank Monitor",
		location: "Tulkarem, Cisgiordania",
		// author: 0,
	},
	{
		id: 4,
		title: "Migliaia in piazza a Istanbul per solidarietà a Capodanno",
		description:
			"Migliaia di persone si riuniscono al Ponte di Galata chiedendo un cessate il fuoco permanente e sostegno alla ricostruzione.",
		content:
			"Migliaia di manifestanti si sono riuniti al Ponte di Galata a Istanbul il 1° gennaio per mostrare solidarietà ai palestinesi. La manifestazione, con discorsi e spettacoli culturali, ha chiesto la fine permanente delle ostilità e un maggiore sostegno internazionale per gli sforzi di ricostruzione a Gaza con l'inizio del nuovo anno.",
		img: "https://images.unsplash.com/photo-1713019704587-9ca6cd08be75?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		published_at: new Date("2026-01-01T16:45:00"),
		src: "Al Jazeera / Agenzie Locali",
		location: "Istanbul, Turchia",
		// author: 0,
	},
	{
		id: 5,
		title: "Le ONG avvertono del collasso operativo per i nuovi blocchi",
		description:
			"53 ONG internazionali avvertono che le nuove regole burocratiche potrebbero bloccare gli aiuti medici e alimentari entro febbraio.",
		content:
			"Una coalizione di 53 ONG internazionali operanti nei territori palestinesi ha avvertito che le nuove misure di registrazione imposte dalle autorità potrebbero bloccare le operazioni di aiuto critiche. Con una scadenza fissata per fine febbraio, le agenzie temono di non poter importare legalmente cibo e forniture mediche se gli ostacoli normativi non verranno risolti immediatamente.",
		img: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=1000",
		published_at: new Date("2026-01-02T08:00:00"),
		src: "Humanitarian Aid Coalition",
		location: "Gerusalemme / Ramallah",
		// author: 0,
	},
	{
		id: 6,
		title: "Scuole di fortuna riaprono tra le macerie a Khan Younis",
		description:
			"Insegnanti volontari avviano classi in tende improvvisate per garantire un'istruzione a migliaia di bambini rimasti senza scuola.",
		content:
			"In un atto di resilienza, insegnanti ed educatori volontari hanno allestito decine di aule improvvisate all'interno di tende a Khan Younis. Nonostante la mancanza di libri e materiali scolastici, l'iniziativa mira a fornire supporto psicologico e istruzione di base a migliaia di bambini che hanno perso oltre un anno scolastico a causa del conflitto in corso.",
		img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000",
		published_at: new Date("2026-01-03T09:15:00"),
		src: "Education Without Borders",
		location: "Khan Younis, Gaza",
		// author: 0,
	},
	{
		id: 7,
		title: "Allarme sanitario: scorte critiche di antibiotici negli ospedali",
		description:
			"I medici lanciano l'allarme per la carenza di farmaci essenziali mentre le infezioni invernali aumentano drasticamente.",
		content:
			"Il Ministero della Salute locale ha dichiarato lo stato di emergenza farmaceutica poiché le scorte di antibiotici e antidolorifici negli ospedali rimasti operativi sono scese sotto la soglia critica del 5%. I medici avvertono che, senza un corridoio umanitario immediato per i medicinali, le infezioni respiratorie invernali e le complicazioni post-operatorie potrebbero diventare fatali per centinaia di pazienti.",
		img: "https://images.unsplash.com/photo-1727162134896-29661b1eca5d?q=80&w=3026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		published_at: new Date("2026-01-02T11:45:00"),
		src: "Health Ministry / WHO",
		location: "Rafah",
		// author: 0,
	},
	{
		id: 8,
		title: "L'UNESCO valuta lo stato del patrimonio storico a Nablus",
		description:
			"Una delegazione internazionale arriva per valutare i danni ai siti storici della Città Vecchia dopo i recenti scontri.",
		content:
			"Una delegazione tecnica dell'UNESCO è arrivata a Nablus per condurre una valutazione preliminare dei danni subiti dagli edifici storici e dai bagni turchi nella Città Vecchia. La missione mira a catalogare i siti a rischio di crollo strutturale e a proporre un piano di restauro d'emergenza per preservare il patrimonio culturale palestinese minacciato dalle recenti operazioni militari.",
		img: "https://images.unsplash.com/photo-1621953898300-a57253664f55?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		published_at: new Date("2025-12-29T15:30:00"),
		src: "Cultural Heritage Watch",
		location: "Nablus, Cisgiordania",
		// author: 0,
	},
	{
		id: 9,
		title: "Ripresa limitata dell'export agricolo: prime fragole verso l'Europa",
		description:
			"Il primo carico di prodotti agricoli lascia la striscia dopo mesi di blocco, offrendo una speranza economica agli agricoltori.",
		content:
			"Per la prima volta in otto mesi, un convoglio commerciale contenente fragole e fiori recisi è stato autorizzato a lasciare la Striscia di Gaza destinato ai mercati europei. Sebbene i volumi siano una frazione rispetto ai livelli pre-guerra, gli agricoltori locali sperano che questo progetto pilota possa portare a un allentamento più ampio delle restrizioni economiche che soffocano il settore agricolo.",
		img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1000",
		published_at: new Date("2026-01-03T07:00:00"),
		src: "AgriTrade Weekly",
		location: "Valico di Kerem Shalom",
		// author: 0,
	},
	{
		id: 10,
		title: "Mostra d'arte digitale 'Voci da Gaza' apre a Londra",
		description:
			"Artisti palestinesi inaugurano una galleria virtuale immersiva per raccontare storie di vita quotidiana e resistenza.",
		content:
			"Una nuova mostra multimediale intitolata 'Voci da Gaza' è stata inaugurata oggi a Londra, presentando opere digitali, fotografie e registrazioni sonore inviate da artisti che vivono ancora nella zona di conflitto. L'esposizione utilizza la realtà aumentata per trasportare i visitatori nelle strade di Gaza, offrendo una prospettiva intima e potente sulla vita quotidiana e sulla resilienza culturale della popolazione.",
		img: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&q=80&w=1000",
		published_at: new Date("2026-01-01T18:00:00"),
		src: "ArtReview",
		location: "Londra / Gaza (Virtuale)",
		// author: 0,
	},
];

export const usersList: UserType[] = [
	{
		u_id: 1,
		username: "Admin_Relief",
		password: "$2b$10$X7...hashedpassword...",
		role: "admin",
	},
	{
		u_id: 2,
		username: "Dr_Amira_H",
		password: "$2b$10$Y8...hashedpassword...",
		role: "user",
	},
	{
		u_id: 3,
		username: "Sami_Press_Gaza",
		password: "$2b$10$Z9...hashedpassword...",
		role: "user",
	},
];

export const postsList: PostType[] = [
	{
		p_id: 101,
		u_id: 2, // Dr_Amira_H
		title: "Situazione critica al reparto pediatrico",
		text: "Le scorte di antibiotici e latte in polvere sono quasi esaurite. I generatori di emergenza stanno funzionando a intermittenza a causa della carenza di carburante.",
		creation_date: new Date("2026-01-14T08:30:00"),
		author: 2,
		replies_count: 0,
	},
	{
		p_id: 102,
		u_id: 1, // Admin_Relief
		title: "Aggiornamento distribuzione aiuti alimentari - Zona Sud",
		text: "Tre camion UNRWA sono arrivati oggi a Rafah. La distribuzione dei pacchi alimentari inizierà domani alle 06:00 presso il centro di smistamento.",
		creation_date: new Date("2026-01-14T10:15:00"),
		author: 1,
		replies_count: 2,
	},
	{
		p_id: 103,
		u_id: 3, // Sami_Press_Gaza
		title: "Danni strutturali dopo la tempesta di stanotte",
		text: "Le forti piogge hanno allagato diverse tendopoli a Khan Younis. Centinaia di famiglie necessitano di coperte asciutte e teloni impermeabili immediatamente.",
		creation_date: new Date("2026-01-14T12:00:00"),
		author: 3,
		replies_count: 1,
	},
];

// 3. Lista dei Commenti
// Nota: 'p_id' collega al post, 'u_id' collega all'autore del commento
export const commentsList: CommentType[] = [
	{
		c_id: 501,
		p_id: 103, // Commento sul post medico
		u_id: 1, // Scritto dall'Admin
		text: "Stiamo coordinando con l'OMS per una consegna d'emergenza entro stasera. Tenete duro.",
		creation_date: new Date("2025-01-15T12:00:00"),
	},
	{
		c_id: 502,
		p_id: 102, // Commento sul post cibo
		u_id: 3, // Scritto dal Giornalista
		text: "Potete confermare se ci sarà anche acqua potabile? La gente lo sta chiedendo.",
		creation_date: new Date("2026-01-13T12:00:00"),
	},
	{
		c_id: 503,
		p_id: 102, // Commento sul post tempesta
		u_id: 2, // Scritto dalla Dottoressa
		text: "Stiamo vedendo i primi casi di ipotermia arrivare in ospedale da quella zona. Serve agire subito.",
		creation_date: new Date("2024-01-17T12:00:00"),
	},
];
