const uid = (): string => String(Math.floor(Math.random() * Date.now()))

export default uid
