<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="shortcut icon" href="#">
    <link rel="stylesheet" href="/public/fonts/fontsAwesome/awesome.css" />
    <link rel="stylesheet" href="/public/css/header.css" />
    <link rel="stylesheet" href="/public/css/popularLocations.css" />
    <link rel="stylesheet" href="/public/css/chatbox.css" />
    <link rel="stylesheet" href="/public/css/searchSection.css" />
    <link rel="stylesheet" href="/public/css/footer.css" />
    <script src="/public/javascript/account.js"></script>
    <script src="/public/javascript/search.js"></script>
    <title>RealTimeSuport</title>
  </head>
  <body>
    <header class="index_header">
      <img src="/public/img/logo.png" class="index_header_logo" />
      <div class="index_sub_header">
        <div class="social_info_buttons">
          <a href="https://discord.gg/BnquBzKdFA"
            ><button class="discord_join_button"></button
          ></a>
          <a href="https://www.facebook.com/"
            ><button class="social_button_facebook"></button
          ></a>
          <a href="https://www.instagram.com/"
            ><button class="social_button_instagram"></button
          ></a>
        </div>
        <div class="account_options">
          <button
            onclick="displayLoginForm()"
            class="open_login_form"
            id="popup_login"
          >
            Login
          </button>
          <button
            onclick="displayRegisterForm()"
            class="open_register_form"
            id="popup_register"
          >
            Register
          </button>
        </div>
      </div>
    </header>
    <div class="principal_buttons">
      <button>Home</button>
      <a href="/public/home/about/"><button>About</button></a>
      <a href="/public/home/adminpanel/"><button >Admin Panel</button></a>
    </div>
    <main>
      <section class="searchContent">
        <div class="search-template">
          <img
            class="back-search-photo"
            src="https://pnptc-media.s3.amazonaws.com/images/travel-startups-covid-19-featured.2e16d0ba.fill-600x400.jpg"
            alt="MEXICO"
          />
          <div class="search-section">
            <div class="button-section">
              <button class="btn-s" onclick="changeContentHoteluri()">
                Hoteluri
              </button>
              <button class="btn-s" onclick="changeContentActivitati()">
                Activitati
              </button>
              <button class="btn-s" onclick="changeContentTransport()">
                Transport
              </button>
            </div>
            <!--ACTIVITATI-->
            <div class="activitatiContent">
              <form class="information-section-activitati">
                <div>
                  <label class="d-lab">Locatie</label>
                  <input
                    type="text"
                    name="Destinatie"
                    class="form_field input-class"
                    required
                  />
                </div>
                <div class="in-out-section">
                  <label class="data-intrare"
                    >Data intrare

                    <input
                      type="date"
                      name="open-data"
                      class="open-data input-class"
                    />
                  </label>
                  <label>
                    Data iesire
                    <input
                      type="date"
                      name="exit-data"
                      class="open-data input-class"
                    />
                  </label>
                </div>
                <div id="number-pass">
                  <p>Numar pasageri</p>
                  <label
                    >Adulti <br />
                    <select class="select-">
                      <option value="">--Please choose an option--</option>
                      <option value="">1</option>
                      <option value="">2</option>
                      <option value="">3</option>
                    </select>
                  </label>
                  <label>
                    <br />
                    Copii <br />
                    <select class="select-">
                      <option value="">--Please choose an option--</option>
                      <option value="">1</option>
                      <option value="">2</option>
                      <option value="">3</option>
                    </select>
                  </label>
                </div>

                <button class="search-activities btn-s">
                  CAUTA ACTIVITATI
                </button>
              </form>
            </div>

            <!--HOTELURI-->
            <div class="hoteluriContent">
              <form class="information-section-hoteluri" method="GET">
                <div>
                  <label class="d-lab">Alege o destinatie </label>
                  <input
                    type="text"
                    name="Destinatie"
                    class="form_field input-class"
                    id="t1"
                  />
                  <label class="d-lab">Orasul de plecare </label>
                  <input
                    type="text"
                    name="Oras-plecare"
                    class="form_field input-class"
                    id="t2"
                  />
                </div>

                <div class="in-out-section">
                  <label class="data-intrare"
                    >Data intrare

                    <input
                      type="date"
                      name="open-data"
                      class="open-data input-class"
                    />
                  </label>
                  <label>
                    Data iesire
                    <input
                      type="date"
                      name="exit-data"
                      class="open-data input-class"
                    />
                  </label>
                </div>
                <label
                  >Numar de camere
                  <select class="select-">
                    <option value="">--Please choose an option--</option>
                    <option>O camera</option>
                    <option>Doua camere</option>
                    <option>Trei camere</option>
                    <option>Patru camere</option>
                  </select>
                </label>
                <button class="btn-s search-hotel">CAUTA HOTEL</button>
              </form>
            </div>

            <!--TRANSPORT-->
            <div class="transportContent">
              <form class="information-section-transporturi">
                <div>
                  <label
                    >Plecare
                    <select class="destinatie-plecare">
                      <option value="">--Please choose an option--</option>
                    </select>
                  </label>
                  <label
                    >Locatie
                    <select class="destinatie-plecare">
                      <option value="">--Please choose an option--</option>
                    </select>
                  </label>
                </div>

                <div class="in-out-section">
                  <label class="data-intrare"
                    >Data intrare

                    <input
                      type="date"
                      name="open-data"
                      class="open-data input-class"
                    />
                  </label>
                  <label>
                    Data iesire
                    <input
                      type="date"
                      name="exit-data"
                      class="open-data input-class"
                    />
                  </label>
                </div>
                <div class="number-pass">
                  <p>Numar pasageri</p>
                  <label
                    >Adulti <br />
                    <select class="select-">
                      <option value="">--Please choose an option--</option>
                      <option value="">1</option>
                      <option value="">2</option>
                      <option value="">3</option>
                    </select>
                  </label>
                  <label>
                    <br />
                    Copii <br />
                    <select class="select-">
                      <option value="">--Please choose an option--</option>
                      <option value="">1</option>
                      <option value="">2</option>
                      <option value="">3</option>
                    </select>
                  </label>
                </div>
                <button class="btn-s search-transport">CAUTA TRANSPORT</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section class="bestLocations">
        <header class="popular__header">
          <h2>Locatii populare</h2>
        </header>
        <div class="popular">
          <div class="popular__cardcontainer">
            <div class="popular__imagecard" id="firstslide">
              <img
                class="popular__image"
                src="https://images.unsplash.com/photo-1499678329028-101435549a4e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
              />

              <div class="popular__cardsubscript">
                <a class="popular__description" href="#"> Loc popular #n </a>

                <div class="popular__subscriptdescription">
                  <p class="popular__price">
                    de la <em class="popular__cashvalue"> 400€ </em>
                  </p>
                </div>
              </div>
            </div>

            <div class="popular__imagecard">
              <img
                class="popular__image"
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1008&q=80"
              />

              <div class="popular__cardsubscript">
                <a class="popular__description" href="#"> Loc popular #n </a>

                <div class="popular__subscriptdescription">
                  <p class="popular__price">
                    de la <em class="popular__cashvalue"> 400€ </em>
                  </p>
                </div>
              </div>
            </div>

            <div class="popular__imagecard">
              <img
                class="popular__image"
                src="https://images.unsplash.com/photo-1537018508881-01af73c72efd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80"
              />

              <div class="popular__cardsubscript">
                <a class="popular__description" href="#"> Loc popular #n </a>

                <div class="popular__subscriptdescription">
                  <p class="popular__price">
                    de la <em class="popular__cashvalue"> 400€ </em>
                  </p>
                </div>
              </div>
            </div>

            <div class="popular__imagecard">
              <img
                class="popular__image"
                src="https://images.unsplash.com/photo-1615486243513-1123c2440747?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80"
              />

              <div class="popular__cardsubscript">
                <a class="popular__description" href="#"> Loc popular #n </a>

                <div class="popular__subscriptdescription">
                  <p class="popular__price">
                    de la <em class="popular__cashvalue"> 400€ </em>
                  </p>
                </div>
              </div>
            </div>

            <div class="popular__imagecard">
              <img
                class="popular__image"
                src="https://images.unsplash.com/photo-1479090793912-eb9929f4fdb2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=876&q=80"
              />

              <div class="popular__cardsubscript">
                <a class="popular__description" href="#"> Luna</a>

                <div class="popular__subscriptdescription">
                  <p class="popular__price">
                    de la <em class="popular__cashvalue"> 400.000€ </em>
                  </p>
                </div>
              </div>
            </div>

            <div class="popular__slidebtn">
              <button
                type="button"
                class="slidebtn slidebtnleft"
                onclick="switchSlide(-1)"
              >
                <em> &lt</em>
              </button>
              <button
                type="button"
                class="slidebtn slidebtnright"
                onclick="switchSlide(1)"
              >
                <em> &gt</em>
              </button>
            </div>
          </div>
        </div>

        <section class="others">
          <div class="others__imgcontainer">
            <div class="others__image">
              <img
                src="https://images.unsplash.com/photo-1558024160-4bcccd62f54c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
              />
              <div class="others__overlay">
                <h2>Detalii <span>aici</span></h2>
                <p>Si aici text..</p>
              </div>
            </div>

            <div class="others__image">
              <img
                src="https://images.unsplash.com/photo-1596956854025-07d84dd37903?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjZ8fHRyYXZlbGxpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
                alt=""
              />
              <div class="others__overlay">
                <h2>Detalii <span>aici</span></h2>
                <p>Si aici text..</p>
              </div>
            </div>

            <div class="others__image">
              <img
                src="https://images.unsplash.com/photo-1614237670155-a3061f0a8b4e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzF8fHRyYXZlbGxpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
                alt=""
              />
              <div class="others__overlay">
                <h2>Detalii <span>aici</span></h2>
                <p>Si aici text..</p>
              </div>
            </div>

            <div class="others__image">
              <img
                src="https://images.unsplash.com/photo-1610958907654-be06a64dc75b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTB8fHRyYXZlbGxpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
                alt=""
              />
              <div class="others__overlay">
                <h2>Detalii <span>aici</span></h2>
                <p>Si aici text..</p>
              </div>
            </div>

            <div class="others__image">
              <img
                src="https://images.unsplash.com/photo-1610927362668-e6e91db482f5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"
                alt=""
              />
              <div class="others__overlay">
                <h2>Detalii <span>aici</span></h2>
                <p>Si aici text..</p>
              </div>
            </div>

            <div class="others__image">
              <img
                src="https://images.unsplash.com/photo-1597709429092-aea3d7665d4e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80"
                alt=""
              />
              <div class="others__overlay">
                <h2>Detalii <span>aici</span></h2>
                <p>Si aici text..</p>
              </div>
            </div>
          </div>
        </section>
        <script src="/public/javascript/script.js"></script>
      </section>

      <section class="fixedChatBox">
        <div class="chatBox">
          <div class="chatBoxStatic">
            <header class="chatBoxStatic__headerInfo">
              <div class="chatBoxStatic__avatarList">
                <div class="chatBoxStatic__avatarInitials">
                  <img
                    src="https://image.shutterstock.com/image-vector/nd-dn-initial-letter-logo-260nw-1673509756.jpg"
                    alt="ND"
                  />
                </div>
                <div class="chatBoxStatic__avatarInitials">
                  <img
                    src="https://image.shutterstock.com/image-vector/nd-dn-initial-letter-logo-260nw-1673509756.jpg"
                    alt="ND"
                  />
                </div>
                <div class="chatBoxStatic__avatarInitials">
                  <img
                    src="https://image.shutterstock.com/image-vector/nd-dn-initial-letter-logo-260nw-1673509756.jpg"
                    alt="ND"
                  />
                </div>
              </div>
              <div class="chatBoxStatic__contactShortInfo">
                <h2 class="chatBoxStatic__destinatar">
                  Chatting with
                  <span class="chatBoxStatic__username">Nicu</span>
                </h2>
                <p class="chatBoxStatic__helperRank">Support team senior</p>
              </div>
              <button
                type="button"
                onclick="hideChat()"
                class="chatBoxStatic__minimizeButton"
              >
                <i class="fa fa-close"></i>
              </button>
            </header>
            <div class="chatBoxStatic__messageContainer">
              <!-- Lista de mesaje care se populeaza in php apoi in js-->
              <div
                class="chatBoxStatic__messageMask"
                id="chatBoxStatic__dummyMessage"
              >
                <div class="chatBoxStatic__messageSent speech-bubble">
                  <p class="chatBoxStatic__messageText">Hello!</p>
                </div>
              </div>
  
              <div class="chatBoxStatic__messageMask">
                <div class="chatBoxStatic__messageSent speech-bubble">
                  <p class="chatBoxStatic__messageText">Hello!</p>
                </div>
              </div>
  
              <div class="chatBoxStatic__messageMask">
                <p class="chatBoxStatic__senderLabel">Nicu</p>
                <div class="chatBoxStatic__messageReceived speech-bubble">
                  <p class="chatBoxStatic__messageText">Whats up?</p>
                </div>
              </div>
  
              <div class="chatBoxStatic__messageMask">
                <div class="chatBoxStatic__messageSent speech-bubble">
                  <p class="chatBoxStatic__messageText">
                    Doing great, how about you?
                  </p>
                </div>
              </div>
              <div class="chatBoxStatic__messageMask">
                <p class="chatBoxStatic__senderLabel">Nicu</p>
                <div class="chatBoxStatic__messageReceived speech-bubble">
                  <p class="chatBoxStatic__messageText">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maiores facere itaque dignissimos provident esse dolorum
                    cumque eligendi commodi repellendus modi, vel, dolor soluta
                    eum facilis ad aut ab. Harum, vero.
                  </p>
                </div>
              </div>
              <div class="chatBoxStatic__messageMask">
                <div class="chatBoxStatic__messageSent speech-bubble">
                  <p class="chatBoxStatic__messageText">Fantastic!</p>
                </div>
              </div>
              <div class="chatBoxStatic__messageMask">
                <p class="chatBoxStatic__senderLabel">Nicu</p>
                <div class="chatBoxStatic__messageReceived speech-bubble">
                  <p class="chatBoxStatic__messageText">: D</p>
                </div>
              </div>
            </div>
            <div class="chatBoxStatic__controale">
              <div class="chatBoxStatic__sendMessage">
                <textarea
                  placeholder="Scrie ceva.."
                  class="chatBoxStatic__inputText"
                  rows="1"
                ></textarea>
                <button
                  type="button"
                  onclick="addTypedMessage()"
                  class="chatBoxStatic__sendMessageButton"
                >
                  Send
                </button>
              </div>
              <div class="chatBoxStatic__butoaneList">
                <button class="chatBoxStatic__btn chatBoxStatic__btnemoticons">
                  <i class="fa fa-smile-o"></i>
                </button>
                <button
                  onclick="showConvList()"
                  class="chatBoxStatic__btn chatBoxStatic__btnmessages"
                >
                  <i class="fa fa-sign-in"></i>
                </button>
              </div>
            </div>
          </div>
  
          <div class="chatBoxStatic__recentConversationsList">
            <header class="chatBoxStatic__recentConversationHeader">
              <h1 class="chatBoxStatic__recentConversationHeaderText">
                Your conversations
              </h1>
              <div>
                <button
                  type="button"
                  onclick="hideConvList()"
                  class="chatBoxStatic__backButton"
                >
                  <i class="fa fa-angle-left"></i>
                </button>
              </div>
            </header>
  
            <div class="chatBoxStatic__conversation" onclick="hideConvList()">
              <div class="chatBoxStatic__recentConversationAvatar">
                <img src="/public/img/nd-initials.jpg" alt="Initials" />
              </div>
  
              <div class="chatBoxStatic__recentContactInfo">
                <p class="chatBoxStatic__conversationName">Nicu</p>
                <p class="chatBoxStatic__recentLastMessage">
                  That's a big 10-4, good buddy!
                </p>
              </div>
            </div>
  
            <div class="chatBoxStatic__conversation" onclick="hideConvList()">
              <div class="chatBoxStatic__recentConversationAvatar">
                <img src="/public/img/nd-initials.jpg" alt="Initials" />
              </div>
  
              <div class="chatBoxStatic__recentContactInfo">
                <p class="chatBoxStatic__conversationName">Ion</p>
                <p class="chatBoxStatic__recentLastMessage">Nicely done!</p>
              </div>
            </div>
          </div>
  
          <button
            type="button"
            onclick="showChat()"
            class="chatBoxStatic__showButton"
          >
            <i class="fa fa-comment"></i>
          </button>
  
          <script src="/public/javascript/chatbox.js"></script>
        </div>
      </section>  

      <div id="register_modal"class="popup_form" onclick="closeRegisterWindow()">
        <div id="form_modal_register">
          <form
            class="form_container"
            id="formrcont"
            method="post"
            action="/public/home/register/"
          >
            <h3>Register</h3>
            <label for="username"><b>Username</b></label>
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              required
            />

            <label for="password"><b>Password</b></label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              required
            />
            <label for="password2"><b>Confirm Password</b></label>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirm_password"
              required
            />
            <button type="submit" id="form_r_button" name="submit">
              Register
            </button>
          </form>
          <button onclick="closeRegisterForm()" class="close_register">
            X
          </button>
        </div>
      </div>

      <div id="login_modal" class="popup_form" onclick="closeLoginWindow()">
        <div id="form_modal_login">
          <form
            class="form_container"
            id="formlcont"
            method="post"
            action="/public/home/login/"
          >
            <h3>Login</h3>
            <label for="username"><b>Username</b></label>
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              required
            />

            <label for="password"><b>Password</b></label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              required
            />

            <label>
              <input type="checkbox" checked="checked" name="remember" />
              Remember me
            </label>

            <button type="submit" id="form_l_button" name="submit">
              Login
            </button>
          </form>
          <button onclick="closeLoginForm()" class="close_login">X</button>
        </div>
      </div>
    </main>
    <footer id="footer">
      <hr />
      <div class="utilLinks">
        <div class="myAccount">
          Help
          <div>
            <button class="account">Contact Us</button>
            <button class="account">Returns Information</button>
          </div>
        </div>

        <div class="myAccount">
          Privacy & Legal
          <div>
            <button class="account">Privacy Policy</button>
            <button class="account">Terms & Conditions</button>
          </div>
        </div>

        <div class="socialMedia">
          <div>Our social Networks</div>

          <div class="social__links">
            <a href="#" class="fa fa-facebook" id="socialNetworks"></a>
            <a href="#" class="fa fa-twitter"></a>
            <a href="#" class="fa fa-instagram"></a>
          </div>
        </div>
      </div>

      <hr />
    </footer>
  </body>
</html>