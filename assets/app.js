const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const WHATSAPP_DEMO = '5554999999999';

function money(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function updateEstimate() {
  const lives = Math.max(1, Number($('#lives')?.value) || 1);
  const plan = $('#plan')?.value || 'super';
  const label = $('#estimateLabel');
  const price = $('#price');
  const detail = $('#priceDetail');

  if (!label || !price || !detail) return;

  if (plan === 'super') {
    const unit = lives <= 25 ? 16.25 : 14.25;
    label.textContent = 'Estimativa do Plano Super';
    price.textContent = money(lives * unit) + '/mês';
    detail.textContent = `${lives} ${lives === 1 ? 'vida' : 'vidas'} × ${money(unit)}`;
  } else {
    label.textContent = 'Estimativa do Plano Plus';
    price.textContent = 'Sob consulta';
    detail.textContent = 'Condição personalizada pela equipe';
  }
}

function maskCnpj(input) {
  let value = input.value.replace(/\D/g, '').slice(0, 14);
  value = value
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
  input.value = value;
}

async function submitProposal(event) {
  event.preventDefault();
  const form = event.currentTarget;

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const lives = Math.max(1, Number($('#lives').value) || 1);
  const plan = $('#plan').value;
  const unit = plan === 'super' ? (lives <= 25 ? 16.25 : 14.25) : 0;
  const total = unit ? lives * unit : 0;
  const contact = $('#contactName').value.trim();
  const company = $('#company').value.trim();
  const phone = $('#contactPhone').value.trim();

  const message = [
    'Olá! Solicito uma proposta de SST.',
    '',
    `Empresa: ${company}`,
    `CNPJ: ${$('#cnpj').value.trim()}`,
    `Plano: ${plan === 'super' ? 'Super' : 'Plus'}`,
    `Colaboradores: ${lives}`,
    `Contato: ${contact}`,
    `E-mail: ${$('#contactEmail').value.trim()}`,
    `WhatsApp: ${phone}`
  ].join('\n');

  const payload = {
    customer: {
      name: contact,
      company,
      email: $('#contactEmail').value.trim(),
      phone
    },
    service: `Plano ${plan === 'super' ? 'Super' : 'Plus'} — SST`,
    summary: [
      { label: 'Empresa', value: company },
      { label: 'CNPJ', value: $('#cnpj').value.trim() },
      { label: 'Plano', value: plan === 'super' ? 'Plano Super' : 'Plano Plus' },
      { label: 'Colaboradores', value: String(lives) },
      { label: 'Valor unitário', value: unit ? money(unit) : 'Sob consulta' },
      { label: 'Estimativa mensal', value: total ? money(total) : 'Sob consulta' }
    ],
    disclaimer: 'Estimativa preliminar sujeita à validação cadastral, técnica e comercial.',
    website: ''
  };

  const sent = await window.ProposalEmail.send(
    payload,
    $('#planEmailFeedback'),
    form.querySelector('[type="submit"]')
  );

  if (sent) {
    const wa = $('#whatsappResult');
    wa.href = `https://wa.me/${WHATSAPP_DEMO}?text=${encodeURIComponent(message)}`;
    wa.hidden = false;
  }
}

function setupFaq() {
  $$('.faq-q').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const answer = $('.faq-a', item);
      const wasOpen = item.classList.contains('open');

      $$('.faq-item').forEach(other => {
        other.classList.remove('open');
        $('.faq-a', other).style.maxHeight = null;
        $('.faq-q', other).setAttribute('aria-expanded', 'false');
      });

      if (!wasOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

function setupReveal() {
  if (!('IntersectionObserver' in window)) {
    $$('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  $$('.reveal').forEach(el => observer.observe(el));
}

function setupNavigation() {
  const menu = $('#menu');
  const links = $('#links');

  menu?.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });

  $$('#links a').forEach(link => link.addEventListener('click', () => links.classList.remove('open')));
}

document.addEventListener('DOMContentLoaded', () => {
  $('#lives')?.addEventListener('input', updateEstimate);
  $('#plan')?.addEventListener('change', updateEstimate);
  $('#cnpj')?.addEventListener('input', event => maskCnpj(event.currentTarget));
  $('#simular')?.addEventListener('submit', submitProposal);

  $$('[data-select-plan]').forEach(link => {
    link.addEventListener('click', () => {
      $('#plan').value = link.dataset.selectPlan;
      updateEstimate();
    });
  });

  $$('[data-whatsapp]').forEach(link => {
    link.href = `https://wa.me/${WHATSAPP_DEMO}?text=${encodeURIComponent('Olá! Quero saber mais sobre os planos de SST.')}`;
  });

  setupFaq();
  setupReveal();
  setupNavigation();
  updateEstimate();
});
