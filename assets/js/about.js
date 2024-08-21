const backendUrl = "https://irshad0722.pythonanywhere.com/";

function generateClient(images, container) {
  clientsHtml = "";

  images.forEach(({ image_url }) => {
    clientsHtml += `
    <div data-aos="fade-up">
            <img
              src="${image_url}"
              alt=""
            />
          </div>`;
  });
  container.innerHTML += clientsHtml;
}

function generateTestimonial(testimonials, container) {
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
        <h4> ${position}</h4>
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
  const aboutContainer = document.querySelector("#client-container-unique");
  console.log(aboutContainer);
  const testimonialContainer = document.querySelector(
    "#testimonial-container-unique"
  );
  console.log(testimonialContainer);

  async function AddHtmlContent() {
    try {
      const data = await getData("about-data");
      const testimonials = data.testimonials;
      const clients = data.clients;
      generateClient(clients, aboutContainer);
      generateTestimonial(testimonials, testimonialContainer);
    } catch (e) {
      console.log(e);
    } finally {
      document.querySelectorAll("#preloader").forEach((item) => {
        item.remove();
      });
    }
  }
  AddHtmlContent();
});
