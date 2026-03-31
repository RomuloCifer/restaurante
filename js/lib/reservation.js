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
