<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../../css/raport.css">
    <title>Raport ReSC</title>
</head>

<body>
    <header>
        <h1>Raport ReSC</h1>
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

        <section class="main_raport">
          <h2>1.Introducere</h2>
          <h3>1.1 Scop</h3>
          <p>
            Scopul acestui document este de a face o prezentare detaliata a
            proiectului Realtime Support Chat. Vom prezenta scopul,
            caracteristicile si interfata softului.
          </p>
          <h3>1.2 Conventiile documentului</h3>
          <p>Acest document a fost realizat pe baza template-ului IEEE-SRS .</p>
          <h3>1.3 Public-tinta</h3>
          <p>
            Este un serviciu ideal pentru serviciile online destinate clientilor
            care pot intampina probleme.
          </p>
          <h3>1.4 Scopul produsului</h3>
          <p>
            In cadrul proiectului, scopul produsului este de a pune la
            dispozitie servicii de suport real time clientilor in momentul in
            care acestia au anumite neclaritati.
          </p>

          <h3>1.5 Referinte</h3>
          <ol>
            <li>
              Codul sursa
              : <a href="https://github.com/DarabaneanuCosmin/Realtime-Support-Chat">
                https://github.com/DarabaneanuCosmin/Realtime-Support-Chat
              </a>
                            </li>

                            <li>Mediu de invatare:</li>
                            <ol>
                                <li>
                                    <a href="https://iampava.com/web-technologies">
                                    -Web Technologies | I AM PAVA
                                 </a>
                                </li>

                                <li>
                                    <a href="https://developer.mozilla.org/en-US/">
                                        -MDN Web Docs (mozilla.org)
                                          </a>

                                </li>

                            </ol>
                            </ol>

                            <h2>2. Descriere de ansamblu</h2>
                            <h3>2.1 Perspectiva produsului</h3>
                            <p>
                                ReSC este un script destinat site-urilor web ce duc lipsa de un sistem de tipul real time support chat. Programul este un proiect open source.
                            </p>

                            <h3>2.2 Functiile produsului</h3>
                            <ol>
                                <li>
                                    Pagina utilizatorului:
                                    <ol>
                                        <li>
                                            Header
                                            <ol>
                                                <li>Social buttons = Discord, Facebook, Instagram.</li>
                                                <li>Account buttons = Login, Register.</li>
                                                <li>Navigation buttons = Home, About, Support.</li>
                                            </ol>
                                        </li>
                                        <li>Body</li>
                                        <ol>
                                            <li>Search System</li>
                                            <li>
                                                Hoteluri
                                                <ol>
                                                    <li>Alege o destinatie;</li>
                                                    <li>Data sosire;</li>
                                                    <li>Data plecare;</li>
                                                    <li>Numar camere;</li>
                                                    <li>Buton cauta Hotel;</li>
                                                </ol>
                                            </li>
                                            <li>
                                                Activitati
                                                <ol>
                                                    <li>Locatieș</li>
                                                    <li>Data sosire;</li>
                                                    <li>Data plecare;</li>
                                                    <li>
                                                        Numar persoane:
                                                        <ol>
                                                            <li>Adulti;</li>
                                                            <li>Copii;</li>
                                                        </ol>
                                                    </li>
                                                    <li>Buton cauta activitati.</li>
                                                </ol>
                                            </li>

                                            <li>
                                                Transport
                                                <ol>
                                                    <li>Locatie plecare;</li>
                                                    <li>Locatie sosire;</li>
                                                    <li>Data sosire;</li>
                                                    <li>Data plecare;</li>
                                                    <li>
                                                        Numar pasageri:

                                                        <ol>
                                                            <li>Adulti;</li>
                                                            <li>Copii;</li>
                                                        </ol>
                                                    </li>
                                                    <li>Buton cauta transport.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                Carusel imagini:
                                                <ol>
                                                    <li>
                                                        Locatii populare.
                                                    </li>
                                                </ol>
                                            </li>
                                            <li>Postari populare:</li>
                                            <li>
                                                Suport chat:
                                                <ol>
                                                    <li>
                                                        Fereastra de chat;
                                                    </li>
                                                    <li>
                                                        Fereastra de mesaje recente;
                                                    </li>
                                                </ol>
                                            </li>
                                        </ol>
                                        <li>
                                            Footer:
                                            <ol>
                                                <li>
                                                    Butoane social media:
                                                    <ol>
                                                        <li>Facebook;</li>
                                                        <li>Twitter;</li>
                                                        <li>Instagram;</li>
                                                    </ol>
                                                </li>

                                                <li>
                                                    Sectiune ajutor:
                                                    <ol>
                                                        <li>Contacteaza-ne;</li>
                                                        <li>Informatii returnare;</li>
                                                    </ol>
                                                </li>
                                                <li>
                                                    Sectiune de confidentialitate:
                                                    <ol>
                                                        <li>Politica de confidentialitate;</li>
                                                        <li>Termeni si conditii;</li>
                                                    </ol>
                                                </li>
                                            </ol>
                                        </li>
                                    </ol>
                                </li>
                                <li>
                                    Pagine administrator :
                                    <ol>
                                        <li>
                                            Body:
                                            <ol>
                                                <li>Conversatii:
                                                    <ol>
                                                        <li>
                                                            Lista utilizatori;
                                                        </li>
                                                    </ol>
                                                </li>

                                                <li>Chat mesaje;</li>
                                                <li>
                                                    Setari conversatie:
                                                    <ol>
                                                        <li>
                                                            Personalizare:
                                                            <ol>
                                                                <li>Shimba tema;</li>
                                                                <li>Schimba emoji;</li>
                                                            </ol>
                                                        </li>
                                                        <li>
                                                            Confidentialitate:
                                                            <ol>
                                                                <li>Sterge conversatia;</li>
                                                                <li>Blocheaza utilizatorul;</li>
                                                            </ol>
                                                        </li>
                                                    </ol>
                                                </li>
                                            </ol>
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                            <h3>2.4 Mediul de operare</h3>
                            <p>Navigator web.</p>
                            <h3>2.5 Proiectare si implementarea Constrangerilor</h3>
                            <p>
                                ReSC este dezvoltat in PHP, HTML,CSS si JavaScript, utilizand IDE-ul Visual Studio Code si o baza de date MySQL . Integram un API REST/GraphQL in propriile sisteme de tip CRM.
                            </p>
                            <h3>2.6 Documentatie utilizator</h3>
                            <section>
                                <ol>
                                    <li>Pagina principala
                                        <ol>
                                            <li>
                                                Header
                                                <ol>
                                                    <li>
                                                        <img src="../../img/raport_images/header.png" alt="Header" class="documentation__images">

                                                        <ol>
                                                            <li>
                                                                Buton Home : Utilizatorul este redirectionat catre pagina principala.
                                                            </li>
                                                            <li>
                                                                Buton About : Utilizatorul este redirectionat catre documentatia site-ului.
                                                            </li>
                                                            <li>

                                                                Buton Support : Este specific administratorilor sistemului. Clientul nu are acces la acest buton.
                                                            </li>
                                                            <li>
                                                                Butoane Social : Ne puteti gasi si pe Discord, Facebook, Instagram.
                                                            </li>

                                                        </ol>
                                                        <li>
                                                            <img src="../../img/raport_images/login-button.PNG" alt="login" class="documentation__images">
                                                            <ol>
                                                                <li>
                                                                    Buton Login : Utilizatorul trebuie sa introduca datele specifice conectari.

                                                                </li>
                                                            </ol>
                                                        </li>
                                                        <li>
                                                            <img src="../../img/raport_images/register.PNG" alt="Register" class="documentation__images">
                                                            <ol>
                                                                <li>

                                                                    Buton Register : Utilizatorul trebuie sa introduca datele specifice inregistrarii.
                                                                </li>
                                                            </ol>
                                                        </li>
                                                    </li>
                                                </ol>

                                                <li>
                                                    Body
                                                    <ol>
                                                        <li>
                                                            <div class="documentation__containe-images">
                                                                <img src="../../img/raport_images/body-searchbar.png" alt="Header" class="documentation__search">
                                                                <img src="../../img/raport_images/body-searchbar2.png" alt="Header" class="documentation__search">
                                                                <img src="../../img/raport_images/body-searchbar3.png" alt="Header" class="documentation__search">
                                                            </div>
                                                        </li>
                                                        <ol>
                                                            <li>
                                                                Buton Hoteluri :
                                                                <ol>
                                                                    <li>
                                                                        Alege o destinatie;
                                                                    </li>
                                                                    <li>
                                                                        Orasul de plecare;
                                                                    </li>
                                                                    <li>
                                                                        Data intrare : Prima zi de cazare;
                                                                    </li>
                                                                    <li>
                                                                        Data iesire : Ultima zi de cazare;
                                                                    </li>
                                                                    <li>
                                                                        Numar de camere : Numarul de camere pe care un utilizator doreste sa le inchirieze;
                                                                    </li>
                                                                    <li>
                                                                        Buton cauta hotel : Trimite datele catre server si afiseaza informatiile disponibile.
                                                                    </li>
                                                                </ol>
                                                            </li>
                                                            <li>
                                                                Buton Activitati :
                                                                <ol>
                                                                    <li>
                                                                        Locatie : Zona unde clientul doreste sa realizeze diferite activitati;
                                                                    </li>
                                                                    <li>
                                                                        Data intrare : Ziua cand acesta doreste sa participe;
                                                                    </li>
                                                                    <li>
                                                                        Data iesire : Ultima zi de participare;
                                                                    </li>
                                                                    <li>
                                                                        Numar pasageri : Numarul de persoane ce doresc sa se implice in activitate;
                                                                        <ol>
                                                                            <li>
                                                                                Numar adulti;
                                                                            </li>
                                                                            <li>
                                                                                Numar copii;
                                                                            </li>
                                                                        </ol>
                                                                    </li>
                                                                </ol>
                                                            </li>
                                                            <li>
                                                                Buton Transport :
                                                                <ol>
                                                                    <li>Locatie plecare;</li>
                                                                    <li>Locatie sosire; </li>
                                                                    <li>Data plecare : Data cand clientul doreste sa calatoreasca; </li>
                                                                    <li>Data sosire : Data cand doreste sa ajunga cel tarziu(in cazul in care nu sunt locuri disponibile); </li>

                                                                    <li>
                                                                        Numar pasageri.

                                                                        <ol>
                                                                            <li>Adulti;</li>
                                                                            <li>Copii;</li>
                                                                        </ol>
                                                                    </li>
                                                                    <li>Buton cauta transport : afiseaza informatiile disponibile.</li>
                                                                </ol>
                                                            </li>
                                                        </ol>
                                                        <li>
                                                            Carusel imagini :
                                                            <img src="../../img/raport_images/best-locations.png" alt="Locatii" class="documentation__images">
                                                            <ol>
                                                                <li>
                                                                    Sunt afisate toate locatiile populare.
                                                                </li>
                                                            </ol>
                                                        </li>
                                                        <li>
                                                            Diferite locatii :
                                                            <img src="../../img/raport_images/locations.png" alt="Locatii" class="documentation__images">
                                                            <ol>
                                                                <li>
                                                                    Diferite locatii pe care si alte persoane le-au gasit interesante.
                                                                </li>
                                                            </ol>
                                                        </li>
                                                        <li>
                                                            Chat box :
                                                            <ol>
                                                                <li>
                                                                    <img src="../../img/raport_images/chat-box.png" alt="Chat-box" class="documentation__images">
                                                                    <ol>
                                                                        <li>
                                                                            Clientul scrie mesajul in "Scrie ceva.." si il poate trimite cu ajutorul butonului Send.
                                                                        </li>
                                                                        <li>
                                                                            In cel mai scurt timp, administratorul o sa il contacteze.

                                                                        </li>
                                                                        <li>
                                                                            Utilizatorul trebuie sa fie inregistrat si conectat la cont pentru a putea obtine suport din partea administratorilor.
                                                                        </li>
                                                                        <li>
                                                                            Butonul din dreapta jos ii permite utilizatorului sa isi vada cele mai recente conversatii.
                                                                        </li>
                                                                    </ol>
                                                                </li>
                                                                <li>
                                                                    <img src="../../img/raport_images/chat-box-users.png" alt="Chat-box" class="documentation__images">
                                                                    <ol>
                                                                        <li>
                                                                            Conversatiile recente;
                                                                        </li>
                                                                    </ol>
                                                                </li>

                                                            </ol>
                                                        </li>
                                                    </ol>

                                                </li>

                                                <li>
                                                    Footer
                                                    <ol>
                                                        <li>
                                                            <img src="../../img/raport_images/footer.png" alt="Footer" class="documentation__images">
                                                        </li>
                                                        <ol>
                                                            <li>
                                                                Help
                                                                <ol>
                                                                    <li>
                                                                        Contact us :
                                                                        <ol>
                                                                            <li>
                                                                                Redirectare catre datele de contact ale dezvoltatorilor.
                                                                            </li>

                                                                        </ol>
                                                                    </li>
                                                                    <li>
                                                                        Returns information :
                                                                        <ol>
                                                                            <li>
                                                                                Redirectare catre pagina de returnare a bunurilor materiale.
                                                                            </li>
                                                                        </ol>
                                                                    </li>
                                                                </ol>
                                                            </li>
                                                            <li>
                                                                Privacy & Legal :
                                                                <ol>
                                                                    <li>
                                                                        Privacy Policy;
                                                                    </li>
                                                                    <li>
                                                                        Terms & Conditions;
                                                                    </li>
                                                                </ol>
                                                            </li>
                                                            <li>
                                                                Our social Networks :
                                                                <ol>
                                                                    <li>
                                                                        Facebook;
                                                                    </li>
                                                                    <li>
                                                                        Twitter;
                                                                    </li>
                                                                    <li>
                                                                        Instagram;
                                                                    </li>
                                                                </ol>


                                                            </li>
                                                        </ol>
                                                    </ol>

                                                </li>

                                            </li>

                                        </ol>
                                    </li>
                                    <li>
                                        Pagina principala a administratorului
                                        <ol>
                                            <li>
                                                <img src="../../img/raport_images/admin-page.png" alt="administrator__Page" class="documentation__images">
                                                <ol>
                                                    <li>
                                                        Conversatii :
                                                        <ol>
                                                            <li>
                                                                Administratorul are acces la lista tuturor mesajelor.
                                                            </li>
                                                            <li>
                                                                Acesta poate selecta mesajul pe care doreste sa il vizualizeze.
                                                            </li>
                                                        </ol>
                                                    </li>
                                                    <li>
                                                        Chat conversatie :
                                                        <ol>
                                                            <li>
                                                                Zona destinata conversatiei dintre administrator si client.
                                                            </li>
                                                        </ol>
                                                    </li>
                                                    <li>
                                                        Setari conversatie :
                                                        <ol>
                                                            <li>
                                                                <ol>
                                                                    Personalizare Conversatie :
                                                                    <ol>
                                                                        <li>

                                                                            Schimba tema:
                                                                            <ol>
                                                                                <li>
                                                                                    Schimbare font,culori,etc.
                                                                                </li>
                                                                            </ol>
                                                                        </li>
                                                                        <li>
                                                                            Schimba emoji:
                                                                            <ol>
                                                                                <li>
                                                                                    Diferite emoji-uri.
                                                                                </li>
                                                                            </ol>
                                                                        </li>

                                                                    </ol>
                                                                    <li>
                                                                        Confidentialitate si asistenta :
                                                                        <ol>
                                                                            <li>
                                                                                Sterge conversatia;

                                                                            </li>
                                                                            <li>
                                                                                Blocheaza utilizator;

                                                                            </li>

                                                                        </ol>
                                                                    </li>
                                                                </ol>
                                                            </li>
                                                        </ol>
                                                    </li>
                                                </ol>
                                            </li>
                                        </ol>
                                    </li>
                                </ol>

                            </section>
                            <h3>2.7 Dependente</h3>
                            <p>Pentru a utiliza ReSC, utilizatorul trebuie sa dispuna de o conexiune la internet.</p>

                            <h2>3. Cerintele interfetei externe:</h2>
                            <h3>3.1 Interfata utilizatorului:</h3>
                            <p>1. ReSC pagina de start;</p>
                            <p>2. ReSC chat;</p>
                            <p>3. Pagina de logare/inregistrare;</p>
                            <p>4. Pagina administratorului;</p>

                            <h3>3.2 Interfata software</h3>
                            <p>ReSC transmite mesaje intre utilizator si departamentul suport al site-ului.</p>

                            <h3>3.3 Interfata de comunicare</h3>
                            <p>ReSC salveaza mesajele utilizatorilor intr-o baza de date, pana cand solicitarea acestuia se solutioneaza. Transmiterea mesajelor se va face prin HTTP Request.</p>



                            <h2>4. Alte cerinte</h2>

                            <h3>4.1 Cerinte de performanta</h3>
                            <p>1 GHz CPU freq, 64 MB RAM, 150 MB Disk space.</p>
                            <h3>4.2 Cerinte de siguranta</h3>
                            <p> Pentru a ne asigura ca ReSC functioneaza corect si nu exista pierderi de date, echipa de dezvoltare actualizeaza regulat aplicatia.</p>
                            <h3>4.3 Cerinte de securitate</h3>
                            <p>In dezvoltarea aplicatiei a fost luata in vedere prevenirea unei breșă de securitate numita SQL Injection si Cross-Site Scripting.</p>
                            <h3>4.4 Avantajele softului</h3>
                            <p>Este foarte usor de implementat pe orice site. Prezinta o interfata prietenoasa pentru utilizatorul. </p>
            </section>
        </div>
    </header>
</body>

</html>