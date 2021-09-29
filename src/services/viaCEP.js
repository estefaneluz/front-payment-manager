async function getCityByCep(cep) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
        method: 'GET'
    })

    const data = await response.json();
    console.log(data);
}

module.exports = { getCityByCep };