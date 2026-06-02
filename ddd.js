const DDD_API = "https://brasilapi.com.br/api/ddd/v1/"

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

export async function buscarDDD(ddd) {
  try {
    const response = await fetch(`${DDD_API}${ddd}`)
    if (!response.ok) {
      throw new Error(
        `DDD ${ddd} não encontrado. Verifique se é um DDD brasileiro válido.`
      )
    }
    const data = await response.json()

    return {
      state: data.state,
      cities: data.cities.map(city => toTitleCase(city)).sort(),
    }
  } catch (error) {
    throw new Error("Erro desconhecido. Tente conhecer o erro!")
  }
}

export function renderizarCidades(cidades, onCidadeClick) {
  const lista = document.getElementById("cities-list")
  lista.innerHTML = ""

  cidades.forEach((cidade) => {
    const li = document.createElement("li")
    li.textContent = cidade
    li.className = "city-item"
    li.addEventListener("click", () => onCidadeClick(cidade))
    lista.appendChild(li)
  })
}
