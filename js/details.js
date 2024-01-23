// ? =============> Global ===============>
const loader = document.querySelector(".loading");
// ! =============> When Start ===============>
const searchParams = location.search;
const params = new URLSearchParams(searchParams);

const id = params.get("id");

(async function () {
  loader.classList.remove("d-none");
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b7ddeaba2emsh4c7f9a279de19b4p17f62fjsn9ef33d17e7d9",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  const api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    options
  );
  const responseData = await api.json();
  displayData(responseData);
  loader.classList.add("d-none");
  console.log(responseData);
})();

function displayData(gamesDetails) {
  let videoPath = gamesDetails.thumbnail.replace(
    "thumbnail.jpg",
    "videoplayback.webm"
  );

  const detailsBox = `
        <div class="col-lg-4">
            <figure class="position-relative">
            <div onmouseenter="startVideo(event)" class="h-100 bg-transparent" role="button">
            <img class="card-img-top object-fit-cover h-100" src="${gamesDetails.thumbnail}" />
            <video muted="true" preload="none" loop class="w-100 d-none h-100 position-absolute top-0 start-0 z-3 ">
                <source src="${videoPath}" type="video/webm">
            </video>
        </div>
        
            </figure>
            <div class="button-container d-flex w-100">
                <button class="btn free-btn">Free</button>
                <button class="btn play-btn">
                    <a href=${gamesDetails.game_url} class="text-decoration-none" target='_block'>
                        Play Now <i class="fas fa-sign-out-alt"></i>
                    </a>
                </button>
            </div>

            <div class="container rounded-3 mt-3 " style ='background: #4799eb'>
            <div class="starrating risingstar d-flex justify-content-center flex-row-reverse">
                <input type="radio" id="star5" name="rating" value="5" /><label for="star5" title="5 star"></label>
                <input type="radio" id="star4" name="rating" value="4" /><label for="star4" title="4 star"></label>
                <input type="radio" id="star3" name="rating" value="3" /><label for="star3" title="3 star"></label>
                <input type="radio" id="star2" name="rating" value="2" /><label for="star2" title="2 star"></label>
                <input type="radio" id="star1" name="rating" value="1" /><label for="star1" title="1 star"></label>
            </div>
      </div>	
    
        </div>

        <div class="col-lg-8">
            <div class="ms-lg-5">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb text-light">
                        <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
                        <li class="breadcrumb-item text-info" aria-current="page">${gamesDetails.title}</li>
                    </ol>
                </nav>

                <h2>${gamesDetails.title}</h2>
                <div class='d-lg-flex py-2 lh-lg'>
                    <div class="list text-white d-flex flex-column">
                        <span>Category: <span class="text-white-50  p-1"> ${gamesDetails.genre}</span></span>
                        <span>platform: <span class="text-white-50  p-1 "> ${gamesDetails.platform}</span></span>
                    </div>
                    <div class="list text-white d-flex flex-column mx-lg-5">
                        <span>Release Date: <span class="text-white-50 p-1"> ${gamesDetails.release_date}</span></span>
                        <span>status: <span class="text-white-50 p-1"> ${gamesDetails.status}</span></span>
                    </div>
                </div>

                <h3>About ${gamesDetails.title}</h3>
                <p style='font-size: 0.9rem' class='text-white opacity-75'>${gamesDetails.description}</p>
            </div>
            <a class="btn play-btn w-50 ms-lg-5" href=${gamesDetails.freetogame_profile_url} target='_block'>More Details</a>
        </div>
    `;

  document.getElementById("detailsData").innerHTML = detailsBox;

  const backgroundImage = gamesDetails.thumbnail.replace(
    "thumbnail",
    "background"
  );
  document.body.style.cssText = `background-image: url('${backgroundImage}'); background-size: cover; background-position: center;`;
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
