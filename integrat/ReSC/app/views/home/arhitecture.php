<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../../css/raport.css">
    <title>Arhitecture</title>
</head>

<body>
    <header>
        <h1>Raport arhitectura de ansamblu</h1>
        <div class="main_div">
            <section class="authors" typeof="sa:AuthorsList">
                <h2>Autori</h2>
                <ul>
                    <li typeof="sa:ContributorRole" property="schema:author">
                        <span typeof="schema:Person">
                <meta property="schema:givenName" content="Cosmin" />
                <meta property="schema:familyName" content="Dărăbăneanu" />
                <span property="schema:name">Dărăbăneanu Cosmin</span>
                        </span>
                        <ul>
                            <li property="schema:roleContactPoint" typeof="schema:ContactPoint">
                                <a href="mailto:" property="schema:email">darabaneanucosmin81@gmail.com</a
                  >
                </li>
                <li
                  property="schema:roleContactPoint"
                  typeof="schema:ContactPoint"
                >
                  <a href="mobile:+40" property="schema:mobileNumber"
                    >+40750723384</a
                  >
                </li>
              </ul>
            </li>
          </ul>
          <ul>
            <li typeof="sa:ContributorRole" property="schema:author">
              <span typeof="schema:Person">
                <meta property="schema:givenName" content="Cosmin" />
                <meta property="schema:familyName" content="Modoranu" />
                <span property="schema:name">Modoranu Ionuț-Cosmin</span>
              </span>
              <ul>
                <li
                  property="schema:roleContactPoint"
                  typeof="schema:ContactPoint"
                >
                  <a href="mailto:" property="schema:email"
                    > zero6305@gmail.com</a
                  >
                </li>
                <li
                  property="schema:roleContactPoint"
                  typeof="schema:ContactPoint"
                >
                  <a href="mobile:+40" property="schema:faxNumber"
                    >+40742449818
                    </a
                  >
                </li>
              </ul>
            </li>
          </ul>
          <ul>
            <li typeof="sa:ContributorRole" property="schema:author">
              <span typeof="schema:Person">
                <meta property="schema:givenName" content="Andrei" />
                <meta property="schema:familyName" content="Fărcal" />
                <span property="schema:name">Fărcal Andrei-Ioan</span>
              </span>

              <ul>
                <li
                  property="schema:roleContactPoint"
                  typeof="schema:ContactPoint"
                >
                  <a href="mailto:andreifarcal@yahoo.com" property="schema:email"
                    >andreifarcal@yahoo.com</a
                  >
                </li>
                <li
                  property="schema:roleContactPoint"
                  typeof="schema:ContactPoint"
                >
                  <a href="mobile:+40748507424" property="schema:faxNumber"
                    >+40748507424</a
                  >
                </li>
              </ul>
            </li>
          </ul>
        </section>
        <article class="main_raport">
            <h2>1.Diagrame</h2>
            <h3>1.1 Diagrama proiectului</h3>
            <img src="../../img/arhitecture/generalDiagram.png" alt="Header" class="documentation__images">
                 <p>   Aplicația conține următoarele componente :
                </p>
                    <ol>
                        <li>
                            Server : Comunică cu utilizatorul în momentul în care acesta dorește să se înregistreze/conecteze.
                            Realizează operații de adăugare în baza de date a informațiilor obținute după crearea unei noi sesiuni.
                        </li>
                        <li>
                            Rest API : Clientul face cereri către  API pentru a construi o noua cameră de discuții,
                             extrage  informațiile necesare afisării discuțiilor private dintre admin-utilizator,
                             dar și pentru afișarea mesajelor dintr-o cameră globală.
                           
                        </li>
                        <li>
                            Baza de date : realizează toate operațiile CRUD.
                        </li>
                    </ol>
                
           <h3>1.2 Diagrama API</h3>
           <img src="../../img/arhitecture/diagramaAPI.PNG" alt="Header" class="documentation__images">
           
           <p>
            În cadrul proiectul am construit un API cu scopul de a extrage/adauga date într-un mod simplu și rapid.
            </p>
           <p>
            Este împărțit în  3 părți :
            </p>  
            <ol>
              <li>
                Room:
                <ul>
                  <li>
                    RoomController :  endpoint-urile necesare pentru metodele  specifice room-ului.
                    <ul>
                      <li>
                        crearea unui nou room privat
                      </li>
                      <li>
                        afișarea listei de camere 
                      </li>
                      <li>
                        afișarea detaliilor despre o anumită cameră în funcție de datele utilizatorului
                      </li>
                      <li>
                        afișarea datelor despre o anumită cameră în funcție de idRoom-ul pe care il primim
                      </li>
                    </ul>
                   </li>
                  <li>
                    RoomService : implementează  metodele specificate în RoomController.
                  </li>
                  <li>
                    connection : gestionează operațiile specifice bazei de date.
                  </li>
                  
                </ul>
              </li>
              <li>
                Message :
                <ul>
                  <li>
                    MessageController : endpoint-urile necesare pentru metodele  specifice mesajelor.
                    <ul>
                      <li>
                        în funcție de un anumit sessionId se returnează toate mesajele dintr-un anumit room
                      </li>
                      <li>
                        adaugarea unui mesaj într-o cameră
                      </li>
                      <li>
                        adaugarea unui admin într-un room
                      </li>
                      <li>
                        returnarea ultimului mesaj din baza de date pentru o anumită cameră
                      </li>
                    </ul>
                  </li>
                  <li>
                    MessageService :  implementează  metodele specificate în MessageController.
                  </li>
                  <li>
                    connection : gestionează operațiile specifice bazei de date.
                  </li>
                </ul>
              </li>
              <li>
                User :
                
                <ul>
                <li>
                  UserController : endpoint-urile necesare pentru metodele  specifice utilizatorilor.
                  <ul>
                    <li>
                      crearea unui sesiuni și asignarea userului
                    </li>
                    <li>
                      actualizează statusul unui utilizator
                    </li>
                    <li>
                      afișarea datelor despre un anumit user
                    </li>
                    <li>
                      generearea unui id de sesiune
                    </li>
                  </ul>
                </li>
                <li>
                  UserService : implementează  metodele specificate in UserController.
                </li>
                <li>
                  connection : gestionează operațiile specifice bazei de date.
                </li>
              </ul>
              </li>
            </ol>
              <h3>1.3 Diagrama UML</h3>
              <p>
                Baza de date utilizată se numește MySQL.Relațiile dintre tabele sunt prezentate în următoarea figură.
              </p>
                
              <img src="../../img/arhitecture/diagramaUML.png" alt="Header" class="documentation__images"> 
              <p>Tabela :</p> 
              <ol>
               <li>
                  User : memorează datele utilizatorilor înregistrați.
                </li>
                <li>
                  Session : memorează sesiunea curentă a unui vizitator și este actualizată dacă userul are un cont și se conectează
                  de pe un alt dispozitiv/sesiunea curentă a expirat.
                </li>
                <li>
                  Room : ține evidența camerelor de discuții pe care utilizatorul/vizitatorul o poate avea cu un admin sau  
                  globală( vizibilă pentru întreaga comunitate).
                </li>
                <li>
                  joinmessages : stochează  perechile utilizator-camera.
                </li>
                <li>
                  Messages : stochează toate mesajele din toate camerele.
                </li>
              </ol>
              <p>
              Proiectul este într-o strânsă legatură cu baza de date, deoarece întreaga logică a fost facută în funcție de tabelele 
              pe care le-am prezentat mai sus.
              </p>
              
              Cazuri posibile : 
              <ol>
                <li>
                  Utilizatorul nu are cont : 
                    <p>
                        Atunci când vizitatorul  accesează pagina principala se generează un sessionID.În momentul în care apasă butonul de chat 
                        este rugat să introducă un username.În acest moment sunt adăugate în baza de date sessionID, 
                         username-ul, data  și  idUser(un numar generat automat).Se construiește o camera(sunt luate datele utilizatorului din tabela session,
                         se genereaza un numar aleatoriu pentru camera si sunt adaugate in tabelele Room si joinmessages),  odata ce utilizatorul apasa
                          pe butonul de chat, înseamnă că are intenția de a transmite un mesaj către un admin sau pe chatul global.
                         Camera globala este creată automat la pornirea programului și toți utilizatorii ce au accesat pagina  sunt adaugați .
                         Toate mesajele pe care respectivul vizitator le trimite sunt salvate în tabela Messages.
                        In tabela joinmessages sunt toți utilizatorii ce au  intenția de a apăsa pe butonul de chat.

                      </p>
                      
                    
                </li>
                <li>
                  Utilizatorul are un cont :
                  <p>
                    In cazul in care utilizatorul are deja un cont, atunci cand se conecteaza se genereaza un nou sessionID
           si este  actualizat in  tabela Session.Avantajul unui utilizator logat este ca nu isi pierde conversatiile, poate sa le  acceseze  dupa o perioada  de timp . 
                  </p>
                </li>
              </ol>    
              <h2>
                2.Etapele intermediare ale dezvoltării proiectului
              </h2>
              Proiectul ReSC a fost impartit initial in doua module :
               
              <ol>
                <li>
                    Front-end : acest modul a fost realizat in prima parte a proiectului si au fost implementate urmatoarele : 
                    <ul>
                      <li>
                    Pagina principala
                    
                    <ul>
                      <li>
                        Header
                        <ul>
                          <li>
                            Butoane media
                          </li>
                          <li>
                            Buton logare + pagina logare
                          </li>
                          <li>
                            Buton inregistrare + pagina inregistrare
                          </li>
                          <li>
                            Meniu
                            <ul>
                              <li>
                                Home
                              </li>
                              <li>
                                About + pagina about
                              </li>
                            </ul>
                          </li>
                        </ul>
                      
                      </li>

                      <li>
                        Body
                        <ul>
                          <li>
                            Cautare locatie/hotel/activitati
                          </li>
                          <li>
                            Carusel locații populare
                          </li>
                          <li>
                            Diferite locatii interesante
                          </li>
                          <li>
                            Chat box
                          </li>
                        </ul>
                      </li>
                    </ul> 
                  </li>
                  <li>
                    Pagina adminului
                    <ul>
                      <li>
                        Body
                        <ul>
                          <li>Panou lista camere</li>
                          <li>
                            Panou lista mesaje
                          </li>
                          <li>
                            Panou personalizare
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
                </li>
                <li>
                  Back-end : acest modul a fost realizat în a doua parte a proiectului si  conține mai multe componente  :
                  <ul>
                    <li>
                      API :
                      <ul>
                        <li>
                          RoomController
                        </li>
                        <li>
                          RoomService
                        </li>
                        <li>
                          MessageController
                        </li>
                        <li>
                          MessageService
                        </li>
                        <li>
                          UserController
                        </li>
                        <li>
                          UserService
                        </li>
                        <li>
                          connection
                        </li>
                      </ul>
                    </li>
                    <li>
                      Server php : 
                      <ul>
                        <li>
                          Gestionare sesiuni
                        </li>
                        <li>
                          Inregistrare
                        </li>
                        <li>
                          Conectare 
                        </li>
                        
                      </ul>
                    </li>
                    <li>
                      Client php :
                      <ul>
                        <li>
                          Script chat box
                        </li>
                        <li>
                          Script admin panel
                        </li>
                        <li>
                          Schimbare temă :
                          <ul>
                            <li>
                              Lightmode
                            </li>
                            <li>
                              Darkmode
                            </li>
                          </ul>
                        </li>
                        <li>
                          Emoji list
                        </li>
                        
                      </ul>
                    </li>
                    <li>
                      Baza de date : 
                      <ul>
                        <li>
                          CRUD
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                
              </ol>
              <h2>
                3.Cod relevant
              </h2>
              <h3>3.1 API</h3>
              <img src="../../img/arhitecture/cod_API.png" alt="Header" class="documentation__images"> 
              <p>
              Functia fetchMessages este o functie de tip GET, returneaza toate mesajele  utilizatorului ce are id-ul de sessiune egal cu idSession si se afla in camera idRoom.
              <br>
              Se determina id-ul userului in functie de idSession si in cazul in care acesta nu exista se arunca un mesaj de eroare.
              Se verifica daca idRoom-ul primit exista in baza de date in tabela joinmessages.
              In cazul in care toate datele primite sunt corecte se realizeaza un join intre messages si rezultatul unionului intre admin,user si session
               pentru a obtine informatii despre mesaj : idMesaj,idRoom,idUser,clientMessage,sent_message_date,id,username,sentByMe.
              </p>
              <h3>3.2 Chatbox</h3>
              <img src="../../img/arhitecture/cod_chatBox.png" alt="Header" class="documentation__images"> 
              <p>
              In functia startUpdatingChat se seteaza un interval pe functia aquireMessagesAndUpdateChatData,
              la fiecare shortPollTime se face un GET de mesaje folosind aquireMessageList din apiCalls.js,
              se sorteaza dupa idMesaj si apoi se adauga in chat elementele DOM (speech bubble-urile)
              din functia updateMessageBubble.

              Apoi fetchRoomData face rost de date precum numeAdminAsignat sau daca nu e niciunul asignat
              in updateHeaderInformation apare un mesaj de genul "Ask us any question" altfel apare
              "Chatting with [adminName]" "[helperRank]". Se returneaza latestIntervalId pentru a face
              clear usor atunci cand iesim de pe chat si mergem la lista de contacte sau facem minimize
              ca sa putem opri updatarea mesajelor pentru atunci cand nu e chatbox-ul vizibil.
              </p>
              <h3>3.3 AdminPanel</h3>
              <img src="../../img/arhitecture/cod_adminPanel1.png" alt="Header" class="documentation__images"> 
              <img src="../../img/arhitecture/cod_adminPanel2.png" alt="Header" class="documentation__images"> 
             <p>
             Functia conversation() are rolul de a afisa mesajele noi adaugate atat de utilizatori cat si de administratori. 
             In prima faza aceasta face o interogare catre API pentru a vedea daca exista mesaje noi in conversatii. 
             In caz afirmativ API-ul returneaza mesajul nou. In a doua parte a functie, mesajul care tocmai a fost transmis de API este parsat pentru a vedea eventualele caractere speciale,
              si anume "$" care semnifica un emote. Mesajul este rescris si in functie de camera de chat de care apartine, private (1:1) sau global (1:n),
              acesta este afisat in pagina. Pentru a realiza afisarea de mesaje in timp real functia se autoapeleaza la interval de 1 secunda.
             </p>
        </article>
        </div>
    </header>
</body>
</html>