import bcrypt from 'bcryptjs'

const clave = process.argv[2]

if (!clave) {
  console.log('Uso: node scripts/generarHash.js MiClave123')
  process.exit(1)
}

const hash = await bcrypt.hash(clave, 10)
console.log(hash)