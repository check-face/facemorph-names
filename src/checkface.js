let imageSrc = (dim, value) => `https://api.facemorph.me/api/face/?dim=${dim}&value=${encodeURIComponent(value)}`
let facemorph = (from_value, to_value) => `https://facemorph.me/?from_value=${encodeURIComponent(from_value)}&to_value=${encodeURIComponent(to_value)}`

export { imageSrc, facemorph }