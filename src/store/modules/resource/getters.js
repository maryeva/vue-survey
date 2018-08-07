export default {
  // Return a named, related resource
  related: (state) => ({ resource, relationship }) => {
    const data = resource.relationships[relationship].data
    if (Array.isArray(data)) {
      return data.map(r => state[r.type][r.id])
    } else {
      return state[data.type][data.id]
    }
  }

}
