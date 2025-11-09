const htmlCode = document.getElementById("htmlCode");
const cssCode = document.getElementById("cssCode");
const jsCode = document.getElementById("jsCode");
const runBtn = document.getElementById("runBtn");

// Função para executar em nova aba
function executeInNewTab() {
  const html = htmlCode.value;
  const css = `<style>${cssCode.value}</style>`;
  const js = `
    <script>
      ${jsCode.value}
    </script>
  `;
  const fullCode = html + css + js;

  const newWindow = window.open('', '_blank', 'fullscreen=yes');
  newWindow.document.open();
  newWindow.document.write(fullCode);
  newWindow.document.close();
  newWindow.focus();
}

// Event listeners
runBtn.addEventListener("click", executeInNewTab);

// Atalho de teclado: Ctrl/Cmd + Enter para executar
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    e.preventDefault();
    executeInNewTab();
  }
});

// Suporte para Tab nos textareas
;[htmlCode, cssCode, jsCode].forEach((textarea) => {
  textarea.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      textarea.value = textarea.value.substring(0, start) + "  " + textarea.value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + 2;
    }
  });
});