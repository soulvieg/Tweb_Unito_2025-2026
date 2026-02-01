package org.example.rdu.config;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.example.rdu.entities.Category;
import org.example.rdu.entities.Comment;
import org.example.rdu.entities.News;
import org.example.rdu.entities.Post;
import org.example.rdu.entities.Report;
import org.example.rdu.entities.User;
import org.example.rdu.entities.UserType;
import org.example.rdu.repositories.CategoryRepository;
import org.example.rdu.repositories.CommentRepository;
import org.example.rdu.repositories.NewsRepository;
import org.example.rdu.repositories.PostRepository;
import org.example.rdu.repositories.ReportRepository;
import org.example.rdu.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Order(1)
class DataSeeder implements CommandLineRunner {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    NewsRepository newsRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ReportRepository reportRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {


        if (userRepository.count() > 0) {
            System.out.println("Database already seeded. Skipping DataSeeder.");
            return;
        }

        System.out.println("Starting seeding for the User Table");

        List<User> users = new ArrayList<>();

        User user1 = new User();
        user1.setUsername("admin");
        user1.setPassword(passwordEncoder.encode("admin123"));
        user1.setUserType(UserType.admin);
        users.add(user1);

        User user2 = new User();
        user2.setUsername("Marco");
        user2.setPassword(passwordEncoder.encode("marco123"));
        user2.setUserType(UserType.admin);
        users.add(user2);

        User user3 = new User();
        user3.setUsername("Giulia");
        user3.setPassword(passwordEncoder.encode("giulia123"));
        user3.setUserType(UserType.user);
        users.add(user3);

        User user4 = new User();
        user4.setUsername("Michael");
        user4.setPassword(passwordEncoder.encode("michael123"));
        user4.setUserType(UserType.user);
        users.add(user4);

        User user5 = new User();
        user5.setUsername("Sofia");
        user5.setPassword(passwordEncoder.encode("sofia123"));
        user5.setUserType(UserType.user);
        users.add(user5);


        userRepository.saveAll(users);

        System.out.println("Starting seeding for the Post Table");

        List<Post> posts = new ArrayList<>();

        Post post1 = new Post();
        post1.setTitle("Analisi del conflitto: le prospettive per un cessate il fuoco e la crisi umanitaria");
        post1.setText("Il dibattito sulla situazione in Medio Oriente si fa sempre più serrato. " +
                "In questo post analizziamo l'impatto dei recenti sviluppi sui civili in Cisgiordania e nella Striscia di Gaza, " +
                "esaminando il ruolo della diplomazia internazionale nel tentativo di mediare una tregua duratura " +
                "e garantire l'accesso ai corridoi umanitari.");
        post1.setCreationDate(getRandomTimestamp());
        post1.setCount_replies(2);
        post1.setAuthor(user3);
        posts.add(post1);

        Post post2 = new Post();
        post2.setTitle("Il ruolo della diplomazia internazionale nel 2026");
        post2.setText("Nonostante gli sforzi delle Nazioni Unite, la strada verso una soluzione a due stati rimane in salita. Analizziamo le ultime dichiarazioni dei mediatori.");
        post2.setCreationDate(getRandomTimestamp());
        post2.setCount_replies(2);
        post2.setAuthor(user3);
        posts.add(post2);

        Post post3 = new Post();
        post3.setTitle("L'impatto del conflitto sulle infrastrutture civili");
        post3.setText("Un report dettagliato sulla ricostruzione necessaria nelle zone colpite. Come la comunità internazionale può intervenire per ripristinare i servizi di base?");
        post3.setCreationDate(getRandomTimestamp());
        post3.setCount_replies(0);
        post3.setAuthor(user5);
        posts.add(post3);

        Post post4 = new Post();
        post4.setTitle("Voci dal campo: testimonianze dei volontari medici");
        post4.setText("Abbiamo raccolto le storie di chi lavora negli ospedali da campo. Una prospettiva umana e cruda sulle difficoltà quotidiane della sanità.");
        post4.setCreationDate(getRandomTimestamp());
        post4.setCount_replies(0);
        post4.setAuthor(user5);
        posts.add(post4);

        Post post5 = new Post();
        post5.setTitle("Sicurezza e confini: le nuove tecnologie di monitoraggio");
        post5.setText("L'uso di droni e AI per la sorveglianza delle linee di demarcazione sta cambiando il volto della sicurezza nell'area. Quali sono le implicazioni etiche?");
        post5.setCreationDate(getRandomTimestamp());
        post5.setCount_replies(1);
        post5.setAuthor(user3);
        posts.add(post5);

        Post post6 = new Post();
        post6.setTitle("Educazione sotto assedio: il futuro delle scuole a Gaza");
        post6.setText("Migliaia di bambini hanno perso l'accesso all'istruzione. Esploriamo le iniziative di e-learning nate per sopperire alla chiusura delle scuole.");
        post6.setCreationDate(getRandomTimestamp());
        post6.setCount_replies(1);
        post6.setAuthor(user3);
        posts.add(post6);

        Post post7 = new Post();
        post7.setTitle("Patrimonio culturale: i siti storici a rischio");
        post7.setText("Non solo vite umane, ma anche millenni di storia sono sotto minaccia. Un appello dell'UNESCO per la protezione dei siti archeologici.");
        post7.setCreationDate(getRandomTimestamp());
        post7.setCount_replies(0);
        post7.setAuthor(user5);
        posts.add(post7);

        postRepository.saveAll(posts);

        System.out.println("Starting seeding for the Comment");

        List<Comment> comments = new ArrayList<>();

        Comment c1 = new Comment();
        c1.setPost(post1);
        c1.setAuthor(user2);
        c1.setText("Spero che i corridoi umanitari vengano aperti il prima possibile, la situazione è critica.");
        c1.setCreatedAt(getRandomTimestamp());
        comments.add(c1);

