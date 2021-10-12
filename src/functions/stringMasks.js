export const cpfMask = (cpf) => cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

export const phoneMask = (phone) => phone.replace(/^(\d{2})(\d)/g,"($1) $2");

export const cepMask = (cep) => cep.replace(/(\d{5})(\d{3})/, '$1-$2');
