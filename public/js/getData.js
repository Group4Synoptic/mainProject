// This script runs after the HTML page has fully loaded.
// It handles loading dynamic content, animations, and interactive features.

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ JavaScript is running and DOM is loaded.");

  // --- FADE-IN ANIMATION HELPER FUNCTION ---
  // This function makes elements with the .fade-in class smoothly appear as you scroll.
  // It uses IntersectionObserver, which "watches" elements and tells us when they enter the visible part of the screen.
  // When an element is visible, we add the .visible class, which triggers a CSS animation.
  // We call this function after adding new content, so those elements will animate in too.
  function observeFadeInElements() {
    // Find all elements with .fade-in that don't already have .visible.
    const faders = document.querySelectorAll('.fade-in:not(.visible)');
    // Set up the observer to trigger when 10% of the element is visible.
    const options = { threshold: 0.10 };

    // Create the observer, which will check each element as we scroll.
    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
      entries.forEach(entry => {
        // If the element isn't visible yet, do nothing.
        if (!entry.isIntersecting) return;
        // If it is visible, add the .visible class to start the animation.
        entry.target.classList.add('visible');
        // Stop watching this element since it's already animated in.
        observer.unobserve(entry.target);
      });
    }, options);

    // Tell the observer to watch each .fade-in element we found.
    faders.forEach(fader => {
      appearOnScroll.observe(fader);
    });
  }

  // --- GOALS SECTION LOGIC (for goals.html) ---
  // This part loads the Sustainable Development Goal cards from app.json
  // and puts them into the correct columns on the goals page.

  // Try to find the containers for each goal card by their IDs.
  // These containers are where we want to put each goal card on the page.
  const climateContainer = document.getElementById('goal-climate');
  const energyContainer = document.getElementById('goal-energy');
  const hungerContainer = document.getElementById('goal-hunger');

  // Only run this code if all three containers exist (so it doesn't run on other pages).
  if (climateContainer && energyContainer && hungerContainer) {
    // Fetch the data from our app.json file.
    // This file contains all the information about our goals.
    fetch('json/app.json')
      .then(response => response.json())
      .then(data => {
        // Get the array of goals from the data.
        const goals = data.goals;

        // This function will create a goal card for us.
        // It takes a goal object and an id (for anchor links).
        function createGoalCard(goal, id) {
          // Create an <article> element to be the card.
          const article = document.createElement('article');
          // Add classes for styling and animation.
          article.classList.add('Goal_images', 'goal-card', 'fade-in');
          // Set the id so we can link to this card from the menu.
          article.id = id;

          // Now we build the inside of the card.
          // Create a <figure> to hold the image and caption.
          const figure = document.createElement('figure');

          // Create the image for the goal.
          const img = document.createElement('img');
          img.src = goal.url;      // Set the image source.
          img.alt = goal.alt;      // Set the alt text for accessibility.
          img.classList.add('goal-image');

          // Create a caption for the image.
          const figcaption = document.createElement('figcaption');
          figcaption.classList.add('goal-caption');

          // Create a link inside the caption.
          const link = document.createElement('a');
          link.href = goal.link;           // Where the link goes.
          link.textContent = goal.caption; // The text for the link.
          link.classList.add('goal-link');

          // Put the link inside the caption.
          figcaption.appendChild(link);
          // Put the image and caption inside the figure.
          figure.appendChild(img);
          figure.appendChild(figcaption);
          // Put the figure inside the article (the card).
          article.appendChild(figure);

          // Return the finished card.
          return article;
        }

        // Now we add each goal card to the correct container.
        // The order in app.json should match: [0]=Climate, [1]=Energy, [2]=Hunger.
        if (goals[0]) climateContainer.appendChild(createGoalCard(goals[0], 'goal-climate'));
        if (goals[1]) energyContainer.appendChild(createGoalCard(goals[1], 'goal-energy'));
        if (goals[2]) hungerContainer.appendChild(createGoalCard(goals[2], 'goal-hunger'));

        // After we've added the cards, we call our fade-in function.
        // This makes sure the new cards will animate in as you scroll.
        observeFadeInElements();
      })
      .catch(error => console.error("Goals loading failed:", error));
  }

  // --- CLIMATE SECTION LOGIC (for climate.html) ---
  // This part loads climate data from app.json and creates a card for each item.
  // It only runs if the page contains an element with id="ClimateSection".
  const climateSection = document.querySelector('#ClimateSection');
  if (climateSection) {
    // Fetch the climate data from app.json.
    fetch('json/app.json')
      .then(res => res.json())
      .then(data => {
        // For each climate item, create a card and add it to the page.
        data.climate.forEach(item => {
          // Create a section for each climate item.
          const article = document.createElement('section');
          article.classList.add('Individual_Containers', 'fade-in');

          // Create a figure to hold the image and caption.
          const figure = document.createElement('figure');
          figure.classList.add('Individual_Figures');

          // Create the image.
          const img = document.createElement('img');
          img.src = item.url;
          img.alt = item.alt;
          img.classList.add('Individual_Images');

          // Create the caption, which can have multiple lines.
          const figcaption = document.createElement('figcaption');
          item.caption.forEach(text => {
            const p = document.createElement('p');
            p.textContent = text;
            figcaption.appendChild(p);
          });

          // Put everything together.
          figure.appendChild(img);
          figure.appendChild(figcaption);
          article.appendChild(figure);
          climateSection.appendChild(article);
        });

        // After adding the cards, call the fade-in function.
        observeFadeInElements();
      })
      .catch(err => console.error('Climate section error:', err));
  }

  // --- WATER DEMANDS SECTION LOGIC (for WD.html) ---
  // This part loads water demand data from app.json and creates a card for each item.
  // It only runs if the page contains an element with id="WDSection".
  const wdSection = document.querySelector('#WDSection');
  if (wdSection) {
    // Fetch the water demand data from app.json.
    fetch('json/app.json')
      .then(res => res.json())
      .then(data => {
        // For each water demand item, create a card and add it to the page.
        data.WDSection.forEach(item => {
          // Create a section for each water demand item.
          const section = document.createElement('section');
          section.classList.add('Individual_Containers', 'fade-in');

          // Create a figure to hold the image and caption.
          const figure = document.createElement('figure');
          figure.classList.add('Individual_Figures');

          // Create the image.
          const img = document.createElement('img');
          img.src = item.url;
          img.alt = item.alt;
          img.classList.add('Individual_Images');

          // Create the caption, which can have multiple lines.
          const figcaption = document.createElement('figcaption');
          item.caption.forEach(text => {
            const p = document.createElement('p');
            p.textContent = text;
            figcaption.appendChild(p);
          });

          // Put everything together.
          figure.appendChild(img);
          figure.appendChild(figcaption);
          section.appendChild(figure);
          wdSection.appendChild(section);
        });

        // After adding the cards, call the fade-in function.
        observeFadeInElements();
      })
      .catch(err => console.error('Water Demands loading error:', err));
  }

  // --- TEAM PAGE LOGIC (for about.html) ---
  // This part loads team member data from app.json and creates a card for each member.
  // Clicking a card opens a popup with more info.
  // It only runs if the page contains a .team-section and popup elements.
  const popup = document.getElementById("popup");
  const popupImage = document.getElementById("popup-image");
  const popupName = document.getElementById("popup-name");
  const popupBio = document.getElementById("popup-bio");
  const closePopup = document.getElementById("close-popup");

  const teamSection = document.querySelector(".team-section");
  if (teamSection && popup) {
    // Fetch the team data from app.json.
    fetch("json/app.json")
      .then(res => res.json())
      .then(data => {
        // Remove any default HTML inside the team section.
        teamSection.innerHTML = "";

        // For each team member, create a card and add it to the page.
        data.team.forEach(member => {
          // Create a card for each team member.
          const card = document.createElement("div");
          card.classList.add("team-member", "fade-in");

          // Add the member's image.
          const img = document.createElement("img");
          img.src = member.image;
          img.alt = member.name;
          img.classList.add("team-image");

          // Add the member's name.
          const name = document.createElement("p");
          name.textContent = member.name;

          card.appendChild(img);
          card.appendChild(name);

          // When you click a card, show the popup with details.
          card.addEventListener("click", () => {
            popupImage.src = member.image;
            popupName.textContent = member.name;
            popupBio.innerHTML = `<strong>${member.role}</strong><br><br>${member.bio}`;
            popup.style.display = "flex";
          });

          teamSection.appendChild(card);
        });

        // After adding the cards, call the fade-in function.
        observeFadeInElements();
      })
      .catch(err => console.error("Team load error:", err));

    // When you click the close button or the background, close the popup.
    closePopup?.addEventListener("click", () => popup.style.display = "none");
    popup?.addEventListener("click", (e) => {
      if (e.target === popup) popup.style.display = "none";
    });
  }

  // --- HAMBURGER MENU (Mobile Nav Toggle) ---
  // This code makes the hamburger icon work on mobile.
  // When you click it, it opens or closes the navigation menu.
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");

  hamburger?.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    menu.classList.toggle("active");
  });

  // --- SEARCH BUTTON (For Desktop search) ---
  // This code is a placeholder for search functionality.
  // When you click the search button or press Enter, it shows an alert.
  const searchBar = document.getElementById("search-bar");
  const searchButton = document.getElementById("search-button");

  const searchWebsite = () => {
    const query = searchBar?.value?.toLowerCase();
    if (query) alert(`Search for "${query}" coming soon.`);
  };

  searchButton?.addEventListener("click", searchWebsite);
  searchBar?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchWebsite();
  });

  // --- MOBILE SEARCH OVERLAY ---
  // This code makes the search overlay work on mobile.
  // When you click the search link, it opens a full-screen search box.
  // Clicking outside the box closes it.
  const searchLink = document.querySelector(".search-link");
  const searchOverlay = document.querySelector(".search-overlay");

  searchLink?.addEventListener("click", () => searchOverlay.classList.add("active"));
  searchOverlay?.addEventListener("click", (e) => {
    if (e.target === searchOverlay) searchOverlay.classList.remove("active");
  });

  // --- HERO IMAGE ZOOM ON SCROLL ---
  // This script makes the hero image zoom in as you scroll down the page.
  // It adds the .zoomed class to the .hero section when you scroll down,
  // and removes it when you scroll back up.
  document.addEventListener("scroll", function () {
    // Find the hero section on the page.
    const hero = document.querySelector('.hero');
    if (!hero) return; // If there's no hero section, stop.

    // Get how far the user has scrolled down.
    const scrollY = window.scrollY;

    // If the user has scrolled more than 15px but less than 400px, zoom in.
    if (scrollY > 15 && scrollY < 400) {
      hero.classList.add('zoomed');
    } else {
      // Otherwise, remove the zoom effect.
      hero.classList.remove('zoomed');
    }
  });

  // --- INITIAL FADE-IN FOR STATIC CONTENT ---
  // Run the fade-in observer for any .fade-in elements already on the page.
  // This makes sure that even elements that are present when the page loads
  // will animate in as you scroll.
  observeFadeInElements();
});