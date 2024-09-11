export const verificarInputs = (saldo, valorOperação, setValorOperação, tipoOperação,) => {
  if (isNaN(valorOperação)) {
    throw new Error('Digite um valor válido')
  }

  if (valorOperação <= 0) {
    throw new Error('Digite um valor válido')
  }

  if (tipoOperação == 'TD' && valorOperação > saldo) {
    throw new Error('Saldo insuficiente')
  }


  if (tipoOperação == 'SQ' && valorOperação > saldo) {
    throw new Error('Saldo insuficiente')
  }
}

export const cancelarOperação = (setTipoOperação, setValorOperação) => {
  setTipoOperação('')
  setValorOperação('')
}

export const calcularSaldo = (historicoFiltrado) => {
  let saldo = 0

  for (let index = 0; index < historicoFiltrado.length; index++) {
    if (historicoFiltrado[index].tipo == 'SQ' || historicoFiltrado[index].tipo == 'TD' || historicoFiltrado[index].tipo == 'CP') {
      saldo -= parseFloat(historicoFiltrado[index].valor)
    } else {
      saldo += parseFloat(historicoFiltrado[index].valor)
    }
  }

  return saldo
}

export const filtrarHistoricoPorData = (historicoFiltrado) => {

  const historicoPorData = historicoFiltrado.reduce((acc, transação) => {
    const { data } = transação;

    if (!acc[data]) {
      acc[data] = [];
    }

    acc[data].push(transação);
    return acc;
  }, {});

  return Object.entries(historicoPorData);
}