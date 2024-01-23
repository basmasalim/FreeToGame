// ? =============> Global ===============>
const loader = document.querySelector(".loading");
const navRef = document.querySelector("nav");
const mode = document.getElementById("mode");
// ! =============> When Start ===============>
getGames("mmorpg");
// * =============> Events ===============>
document.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > 100) {
      navRef.classList.add("scrolled");
    } else {
      navRef.classList.remove("scrolled");
    }
  },
  { passive: true }
);

document.querySelectorAll(".menu a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".menu .active").classList.remove("active");
    link.classList.add("active");

    const category = link.getAttribute("data-category");

    console.log(category);
    getGames(category); //conect api
  });
});

document.querySelector(".logout-btn").addEventListener("click", () => {
  localStorage.removeItem("uToken");
  location.href = `./index.html`;
});

if (localStorage.getItem("theme") != null) {
  const themeData = localStorage.getItem("theme");

  if (themeData === "light") {
    mode.classList.replace("fa-sun", "fa-moon");
  }else{
    mode.classList.replace("fa-moon", "fa-sun");

  }
  document.querySelector("html").setAttribute("data-theme", themeData);

}

mode.addEventListener("click", function (e) {
  if (mode.classList.contains("fa-sun")) {
    document.querySelector("html").setAttribute("data-theme", "light");
    mode.classList.replace("fa-sun", "fa-moon");

    localStorage.setItem("theme", "light");
  } else {
    document.querySelector("html").setAttribute("data-theme", "dark");
    mode.classList.replace("fa-moon", "fa-sun");

    localStorage.setItem("theme", "dark");
  }
});
// ! =============> Functions ===============>
async function getGames(categoryName) {
  loader.classList.remove("d-none");
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b7ddeaba2emsh4c7f9a279de19b4p17f62fjsn9ef33d17e7d9",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  const api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryName}`,
    options
  );
  const response = await api.json();
  displayData(response);
  loader.classList.add("d-none");

  console.log(response);
}

function displayData(gamesData) {
  let gamesBox = ``;

  for (let i = 0; i < gamesData.length; i++) {
    let videoPath = gamesData[i].thumbnail.replace(
      "thumbnail.jpg",
      "videoplayback.webm"
    );
    gamesBox += `
        <div class="col">
        <div onmouseleave="stopVideo(event)" onmouseenter="startVideo(event)" onclick="showDetails(${gamesData[i].id})" class="card h-100 bg-transparent" role="button" >
           <div class="card-body">
  
              <figure class="position-relative">
                 <img class="card-img-top object-fit-cover h-100" src="${gamesData[i].thumbnail}" />
  
                <video muted="true"  preload="none" loop class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
                <source src="${videoPath}">
                </video>
  
              </figure>
  
              <figcaption> 
              
                 <div class="hstack justify-content-between">
                    <h3 class="h6 small"> ${gamesData[i].title} </h3>
                    <span class="badge text-bg-primary p-2">Free</span>
                 </div>
  
                 <p class="card-text small text-center opacity-50">
                    ${gamesData[i].short_description}
                 </p> 
              </figcaption>
           </div>
  
           <footer class="card-footer small hstack justify-content-between">
  
              <span class="badge badge-color">${gamesData[i].genre}</span>
              <span class="badge badge-color">${gamesData[i].platform}</span>
  
           </footer>
        </div>
     </div>
        `;
  }
  document.getElementById("gameData").innerHTML = gamesBox;
}

async function startVideo(event) {
  const videoEl = event.target.querySelector("video");
  videoEl.classList.remove("d-none");
  videoEl.muted = true;

  try {
    await videoEl.play();
  } catch (error) {
    console.error("Error playing video:", error);
  }
}

async function stopVideo(event) {
  const videoEl = event.target.querySelector("video");

  try {
    await videoEl.pause();
    videoEl.currentTime = 0; // Reset video to the beginning
  } catch (error) {
    console.error("Error pausing video:", error);
  }

  videoEl.classList.add("d-none");
}

function showDetails(id) {
  location.href = `./details.html?id=${id} `;
}

// function theme(el) {
//   document.documentElement.setAttribute('data-theme', 'light')
// }
