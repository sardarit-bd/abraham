(function () {
  if (localStorage.getItem('cookiesAccepted') === 'true') {

    var gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-49PM9XF9CQ";
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-49PM9XF9CQ', {
      anonymize_ip: true
    });
  }
})();
