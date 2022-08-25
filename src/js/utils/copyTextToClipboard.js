async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {};
};

export default copyTextToClipboard;