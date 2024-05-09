import { TechSpecs } from '../../../types'

export const defineTechSpecs = (): TechSpecs => ({
  engine: {
    cylinders: { number: 0, layout: '' },
    displacement: 0,
    power: { hp: 0, rpm: 0 },
    torque: { nm: 0, rpm: 0 },
    compressionRatio: '',
    cooling: '',
    fuelSystem: '',
    gasEmission: '',
    battery: ''
  },
  brakes: {
    front: { type: '', diameter: '' },
    rear: { type: '', diameter: '' },
    antiLockBrakingSystem: false
  },
  suspension: {
    front: '',
    rear: '',
    frontTravel: '',
    rearTravel: ''
  },
  wheels: {
    front: { type: '', size: '' },
    rear: { type: '', size: '' }
  },
  chassis: '',
  dimensions: {
    length: '',
    width: '',
    height: '',
    wheelbase: '',
    seatHeight: '',
    weight: ''
  },
  transmission: {
    type: '',
    gears: 0
  },
  fuel: {
    type: '',
    approxConsumption: '',
    tank: '',
    recommendedOctane: ''
  },
  performance: {
    topSpeed: '',
    acceleration0To100: ''
  },
  equipment: {
    lights: '',
    instrumentation: '',
    absBreaks: false,
    tractionControl: false,
    quickshifter: false,
    cruiseControl: false,
    launchControl: false,
    lowRPMAssist: false,
    rideModes: false
  }
})
