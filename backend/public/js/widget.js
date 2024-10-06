(function () {
  // required reviewId for testimonial
  const CONTAINER_ID = `testimonial-widget-container`;

  const reviewIdElement = document.querySelector("[id^='main-']");
  const idParts = reviewIdElement.id.match(/main-\[(.*?)\]\[(\w+)\]\[(\w+)\]/); // Match all parts of the ID

  let reviewIds = idParts[1].split(",").map(Number);
  let spacename = idParts[2];
  console.log(spacename)
  let theme = idParts[3];
  const API_URL = `https://testimonial-backend-8ylm.onrender.com/testimonial/${spacename}`;

  const style = document.createElement("style");

  // Check for dark theme
  if (theme === "dark") {
    style.innerHTML = `
      #${CONTAINER_ID} .parent {
        display: flex;
        justify-content: center;
        align-items: center;      
      }

      #${CONTAINER_ID} .main {
        width: 350px;
        height:150px;
        margin: 20px;
        padding: 20px;
        font-family: Arial, sans-serif;
        background-color: #25282c;
        color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
        overflow-wrap: break-word;
        word-wrap: break-word;
      }

      #${CONTAINER_ID} .first-letter {
        width: 40px;
        height: 40px;
        font-size:24px;
        color: white;
        margin-right:10px;
        background-color: #5d5dff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
      }
      
      #${CONTAINER_ID} .name {
        font-size:20px;
      }

      #${CONTAINER_ID} .stars {
        color: #FACC15;
        margin-top: 10px;
        font-size:24px;
      }

      #${CONTAINER_ID} .line1 {
        display:flex;
        align-items:center;
      }

      #${CONTAINER_ID} .review-text {
        font-size: 16px;
        margin-top: 10px;
      }
    `;
  } else {
    style.innerHTML = `
      #${CONTAINER_ID} .parent {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      #${CONTAINER_ID} .main {

         width: 350px;
        height:150px;
        margin: 20px;
        padding: 20px;
        font-family: Arial, sans-serif;
        background-color: #FFF;
        color: #000;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        overflow-wrap: break-word;
        word-wrap: break-word;

      }

      #${CONTAINER_ID} .first-letter {
        width: 40px;
        height: 40px;
        font-size:24px;
        color: white;
        margin-right:10px;
        background-color: #5d5dff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
      }

      #${CONTAINER_ID} .name {
        font-size:20px;
      }

      #${CONTAINER_ID} .stars {
        color: #FACC15;
        margin-top: 10px;
        font-size:24px;
      }

      #${CONTAINER_ID} .line1 {
        display:flex;
        align-items:center;
      }

      #${CONTAINER_ID} .review-text {
        font-size: 16px;
        margin-top: 10px;
      }
    `;
  }

  document.head.appendChild(style);

  // Create the container if it doesn't exist
  let container = document.getElementById(CONTAINER_ID);
  if (!container) {
    container = document.createElement("div");
    container.id = CONTAINER_ID;
    document.body.appendChild(container);
  }

  // Function to fetch and render reviews
  async function loadTestimonials() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const getReview = data.getReview;

      // Filtering the reviews based on the required IDs
      const filterData = getReview.filter((review) =>
        reviewIds.includes(review.id)
      );

      renderReviews(filterData);
    } catch (error) {
      console.error("Failed to load testimonials:", error);
      container.innerHTML = "<p>Unable to load testimonials at this time.</p>";
    }
  }

  // Function to render reviews
  function renderReviews(reviews) {
    if (reviews.length === 0) {
      container.innerHTML = "<p>No testimonials available.</p>";
      return;
    }

    // Store the testimonials in a variable
    const testimonialsHTML = reviews
      .map(
        (user) => `
          <div class="main">
            <div class="line1"> 
              <div class="first-letter">${user.name[0].toUpperCase()}</div>
              <div class="name"> ${user.name} </div> 
            </div>
            <div class="stars"> ${"★".repeat(user.stars)} </div>
            <div class="review-text"> ${user.review} </div>
          </div>
        `
      )
      .join("");

    // Wrap the testimonials inside a parent div
    const parentHTML = `
      <div class="parent">
        ${testimonialsHTML}
      </div>
    `;

    container.innerHTML = parentHTML;
  }

  // Initialize the widget
  loadTestimonials();
})();
