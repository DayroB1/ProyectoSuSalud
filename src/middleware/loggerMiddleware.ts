import { Middleware } from '@reduxjs/toolkit';

const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  console.log('✔ Acción despachada:', action);
  const result = next(action);
  console.log('🔵 Estado actualizado:', store.getState());
  return result;
};
// const loggerMiddleware: Middleware = (store) => (next) => (action) => {
//   console.log('✔ Acción despachada:', action);
//   const result = next(action);
//   logger.info(`🔵 Estado actualizado: ${JSON.stringify(store.getState())}`);
//   return result;
// };


export default loggerMiddleware;