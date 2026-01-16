CREATE TABLE IF NOT EXISTS news (
                                    id SERIAL PRIMARY KEY,
                                    title VARCHAR(255) NOT NULL,
                                    description TEXT,
                                    content TEXT,
                                    img TEXT,
                                    published_at TIMESTAMP,
                                    src VARCHAR(100),
                                    location VARCHAR(100),
                                    author_id INTEGER
);

-- 2. Inserimento dei dati
INSERT INTO news (id, title, description, content, img, published_at, src, location) VALUES
                                                                                                    (1,
                                                                                                     'Le tempeste invernali aggravano la crisi umanitaria a Gaza',
                                                                                                     'Temperature gelide e inondazioni minacciano 55.000 famiglie nei campi sfollati mentre le infrastrutture collassano.',
                                                                                                     'Forti tempeste invernali e piogge torrenziali hanno causato inondazioni diffuse nei campi per sfollati in tutta Gaza, colpendo quasi 55.000 famiglie. Le agenzie umanitarie riferiscono che le condizioni dei rifugi stanno peggiorando rapidamente, con temperature gelide che rappresentano un grave rischio per bambini e anziani. Le squadre di emergenza faticano ad accedere alle aree allagate a causa delle strade danneggiate.',
                                                                                                     'https://plus.unsplash.com/premium_photo-1695566086196-1cdadbaa1988?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                                                                                     '2026-01-02 10:30:00',
                                                                                                     'UN OCHA / ReliefWeb',
                                                                                                     'Striscia di Gaza'
                                                                                                     ),

                                                                                                    (2,
                                                                                                     'Spinta diplomatica per la ''Fase 2'' del piano di pace',
                                                                                                     'I diplomatici accelerano per lanciare la fase successiva del piano, concentrandosi su governance e sicurezza nonostante le tensioni.',
                                                                                                     'I diplomatici stanno intensificando gli sforzi per lanciare la seconda fase del piano di pace globale previsto per metà gennaio 2026. Mentre il cessate il fuoco concordato alla fine del 2025 regge a fatica, le tensioni rimangono alte. La nuova fase mira ad affrontare la governance a lungo termine e la ricostruzione, sebbene i disaccordi sugli accordi di sicurezza nel settore settentrionale minaccino di bloccare i progressi.',
                                                                                                     'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&q=80&w=1000',
                                                                                                     '2026-01-01 14:15:00',
                                                                                                     'Global Diplomatic Wire',
                                                                                                     'Doha / Gerusalemme'
                                                                                                    ),

                                                                                                    (3,
                                                                                                     'Nuovi ordini di sgombero nel campo di Nur Shams',
                                                                                                     'Nuovi ordini di demolizione a Tulkarem costringono i residenti all''evacuazione, scatenando proteste e critiche internazionali.',
                                                                                                     'Le autorità israeliane hanno emesso nuovi ordini di demolizione ed evacuazione per diversi edifici nel campo profughi di Nur Shams, in Cisgiordania. Fonti locali riferiscono che ai residenti è stato concesso un tempo limitato per recuperare i propri beni. La mossa ha scatenato proteste e attirato aspre critiche dalle organizzazioni internazionali per i diritti umani che monitorano la Cisgiordania.',
                                                                                                     'https://images.unsplash.com/photo-1620990943104-e9e26b7d2442?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                                                                                     '2025-12-30 09:00:00',
                                                                                                     'West Bank Monitor',
                                                                                                     'Tulkarem, Cisgiordania'
                                                                                                     ),

                                                                                                    (4,
                                                                                                     'Migliaia in piazza a Istanbul per solidarietà a Capodanno',
                                                                                                     'Migliaia di persone si riuniscono al Ponte di Galata chiedendo un cessate il fuoco permanente e sostegno alla ricostruzione.',
                                                                                                     'Migliaia di manifestanti si sono riuniti al Ponte di Galata a Istanbul il 1° gennaio per mostrare solidarietà ai palestinesi. La manifestazione, con discorsi e spettacoli culturali, ha chiesto la fine permanente delle ostilità e un maggiore sostegno internazionale per gli sforzi di ricostruzione a Gaza con l''inizio del nuovo anno.',
                                                                                                     'https://images.unsplash.com/photo-1713019704587-9ca6cd08be75?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                                                                                     '2026-01-01 16:45:00',
                                                                                                     'Al Jazeera / Agenzie Locali',
                                                                                                     'Istanbul, Turchia'
                                                                                                     ),(5,
                                                                                                         'Le ONG avvertono del collasso operativo per i nuovi blocchi',
                                                                                                         '53 ONG internazionali avvertono che le nuove regole burocratiche potrebbero bloccare gli aiuti medici e alimentari entro febbraio.',
                                                                                                         'Una coalizione di 53 ONG internazionali operanti nei territori palestinesi ha avvertito che le nuove misure di registrazione imposte dalle autorità potrebbero bloccare le operazioni di aiuto critiche. Con una scadenza fissata per fine febbraio, le agenzie temono di non poter importare legalmente cibo e forniture mediche se gli ostacoli normativi non verranno risolti immediatamente.',
                                                                                                         'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=1000',
                                                                                                         '2026-01-02 08:00:00',
                                                                                                         'Humanitarian Aid Coalition',
                                                                                                         'Gerusalemme / Ramallah'
                                                                                                         ),

                                                                                                    (6,
                                                                                                     'Scuole di fortuna riaprono tra le macerie a Khan Younis',
                                                                                                     'Insegnanti volontari avviano classi in tende improvvisate per garantire un''istruzione a migliaia di bambini rimasti senza scuola.',
                                                                                                     'In un atto di resilienza, insegnanti ed educatori volontari hanno allestito decine di aule improvvisate all''interno di tende a Khan Younis. Nonostante la mancanza di libri e materiali scolastici, l''iniziativa mira a fornire supporto psicologico e istruzione di base a migliaia di bambini che hanno perso oltre un anno scolastico a causa del conflitto in corso.',
                                                                                                     'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000',
                                                                                                     '2026-01-03 09:15:00',
                                                                                                     'Education Without Borders',
                                                                                                     'Khan Younis, Gaza'
                                                                                                     ),

                                                                                                    (7,
                                                                                                     'Allarme sanitario: scorte critiche di antibiotici negli ospedali',
                                                                                                     'I medici lanciano l''allarme per la carenza di farmaci essenziali mentre le infezioni invernali aumentano drasticamente.',
                                                                                                     'Il Ministero della Salute locale ha dichiarato lo stato di emergenza farmaceutica poiché le scorte di antibiotici e antidolorifici negli ospedali rimasti operativi sono scese sotto la soglia critica del 5%. I medici avvertono che, senza un corridoio umanitario immediato per i medicinali, le infezioni respiratorie invernali e le complicazioni post-operatorie potrebbero diventare fatali per centinaia di pazienti.',
                                                                                                     'https://images.unsplash.com/photo-1727162134896-29661b1eca5d?q=80&w=3026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                                                                                     '2026-01-02 11:45:00',
                                                                                                     'Health Ministry / WHO',
                                                                                                     'Rafah'
                                                                                                     ),

                                                                                                    (8,
                                                                                                     'L''UNESCO valuta lo stato del patrimonio storico a Nablus',
                                                                                                     'Una delegazione internazionale arriva per valutare i danni ai siti storici della Città Vecchia dopo i recenti scontri.',
                                                                                                     'Una delegazione tecnica dell''UNESCO è arrivata a Nablus per condurre una valutazione preliminare dei danni subiti dagli edifici storici e dai bagni turchi nella Città Vecchia. La missione mira a catalogare i siti a rischio di crollo strutturale e a proporre un piano di restauro d''emergenza per preservare il patrimonio culturale palestinese minacciato dalle recenti operazioni militari.',
                                                                                                     'https://images.unsplash.com/photo-1621953898300-a57253664f55?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                                                                                     '2025-12-29 15:30:00',
                                                                                                     'Cultural Heritage Watch',
                                                                                                     'Nablus, Cisgiordania'
                                                                                                     ),

                                                                                                    (9,
                                                                                                     'Ripresa limitata dell''export agricolo: prime fragole verso l''Europa',
                                                                                                     'Il primo carico di prodotti agricoli lascia la striscia dopo mesi di blocco, offrendo una speranza economica agli agricoltori.',
                                                                                                     'Per la prima volta in otto mesi, un convoglio commerciale contenente fragole e fiori recisi è stato autorizzato a lasciare la Striscia di Gaza destinato ai mercati europei. Sebbene i volumi siano una frazione rispetto ai livelli pre-guerra, gli agricoltori locali sperano che questo progetto pilota possa portare a un allentamento più ampio delle restrizioni economiche che soffocano il settore agricolo.',
                                                                                                     'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1000',
                                                                                                     '2026-01-03 07:00:00',
                                                                                                     'AgriTrade Weekly',
                                                                                                     'Valico di Kerem Shalom'
                                                                                                     ),(10,
                                                                                                         'Mostra d''arte digitale ''Voci da Gaza'' apre a Londra',
                                                                                                         'Artisti palestinesi inaugurano una galleria virtuale immersiva per raccontare storie di vita quotidiana e resistenza.',
                                                                                                         'Una nuova mostra multimediale intitolata ''Voci da Gaza'' è stata inaugurata oggi a Londra, presentando opere digitali, fotografie e registrazioni sonore inviate da artisti che vivono ancora nella zona di conflitto. L''esposizione utilizza la realtà aumentata per trasportare i visitatori nelle strade di Gaza, offrendo una prospettiva intima e potente sulla vita quotidiana e sulla resilienza culturale della popolazione.',
                                                                                                         'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&q=80&w=1000',
                                                                                                         '2026-01-01 18:00:00',
                                                                                                         'ArtReview',
                                                                                                         'Londra / Gaza (Virtuale)'
                                                                                                         );

-- 3. Aggiornamento della sequenza (Importante se usi SERIAL)
-- Poiché abbiamo inserito ID manualmente, dobbiamo dire a Postgres che il prossimo ID automatico deve partire da 11.
SELECT setval(pg_get_serial_sequence('news', 'id'), (SELECT MAX(id) FROM news));