        Comment c2 = new Comment();
        c2.setPost(post1);
        c2.setAuthor(user3);
        c2.setText("La diplomazia internazionale sembra muoversi troppo lentamente rispetto alla velocità del conflitto.");
        c2.setCreatedAt(getRandomTimestamp());
        comments.add(c2);

        Comment c3 = new Comment();
        c3.setPost(post2);
        c3.setAuthor(user4);
        c3.setText("Un'analisi molto lucida. Credo che il ruolo dei mediatori regionali sia ancora sottovalutato.");
        c3.setCreatedAt(getRandomTimestamp());
        comments.add(c3);

        Comment c4 = new Comment();
        c4.setPost(post2);
        c4.setAuthor(user2);
        c4.setText("Concordo con l'articolo, senza una volontà politica interna la mediazione esterna può fare ben poco.");
        c4.setCreatedAt(getRandomTimestamp());
        c4.setMuted(true);
        comments.add(c4);

        Comment c5 = new Comment();
        c5.setPost(post5);
        c5.setAuthor(user3);
        c5.setText("L'uso dell'AI in guerra apre scenari etici spaventosi. Chi è responsabile in caso di errore dell'algoritmo?");
        c5.setCreatedAt(getRandomTimestamp());
        comments.add(c5);

        Comment c6 = new Comment();
        c6.setPost(post6);
        c6.setAuthor(user4);
        c6.setText("Garantire l'istruzione ai bambini è l'unico modo per costruire una speranza di pace per il futuro.");
        c6.setCreatedAt(getRandomTimestamp());
        comments.add(c6);

        commentRepository.saveAll(comments);

        System.out.println("Starting seeding for the Category");


        List<Category> categories = new ArrayList<>();

        Category ca1 = new Category();
        ca1.setCategoryName("Patrimonio culturale");
        categories.add(ca1);

        Category ca2 = new Category();
        ca2.setCategoryName("sadas");
        categories.add(ca2);

        Category ca3 = new Category();
        ca3.setCategoryName("Palla");
        categories.add(ca3);

        Category ca4 = new Category();
        ca4.setCategoryName("Canestro");
        categories.add(ca4);

        Category ca5 = new Category();
        ca5.setCategoryName("Lollo");
        categories.add(ca5);

        categoryRepository.saveAll(categories);

        System.out.println("Starting seeding for the News");


        List<News> news = new ArrayList<>();

        News n1 = new News();
        n1.setTitle("Nuovi corridoi umanitari aperti nel sud della Striscia");
        n1.setDescription("Accordo raggiunto per il passaggio di aiuti medici e beni di prima necessità.");
        n1.setContent("Dopo giorni di trattative mediate dall'Egitto, è stato confermato l'accesso a 50 camion carichi di forniture mediche. " +
                "La distribuzione inizierà nelle prossime ore sotto la supervisione delle Nazioni Unite.");
        n1.setImg("https://picsum.photos/seed/news0/800/600");
        n1.setSrc("Agenzia Stampa Internazionale");
        n1.setLocation("Khan Yunis");
        n1.setPublished_at(getRandomTimestamp());
        n1.setCategory(ca5);
        news.add(n1);

        News n2 = new News();
        n2.setTitle("Vertice di pace a Ginevra: le prime dichiarazioni");
        n2.setDescription("Le delegazioni internazionali si incontrano per discutere i termini del cessate il fuoco.");
        n2.setContent("La conferenza di Ginevra del 2026 segna un momento cruciale. I rappresentanti di UE e USA hanno presentato " +
                "una bozza di accordo che prevede una zona demilitarizzata e il monitoraggio elettronico dei confini.");
        n2.setImg("https://picsum.photos/seed/news1/800/600");
        n2.setSrc("Diplomatic Post");
        n2.setLocation("Ginevra");
        n2.setPublished_at(getRandomTimestamp());
        n2.setCategory(ca4);
        news.add(n2);

        News n3 = new News();
        n3.setTitle("Implementazione di sensori AI lungo la Linea Verde");
        n3.setDescription("Nuove tecnologie per prevenire infiltrazioni e monitorare gli spostamenti civili.");
        n3.setContent("Il nuovo sistema di monitoraggio basato su intelligenza artificiale promette di ridurre gli incidenti armati. " +
                "Tuttavia, restano forti dubbi sulla privacy dei cittadini residenti nelle zone limitrofe.");
        n3.setImg("https://picsum.photos/seed/news2/800/600");
        n3.setSrc("Tech & Geopolitics");
        n3.setLocation("Gerusalemme");
        n3.setPublished_at(getRandomTimestamp());
        n3.setCategory(ca2);
        news.add(n3);

        News n4 = new News();
        n4.setTitle("Concerto per la pace: artisti locali si uniscono a Ramallah");
        n4.setDescription("Un evento musicale per raccogliere fondi destinati alla ricostruzione delle scuole.");
        n4.setContent("Oltre diecimila persone hanno partecipato al concerto di ieri. I fondi raccolti saranno gestiti " +
                "da un fondo fiduciario internazionale per la riqualificazione dei centri educativi danneggiati.");
        n4.setImg("https://picsum.photos/seed/news3/800/600");
        n4.setSrc("Culture Voice");
        n4.setLocation("Ramallah");
        n4.setPublished_at(getRandomTimestamp());
        n4.setCategory(ca1);
        news.add(n4);

        newsRepository.saveAll(news);

        System.out.println("Database seeded correctly!");
    }

    private Timestamp getRandomTimestamp() {
        long offset = (long) (Math.random() * 30L * 24 * 60 * 60 * 1000);
        return new Timestamp(System.currentTimeMillis() - offset);
    }
}
