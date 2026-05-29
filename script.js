import { buscarDDD, renderizarCidades } from "./ddd.js"

const inputDDD = document.getElementById("ddd-input")
const botaoBuscar = document.getElementById("search-btn")
const spinner = document.getElementById("spinner")
const errorMsg = document.getElementById("error-msg")
const citiesSection = document.getElementById("cities-section")
const stateLabel = document.getElementById("state-label")

inputDDD.addEventListener("input", () => {
  if (inputDDD.value.length > 2) {
    inputDDD.value = inputDDD.value.slice(0, 2)
  }
})

inputDDD.addEventListener("keydown", (e) => {
  if (e.key === "Enter") botaoBuscar.click()
})

botaoBuscar.addEventListener("click", async () => {
  const ddd = inputDDD.value.trim()

  if (!/^\d{2}$/.test(ddd)) {
    mostrarErro(
      "Digite um DDD válido com exatamente 2 dígitos. Ex: 11, 47, 21."
    )
    return
  }

  esconderErro()
  limparResultados()
  mostrarSpinner()

  try {
    const { state, cities } = await buscarDDD(ddd)

    stateLabel.textContent = state
    renderizarCidades(cities, onCidadeSelecionada)
    citiesSection.classList.remove("hidden")
  } catch (erro) {
    mostrarErro(erro.message)
  } finally {
    esconderSpinner()
  }
})

async function onCidadeSelecionada(cidade) {
  esconderErro()
  document.getElementById("weather-section").classList.add("hidden")

  document.querySelectorAll(".city-item").forEach((el) => {
    el.classList.toggle("selected", el.textContent === cidade)
  })

  mostrarSpinner()

  try {
    const clima = await buscarClima(cidade)
    renderizarCardClima(clima)
  } catch (erro) {
    mostrarErro(erro.message)
  } finally {
    esconderSpinner()
  }
}

function mostrarSpinner() {
  spinner.classList.remove("hidden")
}
function esconderSpinner() {
  spinner.classList.add("hidden")
}

function mostrarErro(msg) {
  errorMsg.textContent = msg
  errorMsg.classList.remove("hidden")
}

function esconderErro() {
  errorMsg.classList.add("hidden")
  errorMsg.textContent = ""
}

function limparResultados() {
  citiesSection.classList.add("hidden")
  document.getElementById("weather-section").classList.add("hidden")
}

export function renderizarCardClima(climaData) {
    const section = document.getElementById("weather-section")
    const card = document.getElementById("weather-card")
  
    const iconeUrl = `https://openweathermap.org/img/wn/${climaData.icone}@2x.png`
  
    card.innerHTML = `
        <div class="weather-card">
          <img class="weather-icon" src="${iconeUrl}" alt="${climaData.descricao}" />
          <div class="weather-info">
            <h3>${climaData.cidade}</h3>
            <div class="weather-temp">${climaData.temperatura}°C</div>
            <div class="weather-desc">${climaData.descricao}</div>
            <div class="weather-extra">
              <span>Sensação ${climaData.sensacao}°C</span>
              <span>Umidade ${climaData.umidade}%</span>
            </div>
          </div>
        </div>
      `
  
    section.classList.remove("hidden")
  }
