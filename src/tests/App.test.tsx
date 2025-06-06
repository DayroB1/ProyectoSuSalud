import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import '@testing-library/jest-dom';

// describe('Prueba inicial', async () => {
//  it('Verifica la configuración básica', async () => {
//  expect(true).toBeTruthy();
//  });
// });

// Tests
// describe('Renders main page correctly', async () => {
//  it('Should render the page correctly', async () => {
//  // Inicialización
//   render(
//           <App />
//         );
//  const h1 = await screen.queryByText('SU SALUD');
//  // Comprobaciones
//  expect(h1).not.toBeNull();
//  });
// });



//PRUEBA 1
const messages = {
  'app.label.descripcion': 'Descripción de prueba',
};
// function renderWithProviders(ui: React.ReactElement) {
//   return render(
//     <MemoryRouter>
//       <IntlProvider locale="es" messages={messages}>
//         {ui}
//       </IntlProvider>
//     </MemoryRouter>
//   );
// }

describe('Renders main page correctly', () => {
  it('Busca la palabra "SU SALUD"', () => {
    render(
      <MemoryRouter>
        <IntlProvider locale="es" messages={messages}>
          <App />
        </IntlProvider>
      </MemoryRouter>
    );
    // Busca la palabra en el documento
    const word = screen.queryByText('SU SALUD');
    expect(word).not.toBeNull();
  });

  it('Debe mostrar el botón "Empezar ahora"', () => {
    render(
      <MemoryRouter>
        <IntlProvider locale="es" messages={messages}>
          <App />
        </IntlProvider>
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /Empezar ahora/i })).toBeInTheDocument();
  });

  it('Debe mostrar el select de idiomas y cambiar el valor con fireEvent', () => {
    render(
      <MemoryRouter>
        <IntlProvider locale="es" messages={messages}>
          <App />
        </IntlProvider>
      </MemoryRouter>
    );
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    // Cambia el idioma a inglés usando fireEvent
    fireEvent.change(select, { target: { value: 'en' } });
    expect((select as HTMLSelectElement).value).toBe('en');
  });

  it('Debe tener un enlace a la página de login-registro', () => {
    render(
      <MemoryRouter>
        <IntlProvider locale="es" messages={messages}>
          <App />
        </IntlProvider>
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: /Empezar ahora/i });
    expect(link).toHaveAttribute('href', '/login-registro');
  });


  
});