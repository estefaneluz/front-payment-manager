async function getAddressByCep(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
            method: 'GET'
        })

        const data = await response.json();
        
        if(data.erro) {
            return false;
        }

        return data;
    } catch {
        return false;
    }
}

export default  getAddressByCep;