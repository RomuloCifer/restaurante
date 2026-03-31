function toIsoDate(date) {
	const y = date.getFullYear();
	const m = String(date.getMonth() + 1).padStart(2, '0');
	const d = String(date.getDate()).padStart(2, '0');
	return `${y}-${m}-${d}`;
}

function formatPtBrDate(isoDate) {
	const [y, m, d] = isoDate.split('-');
	return `${d}/${m}/${y}`;
}

function normalizePhone(input) {
	return input.replace(/\D/g, '');
}

function isValidPhone(input) {
	const digits = normalizePhone(input);
	return digits.length >= 10 && digits.length <= 11;
}

export function initReservation(container) {
	if (!container) return;

	const today = new Date();
	const maxDate = new Date();
	maxDate.setMonth(maxDate.getMonth() + 3);

	container.innerHTML = `
		<div class="reservation__inner">
			<div class="reservation__copy">
				<span class="reservation__eyebrow">Reserva</span>
				<h2>Garanta sua mesa no Catheons</h2>
				<p>Escolha a data e o horario ideal para sua experiencia. Confirmamos sua reserva imediatamente na tela.</p>
				<p class="reservation__contact">Contato rapido: <a href="tel:+5511999999999">(11) 99999-9999</a></p>
				<div class="reservation__social" aria-label="Redes sociais e contato">
					<a
						class="reservation__social-link"
						href="https://wa.me/5511999999999"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Falar no WhatsApp"
						title="WhatsApp"
					>
						<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
							<path d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.53 0 .2 5.32.2 11.87a11.7 11.7 0 0 0 1.61 5.92L0 24l6.4-1.68a11.84 11.84 0 0 0 5.67 1.45h.01c6.55 0 11.88-5.33 11.88-11.88a11.8 11.8 0 0 0-3.44-8.41zm-8.44 18.3h-.01a9.88 9.88 0 0 1-5.03-1.37l-.36-.22-3.8 1 1.01-3.71-.24-.38a9.84 9.84 0 0 1-1.51-5.23c0-5.46 4.45-9.9 9.93-9.9a9.9 9.9 0 0 1 9.9 9.9c0 5.48-4.45 9.91-9.89 9.91zm5.43-7.43c-.3-.15-1.77-.87-2.05-.97-.28-.1-.49-.15-.69.15-.2.3-.79.97-.96 1.17-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5a9.08 9.08 0 0 1-1.67-2.08c-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.7-1.69-.97-2.31-.25-.61-.5-.53-.69-.54h-.59c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.52 0 1.5 1.07 2.95 1.22 3.15.15.2 2.1 3.21 5.09 4.5.71.31 1.27.5 1.7.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.41.25-.69.25-1.28.18-1.41-.07-.12-.28-.2-.58-.35z"/>
						</svg>
					</a>
					<a
						class="reservation__social-link"
						href="https://www.instagram.com/catheons"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Abrir Instagram"
						title="Instagram"
					>
						<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
							<path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5A3.95 3.95 0 0 0 7.75 20.2h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5zM17.6 6.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8z"/>
						</svg>
					</a>
					<button
						type="button"
						class="reservation__social-link"
						data-action="location"
						aria-label="Abrir localização no mapa"
						title="Localização"
					>
						<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
							<path d="M12 2.2a7.1 7.1 0 0 0-7.1 7.1c0 4.97 5.52 11.39 6.15 12.1a1.3 1.3 0 0 0 1.9 0c.63-.71 6.15-7.13 6.15-12.1A7.1 7.1 0 0 0 12 2.2zm0 16.15c-1.91-2.3-5.3-6.93-5.3-9.05a5.3 5.3 0 1 1 10.6 0c0 2.12-3.39 6.75-5.3 9.05zm0-11.91a3.03 3.03 0 1 0 0 6.06 3.03 3.03 0 0 0 0-6.06zm0 4.26a1.23 1.23 0 1 1 0-2.46 1.23 1.23 0 0 1 0 2.46z"/>
						</svg>
					</button>
				</div>
			</div>

			<form id="reservation-form" class="reservation__form" novalidate>
				<label>
					Nome completo
					<input type="text" name="name" minlength="3" maxlength="80" required placeholder="Seu nome" />
				</label>

				<label>
					Telefone
					<input type="tel" name="phone" required placeholder="(11) 99999-9999" />
				</label>

				<div class="reservation__row">
					<label>
						Data
						<input
							type="date"
							name="date"
							required
							min="${toIsoDate(today)}"
							max="${toIsoDate(maxDate)}"
						/>
					</label>

					<label>
						Horario
						<input type="time" name="time" required min="18:00" max="23:00" step="1800" />
					</label>
				</div>

				<label>
					Quantidade de pessoas
					<input type="number" name="guests" required min="1" max="12" value="2" />
				</label>

				<div class="reservation__actions">
					<button type="submit" class="btn primary">Confirmar reserva</button>
					<small>Atendimento: terca a domingo, 18h as 23h.</small>
				</div>

				<p id="reservation-message" class="reservation__message" aria-live="polite"></p>
			</form>
		</div>
	`;

	const form = container.querySelector('#reservation-form');
	const message = container.querySelector('#reservation-message');

	if (!form || !message) return;

	form.addEventListener('submit', (event) => {
		event.preventDefault();

		const fd = new FormData(form);
		const name = String(fd.get('name') || '').trim();
		const phone = String(fd.get('phone') || '').trim();
		const date = String(fd.get('date') || '').trim();
		const time = String(fd.get('time') || '').trim();
		const guests = Number(fd.get('guests') || 0);

		if (name.length < 3) {
			message.textContent = 'Digite um nome valido com pelo menos 3 caracteres.';
			message.dataset.state = 'error';
			return;
		}

		if (!isValidPhone(phone)) {
			message.textContent = 'Digite um telefone valido com DDD.';
			message.dataset.state = 'error';
			return;
		}

		if (!date) {
			message.textContent = 'Selecione a data da reserva.';
			message.dataset.state = 'error';
			return;
		}

		if (!time) {
			message.textContent = 'Selecione o horario da reserva.';
			message.dataset.state = 'error';
			return;
		}

		if (!Number.isFinite(guests) || guests < 1 || guests > 12) {
			message.textContent = 'Informe entre 1 e 12 pessoas.';
			message.dataset.state = 'error';
			return;
		}

		const safeName = name.split(' ')[0];
		message.textContent = `Reserva confirmada para ${safeName} no dia ${formatPtBrDate(date)} as ${time}, para ${guests} pessoa(s).`;
		message.dataset.state = 'success';

		form.reset();
		const guestsInput = form.querySelector('input[name="guests"]');
		if (guestsInput) guestsInput.value = '2';
	});
}
