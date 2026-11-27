(function () {
  "use strict";
  if (window.top !== window.self || window.__webgptAnimeThemeInstalled) return;
  window.__webgptAnimeThemeInstalled = true;

  var KEY = "webgpt.animeGlassTheme.v1";
  var defaults = {
    preset: "moon",
    wallpaper: "",
    opacity: 0.68,
    blur: 16,
    dim: 0.24
  };
  var state = loadState();

  function loadState() {
    try {
      var saved = JSON.parse(localStorage.getItem(KEY) || "{}");
      return Object.assign({}, defaults, saved);
    } catch (_) {
      return Object.assign({}, defaults);
    }
  }

  function saveState() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) {}
    applyTheme();
  }

  function presetBackground() {
    if (state.wallpaper) return 'url("' + state.wallpaper.replace(/"/g, "%22") + '")';
    if (state.preset === "sakura") {
      return "radial-gradient(ellipse at 78% 16%, rgba(255,190,220,.58), transparent 34%), linear-gradient(145deg,#24152f 0%,#4b2851 48%,#10172e 100%)";
    }
    if (state.preset === "aurora") {
      return "radial-gradient(ellipse at 20% 20%,rgba(68,205,190,.48),transparent 38%),radial-gradient(ellipse at 80% 70%,rgba(116,95,230,.48),transparent 42%),linear-gradient(145deg,#081b2d,#14203d 60%,#101329)";
    }
    return "radial-gradient(circle at 78% 18%,rgba(255,213,157,.52),transparent 24%),radial-gradient(ellipse at 16% 75%,rgba(90,110,210,.34),transparent 48%),linear-gradient(145deg,#081329 0%,#17264b 54%,#17152e 100%)";
  }

  function ensureStyle() {
    if (document.getElementById("webgpt-anime-glass-style")) return;
    var style = document.createElement("style");
    style.id = "webgpt-anime-glass-style";
    style.textContent = [
      "html,body,#root{background:transparent!important;background-color:transparent!important}",
      "body{background-image:none!important}",
      "#webgpt-anime-wallpaper{position:fixed;inset:0;z-index:0;pointer-events:none;background-position:center;background-size:cover;background-repeat:no-repeat;transition:background .25s ease;}",
      "#webgpt-anime-wallpaper:after{content:'';position:absolute;inset:0;background:rgba(5,8,24,var(--wg-dim,.24));}",
      "#root{position:relative;z-index:1;}",
      "main,main>div,main [data-testid='conversation-turn'],#thread,#thread-bottom-container{background-color:transparent!important;}",
      "header,nav,[data-testid='conversation-header']{background:rgba(12,17,37,.22)!important;backdrop-filter:blur(var(--wg-blur,16px));-webkit-backdrop-filter:blur(var(--wg-blur,16px));}",
      "[data-testid='conversation-turn'] [data-message-author-role='user']{background:rgba(235,239,255,calc(var(--wg-opacity,.68)*.13))!important;border:1px solid rgba(255,255,255,.12)!important;border-radius:20px!important;padding:10px 14px!important;}",
      "#thread-bottom-container,form:has(#prompt-textarea),[data-testid='composer']{background:rgba(18,23,45,var(--wg-opacity,.68))!important;border:1px solid rgba(255,255,255,.2)!important;border-radius:26px!important;box-shadow:0 12px 36px rgba(0,0,0,.22)!important;backdrop-filter:blur(var(--wg-blur,16px)) saturate(145%)!important;-webkit-backdrop-filter:blur(var(--wg-blur,16px)) saturate(145%)!important;}",
      "#prompt-textarea{background:transparent!important;}",
      ".bg-token-main-surface-primary,.bg-token-main-surface-secondary,.bg-token-sidebar-surface-primary{background-color:rgba(12,17,37,.30)!important;}",
      "#webgpt-anime-trigger{position:fixed;z-index:2147483000;right:14px;top:calc(env(safe-area-inset-top,0px) + 72px);width:42px;height:42px;border-radius:50%;border:1px solid rgba(255,255,255,.28);background:rgba(24,31,62,.72);color:#fff;font-size:20px;box-shadow:0 5px 20px rgba(0,0,0,.24);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);}",
      "#webgpt-anime-panel{position:fixed;z-index:2147483001;right:12px;top:calc(env(safe-area-inset-top,0px) + 120px);width:min(310px,calc(100vw - 24px));max-height:70vh;overflow:auto;display:none;padding:16px;border-radius:22px;border:1px solid rgba(255,255,255,.22);background:rgba(13,19,42,.88);color:#f6f5ff;box-shadow:0 18px 50px rgba(0,0,0,.38);backdrop-filter:blur(24px) saturate(150%);-webkit-backdrop-filter:blur(24px) saturate(150%);font:14px/1.45 system-ui,-apple-system,sans-serif;}",
      "#webgpt-anime-panel.open{display:block}",
      "#webgpt-anime-panel *{box-sizing:border-box}",
      "#webgpt-anime-panel .wg-title{font-size:17px;font-weight:700;margin:0 0 3px}",
      "#webgpt-anime-panel .wg-sub{font-size:12px;color:#c3c8e2;margin:0 0 14px}",
      "#webgpt-anime-panel .wg-row{display:flex;gap:8px;margin:9px 0}",
      "#webgpt-anime-panel button,#webgpt-anime-panel label.wg-upload{border:1px solid rgba(255,255,255,.18);border-radius:12px;background:rgba(255,255,255,.10);color:#fff;padding:9px 10px;font:inherit;}",
      "#webgpt-anime-panel button.wg-active{background:rgba(151,133,255,.38);border-color:rgba(190,180,255,.6)}",
      "#webgpt-anime-panel .wg-row button{flex:1}",
      "#webgpt-anime-panel .wg-field{margin:13px 0}",
      "#webgpt-anime-panel .wg-field label{display:flex;justify-content:space-between;margin-bottom:6px;color:#e8e9f7}",
      "#webgpt-anime-panel input[type=range]{width:100%;accent-color:#b5a4ff}",
      "#webgpt-anime-panel input[type=file]{display:none}",
      "#webgpt-anime-panel .wg-upload{display:block;text-align:center;flex:1}",
      "#webgpt-anime-panel .wg-foot{font-size:11px;color:#aeb5d3;margin-top:10px}"
    ].join("");
    (document.head || document.documentElement).appendChild(style);
  }

  function applyTheme() {
    if (!document.documentElement) return;
    ensureStyle();
    var root = document.documentElement;
    root.style.setProperty("--wg-opacity", String(Math.max(.25, Math.min(.92, Number(state.opacity) || defaults.opacity))));
    root.style.setProperty("--wg-blur", Math.max(0, Math.min(30, Number(state.blur) || 0)) + "px");
    root.style.setProperty("--wg-dim", String(Math.max(0, Math.min(.65, Number(state.dim) || 0))));
    var layer = document.getElementById("webgpt-anime-wallpaper");
    if (!layer) {
      layer = document.createElement("div");
      layer.id = "webgpt-anime-wallpaper";
      (document.body || document.documentElement).prepend(layer);
    }
    layer.style.backgroundImage = presetBackground();
  }

  function buildPanel() {
    if (document.getElementById("webgpt-anime-trigger")) return;
    var trigger = document.createElement("button");
    trigger.id = "webgpt-anime-trigger";
    trigger.type = "button";
    trigger.textContent = "✦";
    trigger.setAttribute("aria-label", "Anime theme settings");
    var panel = document.createElement("section");
    panel.id = "webgpt-anime-panel";
    panel.innerHTML =
      '<div class="wg-title">Anime Glass</div>' +
      '<div class="wg-sub">壁纸与玻璃效果 · 设置自动保存</div>' +
      '<div class="wg-row">' +
        '<button type="button" data-preset="moon">月夜</button>' +
        '<button type="button" data-preset="sakura">樱花</button>' +
        '<button type="button" data-preset="aurora">极光</button>' +
      '</div>' +
      '<div class="wg-row"><label class="wg-upload">上传自己的壁纸<input id="wg-wallpaper-file" type="file" accept="image/*"></label><button type="button" id="wg-clear-wallpaper">清除图片</button></div>' +
      '<div class="wg-field"><label><span>玻璃透明度</span><output id="wg-opacity-value"></output></label><input id="wg-opacity" type="range" min="25" max="92" value="68"></div>' +
      '<div class="wg-field"><label><span>磨砂模糊</span><output id="wg-blur-value"></output></label><input id="wg-blur" type="range" min="0" max="30" value="16"></div>' +
      '<div class="wg-field"><label><span>壁纸暗度</span><output id="wg-dim-value"></output></label><input id="wg-dim" type="range" min="0" max="65" value="24"></div>' +
      '<div class="wg-row"><button type="button" id="wg-reset">恢复默认</button><button type="button" id="wg-close">完成</button></div>' +
      '<div class="wg-foot">主题只调整网页外观，不接管聊天、模型或账号功能。</div>';
    document.body.appendChild(trigger);
    document.body.appendChild(panel);

    trigger.addEventListener("click", function () { panel.classList.toggle("open"); });
    panel.addEventListener("click", function (event) {
      var preset = event.target && event.target.getAttribute("data-preset");
      if (preset) {
        state.preset = preset;
        state.wallpaper = "";
        saveState();
        syncControls();
      }
    });
    panel.querySelector("#wg-close").addEventListener("click", function () { panel.classList.remove("open"); });
    panel.querySelector("#wg-reset").addEventListener("click", function () {
      state = Object.assign({}, defaults);
      saveState();
      syncControls();
    });
    panel.querySelector("#wg-clear-wallpaper").addEventListener("click", function () {
      state.wallpaper = "";
      saveState();
      syncControls();
    });
    ["opacity", "blur", "dim"].forEach(function (name) {
      panel.querySelector("#wg-" + name).addEventListener("input", function (event) {
        var value = Number(event.target.value);
        state[name] = name === "opacity" ? value / 100 : (name === "dim" ? value / 100 : value);
        saveState();
        syncControls();
      });
    });
    panel.querySelector("#wg-wallpaper-file").addEventListener("change", function (event) {
      var file = event.target.files && event.target.files[0];
      if (!file || !/^image\//.test(file.type)) return;
      var reader = new FileReader();
      reader.onload = function () {
        var img = new Image();
        img.onload = function () {
          var scale = Math.min(1, 1600 / Math.max(img.width, img.height));
          var canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.round(img.width * scale));
          canvas.height = Math.max(1, Math.round(img.height * scale));
          canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
          state.wallpaper = canvas.toDataURL("image/jpeg", .78);
          saveState();
          syncControls();
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
    syncControls();
  }

  function syncControls() {
    var panel = document.getElementById("webgpt-anime-panel");
    if (!panel) return;
    ["moon", "sakura", "aurora"].forEach(function (name) {
      var button = panel.querySelector('[data-preset="' + name + '"]');
      if (button) button.classList.toggle("wg-active", state.preset === name && !state.wallpaper);
    });
    var opacity = Math.round(Number(state.opacity) * 100);
    var blur = Number(state.blur);
    var dim = Math.round(Number(state.dim) * 100);
    panel.querySelector("#wg-opacity").value = opacity;
    panel.querySelector("#wg-opacity-value").textContent = opacity + "%";
    panel.querySelector("#wg-blur").value = blur;
    panel.querySelector("#wg-blur-value").textContent = blur + "px";
    panel.querySelector("#wg-dim").value = dim;
    panel.querySelector("#wg-dim-value").textContent = dim + "%";
  }

  function init() {
    if (!document.body) return;
    applyTheme();
    buildPanel();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
  var observer = new MutationObserver(function () {
    if (!document.getElementById("webgpt-anime-wallpaper") || !document.getElementById("webgpt-anime-trigger")) init();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("pageshow", init);
})();