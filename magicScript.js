const MagicScriptTag = () => {
  const codeToRunOnClient = `
(function() {
  alert("Hi!");
})()
  `;
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
};
