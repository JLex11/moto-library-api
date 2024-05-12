import { CheerioAPI } from 'cheerio'
import { TechSpecs } from '../../../../../types'
import { defineTechSpecs } from '../../../utils/defineTechSpecs'

export const getTechSpecs = ($page: CheerioAPI): TechSpecs => {
  const techSpecs: TechSpecs = defineTechSpecs()
  const $techSpecRows = [...$page('.ficha .item > div div:last-child')]

  $techSpecRows.forEach(elementRow => {
    const $specRow = $page(elementRow)
    const $title = $specRow.find('h3').first()
    const title = $title.text().trim().toLowerCase()
    const value = $specRow.find('li').last().text().toLowerCase().trim()

    if (title.match(/Motor/i)) {
      const [, cylinderNumber] = value.split(/Tiempos/i)
      techSpecs.engine.cylinders.number = cylinderNumber ? Number(cylinderNumber.replace(/\D/g, '')) : 0
      // techSpecs.engine.cylinders.layout = cylinderLayout
    }
    if (title.match(/Cilindraje/i))
      techSpecs.engine.displacement = Number(value.split(/cm/i)[0].replace(/\D/g, ''))
    // if (title.match(/relación de compresión/i)) techSpecs.engine.compressionRatio = value
    if (title.match(/Sistema de refrigeración/i))
      techSpecs.engine.cooling = value.split(',').pop()?.trim() || 'aire'
    if (title.match(/Sistema de alimentación de combustible/i)) techSpecs.engine.fuelSystem = value
    // if (title.match(/capacidad batería/i)) techSpecs.engine.battery = value
    if (title.match(/Potencia/i)) {
      const [hp, rpm] = value.split(' @ ')
      techSpecs.engine.power.hp = hp ? Number(hp.replace(/\D/g, '')) : 0
      techSpecs.engine.power.rpm = rpm ? Number(rpm.replace(/\D/g, '')) : 0
    }
    if (title.match(/Torque/i)) {
      const [nm, rpm] = value.split(/a|\/|@/)
      techSpecs.engine.torque.nm = nm ? Number(nm.replace(/\D/g, '')) : 0
      techSpecs.engine.torque.rpm = rpm ? Number(rpm.replace(/\D/g, '')) : 0
    }
    // if (title.match(/tipo de chasis/i)) techSpecs.chassis = value
    // if (title.match(/regulación/i)) techSpecs.engine.gasEmission = value
    if (title.match(/freno delantero/i)) techSpecs.brakes.front.type = value
    if (title.match(/freno trasero/i)) techSpecs.brakes.rear.type = value
    if (title.match(/Suspensión delantera/i)) techSpecs.suspension.front = value
    if (title.match(/Suspensión trasera/i)) techSpecs.suspension.rear = value
    if (title.match(/llanta delantera/i)) techSpecs.wheels.front = { type: 'llanta', size: value }
    if (title.match(/llanta trasera/i)) techSpecs.wheels.rear = { type: 'llanta', size: value }
    if (title.match(/largo/i)) techSpecs.dimensions.length = value
    if (title.match(/ancho/i)) techSpecs.dimensions.width = value
    if (title.match(/altura/i)) techSpecs.dimensions.height = value
    if (title.match(/Altura del asiento/i)) techSpecs.dimensions.seatHeight = value
    if (title.match(/Distancia entre ejes/i)) techSpecs.dimensions.wheelbase = value
    if (title.match(/peso .*/i)) techSpecs.dimensions.weight = value
    if (title.match(/Transmisión/i)) {
      // Manual, engranaje constante | 6 Velocidades
      //const [transmissionType, gears] = value.split(' de ')
      //techSpecs.transmission.type = transmissionType
      techSpecs.transmission.gears = Number(value.replace(/\D/g, ''))
    }
    if (title.match(/Capacidad tanque/i)) techSpecs.fuel.tank = value
    // if (title.match(/luz principal/i)) techSpecs.equipment.lights = value
    // if (title.match(/Euro/i)) techSpecs.engine.gasEmission = value.replace(/\D/g, '')
    // if (title.match(/ABS/i)) techSpecs.brakes.antiLockBrakingSystem = value === 'si'
    if (title.match(/Control de tracción/i)) techSpecs.equipment.tractionControl = value === 'si'
    if (title.match(/Control crusero/i)) techSpecs.equipment.cruiseControl = value === 'si'
    if (title.match(/Asistente de bajas revoluciones/i)) techSpecs.equipment.lowRPMAssist = value === 'si'
    if (title.match(/Quick Shift/i)) techSpecs.equipment.quickshifter = value === 'si'
    if (title.match(/Modos de manejo/i)) techSpecs.equipment.rideModes = value === 'si'
    if (title.match(/Sistema de arranque en pendientes/i))
      techSpecs.equipment.hillStartAssist = value === 'si'
    // if (title.match(/FI/i)) techSpecs.engine.fuelSystem = value === 'si' ? 'inyección' : techSpecs.engine.fuelSystem
  })

  return techSpecs
}
