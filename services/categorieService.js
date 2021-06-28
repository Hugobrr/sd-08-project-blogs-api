/* req 5
[Será validado que é possível cadastrar uma categoria com sucesso]
[Será validado que não é possível cadastrar uma categoria sem o campo name]
[Será validado que não é possível cadastrar uma determinada categoria com o token inválido]
[Será validado que não é possível cadastrar uma determinada categoria sem o token na requisição]
*/
const categoria = {
  categoriaCriada: { message: 'Category created', status: 201 },
  nomeRequerido: { message: '"name" is required', status: 400 },
};

const validEntrie = (myValue, object) => {
  if (
    myValue === undefined
    || myValue === null
    || myValue === ''
    || typeof myValue !== 'string') return object;
  return true;
};

const create = ({ name }) => {
  console.log('name', name);
  const { nomeRequerido } = categoria;
  if (validEntrie(name, nomeRequerido) !== true) return validEntrie(name, nomeRequerido);  
  return true;
};

/* req 6
[Será validado que não é possível listar as categorias com o token inválido]
[Será validado que não é possível cadastrar uma determinada categoria sem o token na requisição]
*/

// const listaCategorias = {
//   categoriaListadas: { message: 'Categories listed', status: 200 },
//   tokenInexistente: { message: 'Token not found', status: 401 },
//   tokenExpirado: { message: 'Expired or invalid token', status: 401 },
// };

module.exports = {
  create,
};