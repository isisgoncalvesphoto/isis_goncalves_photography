// Slick Carousel Initializations
$(document).ready(function() {
  $('.index-carousel').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 5000,
  });
});


$(document).ready(function() {
  $('.about-carousel').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 5000,
  });
});

const prevIconTestimonial = '<button type="button" class="prev"><p class="mb-0">< previous</p></button>';
const nextIconTestimonial = '<button type="button" class="next"><p class="mb-0">next ></p></button>';

$(document).ready(function() {
  $('.testimonials-carousel').slick({
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 5000,
    appendArrows: ".button-carousel",
    prevArrow: prevIconTestimonial,
    nextArrow: nextIconTestimonial,
  });
});

$(document).ready(function() {
  $('.insta-carousel').slick({
    centerMode: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    infinite: true,
    speed: 1500,
    dots: false,
    arrows: false,
    centerPadding: "calc(50% - 50vw)",
    responsive: [
      {
        breakpoint: 999,
        settings: {
          slidesToShow: 1,
          centerPadding: "calc(50% - 20vw)",
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "calc(50% - 30vw)",
        }
      },
      {
        breakpoint: 568,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });
});

// Form Handling
let selectedService = null;

$('.service-btn').click(function() {
  selectedService = $(this).data('service');
  $('.service-btn').removeClass('selected');
  $(this).addClass('selected');
  $('#wedding-form-fields, #generic-form-fields').removeClass('show');
  $('#wedding-form-fields input, #wedding-form-fields textarea').prop('required', false);
  $('#generic-form-fields input, #generic-form-fields textarea').prop('required', false);
  setTimeout(function() {
    if (selectedService === 'wedding') {
      $('#wedding-form-fields').addClass('show');
      $('#wedding-form-fields input, #wedding-form-fields textarea').prop('required', true);
      $('#analog-choice').prop('required', true);
    } else {
      $('#generic-form-fields').addClass('show');
      $('#generic-form-fields input, #generic-form-fields textarea').prop('required', true);
    }
  }, 10);
  $('#submit-btn, .form-container').addClass('show');
});

$('#analog-selection button').click(function() {
  $('#analog-selection button').removeClass('selected');
  $(this).addClass('selected');
  const value = $(this).data('value');
  $('#analog-choice').val(value);
});

$('#about-me-selection button').click(function() {
  $('#about-me-selection button').removeClass('selected');
  $(this).addClass('selected');
  const value = $(this).data('value');
  $('#about-me-choice').val(value);
});

$('button[data-value]').click(function() {
  const $group = $(this).closest('div');
  const value = $(this).data('value');
  $group.find('button').removeClass('selected');
  $(this).addClass('selected');
  $group.find('input[type="hidden"]').val(value);
});

$('#contact-form').submit(function(e) {
  e.preventDefault();
  if (!this.checkValidity()) {
    this.reportValidity();
    return;
  }

  // Determine active form section
  const isWedding = selectedService === 'wedding';
  const formSection = isWedding ? '#wedding-form-fields' : '#generic-form-fields';

  // Collect form data with specific selectors to avoid duplicate name conflicts
  var formData = {
    name: $('#client-name').val() || '',
    service_choice: selectedService || 'unknown',
    email: $(`${formSection} input[name="email"]`).val() || '',
    phone: $(`${formSection} input[name="phone"]`).val() || '',
    message: $(`${formSection} textarea[name="message"]`).val() || '',
    about_me_choice: $(`${formSection} #about-me-choice`).val() || 'unknown',
    location: $(`${formSection} input[name="location"]`).val() || '',
    is_wedding: isWedding
  };

  // Add wedding-specific fields
  if (isWedding) {
    formData.partner_name = $('#partner-name').val() || '';
    formData.wedding_date = $('input[name="wedding_date"]').val() || '';
    formData.number_guests = $('input[name="number_guests"]').val() || '';
    formData.analog_choice = $('#analog-choice').val() || 'not-specified';
    formData.socials = $('textarea[name="socials"]').val() || '';
  } else {
    formData.service_date = $(`${formSection} input[name="service_date"]`).val() || '';
    formData.partner_name = '';
    formData.wedding_date = '';
    formData.number_guests = '';
    formData.analog_choice = '';
    formData.socials = '';
  }

  // Send email via EmailJS
  emailjs.send('service_8yf5n75', 'template_3fhmg0q', formData)
    .then(function(response) {
      alert('Form submitted successfully! We’ll get back to you soon.');
      this.reset();
      $('.form-section').removeClass('show');
      $('.service-btn, .analog-btn').removeClass('selected');
      $('#submit-btn, .form-container, .service-form').removeClass('show');
    }.bind(this), function(error) {
      alert('Error sending form: ' + (error.text || 'Please try again.'));
    });
});




//   const subject = selectedService ? `New Inquiry: ${selectedService}` : 'New Inquiry';
//   alert(`Form submitted successfully!\nSubject: ${subject}`);
//   this.reset();
//   $('.form-section').removeClass('show');
//   $('.service-btn, .analog-btn').removeClass('selected');
//   $('#submit-btn, .form-container').removeClass('show');
// });

// Intersection Observer for .animate-me
const animateObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('visible', entry.isIntersecting);
    });
  },
  {
    root: null,
    rootMargin: '200px',
    threshold: 0.1
  }
);
document.querySelectorAll('.animate-me').forEach((element) => animateObserver.observe(element));

const galleryObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const title = entry.target.querySelector('.gallery-name');
      if (entry.isIntersecting) {
        title.classList.add('visible');
      } else {
        title.classList.remove('visible');
      }
    });
  },
  {
    root: null,
    rootMargin: '-20% 0px -20% 0px',
    threshold: 0.8 // Higher threshold for titles to appear when gallery is mostly in view
  }
);
document.querySelectorAll('.gallery-container').forEach((gallery) => galleryObserver.observe(gallery));

// // Intersection Observer for gallery titles
// const galleryObserver = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((entry) => {
//       const title = entry.target.querySelector('.gallery-name');
//       if (entry.isIntersecting) {
//         title.classList.add('visible');
//       } else {
//         title.classList.remove('visible');
//       }
//     });
//   },
//   {
//     root: null,
//     rootMargin: '-20% 0px -20% 0px',
//     threshold: 0.5
//   }
// );
// document.querySelectorAll('.gallery-container').forEach((gallery) => galleryObserver.observe(gallery));

$(document).ready(function() {
  // Select the containers
  const contactContainer = document.querySelector('.contact-container');
  const titleContainer = document.querySelector('.contact-container .title-container');

  // Function to update title-container height
  function updateTitleHeight() {
    if (!contactContainer || !titleContainer) return; // Exit if elements not found

    const contactHeight = contactContainer.offsetHeight; // Get current height
    // Example rule: title height is 10% of form height, clamped between 50px and 200px
    const newTitleHeight = contactHeight;
    titleContainer.style.height = `${newTitleHeight}px`;
  }

  // Initial height adjustment
  updateTitleHeight();

  // Use ResizeObserver to detect form-container size changes
  if ('ResizeObserver' in window) {
    const resizeObserver = new ResizeObserver(() => {
      updateTitleHeight();
    });
    resizeObserver.observe(contactContainer);
  } else {
    // Fallback for older browsers: Poll for changes
    let lastHeight = contactContainer.offsetHeight;
    setInterval(() => {
      const currentHeight = contactContainer.offsetHeight;
      if (currentHeight !== lastHeight) {
        lastHeight = currentHeight;
        updateTitleHeight();
      }
    }, 100); // Check every 100ms
  }

  // Optional: Re-run on window resize (for layout shifts)
  $(window).on('resize', updateTitleHeight);
});

// Menu Toggle and Scroll Logic

$(document).ready(function() {
  // Toggle menu visibility
  $("header button.menu").click(function() {
    $(".expand").toggleClass("expanded");
  });

  // Function to scroll to a section
  function scrollToSection(sectionSelector) {
    if (sectionSelector && $(sectionSelector).length) {
      $('html, body').animate({
        scrollTop: $(sectionSelector).offset().top + 100 // Adjust for header height
      }, 800);
    }
  }

  // Scroll to section and close menu
  $('.scroll-about, .scroll-testimonials, .scroll-contact, .scroll-instagram, footer .hover, .service-btn').click(function(e) {
    e.preventDefault();
    const sectionMap = {
      'scroll-about': '.about-container',
      'scroll-testimonials': '.testimonials-container',
      'scroll-contact': '.contact-container',
      'scroll-instagram': '.instagram-container',
      'about': '.about-container', // For footer buttons
      'testimonials': '.testimonials-container',
      'contact': '.contact-container',
      'service-btn': '.contact-container'
    };
    const buttonClass = $(this).attr('class').split(' ').find(cls => sectionMap[cls]);
    const sectionSelector = sectionMap[buttonClass];

    // Close menu
    $('.expand').removeClass('expanded');

    // Check if on index.html
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
      // Scroll to section if on index.html
      scrollToSection(sectionSelector);
    } else {
      // Navigate to index.html with section hash
      const sectionName = buttonClass.replace('scroll-', '');
      window.location.href = `index.html#${sectionName}`;
    }
  });

  // Handle scrolling to section on page load if hash is present
  if (window.location.hash) {
    const hash = window.location.hash; // e.g., #about
    const sectionMap = {
      '#about': '.about-container',
      '#testimonials': '.testimonials-container',
      '#contact': '.contact-container',
      '#instagram': '.instagram-container'
    };
    const sectionSelector = sectionMap[hash];
    scrollToSection(sectionSelector);
  }
});

// // Intersection Observers
// const animateObserver = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((entry) => {
//       entry.target.classList.toggle('visible', entry.isIntersecting);
//     });
//   },
//   {
//     root: null,
//     rootMargin: '200px',
//     threshold: 0.1
//   }
// );
// document.querySelectorAll('.animate-me').forEach((element) => animateObserver.observe(element));

// const galleryObserver = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((entry) => {
//       const title = entry.target.querySelector('.gallery-name');
//       if (entry.isIntersecting) {
//         title.classList.add('visible');
//       } else {
//         title.classList.remove('visible');
//       }
//     });
//   },
//   {
//     root: null,
//     rootMargin: '-20% 0px -20% 0px',
//     threshold: 0.8
//   }
// );
// document.querySelectorAll('.gallery-container').forEach((gallery) => galleryObserver.observe(gallery));
