<?php
session_start();
/*
if(isset($_SESSION['id'])){

}else{
  $_SESSION['id']=123321312;
  $_SESSION['time']=date('H:i:s');
}
*/
?>
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
        <?php
     // echo session_id();
       //  echo var_dump($_SESSION);
     
      if(isset($_SESSION["id"])){
          
        }else{
          echo " <a href="."/public/home/login_form/".">".
         " <button
             
              class="."open_login_form"."
              id="."popup_login"."
            >
              Login
            </button>
           </a>";
        }
        ?>
         <?php 
       
          if(isset($_SESSION["id"])){
            echo " <a href="."/public/home/logout/".">".
            " <button
                
                 class="."open_login_form"."
                 id="."popup_login"."
               >
                 Log out
               </button>
              </a>";
          }else{
            echo " <a href="."/public/home/register_form/".">".
            " <button
                
                 class="."open_register_form"."
                 id="."popup_register"."
               >
                 Register
               </button>
              </a>";
          }
         ?>
      </div>
      </div>
    </header>
    <div class="principal_buttons">
      <button>Home</button>
      <a href="/public/home/about/"><button>About</button></a>
      <?php 
      if(isset($_SESSION["id"])){
        if(isset($_SESSION["rol"]) ){
          if($_SESSION["rol"] == "Admin"){
        echo "<a href="."/public/home/adminpanel"."><button>Admin Panel</button></a>";
      }
      }
    } 
      ?>
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

      <script type="module" src="/public/chatbox_all/js/chatbox/loadChatbox.js"></script>


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