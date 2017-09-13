export function selectDude (id) {
  return { type: 'DUDE_SELECT', id}
}

export function updateDudeName (id, name) {
  return { type: 'DUDE_UPDATE_NAME', id, name}
}
