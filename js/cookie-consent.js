(function () {
  var CONSENT_KEY = 'cookie_consent_choice';
  var PREFS_KEY = 'cookie_prefs';
  var FORCE_BANNER = false; // disable testing flag for lawful behavior
  // DEV: keep banner visible to tweak UI; set to false when done
  var DEV_ALWAYS_SHOW = false; // turn off to behave like a normal banner

  function setConsent(mode) {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        ad_storage: mode,
        analytics_storage: mode,
        functionality_storage: 'granted',
        security_storage: 'granted'
      });
    }
  }

  function applyStoredConsent() {
    // Styling mode disabled; proceed normally
    if (FORCE_BANNER) {
      showBanner();
      setConsent('denied');
      return;
    }
    var choice = localStorage.getItem(CONSENT_KEY);
    var prefs = getPrefs();

    if (!choice) {
      showBanner();
      setConsent('denied');
      return;
    }

    var analyticsGranted = !!prefs.analytics;
    setConsent(analyticsGranted ? 'granted' : 'denied');
    hideBanner(); // hide if consent already decided
  }

  function getPrefs() {
    try {
      return JSON.parse(localStorage.getItem(PREFS_KEY) || '{}');
    } catch (_) {
      return {};
    }
  }

  function savePrefs(prefs) {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs || {}));
  }

  function showBanner() {
    var banner = document.getElementById('cookie-consent-banner');
    if (banner) banner.style.display = 'block';
    document.body.classList.add('cookie-banner-visible');

    // Initialize prefs UI
    var analyticsCheckbox = document.getElementById('pref-analytics');
    if (analyticsCheckbox) {
      var prefs = getPrefs();
      analyticsCheckbox.checked = !!prefs.analytics;
    }
  }

  function hideBanner() {
    var banner = document.getElementById('cookie-consent-banner');
    if (banner) banner.style.display = 'none';
    document.body.classList.remove('cookie-banner-visible');
  }

  function openPreferences() {
    var banner = document.getElementById('cookie-consent-banner');
    var panel = document.getElementById('cookie-prefs');
    if (!banner || !panel) return;
    banner.style.display = 'block';
    panel.style.display = 'block';
    document.body.classList.add('cookie-banner-visible');
  }

  function bindBannerActions() {
    var acceptBtn = document.getElementById('cookie-accept');
    var rejectBtn = document.getElementById('cookie-reject');
    var prefsBtn = document.getElementById('cookie-prefs-btn');
    var savePrefsBtn = document.getElementById('cookie-save-prefs');
    var analyticsCheckbox = document.getElementById('pref-analytics');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        localStorage.setItem(CONSENT_KEY, 'accepted');
        savePrefs({ analytics: true });
        setConsent('granted');
        hideBanner(); // hide after accept
      });
    }

    if (rejectBtn) {
      rejectBtn.addEventListener('click', function () {
        localStorage.setItem(CONSENT_KEY, 'rejected');
        savePrefs({ analytics: false });
        setConsent('denied');
        hideBanner(); // hide after reject
      });
    }

    if (prefsBtn) {
      prefsBtn.addEventListener('click', function () {
        var panel = document.getElementById('cookie-prefs');
        if (panel) {
          panel.style.display = 'block';
          // Optional: ensure analytics checkbox is synced with stored prefs
          var analyticsCheckbox = document.getElementById('pref-analytics');
          if (analyticsCheckbox) {
            var prefs = getPrefs();
            analyticsCheckbox.checked = !!prefs.analytics;
          }
        }
      });
    }

    if (savePrefsBtn) {
      savePrefsBtn.addEventListener('click', function () {
        var analyticsCheckbox = document.getElementById('pref-analytics');
        var prefs = { analytics: !!(analyticsCheckbox && analyticsCheckbox.checked) };
        savePrefs(prefs);
        localStorage.setItem(CONSENT_KEY, 'custom');
        setConsent(prefs.analytics ? 'granted' : 'denied');
        hideBanner(); // hide after saving preferences
      });
    }

    // Expose a global to reopen preferences from any link/button
    window.openConsentPreferences = openPreferences;
  }

  // Initialize: set default denied before GA init completes
  window.dataLayer = window.dataLayer || [];
  function gtagShim(){window.dataLayer.push(arguments);}
  if (typeof gtag === 'undefined') {
    window.gtag = gtagShim;
  }
  gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted'
  });

  document.addEventListener('DOMContentLoaded', function () {
    bindBannerActions();
    applyStoredConsent();
  });
})();
