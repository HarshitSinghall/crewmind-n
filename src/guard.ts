// Loaded before third-party presentation scripts. No original backend is contacted.
(() => {
  const blocked = (input: string) => /\/wp-admin\/|\/wp-json\/|googletagmanager|google-analytics|cookieyes|recaptcha/i.test(input);
  const originalFetch = window.fetch.bind(window);
  window.fetch = (input, init) => {
    const url = input instanceof Request ? input.url : String(input);
    if (blocked(url)) return Promise.resolve(new Response(JSON.stringify({ success: false, demo: true }), { status: 200, headers: { 'Content-Type': 'application/json' } }));
    return originalFetch(input, init);
  };
  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (this: XMLHttpRequest, method: string, url: string | URL, ...rest: unknown[]) {
    const destination = blocked(String(url)) ? '/_local/disabled.json' : String(url);
    return (originalOpen as (...args: unknown[]) => void).call(this, method, destination, ...rest);
  } as typeof XMLHttpRequest.prototype.open;
  // Source bundles reference this object when a candidate action is clicked.
  (window as unknown as Record<string, unknown>).SlateAjax = { ajaxAdminUrl: '/_local/disabled.json', postId: '' };
})();
