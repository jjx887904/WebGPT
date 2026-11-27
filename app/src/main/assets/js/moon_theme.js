(function () {
  if (window.__moonThemeInstalled) return;
  window.__moonThemeInstalled = true;

  var KEY = "moongpt-theme-v1";
  var defaults = { accent: "#a78bfa", opacity: 0.72, wallpaper: "" };
  var state = defaults;
  try {
    var saved = JSON.parse(localStorage.getItem(KEY) || "null");
    if (saved) state = Object.assign({}, defaults, saved);
  } catch (_) {}

  var css = [
    ":root{--moon-accent:" + state.accent + ";--moon-glass:rgba(30,20,55," + state.opacity + ")}",
    "html,body{background:transparent!important}",
    "body:before{content:'';position:fixed;inset:0;z-index:-1;pointer-events:none;background:linear-gradient(135deg,rgba(18,10,42,.68),rgba(15,25,55,.56)),var(--moon-wallpaper,none),#100d25;background-size:cover;background-position:center;background-attachment:fixed}",
    "main,[data-testid='conversation-turn'],#thread,[data-testid='conversation'],[data-testid='chat-history'],.dark{background-color:transparent!important}",
    "div[data-message-author-role='user']{background:var(--moon-glass)!important;border:1px solid color-mix(in srgb,var(--moon-accent) 35%,transparent)!important;border-radius:20px!important;backdrop-filter:blur(16px)!important;-webkit-backdrop-filter:blur(16px)!important;padding:12px 16px!important;margin:10px 0!important;box-shadow:0 8px 30px rgba(0,0,0,.14)!important}",
    "div[data-message-author-role='assistant']{background:transparent!important}",
    "form,[data-testid='composer'],[data-testid='composer-background']{background:rgba(27,20,48,.78)!important;border:1px solid color-mix(in srgb,var(--moon-accent) 42%,transparent)!important;border-radius:24px!important;backdrop-filter:blur(20px)!important;-webkit-backdrop-filter:blur(20px)!important;box-shadow:0 10px 34px rgba(0,0,0,.24)!important}",
    "button[data-testid],nav{transition:background .2s ease,border-color .2s ease}",
    "button:hover{border-color:var(--moon-accent)!important}",
    "a{color:var(--moon-accent)!important}",
    "#moon-fab{position:fixed;z-index:2147483000;right:14px;top:74px;width:44px;height:44px;border-radius:50%;border:1px solid rgba(210,190,255,.48);background:rgba(35,24,65,.82);color:#fff;font-size:21px;box-shadow:0 6px 24px rgba(0,0,0,.32);backdrop-filter:blur(14px);cursor:pointer}",
    "#moon-panel{position:fixed;z-index:2147483001;right:12px;top:124px;width:min(310px,calc(100vw - 24px));padding:16px;border:1px solid rgba(210,190,255,.32);border-radius:22px;background:rgba(20,15,40,.94);color:#f6f0ff;box-shadow:0 18px 55px rgba(0,0,0,.42);backdrop-filter:blur(24px);font:14px/1.45 system-ui,sans-serif}",
    "#moon-panel[hidden]{display:none}#moon-panel h3{font-size:17px;margin:0 0 12px;font-weight:700}#moon-panel p{opacity:.78;margin:0 0 10px}#moon-panel button,#moon-panel label{display:inline-flex;align-items:center;justify-content:center;gap:7px;border:1px solid rgba(210,190,255,.25);border-radius:12px;padding:9px 11px;background:rgba(255,255,255,.08);color:#fff;font:inherit;cursor:pointer}#moon-panel .moon-row{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}#moon-panel input[type=color]{width:38px;height:36px;border:0;background:transparent;padding:0}#moon-panel input[type=range]{width:100%;accent-color:var(--moon-accent)}#moon-panel .moon-wide{width:100%;box-sizing:border-box}#moon-panel .moon-close{float:right;padding:4px 9px}#moon-panel small{display:block;opacity:.65;margin-top:10px}",
  ].join("\n");

  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) {}
    apply();
  }
  function apply() {
    var style = document.getElementById("moon-theme-style");
    if (!style) return;
    style.textContent = css.replace(/--moon-accent:[^;]+/, "--moon-accent:" + state.accent)
      .replace(/--moon-glass:rgba\(30,20,55,[^)]+\)/, "--moon-glass:rgba(30,20,55," + state.opacity + ")");
    var wallpaper = state.wallpaper ? "url('" + state.wallpaper + "')" : "none";
    style.textContent += "\nbody:before{--moon-wallpaper:" + wallpaper + "}";
  }
  function build() {
    if (!document.body || document.getElementById("moon-fab")) return;
    var style = document.createElement("style");
    style.id = "moon-theme-style";
    style.textContent = css;
    document.documentElement.appendChild(style);
    apply();

    var fab = document.createElement("button");
    fab.id = "moon-fab";
    fab.type = "button";
    fab.title = "MoonGPT 外观设置";
    fab.textContent = "☾";
    fab.addEventListener("click", function () {
      var panel = document.getElementById("moon-panel");
      if (panel) panel.hidden = !panel.hidden;
    });
    document.body.appendChild(fab);

    var panel = document.createElement("section");
    panel.id = "moon-panel";
    panel.hidden = true;
    panel.innerHTML =
      '<button class="moon-close" type="button" aria-label="关闭">✕</button>' +
      '<h3>☾ MoonGPT 月夜主题</h3><p>自定义你的聊天空间</p>' +
      '<div><b>主题强调色</b><div class="moon-row">' +
      '<button type="button" data-color="#a78bfa">月夜紫</button>' +
      '<button type="button" data-color="#60a5fa">星空蓝</button>' +
      '<button type="button" data-color="#f0abfc">樱花粉</button>' +
      '<input id="moon-color" type="color" value="' + state.accent + '" aria-label="自定义颜色"></div></div>' +
      '<div><b>聊天气泡透明度</b><input id="moon-opacity" class="moon-wide" type="range" min="0.25" max="0.95" step="0.05" value="' + state.opacity + '"></div>' +
      '<div class="moon-row"><label class="moon-wide">上传背景图片<input id="moon-wallpaper" type="file" accept="image/*" hidden></label></div>' +
      '<div class="moon-row"><button id="moon-reset" class="moon-wide" type="button">恢复默认主题</button></div>' +
      '<small>壁纸只保存在本机浏览器数据中，不会上传到服务器。</small>';
    document.body.appendChild(panel);
    panel.querySelector(".moon-close").addEventListener("click", function () { panel.hidden = true; });
    panel.querySelectorAll("[data-color]").forEach(function (button) {
      button.addEventListener("click", function () { state.accent = button.getAttribute("data-color"); persist(); panel.querySelector("#moon-color").value = state.accent; });
    });
    panel.querySelector("#moon-color").addEventListener("input", function (event) { state.accent = event.target.value; persist(); });
    panel.querySelector("#moon-opacity").addEventListener("input", function (event) { state.opacity = Number(event.target.value); persist(); });
    panel.querySelector("#moon-wallpaper").addEventListener("change", function (event) {
      var file = event.target.files && event.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        var img = new Image();
        img.onload = function () {
          var scale = Math.min(1, 1600 / Math.max(img.width, img.height));
          var canvas = document.createElement("canvas");
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
          state.wallpaper = canvas.toDataURL("image/jpeg", 0.78);
          persist();
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
    panel.querySelector("#moon-reset").addEventListener("click", function () {
      state = Object.assign({}, defaults);
      persist();
      panel.querySelector("#moon-color").value = state.accent;
      panel.querySelector("#moon-opacity").value = state.opacity;
      panel.querySelector("#moon-wallpaper").value = "";
    });
  }

  var observer = new MutationObserver(build);
  try { observer.observe(document.documentElement, { childList: true, subtree: true }); } catch (_) {}
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build, { once: true });
  else build();
})();