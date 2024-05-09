export interface Motorcycle {
  brand: string
  type?: string
  model: string
  year: number
  price: Price
  techSpecs: TechSpecs
  deductibleData: DeductibleData
  images: MotorcycleImages
}

export type MotorcycleInfo = Omit<Motorcycle, 'brand' | 'type'>

export interface Price {
  price: number
  currency: string
  ivaIncluded?: boolean
}

export interface TechSpecs {
  engine: Engine
  brakes: Brakes
  suspension: Suspension
  wheels: Wheels
  dimensions: Dimensions
  chassis: string
  transmission: Transmission
  fuel: Fuel
  performance: Performance
  equipment: Equipment
}

export interface Engine {
  cylinders: Cylinders
  displacement: number // cm3
  power: Power
  torque: Torque
  compressionRatio: string
  cooling: string
  fuelSystem: string
  gasEmission: string
  battery: string
}

export interface Cylinders {
  number: number
  layout: string
}

export interface Power {
  hp: number
  rpm: number
}

export interface Torque {
  nm: number
  rpm: number
}

export interface Brakes {
  front: BrakeFront
  rear: BrakeRear
  antiLockBrakingSystem: boolean
}

export interface BrakeFront {
  type: string
  diameter: string
}

export interface BrakeRear {
  type: string
  diameter: string
}

export interface Suspension {
  front: string
  rear: string
  frontTravel: string
  rearTravel: string
}

export interface Dimensions {
  length: string
  width: string
  height: string
  wheelbase: string
  seatHeight: string
  weight: string
}

export interface Transmission {
  type: string
  gears: number
}

export interface Fuel {
  type: string
  approxConsumption?: string
  tank: string
  recommendedOctane?: string
}

export interface Performance {
  topSpeed?: string
  acceleration0To100?: string
}

export interface Equipment {
  lights: string
  instrumentation: string
  absBreaks: boolean
  tractionControl: boolean
  quickshifter: boolean
  rideModes: boolean
  cruiseControl: boolean
  lowRPMAssist: boolean
  launchControl: boolean
}

export interface Wheels {
  front: Wheel
  rear: Wheel
}

export interface Wheel {
  type: string
  size: string
}

export interface DeductibleData {
  approxRange?: number
}

export interface MotorcycleImages {
  banner?: string
  colorImages: ColorImage[]
  model3D?: string
  view360?: string
  videos?: VideoSrc[]
  gallery?: GalleryImage[]
}

export interface ColorImage {
  color: string
  image: string
}

export interface VideoSrc {
  src: string
  type?: string
}

export interface GalleryImage {
  image: string
  title?: string
}
