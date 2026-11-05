import { TIPOS, TEMAS, NIVELES } from '../data/options.js';
import { create } from '../services/storage.js';
import { showToast } from '../components/toast.js';

// Renderiza el formulario de creación de recursos, preparado para recibir un recurso a futuro
export function renderForm(app, resource = null) {
  const typeOptions = TIPOS.map(
    (opt) => `<option value="${opt.value}">${opt.label}</option>`
  ).join('');

  const themeOptions = TEMAS.map(
    (opt) => `<option value="${opt.value}">${opt.label}</option>`
  ).join('');

  const levelRadios = NIVELES.map(
    (opt) => `
      <label class="radio-label">
        <input type="radio" name="nivel" value="${opt.value}" ${opt.value === 'basico' ? 'checked' : ''} />
        <span>${opt.label}</span>
      </label>
    `
  ).join('');

  app.innerHTML = `
    <div class="form-view">
      <h1>Nuevo recurso</h1>
      <div class="card">
        <form id="resource-form" novalidate>
          <div class="form-group">
            <label for="titulo" class="form-label">Título</label>
            <input type="text" id="titulo" name="titulo" class="input" placeholder="Nombre del recurso" />
            <span class="form-error" id="error-titulo"></span>
          </div>

          <div class="form-group">
            <label for="url" class="form-label">URL</label>
            <input type="url" id="url" name="url" class="input" placeholder="https://ejemplo.com" />
            <span class="form-error" id="error-url"></span>
          </div>

          <div class="form-group">
            <label for="tipo" class="form-label">Tipo</label>
            <select id="tipo" name="tipo" class="select">
              <option value="">Selecciona...</option>
              ${typeOptions}
            </select>
            <span class="form-error" id="error-tipo"></span>
          </div>

          <div class="form-group">
            <label for="tema" class="form-label">Tema</label>
            <select id="tema" name="tema" class="select">
              <option value="">Selecciona...</option>
              ${themeOptions}
            </select>
            <span class="form-error" id="error-tema"></span>
          </div>

          <div class="form-group">
            <span class="form-label">Nivel</span>
            <div class="radio-group">
              ${levelRadios}
            </div>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" id="favorito" name="favorito" value="true" />
              <span>Marcar como favorito</span>
            </label>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Guardar</button>
            <a href="#/" class="btn btn-secondary">Cancelar</a>
          </div>
        </form>
      </div>
    </div>
  `;

  const form = app.querySelector('#resource-form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Limpiar errores previos
    const errorInputs = form.querySelectorAll('.is-error');
    errorInputs.forEach((el) => {
      el.classList.remove('is-error');
      el.removeAttribute('aria-invalid');
    });

    const errorMessages = form.querySelectorAll('.form-error');
    errorMessages.forEach((el) => {
      el.textContent = '';
    });

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    data.favorito = Boolean(data.favorito);

    const errors = {};

    const titulo = (data.titulo || '').trim();
    if (!titulo || titulo.length < 3) {
      errors.titulo = 'El título es obligatorio y debe tener al menos 3 caracteres.';
    }

    const rawUrl = (data.url || '').trim();
    let isValidUrl = false;
    if (rawUrl) {
      try {
        new URL(rawUrl);
        isValidUrl = true;
      } catch {
        isValidUrl = false;
      }
    }
    if (!isValidUrl) {
      errors.url = 'La URL es obligatoria y debe ser una URL válida.';
    }

    if (!data.tipo) {
      errors.tipo = 'El tipo es obligatorio.';
    }

    if (!data.tema) {
      errors.tema = 'El tema es obligatorio.';
    }

    if (Object.keys(errors).length > 0) {
      for (const [field, message] of Object.entries(errors)) {
        const input = form.elements[field];
        if (input) {
          input.classList.add('is-error');
          input.setAttribute('aria-invalid', 'true');
        }
        const errorEl = form.querySelector(`#error-${field}`);
        if (errorEl) {
          errorEl.textContent = message;
        }
      }
      return;
    }

    create({
      titulo,
      url: rawUrl,
      tipo: data.tipo,
      tema: data.tema,
      nivel: data.nivel || 'basico',
      favorito: data.favorito,
    });

    showToast('Recurso guardado');
    form.reset();
    window.location.hash = '#/recursos';
  });
}
