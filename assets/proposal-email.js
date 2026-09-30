(function () {
  'use strict';

  async function send(payload, feedback, button) {
    feedback.className = 'email-feedback loading';
    feedback.textContent = 'Enviando sua proposta…';
    button.disabled = true;

    try {
      const response = await fetch('api/enviar-proposta.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.message || 'Não foi possível enviar.');
      }

      feedback.className = 'email-feedback success-message';
      feedback.textContent = result.message;
      return true;
    } catch (error) {
      feedback.className = 'email-feedback error-message';
      feedback.textContent = location.protocol === 'file:'
        ? 'A proposta está pronta. O envio por e-mail funciona após publicar o projeto em servidor PHP configurado.'
        : (error.message || 'Não foi possível enviar agora.');
      return false;
    } finally {
      button.disabled = false;
    }
  }

  window.ProposalEmail = { send };
}());
