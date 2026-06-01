import { buscarClima, renderizarCardClima } from "./clima.js"
import { buscarDDD, renderizarCidades } from "./ddd.js"

const inputDDD = document.getElementById("ddd-input")
const botaoBuscar = document.getElementById("search-btn")
const spinner = document.getElementById("spinner")
const errorMsg = document.getElementById("error-msg")
const citiesSection = document.getElementById("cities-section")
const weaterSection = document.getElementById("weather-section")
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

  const dddValido = /^\d{2}$/.test(ddd)
  if (!dddValido) {
    mostrarErro("Digite um DDD válido. Ex: 11, 47")
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

  const cityItem = document.querySelectorAll(".city-item")
  cityItem.forEach((el) => {
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
  weaterSection.classList.add("hidden")
}
