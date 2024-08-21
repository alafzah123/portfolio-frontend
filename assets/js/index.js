const backendUrl = "https://irshad0722.pythonanywhere.com/";

function generateProject(projects,container) {
  let projectHTML = "";
  projects.forEach(({ title, images }, idx) => {
    let imagesHtml = "";
    images.forEach(({ image_url }, index) => {
      if (index == 0) {
        imagesHtml += `
        <div class="carousel-item active">
              <img
                src="${image_url}"
                class="d-block w-100"
                alt="First slide"
              />
        </div>
        `;
      } else {
        imagesHtml += `
        <div class="carousel-item">
                <img
                  src="${image_url}"
                  class="d-block w-100"
                  alt="Third slide"
                />
              </div>
        `;
      }
    });
    projectHTML += `
      <div class="project-item">
      <div id="carousel${idx}" class="carousel slide">
        <div class="carousel-inner">
          ${imagesHtml}
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carousel${idx}"
          data-bs-slide="prev"
        >
          <span
            class="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carousel${idx}"
          data-bs-slide="next"
        >
          <span
            class="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <div class="project-title">
        <h4>${title}</h4>
      </div>
    </div>
    `;
  });
  container.innerHTML += projectHTML;
}
function generateTestimonial(testimonials,container) {
  let testimonialHTML = "";
  testimonials.forEach(
    ({ name, rating, position, review, profile_image_url }) => {
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 !== 0;
      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
      let starsHTML = "";
      for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="bi bi-star-fill"></i>';
      }
      if (hasHalfStar) {
        starsHTML += '<i class="bi bi-star-half"></i>';
      }
      for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="bi bi-star"></i>';
      }
      console.log(starsHTML);
      testimonialHTML += `
  <div class="swiper-slide">
    <div class="testimonial-wrap">
      <div class="testimonial-item">
        <img
          src="${profile_image_url}"
          class="testimonial-img"
          alt=""
        />
        <h3>${name}</h3>
        <h4>Ceo &amp; ${position}</h4>
        <div class="stars">
          ${starsHTML}
        </div>
        <p>
          <i class="bi bi-quote quote-icon-left"></i>
          ${review}
          <i class="bi bi-quote quote-icon-right"></i>
        </p>
      </div>
    </div>
  </div>
  `;
    }
  );
  container.innerHTML += testimonialHTML;
}
const getData = async (url) => {
  let dataArray = []; // Initialize the dataArray
  const endpoint = backendUrl + "api/" + `${url}/`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    dataArray = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
  return dataArray;
};
document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const PreloaderHtml = `
    <div id="preloader"></div>
  `;
  body.innerHTML += PreloaderHtml;
  const projectContainer = document.querySelector("#project-details-unique");
  const testimonialContainer = document.querySelector(
    "#testimonial-container-unique"
  );


  async function AddHtmlContent(){
    try{
      const data = await getData('home-data')
      const testimonial = data.testimonials
      const projects = data.projects
      generateProject(projects,projectContainer)
      generateTestimonial(testimonial, testimonialContainer);
    }catch (e){
      console.log(e);
    }finally{
      document.querySelectorAll("#preloader").forEach((item) => {
        item.remove();
      });
    }
  }
  AddHtmlContent();
});



