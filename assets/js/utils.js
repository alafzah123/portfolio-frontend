export const projectData = [];
export const testimonialData = [];
export const clientData = [];

const backendUrl = "http://127.0.0.1:8000/";

export const getData = async (type) => {
  let endpoint = "";
  let dataArray = null;

  if (type === "clients") {
    endpoint = backendUrl + "api/clients/";
    dataArray = clientData;
  } else if (type === "projects") {
    endpoint = backendUrl + "api/projects/";
    dataArray = projectData;
  } else if (type === "testimonials") {
    endpoint = backendUrl + "api/testimonials/";
    dataArray = testimonialData;
  } else {
    console.log(
      "Provide correct type parameter which must be 'clients', 'projects', or 'testimonials'."
    );
    return null;
  }

  if (dataArray.length === 0) {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      dataArray = data
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  return dataArray;
};

export function generateProject(projects) {
  const projectHTML = "";

  projects.array.forEach(({ title, category, images }) => {
    projectHTML += `
    <div class="col-lg-4 col-md-6 portfolio-item filter-construction">
      <div class="portfolio-content h-100">
        <img
          src="${images[0].image_url}"
          class="img-fluid"
          alt=""
        />
        <div class="portfolio-info">
          <h4>${category}</h4>
          <p>${title}</p>
          ${images.map(
            (item, idx) =>
              `
            <a
              href="${item.image_url}"
              title="Construction 1"
              data-gallery="portfolio-gallery-construction"
              class="glightbox preview-link"
            >
              <i class="bi bi-zoom-in"></i>
            </a>
            `
          )}
        </div>
      </div>
    </div>
    `;
  });
}

export function generateTestimonial(testimonials) {
  const testimonialHTML = "";
  testimonials.foreach(
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
          <i class="bi bi-star-fill"></i
          ><i class="bi bi-star-fill"></i
          ><i class="bi bi-star-fill"></i
          ><i class="bi bi-star-fill"></i
          ><i class="bi bi-star-fill"></i>
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
}

export function generateClient(images) {
  clientsHtml = "";

  images.foreach(({ image_url }) => {
    clientsHtml += `
    <div data-aos="fade-up">
            <img
              src="${image_url}"
              alt=""
            />
          </div>`;
  });
}

