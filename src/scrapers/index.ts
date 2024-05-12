import { getAllMotorcycles as getAllSuzukiMotorcycles } from './methods/suzuki'
import { getAllMotorcycles as getAllYamahaMotorcycles } from './methods/yamaha'

export const getAllMotorcycles = async () => {
  const [suzukiMotorcycles, yamahaMotorcycles] = await Promise.all([
    getAllSuzukiMotorcycles(),
    getAllYamahaMotorcycles()
  ])

  return [...suzukiMotorcycles, ...yamahaMotorcycles]
}
