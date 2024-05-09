import { getAllMotorcycles as getAllYamahaMotorcycles } from './methods/yamaha'

export const getAllMotorcycles = async () => {
  const suzukiMotorcycles = /* await getAllSuzukiMotorcycles() */ [] as any
  const yamahaMotorcycles = await getAllYamahaMotorcycles()

  return [...suzukiMotorcycles, ...yamahaMotorcycles]
}
