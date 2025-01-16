import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function autoTab() {
  // Auto tab for multiple tab menus with GSAP ScrollTrigger integration

  // Initialize GSAP and ScrollTrigger animations
  gsap.registerPlugin(ScrollTrigger);

  // Function to create a tab loop with GSAP animations for a specific component
  function createTabLoop($component) {
    var tabTimeout;
    var isPaused = false;
    var $tabMenu = $component.find(".w-tab-menu");

    // Initial GSAP setup for all progress bars
    $component.find(".tab-hor_progress").each(function () {
      gsap.set(this, { xPercent: -100 });
    });

    function playProgressAnimation($tab) {
      const $progress = $tab.find(".tab-hor_progress");
      gsap.to($progress, {
        xPercent: 0,
        duration: 7,
        ease: "linear",
      });
    }

    function resetProgressAnimation($tab) {
      const $progress = $tab.find(".tab-hor_progress");
      gsap.to($progress, {
        xPercent: -100,
        duration: 0,
      });
    }

    function tabLoop() {
      clearTimeout(tabTimeout);
      if (!isPaused) {
        tabTimeout = setTimeout(function () {
          var $currentTab = $tabMenu.children(".w--current:first");
          var $next = $currentTab.next();

          // Reset progress for all tabs except the next one
          $tabMenu.find(".w-tab-link").each(function () {
            resetProgressAnimation($(this));
          });

          if ($next.length) {
            resetProgressAnimation($currentTab);
            $next.removeAttr("href").click();
          } else {
            var $firstTab = $tabMenu.find(".w-tab-link:first");
            resetProgressAnimation($currentTab);
            $firstTab.removeAttr("href").click();
          }
        }, 7000); // 7 seconds
      }
    }

    // ScrollTrigger to start the tab loop and progress animations on scroll
    ScrollTrigger.create({
      trigger: $component[0],
      start: "top 80%", // Adjust to when the animation should start
      end: "bottom 20%", // Adjust to when it should end
      onEnter: () => {
        tabLoop(); // Start the loop
        // Play the progress animation for the first tab
        const $firstTab = $tabMenu.find(".w-tab-link:first");
        playProgressAnimation($firstTab);
      },
      onLeaveBack: () => {
        // Reset all animations when scrolling out of view
        clearTimeout(tabTimeout);
        $tabMenu.find(".w-tab-link").each(function () {
          resetProgressAnimation($(this));
        });
      },
    });

    // When a tab is clicked, reset the timeout and play the progress animation
    $tabMenu.find(".w-tab-link").click(function () {
      clearTimeout(tabTimeout);
      tabLoop();

      const $clickedTab = $(this);
      // Reset progress for all tabs except the clicked one
      $tabMenu.find(".w-tab-link").each(function () {
        if (!$(this).is($clickedTab)) {
          resetProgressAnimation($(this));
        }
      });

      // Play animation for the clicked tab
      playProgressAnimation($clickedTab);
    });

    // Pause on hover over tab menu item
    $tabMenu.find(".tab-hor_menu-item").hover(
      function () {
        // Mouse enter
        isPaused = true;
        clearTimeout(tabTimeout);

        // Pause GSAP animation for the hovered tab
        const $hoveredTab = $(this).closest(".w-tab-link");
        gsap.globalTimeline.pause();
      },
      function () {
        // Mouse leave
        isPaused = false;
        tabLoop();

        // Resume GSAP animation
        gsap.globalTimeline.resume();
      }
    );

    // Pause/resume on navbar button click
    $(".w-nav-button").click(function () {
      if (isPaused) {
        isPaused = false;
        tabLoop(); // Resume the tab loop
        gsap.globalTimeline.resume(); // Resume GSAP animations
      } else {
        isPaused = true;
        clearTimeout(tabTimeout); // Pause the tab loop
        gsap.globalTimeline.pause(); // Pause GSAP animations
      }
    });
  }

  // Apply the tab loop to each .tab-hor_component
  $(".tab-hor_component").each(function () {
    createTabLoop($(this));
  });
}
