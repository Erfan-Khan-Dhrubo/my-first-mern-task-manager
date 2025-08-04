export function getAllNotes(req, res) {
  res.status(200).json({ message: "You just fetched the notes" });
}

export function createNotes(req, res) {
  res.status(201).json({ message: "Note created succesfully" });
}

export function updateNotes(req, res) {
  res.status(200).json({ message: "Note updated succesfully" });
}

export function deleteNotes(req, res) {
  res.status(200).json({ message: "Note deleted succesfully" });
}
